import React from 'react'
import Header from '../../components/header/Header'

const Profile = () => {
  return (
    <div>
        <Header/>
        <h1>Cambiar el perfil</h1>
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
    </div>
  )
}

export default Profile