import RecentMovementItem from "./RecentMovementItem";

const RecentMovementsList = ({movimientos}) => {
  if (!movimientos || movimientos.length === 0) {
    return (
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Registros recientes</h2>
        <p className="text-gray-500">No hay movimientos recientes.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Registros recientes (Ultimos 10 movimientos)</h2>
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="py-2">Fecha</th>
            <th>Categoría</th>
            <th>Tipo</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((mov, idx) => (
            <RecentMovementItem key={idx} movimiento={mov} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentMovementsList;