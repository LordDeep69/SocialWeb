import React from 'react'
import "./register.scss"
import { useForm } from 'react-hook-form'
import { saveUser } from '../../services/userService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const onSubmit = async (data) => {
        const response = await saveUser(data)
        console.log(response);
        if (response) {
            Swal.fire('Usuario registrado', `El usuario fue registrado con exito`, 'success')
            navigate('/login')
        }else {
            Swal.fire('Error', `Hubo un problema al registrar el usuario`, 'error')
            reset({
                name: '',
                email: '',
                password: '',
                gender: ''
            })
        }
        
    }

  return (
    <main className='d-flex justify-content-center align-items-center vw-100 vh-100'>
        <form className='card p-5 bg-info-subtle' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label  className="form-label"><span >Nombre</span>
            <input type="text" className="form-control mt-2"  placeholder="Escriba su nombre" {...register('name', {required: true})}/>
            </label>
        </div>
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
        <div className="mb-3">
            <label  className="form-label"><span  >Genero</span>
            <select className="form-select" aria-label="Default select example" {...register('gender', {required: true})}>
            <option value="">Selecciona una opcion</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="NA">Prefiero no decir</option>
        </select>
            </label>
        </div>
        <button type="submit" className='btn btn-success'>Registrarse</button>
        </form>
    </main>
  )
}

export default Register