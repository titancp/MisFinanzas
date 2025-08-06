export const BaseInput = ({
    type = 'text',
    label,
    name,
    value,
    maxLength = '50',
    max = 0,
    onChange
}) => {
    return (
        <label className="flex flex-col gap-2 mb-4">
            <span className="font-normal">{label}</span>
            <input 
                className="
                w-full 
                py-4 px-5 
                rounded-lg 
                bg-slate-400 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white 
                hover:bg-slate-300 transition"
              
                type={type}
                name={name}
                value={value ?? ''}
                maxLength={maxLength}
                max={max}
                onChange={onChange}
            />
        </label>
    )
}


