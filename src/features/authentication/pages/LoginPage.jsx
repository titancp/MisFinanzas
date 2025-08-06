import BaseButton from "../../../components/BaseButton";
import { BaseInput } from "../../../components/BaseInput";
import useForm from "../../../shared/hooks/useForm";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

import { useNavigate } from 'react-router'
import Swal from 'sweetalert2';
import { toast } from 'sonner'

export default function LoginPage() {
    const { form, handleChange, handleReset } = useForm({});

    const navigate = useNavigate()
    const { setAuth } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {username, password} = form;

        const response = await login(username, password)
        if (response.success) {
            setAuth (response.data);
            toast.success(`👋 ¡Bienvenido, ${response.data.nombre || username}!`)
            navigate('/dashboard'); //Redirigir al usuario a la página principal o dashboard
        }
        else {
            console.error("Login failed:", response.data);
            Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Usuario o contraseña incorrectos',
      confirmButtonText: 'Intentar de nuevo'
    }).then(() => {
      //foco en campo username
      form.password.current?.focus();
    });
        }

        handleReset();
    }

  return (
    <main className="w-[500px] m-auto flex flex-col gap-5 justify-center items-center">
        <div className="bg-slate-200 p-8 rounded-lg flex flex-col gap-6 ">
            <h2 className="text-3xl text-center font-bold">Login</h2>
            <p className="font-light text-center">Ingrese nombre de usuario y password</p>
            <form onSubmit={handleSubmit}>
                <BaseInput
                    type="text"
                    label="Usuario"
                    name="username"
                    value={form.username || ''}
                    onChange={handleChange}
                />  
                <BaseInput
                    type="password"
                    label="Contraseña"
                    name="password"
                    value={form.password || ''}
                    onChange={handleChange}
                />
                <BaseButton 
                    type="submit"
                    label="Ingresar"
                    className="rounded-full px-5 py-4 font-semibold  w-full bg-blue-500 hover:bg-blue-800 text-white cursor-pointer duration-300"
                />
            </form>
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        </div>
    </main>

  )
}











