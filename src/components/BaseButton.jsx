const BaseButton = ({
    type='button',
    label,
    className = '',
    onClick
}) => {
    return (
        <button
            // className="rounded-full px-5 py-4 font-semibold  w-full bg-blue-500 hover:bg-blue-800 text-white cursor-pointer duration-300"
            type={type}
            className={className}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
export default BaseButton;



