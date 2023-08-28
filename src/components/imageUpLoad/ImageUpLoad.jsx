import React, { useState } from 'react';
import axios from 'axios'; // Importar axios

const ImageUpLoad = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Estado para guardar la imagen seleccionada
  const [image, setImage] = useState(null); // Estado para guardar la URL de la imagen subida
  const [loading, setLoading] = useState(false); // Estado para mostrar el estado de carga

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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} /> {/* Input para seleccionar la imagen */}
      <button onClick={handleImageUpload}>Subir Imagen</button> {/* Botón para subir la imagen */}

      {loading ? (
        <h3>Image Loading...</h3>
      ) : (
        <img src={image} style={{ width: '300px' }} />
      )}
    </div>
  );
};

export default ImageUpLoad;









// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUpLoad = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleUpLoadImage =async (e) =>
//   {
//         const files = e.target.files;
//         const data = new FormData();
//         data.append("file", files[0]);
//         data.append("upload_preset", "WorkShop5");
//         setLoading(true);

//         const rest = await fetch (

//             "https://api.cloudinary.com/v1_1/dibw7aluj/image/upload", 
//             {
//                 method: "POST",
//                 body: data,
//             }
            
//         )

//         const file = await rest.json();
//         console.log(rest);
//         setImage(file.secure_url);
//         setLoading(false);
//   }



//   return (
//     <div>
//       <input   name='file' placeholder='Subir Imagen.' type="file" onChange={handleUpLoadImage} />
//       {/* <button onClick={handleImageUpload}>Subir Imagen</button> */}

//       {loading ? (<h3>Image Loading...</h3>): <img src={image} style={{width: "300px"}}/> }
//     </div>
//   );
// };

// export default ImageUpLoad;