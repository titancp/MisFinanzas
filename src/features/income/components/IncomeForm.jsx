import { useEffect } from "react";

import { toast } from "sonner";

import useForm from "../../../shared/hooks/useForm";

import BaseButton from "../../../components/BaseButton";
import { BaseInput } from "../../../components/BaseInput";
import { BaseSelect } from '../../../components/BaseSelect';
import { CATEGORIAS_INGRESOS } from "../../../shared/utils/categorias";


const IncomeForm = ({ onAddIncome, editIncome, onCancelEdit, onUpdateIncome }) => {
    const DEFAULT_FORM = {
      id: '',
      fecha: new Date().toISOString().split('T')[0],
      categoria: '',
      descripcion: '',
      monto: ''
    };
    const { form, setForm, handleChange, handleReset } = useForm(DEFAULT_FORM);

    // Si hay un ingreso para editar, lo cargamos en el formulario
    useEffect(() => {
      if (editIncome) {
        setForm({
          id: editIncome.id,
          fecha: editIncome.fecha,
          categoria: editIncome.categoria,
          descripcion: editIncome.descripcion,
          monto: editIncome.monto,
        })
      }}, [editIncome]);

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


      if (editIncome) {
        const updatedIncome = {
          ...editIncome,
          fecha: form.fecha,
          categoria: form.categoria,
          descripcion: form.descripcion,
          monto: parseFloat(form.monto)
        };
        onUpdateIncome(updatedIncome);
      }
      else {
        const newIncome = {
          id: crypto.randomUUID(),
          fecha: form.fecha,
          categoria: form.categoria,
          descripcion: form.descripcion,
          monto: parseFloat(form.monto)
        };      
        onAddIncome(newIncome);
      }
      handleReset();
    }

    const handleCancel = () => {
      console.log("Edición cancelada");
    if (editIncome) {
      toast.info("Edición cancelada");
      onCancelEdit(null);
    }
      handleReset();
  };

    return (
    <main className="flex justify-center items-start p-8 min-h-dvh bg-white">
      <div className="bg-slate-100 p-10 rounded-xl shadow-md w-full max-w-xl flex flex-col gap-6">
        <h2 className="text-3xl text-center font-bold">Ingresos</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <BaseInput
            type="Date"
            label="Fecha"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />

          <BaseSelect
            label="Categoría"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            options={CATEGORIAS_INGRESOS}
          />

          <BaseInput
            type="text"
            label="Descripción"
            name="descripcion"
            maxLength="30"
            value={form.descripcion}
            onChange={handleChange}
          />
          <BaseInput
            type="Number"
            label="Monto"
            name="monto"
            value={form.monto}
            max={99000000}
            step="0.01"
            onChange={handleChange}
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

export default IncomeForm