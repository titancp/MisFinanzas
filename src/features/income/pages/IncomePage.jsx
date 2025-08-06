import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { toast } from 'sonner'

import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';

const IncomePage = () => {
  const [ingresos, setIngresos] = useState([])
  const [editIncome, setEditIncome] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ingresos') || '[]')
    setIngresos(data)
  }, [])

  useEffect(() => {
  if (editIncome) {
    console.log('editIncome actualizado:', editIncome);
  }
}, [editIncome]);

  const handleAddIncome = (nuevoIngreso) => {
    const nuevosIngresos = [...ingresos, nuevoIngreso];
    
    setIngresos(nuevosIngresos);
    localStorage.setItem('ingresos', JSON.stringify(nuevosIngresos));

    toast.success('Ingreso agregado correctamente');
  
  };

  const handleDeleteIncome = (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosIngresos = ingresos.filter(ingreso => ingreso.id !== id)

        setIngresos(nuevosIngresos)
        localStorage.setItem('ingresos', JSON.stringify(nuevosIngresos))

        toast.success('Ingreso eliminado correctamente');
      }
    });
  }

  const handleEditIncome = (id) => {
    const income = ingresos.find(ingreso => ingreso.id === id);
    setEditIncome(income)
  }

  const handleUpdateIncome = (updatedIncome) => {
    const updatedIngresos = ingresos.map(ingreso => {
      if (ingreso.id === updatedIncome.id) {
        return updatedIncome;
      }
      return ingreso;
    });

    setIngresos(updatedIngresos);
    localStorage.setItem('ingresos', JSON.stringify(updatedIngresos));
    setEditIncome(null); 
    toast.success('Ingreso actualizado correctamente');
  }

  //h-dvh 
  //"flex items-center justify-center px-8">

  return (
    <main className="min-h-dvh w-full flex px-12 py-8">
      <div className="flex w-full max-w-6xl gap-10">
        {/* Lista a la izquierda */}
        <div className="flex-1">
          <IncomeList ingresos={ingresos} onDeleteIncome={handleDeleteIncome} onEditIncome={handleEditIncome} />
        </div>

        {/* Formulario a la derecha */}
        <div className="flex-1">
          <IncomeForm onAddIncome={handleAddIncome} editIncome={editIncome} onUpdateIncome={handleUpdateIncome} 
          onCancelEdit={setEditIncome}/>
        </div>
      </div>
    </main>
  )
}

export default IncomePage

