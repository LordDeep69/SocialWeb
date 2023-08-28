import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { getOneUser } from '../../services/userService';
import Swal from 'sweetalert2';
import { AppContext } from '../../components/router/Router';
import { Link, useNavigate } from 'react-router-dom';
import { saveSession } from '../../services/sessionService';

const Login = () => {
    const navigate = useNavigate()

    const {user: {userDispatch}} = useContext(AppContext)

    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async(data) => {
        try {
            const user = await getOneUser(data.email, data.password)
            console.log(user);
            if (user) {
                Swal.fire('Bienvenide', `Bienvenido, ${user.name}.`, 'success').then(() => {
                userDispatch({
                    type: "login",
                    payload: {
                        isAutenticated: true,
                        user: user
                    }
                })
            saveSession(user);
            navigate('/');
            })
            }else {
                Swal.fire('Error', 'El usuario ingresado no existe.', 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <main className='d-flex justify-content-center align-items-center vw-100 vh-100'>
        <form className='card p-5 bg-info-subtle' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label  className="form-label"><span >Email</span>
            <input type="email" className="form-control mt-2"  placeholder="Escriba su correo" {...register('email', {required: true})}/>
            </label>
        </div>
        <div className="mb-3">
            <label  className="form-label"><span >Contraseña</span>
            <input type="password" className="form-control mt-2"  placeholder="Escriba su contraseña" {...register('password', {required: true})}/>
            </label>
        </div>
        <button type="submit" className='btn btn-success'>Registrarse</button>
        <span className='mt-3'>Si no tienes cuenta, <Link to="/register">registrate</Link></span>
        </form>
    </main>
  )
}

export default Login;