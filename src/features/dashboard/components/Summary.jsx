import SummaryCard from "./SummaryCard";

const Summary = ({ ingresos=0, egresos=0, saldo=0 }) => {
  

  return (
    <div className="grid grid-cols-3 gap-4">
      <SummaryCard label="Ingresos" value={`${ingresos}`} color="text-green-600" />
      <SummaryCard label="Egresos" value={`${egresos}`} color="text-red-600" />
      <SummaryCard label="Balance" value={`${saldo}`} color="text-blue-600" />
    </div>
  );
};

export default Summary;



