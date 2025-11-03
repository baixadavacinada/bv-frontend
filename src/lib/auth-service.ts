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
import { createUserProfile } from '@/lib/roles-service'

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

    if (typeof document !== 'undefined') {
      const isProduction = process.env.NODE_ENV === 'production'
      const secureFlag = isProduction ? 'secure;' : ''
      document.cookie = `firebase-token=${token}; path=/; ${secureFlag} samesite=strict; max-age=${24 * 60 * 60}`
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
      })
    } catch {}

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

export async function loginWithGoogle(): Promise<{
  user: FirebaseUser
  token: string
  backendData?: unknown
}> {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const token = await result.user.getIdToken()

    if (typeof document !== 'undefined') {
      const isProduction = process.env.NODE_ENV === 'production'
      const secureFlag = isProduction ? 'secure;' : ''
      document.cookie = `firebase-token=${token}; path=/; ${secureFlag} samesite=strict; max-age=${24 * 60 * 60}`
    }

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
    } catch (error) {
      console.error('Backend login/google error:', error)
    }

    return {
      user: result.user,
      token: token,
      backendData: backendData,
    }
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string }
    const errorCode = firebaseError.code
    if (errorCode === 'auth/popup-closed-by-user') {
      throw new Error('Login cancelado pelo usuário')
    }
    if (errorCode === 'auth/popup-blocked') {
      throw new Error('Popup bloqueado pelo navegador')
    }
    throw new Error(getFirebaseErrorMessage(errorCode || 'unknown'))
  }
}

export async function registerUser(
  userData: RegisterData,
  password: string,
): Promise<{
  user: FirebaseUser
  backendData?: unknown
}> {
  try {
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
      } else {
        const data: ApiResponse = await response.json()
        throw new Error(data.error?.message || 'Erro ao registrar no backend')
      }
    } catch (error) {
      throw error
    }

    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password)

    await updateProfile(userCredential.user, {
      displayName: userData.displayName,
    })

    const token = await userCredential.user.getIdToken()

    try {
      await createUserProfile(token, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      })
    } catch {
      // Se createUserProfile falhar, continua (já foi criado na API antes)
    }

    if (typeof document !== 'undefined') {
      const isProduction = process.env.NODE_ENV === 'production'
      const secureFlag = isProduction ? 'secure;' : ''
      document.cookie = `firebase-token=${token}; path=/; ${secureFlag} samesite=strict; max-age=${24 * 60 * 60}`
    }

    return {
      user: userCredential.user,
      backendData: backendData,
    }
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string }
    throw new Error(getFirebaseErrorMessage(firebaseError.code || 'unknown'))
  }
}

export async function registerUserConcurrent(
  userData: RegisterData,
  password: string,
): Promise<{
  user: FirebaseUser
  backendData?: unknown
}> {
  try {
    const results = await Promise.allSettled([
      createUserWithEmailAndPassword(auth, userData.email, password),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }),
    ])

    const firebaseResult = results[0]
    const backendResult = results[1]

    if (firebaseResult.status === 'rejected') {
      throw new Error(
        getFirebaseErrorMessage((firebaseResult.reason as { code?: string })?.code || 'unknown'),
      )
    }

    let backendData = null
    if (backendResult.status === 'fulfilled' && backendResult.value.ok) {
      const data: ApiResponse = await backendResult.value.json()
      if (data.success) {
        backendData = data.data
      }
    }

    const userCredential = firebaseResult.value as unknown as { user: FirebaseUser }

    await updateProfile(userCredential.user, {
      displayName: userData.displayName,
    })

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

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)

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

export async function logout(): Promise<void> {
  try {
    await signOut(auth)

    if (typeof document !== 'undefined') {
      document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  } catch (error: unknown) {
    const firebaseError = error as { code?: string }
    throw new Error(getFirebaseErrorMessage(firebaseError.code || 'unknown'))
  }
}

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
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Não foi possível conectar ao servidor (CORS/Rede)')
    }
    throw error
  }
}

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
