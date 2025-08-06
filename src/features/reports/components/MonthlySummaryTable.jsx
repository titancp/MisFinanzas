
import { formatNumber } from "../../../shared/utils";

const MonthlySummaryTable = ({ data }) => {
  if (!data.length) return <p className="text-gray-600 mt-4">No hay datos para mostrar</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-800 uppercase">
          <tr>
            <th className="px-4 py-2 border">Mes</th>
            <th className="px-4 py-2 border text-right">Ingresos</th>
            <th className="px-4 py-2 border text-right">Egresos</th>
            <th className="px-4 py-2 border text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{row.mes}</td>
              {/* <td className="px-4 py-2 border text-right">S/ {row.ingresos.toFixed(2)}</td> */}
              <td className="px-4 py-2 border text-right text-green-600">
                S/ {formatNumber(row.ingresos)}
              </td>
              {/* <td className="px-4 py-2 border text-right">S/ {row.egresos.toFixed(2)}</td> */}
              <td className="px-4 py-2 border text-right text-red-600">
                S/ {formatNumber(row.egresos)}
              </td>
              {/* <td className="px-4 py-2 border text-right font-semibold">
                S/ {row.balance.toFixed(2)}
              </td> */}
            <td
            className={`px-4 py-2 border text-right font-semibold ${
                row.balance < 0 ? 'text-red-700' : 'text-gray-800'
            }`}
            >
            S/ {formatNumber(row.balance)}
            </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlySummaryTable;
