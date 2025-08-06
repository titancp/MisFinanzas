import IncomeItem from './IncomeItem'

const IncomeList = ({ ingresos, onDeleteIncome, onEditIncome }) => {
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Lista de Ingresos</h2>

      {ingresos.length === 0 ? (
        <p className="text-center text-gray-600">No hay ingresos registrados.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {ingresos.map((ingreso) => (
            <IncomeItem key={ingreso.id} ingreso={ingreso} onDeleteIncome={onDeleteIncome} onEditIncome={onEditIncome} />
          ))}
        </div>
      )}
    </div>
  )
}

export default IncomeList
