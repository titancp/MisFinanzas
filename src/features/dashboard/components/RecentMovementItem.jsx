import { CATEGORIAS_EGRESOS, CATEGORIAS_INGRESOS } from "../../../shared/utils/categorias";

const RecentMovementItem = ({ movimiento })=> {
  const { fecha, categoria, tipo, monto } = movimiento;

  const colorMonto = tipo === "I" ? "text-green-600" : "text-red-600";
  const signo = tipo === "I" ? "+" : "-";

  const listaCategorias = tipo === "I" ? CATEGORIAS_INGRESOS : CATEGORIAS_EGRESOS;
  const categoriaLabel = listaCategorias.find(cat => cat.value === categoria)?.label || categoria;

  return (
    <tr className="border-b">
      <td className="py-2">{fecha}</td>
      <td>{categoriaLabel}</td>
      <td>{tipo === "I" ? "Ingreso" : "Egreso"}</td>
      <td className={colorMonto}>
        {signo}S/. {Number(monto).toFixed(2)}
      </td>
    </tr>
  );
}

export default RecentMovementItem;

