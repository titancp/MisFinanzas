import { Outlet } from 'react-router'

export default function LayoutAuth() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header con nombre/logo */}
      <header className="py-4 bg-blue-200 shadow">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-blue-800">💼 Mis Finanzas</h1>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-2 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Mis Finanzas · v1.0
      </footer>
    </div>
  )
}

