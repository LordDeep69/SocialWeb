import React, { useRef, useEffect, useContext, useState } from 'react'; // Importa React y los hooks useRef y useEffect
import './home.scss';
import { useNavigate } from 'react-router-dom';
import Story from '../../components/story/Story';
import StoryFrined from '../../components/storyFrined/StoryFrined';
import Post from '../../components/post/Post';
import { AppContext } from '../../components/router/Router';
import Swal from 'sweetalert2';
import { getPostsByFollowing, getUsers } from '../../services/userService';
import Footer from '../../components/footer/Footer';

const Home = () => {




  const {user: {userDispatch, userLogin: {user}}, posts, setPosts, friends, setFriends} = useContext(AppContext)
    
     // Usar useEffect para ejecutar la función que obtiene los posts cuando se monta el componente
  useEffect(() => {
    // Definir una función asíncrona que obtiene los posts
    const getPosts = async () => {

      const postsByFollowing = await getPostsByFollowing(user.id);
      for (var i = postsByFollowing.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // Un índice aleatorio entre 0 e i
        var temp = postsByFollowing[i]; // Guardamos el elemento i en una variable temporal
        postsByFollowing[i] = postsByFollowing[j]; // Asignamos el elemento j al índice i
        postsByFollowing[j] = temp; // Asignamos el elemento temporal al índice j
      }
      
      // Actualizar el estado local con el array de posts
      setPosts(postsByFollowing);
      
      const allUsers = await getUsers(user.id);
      setFriends(allUsers);


    };
    // Llamar a la función asíncrona
    getPosts();
  }, []);




  console.log(user);
  const handleExit = () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres salir?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Has salido.');
        userDispatch({
          type: "logout",
      });

      sessionStorage.clear();
      }
    });
  };

  const handleClickOut = () => 
  {
    Swal.fire('Bienvenido', `Bienvenido, ${user.name}.`, 'success').then(() => {
      userDispatch({
          type: "logout",
      })
  saveSession(user)
  navigate('/')
  })
  }

  const navigate = useNavigate();
  const handleNavigate = () => {

    navigate('/profile');
    console.log('NAVEGAS A PROFILE.')
  }

  // Crea una referencia al elemento de la sección con la clase story
  const storyRef = useRef(null);

  // Declara una variable para guardar si el usuario está haciendo clic o no
  let isDown = false;

  // Declara una variable para guardar la posición inicial del cursor
  let startX;

  // Declara una variable para guardar el desplazamiento inicial del contenedor
  let scrollLeft;

  // Crea una función para manejar el evento de hacer clic sobre la sección
  const handleMouseDown = (e) => {
    // Cambia el valor de isDown a true
    isDown = true;

    // Obtiene la posición actual del cursor en el eje X
    startX = e.pageX - storyRef.current.offsetLeft;

    // Obtiene el desplazamiento actual del contenedor en el eje X
    scrollLeft = storyRef.current.scrollLeft;
  }

  // Crea una función para manejar el evento de soltar el clic sobre la sección
  const handleMouseUp = () => {
    // Cambia el valor de isDown a false
    isDown = false;
  }

  // Crea una función para manejar el evento de salir del área de la sección
  const handleMouseLeave = () => {
    // Cambia el valor de isDown a false
    isDown = false;
  }

  // Crea una función para manejar el evento de mover el cursor sobre la sección
  const handleMouseMove = (e) => {
    // Si el usuario no está haciendo clic, sale de la función
    if (!isDown) return;

    // Evita que se ejecute el comportamiento por defecto del navegador
    e.preventDefault();

    // Obtiene la posición actual del cursor en el eje X
    const x = e.pageX - storyRef.current.offsetLeft;

    // Calcula la distancia que se ha movido el cursor desde la posición inicial
    const walk = (x - startX);

    // Desplaza el contenedor según esa distancia
    storyRef.current.scrollBy(-walk,0);
  }



