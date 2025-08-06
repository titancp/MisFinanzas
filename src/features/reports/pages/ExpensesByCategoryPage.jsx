import { useState } from "react";
import movimientosService from "../../../shared/services/movimientosService.js";
import ExpensesByCategoryTable from "../components/ExpensesByCategoryTable";
import { formatNumber } from "../../../shared/utils";
import BaseButton from "../../../components/BaseButton.jsx";

const ExpensesByCategoryPage = () => {
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [summary, setSummary] = useState([]);

  const handleSearch = () => {
    const movimientos = movimientosService.getMovimientos();

    const filtrados = movimientos.filter((mov) => {
      const fechaMov = new Date(mov.fecha);
      const desde = startDate ? new Date(startDate) : null;
      const hasta = endDate ? new Date(endDate) : null;

      const esEgreso = mov.tipo === "E";
      const despuesDeInicio = !desde || fechaMov >= desde;
      const antesDeFin = !hasta || fechaMov <= hasta;

      return esEgreso && despuesDeInicio && antesDeFin;
    });

    const totalEgresos = filtrados.reduce((sum, i) => sum + Number(i.monto), 0);

    const agrupados = filtrados.reduce((acc, item) => {
      const cat = item.categoria || "Sin categoría";
      acc[cat] = acc[cat] || { categoria: cat, total: 0 };
      acc[cat].total += Number(item.monto);
      return acc;
    }, {});

    const resumen = Object.values(agrupados).map((item) => ({
      ...item,
      porcentaje: totalEgresos ? (item.total / totalEgresos) * 100 : 0,
    }));

    setSummary(resumen);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📊 Reporte: Egresos por Categoría</h2>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>

        <BaseButton
          type="button"
          label="Ver Reporte"
          onClick={handleSearch}
          className="py-2 font-medium px-4 rounded-lg bg-blue-500 hover:bg-blue-800 text-white cursor-pointer duration-300"
        />
      </div>

      <ExpensesByCategoryTable items={summary} />
    </div>
  );
};

export default ExpensesByCategoryPage;
