import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  displayName: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

/**
 * Faz login com email e senha
 */
export async function loginWithEmail(credentials: LoginCredentials): Promise<{
  user: FirebaseUser
  token: string
}> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    )

    const token = await userCredential.user.getIdToken()

    // Store token in cookie for SSR support
    if (typeof document !== 'undefined') {
      const isProduction = process.env.NODE_ENV === 'production'
      const secureFlag = isProduction ? 'secure;' : ''
      document.cookie = `firebase-token=${token}; path=/; ${secureFlag} samesite=strict; max-age=${24 * 60 * 60}`
    }

    return {
      user: userCredential.user,
      token: token,
    }
  } catch (error: unknown) {
    const firebaseError = error as {
      code?: string
      message?: string
      customData?: unknown
    }

    if (firebaseError.code) {
      throw new Error(getFirebaseErrorMessage(firebaseError.code))
    } else {
      throw new Error('Erro no login. Verifique suas credenciais.')
    }
  }
}

/**
 * Faz login com Google
 */
export async function loginWithGoogle(): Promise<{
  user: FirebaseUser
  token: string
  backendData?: unknown
}> {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const token = await result.user.getIdToken()

    // Store token in cookie for SSR support
    if (typeof document !== 'undefined') {
      const isProduction = process.env.NODE_ENV === 'production'
      const secureFlag = isProduction ? 'secure;' : ''
      document.cookie = `firebase-token=${token}; path=/; ${secureFlag} samesite=strict; max-age=${24 * 60 * 60}`
    }

    // Try backend authentication, but continue if it fails
    let backendData = null
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/auth/login/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken: token }),
        },
      )

      if (response.ok) {
        const data: ApiResponse = await response.json()
        if (data.success) {
          backendData = data.data
        }
      }
    } catch {
      // Backend not available, continue with Firebase only
    }

    return {
      user: result.user,
      token: token,
      backendData: backendData,
    }
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string }
    throw new Error(getFirebaseErrorMessage(firebaseError.code || 'unknown'))
  }
}

/**
 * Registra novo usuário
 */
export async function registerUser(
  userData: RegisterData,
  password: string,
): Promise<{
  user: FirebaseUser
  backendData?: unknown
}> {
  try {
    // Cria no Firebase PRIMEIRO (antes de chamar a API)
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password)

    // Update Firebase profile
    await updateProfile(userCredential.user, {
      displayName: userData.displayName,
    })

    // Agora chama a API APENAS com email e displayName (SEM senha)
    let backendData = null
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      )

      if (response.ok) {
        const data: ApiResponse = await response.json()
        if (data.success) {
          backendData = data.data
        }
      }
    } catch {
      // Backend not available, continue with Firebase only
    }

    // Sign out to force manual login
    await signOut(auth)

    return {
      user: userCredential.user,
      backendData: backendData,
    }
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string }
    throw new Error(getFirebaseErrorMessage(firebaseError.code || 'unknown'))
  }
}

/**
 * Envia email de reset de senha
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)

    // Also notify backend
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/auth/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
  } catch (error: unknown) {
    const firebaseError = error as { code?: string }
    throw new Error(getFirebaseErrorMessage(firebaseError.code || 'unknown'))
  }
}

/**
 * Faz logout
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth)

    // Remove token from cookie
    if (typeof document !== 'undefined') {
      document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  } catch (error: unknown) {
    const firebaseError = error as { code?: string }
    throw new Error(getFirebaseErrorMessage(firebaseError.code || 'unknown'))
  }
}

/**
 * Verifica token no backend
 */
export async function verifyToken(token: string): Promise<unknown> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/auth/verify-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        },
        body: JSON.stringify({ idToken: token }),
      },
    )
    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error('Servidor indisponível')
      }
      if (response.status === 0 || response.type === 'opaque') {
        throw new Error('Erro de CORS ou conectividade')
      }
    }

    const data: ApiResponse = await response.json()

    if (!data.success) {
      throw new Error(data.error?.message || 'Token inválido')
    }

    return data.data
  } catch (error) {
    // Se for erro de rede/CORS, relança com mensagem mais específica
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Não foi possível conectar ao servidor (CORS/Rede)')
    }
    throw error
  }
}

/**
 * Converte códigos de erro do Firebase em mensagens amigáveis
 */
function getFirebaseErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'Usuário não encontrado'
    case 'auth/wrong-password':
      return 'Senha incorreta'
    case 'auth/invalid-credential':
      return 'Email ou senha incorretos'
    case 'auth/invalid-login-credentials':
      return 'Credenciais de login inválidas'
    case 'auth/email-already-in-use':
      return 'Este email já está em uso'
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres'
    case 'auth/invalid-email':
      return 'Email inválido'
    case 'auth/user-disabled':
      return 'Conta desativada'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde'
    case 'auth/network-request-failed':
      return 'Erro de conexão'
    case 'auth/popup-closed-by-user':
      return 'Login cancelado pelo usuário'
    case 'auth/popup-blocked':
      return 'Popup bloqueado pelo navegador'
    case 'auth/operation-not-allowed':
      return 'Operação não permitida'
    case 'auth/requires-recent-login':
      return 'É necessário fazer login novamente'
    default:
      return 'Erro inesperado. Tente novamente'
  }
}
