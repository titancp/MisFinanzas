import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { toast } from 'sonner'

import ExpensesForm from '../components/ExpensesForm';
import ExpensesList from '../components/ExpensesList';

const ExpensesPage = () => {
  const [egresos, setEgresos] = useState([])
  const [editExpenses, setEditExpenses] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('egresos') || '[]')
    setEgresos(data)
  }, [])

  useEffect(() => {
  if (editExpenses) {
    console.log('editExpenses actualizado:', editExpenses);
  }
}, [editExpenses]);

  const handleAddExpenses = (nuevoEgreso) => {
    const nuevosEgresos = [...egresos, nuevoEgreso];
    
    setEgresos(nuevosEgresos);
    localStorage.setItem('egresos', JSON.stringify(nuevosEgresos));

    toast.success('Egreso agregado correctamente');
  
  };

  const handleDeleteExpenses = (id) => {
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
        const nuevosEgresos = egresos.filter(egreso => egreso.id !== id)

        setEgresos(nuevosEgresos)
        localStorage.setItem('egresos', JSON.stringify(nuevosEgresos))

        toast.success('Egreso eliminado correctamente');
      }
    });
  }

  const handleEditExpenses = (id) => {
    const expenses = egresos.find(egreso => egreso.id === id);
    setEditExpenses(expenses)
  }

  const handleUpdateExpenses = (updatedExpenses) => {
    const updatedEgresos = egresos.map(egreso => {
      if (egreso.id === updatedExpenses.id) {
        return updatedExpenses;
      }
      return egreso;
    });

    setEgresos(updatedEgresos);
    localStorage.setItem('egresos', JSON.stringify(updatedEgresos));
    setEditExpenses(null); 
    toast.success('Egreso actualizado correctamente');
  }


  return (
    <main className="min-h-dvh w-full flex px-12 py-8">
  <div className="flex w-full max-w-6xl gap-10">
    {/* Lista a la izquierda */}
    <div className="flex-1">
      <ExpensesList egresos={egresos} onDeleteExpenses={handleDeleteExpenses} onEditExpenses={handleEditExpenses} />
    </div>

    {/* Formulario a la derecha */}
    <div className="flex-1">
      <ExpensesForm onAddExpenses={handleAddExpenses} editExpenses={editExpenses} onUpdateExpenses={handleUpdateExpenses} 
      onCancelEdit={setEditExpenses}/>
    </div>
  </div>
</main>
  )
}

export default ExpensesPage

