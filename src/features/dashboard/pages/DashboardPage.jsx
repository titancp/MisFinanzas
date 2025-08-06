import { useState } from 'react';
import {useNavigate} from 'react-router'
import movimientosService from '../../../shared/services/movimientosService.js'
import Summary from '../components/Summary.jsx';
import RecentMovementsList from '../components/RecentMovementsList.jsx';
import { useEffect } from 'react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    setIngresos(movimientosService.getTotalIngresos());
    setEgresos(movimientosService.getTotalEgresos());
    setSaldo(movimientosService.getSaldo());

    const todos = movimientosService.getMovimientos();
    const ultimos10 = todos.slice(0, 10);
    setMovimientos(ultimos10);
  },[]);


  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Resumen */}
      {/* <Summary ingresos={ingresos} egresos={egresos} saldo={saldo}/> */}

      <Summary ingresos={ingresos} egresos={egresos} saldo={saldo} />
      
      <RecentMovementsList movimientos={movimientos} />

      {/* Atajos */}
      <div className="flex gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
        onClick={() => {navigate('/income/form')}}>
          ➕ Ingreso
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        onClick={() => {navigate('/expenses/form')}}>
          ➖ Egreso
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        onClick={() => {navigate('/reports')}}
        >
          📈 Reportes
        </button>
      </div>
    </div>
  )
}

export default DashboardPage

