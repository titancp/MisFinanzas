import { formatNumber } from "../../../shared/utils";

const SummaryCard = ({ label, value, color }) => {
console.log("value original:", value);
console.log("typeof:", typeof value);
console.log("value convertido:", Number(value));

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`text-xl font-bold ${color}`}>S/.{formatNumber(value)}</p>
    </div>
  );
};

export default SummaryCard;
