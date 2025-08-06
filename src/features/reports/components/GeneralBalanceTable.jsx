import { formatNumber } from "../../../shared/utils";

const GeneralBalanceTable = ({ items }) => {
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
            <th className="px-4 py-2 border">Fecha</th>
            <th className="px-4 py-2 border">Descripción</th>
            <th className="px-4 py-2 border text-center">Tipo</th>
            <th className="px-4 py-2 border text-right">Monto</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{item.fecha}</td>
              <td className="px-4 py-2 border">{item.descripcion}</td>
              <td
                className={`px-4 py-2 border text-center ${
                  item.tipo === "I" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.tipo === "I" ? "Ingreso" : "Egreso"}
              </td>
              <td
                className={`px-4 py-2 border text-right ${
                  item.tipo === "I" ? "text-green-600" : "text-red-600"
                }`}
              >
                S/ {formatNumber(item.monto)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralBalanceTable;
