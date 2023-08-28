import React, { useState, useEffect } from 'react'; // Importar useEffect
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../components/router/Router';
import axios from 'axios'; // Importar axios
import { createPost } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import ('./newPost.scss')
const NewPost = () => {
    const { user: { userLogin: { user } } } = useContext(AppContext);
    const { register, handleSubmit } = useForm(); // Crear una instancia de useForm
    const navigate = useNavigate();
    const handleHome = () => {
      navigate('/');
    };
    // Función para manejar el envío del formulario
    // Función para manejar el envío del formulario
const onSubmit = async (data) => {
    console.log(data); // Mostrar los datos del formulario en la consola
    // Aquí puedes hacer lo que quieras con los datos, como enviarlos a una API o guardarlos en un estado
  
    try {
      // Crear una variable local para guardar la URL segura de la imagen
      let imageUrl = null;
      // Ejecutar la función que carga la imagen a Cloudinary y asignar el valor que retorna a la variable imageUrl
      imageUrl = await handleImageUpload();
      // Verificar si se ha obtenido una URL segura de la imagen
      if (imageUrl) {
        // Ejecutar la función que crea el post y guardar el resultado en una variable
        let success = await createPost(user.id, data.description, imageUrl); // Pasar la variable imageUrl como argumento
        // Verificar si se ha creado el post correctamente
        if (success) {
          // Imprimir en consola el mensaje y los datos del post
          // Crear un sweetalert2 con el título ¡Post Creado con Éxito! y el icono de éxito
        Swal.fire({
            title: '¡Post Creado con Éxito!',
            icon: 'success',
            timer: 1500, // Opcionalmente, puedes poner un tiempo de espera para que se cierre automáticamente
          }).then(() => {
            // Ejecutar una función cuando se cierre el sweetalert2
            console.log('FINALIZADO'); // Imprimir en consola FINALIZADO
          });
        }
         else {
          console.log('POST FALLIDO');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  
    const [selectedImage, setSelectedImage] = useState(null); // Estado para guardar la imagen seleccionada
    const [image, setImage] = useState(null); // Estado para guardar la URL de la imagen subida
    const [loading, setLoading] = useState(false); // Estado para mostrar el estado de carga
    const [localImage, setLocalImage] = useState(null); // Estado para guardar la URL local de la imagen seleccionada
  
    // Función para manejar el cambio del input de tipo file
    const handleImageChange = (e) => {
      setSelectedImage(e.target.files[0]); // Actualizar el estado con el archivo seleccionado
    };
  
    // Función para manejar la carga de la imagen
    const handleImageUpload = async () => {
      const data = new FormData(); // Crear un objeto FormData
      data.append('file', selectedImage); // Añadir el archivo seleccionado al FormData
      data.append('upload_preset', 'WorkShop5'); // Añadir el preset de carga al FormData
      setLoading(true); // Actualizar el estado de carga a true
  
      try {
        // Crear una variable con la URL base de la API de Cloudinary
        const url = `https://api.cloudinary.com/v1_1/dibw7aluj/image/upload`;
        // Enviar una solicitud POST usando axios
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const file = response.data; // Acceder al objeto data de la respuesta
        console.log(file.secure_url);
        setImage(file.secure_url); // Actualizar el estado con la URL segura de la imagen
        setLoading(false); // Actualizar el estado de carga a false
        return file.secure_url;
      } catch (err) {
        console.error(err);
      }
    };
  
    // Usar useEffect para ejecutar una función cuando cambie el estado de la imagen seleccionada
    useEffect(() => {
      if (selectedImage) {
        // Crear una URL local que represente al archivo seleccionado
        const localImageUrl = URL.createObjectURL(selectedImage);
        // Actualizar el estado con la URL local
        setLocalImage(localImageUrl);
        // Liberar la URL local cuando se desmonte el componente
        return () => {
          URL.revokeObjectURL(localImageUrl);
        };
      }
    }, [selectedImage]);

  return (
    <div className="container">
      <h1 className="title">Nuevo Post</h1> {/* Título del formulario */}
        <span className='story__friend newPost'>

        <figure className='contentFriend'>

            <img className='contentFriend__img' src={user.image} alt="picture" />
            

        </figure>
        <span className='userName'>{user.name}</span>



        </span>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Input para ingresar la descripción del nuevo post */}
        <div className="form-group">
          <label htmlFor="description" className="label">
            Ingresar la descripción del nuevo Post
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="input"
            {...register('description', { required: true })}
          />
        </div>
        {/* Input para ingresar una imagen */}
        <div className="form-group">
          <label htmlFor="image" className="label">
            Ingresar una imagen
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="input"
            {...register('image', { required: true })}
            onChange={handleImageChange} // Añadir el evento onChange al input
          />
          {/* Elemento img para mostrar la imagen seleccionada */}
          {localImage && (
            <img src={localImage} alt="Imagen seleccionada" className="preview" />
          )}
        </div>
        {/* Botón para subir el post */}
        <button type="submit" className="button">
          Subir Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
