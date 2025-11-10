 <RoleGuard
      allowedRoles={['admin', 'agent']}
      requireAuth={true}
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-600">
            Acesso negado. Você não tem permissão para acessar esta página.
          </p>
        </div>
      }
    >