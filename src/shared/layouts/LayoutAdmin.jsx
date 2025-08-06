import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

export const LayoutAdmin = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('auth');

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])


  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow z-10">
        <h1 className="text-xl font-bold">Mis Finanzas</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
        >
          Salir
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r p-4 space-y-4">
          <nav className="flex flex-col gap-2">
            <button onClick={() => navigate('/dashboard')} className="text-left hover:font-bold">
              🏠 Dashboard
            </button>
            <button onClick={() => navigate('/income')} className="text-left hover:font-bold">
              💰 Ingresos
            </button>
            <button onClick={() => navigate('/expenses')} className="text-left hover:font-bold">
              💸 Egresos
            </button>

             <div>
      <button className="text-left font-medium text-blue-700 cursor-default">
        📊 Reportes
      </button>
      <div className="ml-4 mt-2 flex flex-col gap-1">
        <button
          onClick={() => navigate('/reports/monthly-summary')}
          className="text-left text-sm hover:font-semibold"
        >
          📅 Resumen Mensual
        </button>
        <button
          onClick={() => navigate('/reports/general-balance')}
          className="text-left text-sm hover:font-semibold"
        >
          💵 Balance General
        </button>
        <button
          onClick={() => navigate('/reports/expenses-by-category')}
          className="text-left text-sm hover:font-semibold"
        >
          📈 Egresos por Categoría
        </button>
      </div>
    </div>

          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