// Se añaden los eventos de mouse al elemento de la sección con la clase home__main usando el hook useEffect
// Se usa el hook useEffect para añadir los eventos de mouse al elemento de la sección cuando se monte el componente, y eliminarlos cuando se desmonte
useEffect(() => {
  storyRef.current.addEventListener('mousedown', handleMouseDown);
  storyRef.current.addEventListener('mouseup', handleMouseUp);
  storyRef.current.addEventListener('mouseleave', handleMouseLeave);
  storyRef.current.addEventListener('mousemove', handleMouseMove);

  return () => {
    // Añade el operador opcional ?. antes de acceder a la propiedad removeEventListener
    storyRef.current?.removeEventListener('mousedown', handleMouseDown);
    storyRef.current?.removeEventListener('mouseup', handleMouseUp);
    storyRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    storyRef.current?.removeEventListener('mousemove', handleMouseMove);
  }
}, []);






  return (
    
    <div className='wrapper'>


    <section className='home'>


      <header className='container__header'>

        <section className='header'>

          <figure className='header__figure'>
            <img className='home__img' src="https://s3-alpha-sig.figma.com/img/2f0e/031a/b9b7a60f11dc3db3ae6f8d00926947c3?Expires=1693785600&Signature=a9hYckaHlD7AZO5A8krU0CzsF10sQ4GQgPW-vzxyVZdz2vFA2UY366YhKso-PckyY~MqF5sghozppqBMc5zKZdapTWbd4chz4eyTJC7dBrpuk5dD6gZrRVJpiDQMpOWdHApqbgZaC~HQ5jFsfmE9n-N2YOnWBetIbM3~o~oSXdbxkVml74mv6GZp9T-rE1bPUjblWXjWsuTMihZGJfxScgVhCcJDG6KrVRAxt3NRL0UMoIhvxj3IaQv3tyXTDqe6oDe2lTwIuNSUUOw96jVq3eCWKFJYwgSBbHcaAbpeyIifukg1Sms8JNQ5g6VnqdXo7ov5Titpkpwxp-iOynPoPA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="logo" />
          </figure>

          <div className='header__icon'>
            <span style={{fill: "red"}} className="material-symbols-outlined like" >favorite </span>
            <svg className='comments' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.8836 16.8565L9.6516 16.7243C9.8004 16.6979 9.978 16.6594 10.1832 16.6065C12.72 15.9696 14.4 14.0707 14.4 12.0181C14.4 9.4522 11.7888 7.21083
             8.4 7.21083C5.0112 7.21083 2.4 9.4522 2.4 12.0181C2.4 13.4819 3.2424 14.8759 4.7172 15.8037L4.7604 15.8278L6 16.5128V19.8334L8.8836 16.8565ZM10.062 19.0919L5.6616 23.6347C5.4953 23.8065 5.28158 23.9247 5.04781 23.9741C4.81404 24.0235 4.57086 24.0019 4.34942 23.9121C4.12799 23.8222 3.93837 23.6682 3.80485 23.4698C3.67134 23.2714 3.60001 23.0375 3.6 22.7982V17.9309C3.54639 17.9019 3.49357 17.8715 3.4416 17.8396C1.3548 16.5272 0 14.4084 0 12.0181C0 8.03527 3.7608 4.80722 8.4 4.80722C13.0392 4.80722 16.8 8.03527 16.8 12.0181C16.8 15.2942 14.2548 18.0607 10.7688 18.938C10.5352 18.998 10.2994 19.0493 10.062 19.0919ZM8.3232 3.60542C9.7752 1.45058 12.492 0 15.6 0C20.2392 0 24 3.22805 24 7.21083C24 9.60122 22.644 11.72 20.5584 13.0324C20.5064 13.0642 20.4536 13.0947 20.4 13.1237V17.991C20.4 18.2303 20.3287 18.4641 20.1951 18.6626C20.0616 18.861 19.872 19.015 19.6506 19.1048C19.4291 19.1947 19.186 19.2163 18.9522 19.1669C18.7184 19.1175 18.5047 18.9993 18.3384 18.8275L16.2564 16.6787L17.508 14.5178L18 15.0262V11.7056L19.2396 11.0206L19.2828 10.9965C20.7588 10.0687 21.6 8.67463 21.6 7.21083C21.6 4.64498 18.9888 2.40361 15.6 2.40361C14.064 2.40361 12.6888 2.8639 11.6436 3.60542H8.3232Z" fill="#2F2F2F"/></svg>
            <button className='logout' onClick={handleExit}>SALIR</button>
          </div>

        </section>

        {/* Añade la referencia al elemento de la sección con la clase story */}
        <section className='story' ref={storyRef}>
        <Story image={user.image} name={user.name} />
        {friends.map((friend) => (
          <StoryFrined key={friend.id} name={friend.name} image={friend.image} id = {friend.id}/>
        ))}
        </section>

      </header>

      <main className='home__main'>

        {/* Recorrer el array de posts y renderizar un componente Post por cada post */}
      { posts.map((post) => (
        <Post
          key={post.id}
          idPost = {post.id}
          name={post.user.name} // Pasar el nombre del amigo como prop usando post.user.name
          image={post.user.image} // Pasar la imagen del amigo como prop usando post.user.image
          description={post.description}
          userId={post.userId}
          type={post.type}
          content={post.content}
          date={post.date}
          likes={post.likes}
          tags={post.tags.length}
          shares={post.shares.length}
          comments={post.comments.length}
        />
      ))}



      </main>

      <Footer/>

    </section>
    </div>


  )
}

export default Home;
