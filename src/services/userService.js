import axios from "axios"

const url = "https://minibacksocialred.onrender.com/"

export const getOneUser = async (email, password) => {
    try {
        const {data} = await axios.get(`${url}users?email=${email}&password=${password}`)
        return data.length ? data[0] : null;
    } catch (error) {
        console.log(error);
        return null
    }
   
}

export const getUser = async (id) => {
  try {
      const {data} = await axios.get(`${url}users/${id}`)
      return data;
  } catch (error) {
      console.log(error);
      return null
  }
 
}

export const saveUser = async (user) => {
    try {
        const {data} = await axios.post(`${url}users`, {...user})
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
   
}

export const getPostsByFollowing = async (userId) => {
  try {
    // Obtener el usuario con el id dado
    const { data: user } = await axios.get(`${url}users/${userId}`);
    // Obtener el array de id de los usuarios que sigue
    const following = user.following;
    // Crear un array vacío para almacenar los posts
    let posts = [];
    // Recorrer el array de id de los usuarios que sigue
    for (let id of following) {
      // Obtener los posts del usuario con el id actual
      const { data: userPosts } = await axios.get(`${url}post?userId=${id}&_expand=user&_embed=comments`);
      // Añadir los posts al array de posts
      posts = [...posts, ...userPosts];
    }
    // Devolver el array de posts

    
    return posts;
  } catch (error) {
    // Mostrar el error por consola
    console.log(error);
    // Devolver null
    return null;
  }
};


export const modifyLikes = async (postId, userId) => {
    let added = null;
    try {
      // Obtener el post con el id dado desde el backend
      const { data: post } = await axios.get(`${url}post/${postId}`);
      // Obtener el array de likes del post
      const likes = post.likes;
      // Verificar si el id de la persona está en el array de likes
      const isLiked = likes.includes(userId);
      // Crear un nuevo array de likes según si está o no en el array original
      const newLikes = isLiked
        ? likes.filter((id) => id !== userId) // Si está, eliminarlo con filter
        : [...likes, userId]; // Si no está, agregarlo con spread

        added = !isLiked;
      // Actualizar el post con el nuevo array de likes en el backend
      const { data: updatedPost } = await axios.put(`${url}post/${postId}`, {
        ...post,
        likes: newLikes,
      });
      // Devolver el post actualizado
      return added;
    } catch (error) {
      // Mostrar el error por consola
      console.log(error);
      // Devolver null
      return null;
    }
  };

    // Definir la función que modifica la propiedad savedPosts del usuario
  
  export const modifySavedPosts = async (postId, userId) => {
    try {
      // Obtener el usuario con el id dado desde el backend
      const { data: user } = await axios.get(`${url}users/${userId}`);
      // Obtener el array de savedPosts del usuario
      const savedPosts = user.savedPosts;
      // Verificar si el id del post está en el array de savedPosts
      const isSaved = savedPosts.includes(postId);
      // Crear un nuevo array de savedPosts según si está o no en el array original
      const newSavedPosts = isSaved
        ? savedPosts.filter((id) => id !== postId) // Si está, eliminarlo con filter
        : [...savedPosts, postId]; // Si no está, agregarlo con spread
      // Actualizar el usuario con el nuevo array de savedPosts en el backend
      const { data: updatedUser } = await axios.put(`${url}users/${userId}`, {
        ...user,
        savedPosts: newSavedPosts,
      });
      // Devolver true si se agregó el post o false si se eliminó
      return !isSaved;
    } catch (error) {
      // Mostrar el error por consola
      console.log(error);
      // Devolver null
      return null;
    }
  };

  // Definir la función que retorna el objeto del usuario extendido
export const getUserExtended = async (userId) => {
    try {
      // Obtener el usuario con el id dado desde el backend, usando el parámetro _embed=post para obtener también todas sus publicaciones
      const { data: user } = await axios.get(`${url}users/${userId}?_embed=post`);
      // Crear una variable para almacenar el número de seguidores del usuario
      const totalFollowers = user.followers.length;
      // Crear una variable para almacenar el número de likes en general del usuario
      let totalLikes = 0;
      // Recorrer el array de publicaciones del usuario
      for (let post of user.post) {
        // Sumar los elementos del array de likes de cada publicación al total de likes
        totalLikes += post.likes.length;
      }
      // Crear una copia del objeto del usuario, y agregarle dos propiedades: totalFollowers y totalLikes
      const userExtended = {
        ...user,
        totalFollowers,
        totalLikes,
      };
      // Devolver el objeto del usuario extendido
      return userExtended;
    } catch (error) {
      // Mostrar el error por consola
      console.log(error);
      // Devolver null
      return null;
    }
  };

// Definir una función que modifica las propiedades followers y following de los usuarios en el backend
  export  const handleFollow = async (userId, friendId) => {
    try {
      // Obtener los usuarios con los id dados desde el backend
      const { data: user } = await axios.get(`${url}users/${userId}`);
      const { data: friend } = await axios.get(`${url}users/${friendId}`);
      // Verificar si el id del usuario del perfil está en el array de following del usuario ingresado
      const isFollowed = user.following.includes(friendId);
      // Crear nuevos arrays de followers y following según si está o no en el array original
      const newUserFollowing = isFollowed
        ? user.following.filter((id) => id !== friendId) // Si está, eliminarlo con filter
        : [...user.following, friendId]; // Si no está, agregarlo con spread
      const newFriendFollowers = isFollowed
        ? friend.followers.filter((id) => id !== userId) // Si está, eliminarlo con filter
        : [...friend.followers, userId]; // Si no está, agregarlo con spread
      // Actualizar los usuarios con los nuevos arrays de followers y following en el backend
      const { data: updatedUser } = await axios.put(`${url}users/${userId}`, {
        ...user,
        following: newUserFollowing,
      });
      const { data: updatedFriend } = await axios.put(
        `${url}users/${friendId}`,
        {
          ...friend,
          followers: newFriendFollowers,
        }
      );
      // Devolver true si se agregó el usuario del perfil a following o false si se eliminó
      return !isFollowed;
    } catch (error) {
      // Mostrar el error por consola
      console.log(error);
      // Devolver null
      return null;
    }
  };


  //Obtener detalles de post

  export const getPostDetail = async (idPost) => 
  {
    try {
      // Obtener el usuario con el id dado desde el backend, usando el parámetro _embed=post para obtener también todas sus publicaciones
      const { data: post } = await axios.get(`${url}post/${idPost}?_expand=user&_embed=comments`);
      
      return post;
    } catch (error) {
      // Mostrar el error por consola
      console.log(error);
      // Devolver null
      return null;
    }
  }


  // crea la función asíncrona que recibe los argumentos
  export const createComment = async ( content, userId, postId) => {

    // Crear un objeto Date con la fecha y hora actuales
    const fecha = new Date ();
    const hora = new Date ();
    // Especificar el idioma y las opciones de formato
    const opcionesHour = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const idioma = 'es-ES';

    // Convertir la fecha a una cadena con el formato deseado
    const cadena = fecha.toLocaleDateString (idioma, opciones);
    const cadenaHour = hora.toLocaleTimeString (idioma, opcionesHour);
  // usa un bloque try-catch para manejar los posibles errores
  try {
    // crea un objeto comment con los argumentos y las keys por defecto
    const comment = {

      content: content,
      userId: userId,
      postId: postId,
      type: 1,
      date: cadena,
      hour: cadenaHour // usa el método toISOString para obtener la fecha actual en formato ISO
    };
    // usa axios para hacer una petición POST a la url con el objeto comment como data
    const response = await axios.post(`${url}comments/`, comment);
    // si la petición es exitosa, retorna el objeto comment creado

    console.log('Se ha creado conÉXITO EL COMENTARIO. ', response.data);
    
    return response.data;
  } catch (error) {
    // si la petición falla, muestra un mensaje de error
    console.error(error);
    return null;
  }
};



// Crear una función que reciba los parámetros para crear un post


export const createPost = async (userId, description, content) => {
  // Crear un objeto post con los parámetros y los valores por defecto
  const post = {
    userId: userId,
    type: 1,
    description: description,
    content: content,
    date: new Date().toISOString(),
    likes: [],
    tags: [],
    shares: [],
    comments: [],
  };

  // Crear una variable booleana para indicar el resultado de la solicitud
  let success = false;

  try {
    // Enviar una solicitud POST al servidor con axios
    const response = await axios.post(`${url}post`, post);
    // Mostrar la respuesta del servidor en la consola
    console.log(response.data);
    // Asignar true a la variable success
    success = true;
  } catch (err) {
    // Mostrar el error en la consola
    console.error(err);
    // Asignar false a la variable success
    success = false;
  }

  // Retornar la variable success
  return success;
};


export const getUsers = async (id) => {
  try {
    // Enviar una solicitud GET al servidor con axios
    const response = await axios.get(`${url}users`);
    // Acceder al arreglo de usuarios de la respuesta
    const users = response.data;
    // Filtrar el arreglo de usuarios para excluir el usuario con el id que se le pasó por parámetro
    const filteredUsers = users.filter((user) => user.id !== id);
    // Retornar el arreglo filtrado
    return filteredUsers;
  } catch (err) {
    // Mostrar el error en la consola
    console.error(err);
  }
};
