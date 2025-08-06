import { formatNumber } from "../../../shared/utils";

const ExpensesByCategoryTable = ({ items }) => {
  if (!items.length)
    return (
      <p className="text-gray-600 mt-4">
        No hay datos para mostrar
      </p>
    );

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-800 uppercase">
          <tr>
            <th className="px-4 py-2 border">Categoría</th>
            <th className="px-4 py-2 border text-right">Total</th>
            <th className="px-4 py-2 border text-center">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{item.categoria}</td>
              <td className="px-4 py-2 border text-right">S/ {formatNumber(item.total)}</td>
              <td className="px-4 py-2 border text-center">
                {item.porcentaje.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesByCategoryTable;
