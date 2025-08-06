import { useState } from "react";
import movimientosService from "../../../shared/services/movimientosService.js";
import GeneralBalanceTable from "../components/GeneralBalanceTable";
import { formatNumber } from "../../../shared/utils";
import BaseButton from "../../../components/BaseButton.jsx";

const GeneralBalancePage = () => {
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expenses: 0 });

  const handleSearch = () => {
    const movimientos = movimientosService.getMovimientos();

    const filtrados = movimientos.filter((mov) => {
      const fechaMov = new Date(mov.fecha);
      const desde = startDate ? new Date(startDate) : null;
      const hasta = endDate ? new Date(endDate) : null;

      const despuesDeInicio = !desde || fechaMov >= desde;
      const antesDeFin = !hasta || fechaMov <= hasta;

      return despuesDeInicio && antesDeFin;
    });

    setItems(filtrados);

    const income = filtrados
      .filter((i) => i.tipo === "I")
      .reduce((sum, i) => sum + Number(i.monto), 0);

    const expenses = filtrados
      .filter((i) => i.tipo === "E")
      .reduce((sum, i) => sum + Number(i.monto), 0);

    setTotals({ income, expenses });
  };

  const balance = totals.income - totals.expenses;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📄 Reporte: Balance General</h2>

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
          label="Ver Balance"
          onClick={handleSearch}
          className="py-2 font-medium px-4 rounded-lg bg-blue-500 hover:bg-blue-800 text-white cursor-pointer duration-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md text-sm mb-4">
        <div className="border rounded p-3 text-green-700 bg-green-50">
          <strong>Total Ingresos:</strong> S/ {formatNumber(totals.income)}
        </div>
        <div className="border rounded p-3 text-red-700 bg-red-50">
          <strong>Total Egresos:</strong> S/ {formatNumber(totals.expenses)}
        </div>
      </div>

      <div className="mb-6 border px-4 py-2 w-fit rounded bg-gray-50 text-sm font-semibold">
        Balance:{" "}
        <span className={balance < 0 ? "text-red-700" : "text-gray-900"}>
          S/ {formatNumber(balance)}
        </span>
      </div>

      <GeneralBalanceTable items={items} />
    </div>
  );
};

export default GeneralBalancePage;
