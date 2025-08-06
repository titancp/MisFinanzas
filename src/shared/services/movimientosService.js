const getIngresos = () => {
  return JSON.parse(localStorage.getItem("ingresos") || "[]");
};

const getEgresos = () => {
  const egresos = JSON.parse(localStorage.getItem("egresos") || "[]");
  console.log("EGRESOS CRUDO", egresos);
  return egresos;
};

const getMovimientos = () => {
  const ingresos = getIngresos().map(i => ({ ...i, tipo: "I" }));
  const egresos = getEgresos().map(e => ({ ...e, tipo: "E" }));
  console.log("MOVIMIENTOS RAW", [...ingresos, ...egresos]);
  return [...ingresos, ...egresos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

const getTotalIngresos = () => {
  return getIngresos().reduce((sum, i) => sum + Number(i.monto), 0);
};

const getTotalEgresos = () => {
  return getEgresos().reduce((sum, e) => sum + Number(e.monto), 0);
};

const getSaldo = () => {
  return getTotalIngresos() - getTotalEgresos();
};

const movimientosService = {
  getTotalIngresos,
  getTotalEgresos,
  getMovimientos,
  getSaldo,
};

export default movimientosService;





