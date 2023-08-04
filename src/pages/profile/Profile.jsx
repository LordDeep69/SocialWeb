import React from 'react'
import Header from '../../components/header/Header'
import { useForm } from 'react-hook-form'

const Profile = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

  return (
    <div>
        <main className='d-flex flex-column align-items-center mt-5'>
        <h1>Cambiar el perfil</h1>
        <form className='card p-5 bg-info-subtle mt-3' onSubmit={handleSubmit()}>
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
    </div>
  )
}

export default Profile