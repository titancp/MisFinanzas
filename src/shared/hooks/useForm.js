import { useState } from "react";

const useForm = (initialForm) => {
    const [form, setForm] = useState(initialForm);

    const handleChange = ({target}) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const handleReset = () => {
        setForm(initialForm);
    }

    return { form, setForm, handleChange, handleReset };
}

export default useForm;

