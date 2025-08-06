import { useEffect } from "react";

import { toast } from "sonner";

import useForm from "../../../shared/hooks/useForm";

import BaseButton from "../../../components/BaseButton";
import { BaseInput } from "../../../components/BaseInput";
import { BaseSelect } from '../../../components/BaseSelect';
import { CATEGORIAS_EGRESOS } from "../../../shared/utils/categorias";


const ExpensesForm = ({ onAddExpenses, editExpenses, onCancelEdit, onUpdateExpenses }) => {
    const DEFAULT_FORM = {
      id: '',
      fecha: new Date().toISOString().split('T')[0],
      categoria: '',
      descripcion: '',
      monto: ''
    };
    const { form, setForm, handleChange, handleReset } = useForm(DEFAULT_FORM);

    // Si hay un egreso para editar, lo cargamos en el formulario
    useEffect(() => {
      if (editExpenses) {
        setForm({
          fecha: editExpenses.fecha,
          categoria: editExpenses.categoria,
          descripcion: editExpenses.descripcion,
          monto: editExpenses.monto,
        })
      }}, [editExpenses]);

    const handleSubmit = (event) => {
      event.preventDefault();

      if (!form.fecha || !form.categoria || !form.descripcion || !form.monto) {
        toast.error("Debes completar todos los campos");        
        return;
      }

      if (parseFloat(form.monto) <= 0) {
        toast.error("El monto debe ser mayor a cero");
        return;
      }

      if (editExpenses) {
        const updatedExpenses = {
          ...editExpenses,
          fecha: form.fecha,
          categoria: form.categoria,
          descripcion: form.descripcion,
          monto: parseFloat(form.monto)
        };
        onUpdateExpenses(updatedExpenses);
      }
      else {
        const newExpenses = {
          id: crypto.randomUUID(),
          fecha: form.fecha,
          categoria: form.categoria,
          descripcion: form.descripcion,
          monto: parseFloat(form.monto)
        };      
        onAddExpenses(newExpenses);
      }
      handleReset();
    }

    const handleCancel = () => {
      console.log("Edición cancelada");
    if (editExpenses) {
      toast.info("Edición cancelada");
      onCancelEdit(null);
    }
      handleReset();
  };

    return (
    <main className="flex justify-center items-start p-8 min-h-dvh bg-white">
      <div className="bg-slate-100 p-10 rounded-xl shadow-md w-full max-w-xl flex flex-col gap-6">
        <h2 className="text-3xl text-center font-bold">Egresos</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <BaseInput
            type="Date"
            label="Fecha"
            name="fecha"
            value={form.fecha}
            onChange={() => {handleChange(event)}}
          />

          <BaseSelect
            label="Categoría"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            options={CATEGORIAS_EGRESOS}
            // options={[
            //     { value: 'alquiler', label: 'Alquiler' },
            //     { value: 'comida', label: 'Comida' },
            //     { value: 'transporte', label: 'Transporte' },
            //     { value: 'educacion', label: 'Educación' },
            //     { value: 'salud', label: 'Salud' },
            //     { value: 'entretenimiento', label: 'Entretenimiento' },
            //     { value: 'otros', label: 'Otros' },
            // ]}            
            />

          <BaseInput
            type="text"
            label="Descripción"
            name="descripcion"
            maxLength="30"
            value={form.descripcion}
            onChange={() => {handleChange(event)}}
          />
          <BaseInput
            type="Number"
            label="Monto"
            name="monto"
            value={form.monto}
            max={99000000}
            step="0.01"
            onChange={() => {handleChange(event)}}
          />
          
          <BaseButton
            className="rounded-full px-5 py-4 font-semibold  w-full bg-blue-500 hover:bg-blue-800 text-white cursor-pointer duration-300"
            type="button"
            label="Cancelar"
            onClick={handleCancel}
          />
          <BaseButton
            className="rounded-full px-5 py-4 font-semibold  w-full bg-blue-500 hover:bg-blue-800 text-white cursor-pointer duration-300" 
            type="submit"
            label="Guardar"
            // onClick={() => {handleSubmit}}
          />          
        </form>        
        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
      </div>

    </main>
  )
}

export default ExpensesForm