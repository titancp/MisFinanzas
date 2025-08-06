import { CATEGORIAS_EGRESOS } from "../../../shared/utils/categorias";

import BaseButton from "../../../components/BaseButton";

const ExpensesItem = ({ egreso, onDeleteExpenses, onEditExpenses }) => {
  const { id, fecha, categoria, descripcion, monto } = egreso
  const categoriaLabel = CATEGORIAS_EGRESOS.find(cat => cat.value === categoria)?.label || categoria;

  return (
    <div className="grid grid-cols-5 gap-4 bg-white p-4 rounded shadow items-center text-sm">
      <span>{fecha}</span>
      <span className="capitalize">{categoriaLabel}</span>
      <span className="truncate">{descripcion}</span>
      <span>S/. {parseFloat(monto).toFixed(2)}</span>
      <div className="flex gap-2">
        <BaseButton
          type="button" 
          label="Editar"
          className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
          onClick={() => onEditExpenses(id)}
        />

        <BaseButton 
          type="button"
          label="Eliminar"
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={() => onDeleteExpenses(id)}
        />

      </div>
    </div>
  )
}

export default ExpensesItem
