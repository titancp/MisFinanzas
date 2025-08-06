export const BaseSelect = ({ label, name, value, onChange, options = [] }) => (
  <div className="flex flex-col">
    {label && (
      <label className="font-medium text-gray-700 mb-2">
        {label}
      </label>
    )}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100 transition"
      // className="w-full py-4 px-5 rounded-lg bg-slate-400"
    >
      <option value="">Seleccione</option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
