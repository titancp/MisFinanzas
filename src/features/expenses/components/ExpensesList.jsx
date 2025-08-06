import ExpensesItem from './ExpensesItem'

const ExpensesList = ({ egresos, onDeleteExpenses, onEditExpenses }) => {
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Lista de Egresos</h2>

      {egresos.length === 0 ? (
        <p className="text-center text-gray-600">No hay egresos registrados.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {egresos.map((egreso) => (
            <ExpensesItem key={egreso.id} egreso={egreso} onDeleteExpenses={onDeleteExpenses} onEditExpenses={onEditExpenses} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpensesList
