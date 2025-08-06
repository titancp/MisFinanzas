import React, { useState } from "react";
import movimientosService from "../../../shared/services/movimientosService.js";
import MonthlySummaryTable from "../components/MonthlySummaryTable";
import BaseButton from "../../../components/BaseButton.jsx";

const MonthlySummaryPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);

  const handleGenerate = () => {
    const movimientos = movimientosService.getMovimientos();

    const filtrados = movimientos.filter((mov) => {
      const fecha = new Date(mov.fecha);
      const coincideAño = fecha.getFullYear() === Number(year);
      const coincideMes = month === "" || fecha.getMonth() + 1 === Number(month);
      return coincideAño && coincideMes;
    });

    const resumen = {};

    filtrados.forEach((mov) => {
      const fecha = new Date(mov.fecha);
      const mes = fecha.toLocaleString("es-ES", { month: "long" });

      if (!resumen[mes]) resumen[mes] = { ingresos: 0, egresos: 0 };

      if (mov.tipo === "I") resumen[mes].ingresos += Number(mov.monto);
      else if (mov.tipo === "E") resumen[mes].egresos += Number(mov.monto);
    });

    const resultado = Object.entries(resumen).map(([mes, valores]) => ({
      mes: mes.charAt(0).toUpperCase() + mes.slice(1),
      ingresos: valores.ingresos,
      egresos: valores.egresos,
      balance: valores.ingresos - valores.egresos,
    }));

    setData(resultado);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📅 Reporte: Resumen Mensual</h2>

      <div style={{ margin: "1rem 0" }}>
        <label>
          Año:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
          />
        </label>

        <label>
          Mes:
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
          >
            <option value="">Todo</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </label>

        <BaseButton
            type="button"
            label="Ver Resumen"
            onClick={handleGenerate}
            className="py-2 font-medium px-4 rounded-lg bg-blue-500 hover:bg-blue-800 text-white cursor-pointer duration-300"
        />

      </div>

      <MonthlySummaryTable data={data} />
    </div>
  );
};

export default MonthlySummaryPage;
