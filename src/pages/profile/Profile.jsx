import React, { useRef, useEffect, useContext, useState } from 'react'; // Importa React y los hooks useRef y useEffect
import './profil.scss'
import Header from '../../components/header/Header'
import { useForm } from 'react-hook-form'
import Photos from '../../components/photos/Photos'
import { AppContext } from '../../components/router/Router';
import { getUserExtended, handleFollow } from '../../services/userService';
import { useParams } from 'react-router-dom';


const Profile = () => {




    const {user: {userDispatch, userLogin: {user}}, posts, setPosts, friends, setFriends} = useContext(AppContext)

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    // Crea una referencia al elemento profile usando useRef()
    const profileRef = useRef(null) // Inicializa la referencia con null
    
    // Declara una variable para guardar si el usuario está haciendo clic o no
    let isDown = false
    
    // Declara una variable para guardar la posición inicial del cursor
    let startY = null
    
    // Declara una variable para guardar el desplazamiento inicial del contenedor
    let startScroll = null
    
    // Crea una función para manejar el evento de hacer clic sobre la sección
    const handleMouseDown = (e) => {
        // Cambia el valor de isDown a true
        isDown = true
        // Obtiene la posición actual del cursor en el eje Y
        startY = e.pageY
        // Obtiene el desplazamiento actual del contenedor en el eje Y
        startScroll = profileRef.current.scrollTop
        // Cambia el cursor a grabing
        
    }
    
    // Crea una función para manejar el evento de soltar el clic sobre la sección
    const handleMouseUp = (e) => {
        // Cambia el valor de isDown a false
        isDown = false
        // Cambia el cursor a grab
    }
    
    // Crea una función para manejar el evento de salir del área de la sección
    const handleMouseLeave = (e) => {
        // Cambia el valor de isDown a false
        isDown = false
        // Cambia el cursor a grab
    }
    
    // Crea una función para manejar el evento de mover el cursor sobre la sección
    const handleMouseMove = (e) => {
        // Si el usuario no está haciendo clic, sale de la función
        if (!isDown) return
        // Evita que se ejecute el comportamiento por defecto del navegador
        e.preventDefault()
        // Obtiene la posición actual del cursor en el eje Y
        const y = e.pageY
        // Calcula la distancia que se ha movido el cursor desde la posición inicial
        const walk = (y - startY)
        // Desplaza el contenedor según esa distancia
        profileRef.current.scrollTop = startScroll - walk
    }
    
    // Añade los eventos de mouse al elemento de la sección usando el hook useEffect
    useEffect(() => {
        // Añade los eventos cuando se monte el componente

        if (profileRef.current) 
        {
            profileRef.current.addEventListener('mousedown', handleMouseDown)
            profileRef.current.addEventListener('mouseup', handleMouseUp)
            profileRef.current.addEventListener('mouseleave', handleMouseLeave)
            profileRef.current.addEventListener('mousemove', handleMouseMove)
        }

    
        // Elimina los eventos cuando se desmonte el componente
        return () => {
            if (profileRef.current) {
                profileRef.current.removeEventListener("mousedown", handleMouseDown);
                profileRef.current.removeEventListener("mouseup", handleMouseUp);
                profileRef.current.removeEventListener("mouseleave", handleMouseLeave);
                profileRef.current.removeEventListener("mousemove", handleMouseMove);
              }
        }
    }, []);

    const {idProfile} = useParams();
    console.log(idProfile);
  // Crear un estado local para almacenar el objeto del perfil
  const [friend, setFriend] = useState({});

  const [numberFollowers, setNumberFollowers] = useState(null);
  // Crear un estado local para almacenar si el usuario ingresado sigue o no al usuario del perfil
  const [isFollowing, setIsFollowing] = useState(false);

  // Usar useEffect para ejecutar la función getUserExtended cuando se monta el componente
  useEffect(() => {
    // Definir una función asíncrona que llama a la función getUserExtended con el id del perfil
    const getFriend = async () => {
      // Obtener el objeto del perfil extendido usando la función getUserExtended
      const friendProfile = await getUserExtended(idProfile);
      // Guardar el resultado en el estado local friend usando la función setFriend
      setFriend(friendProfile);
      setNumberFollowers(friendProfile.totalFollowers);
    // Verificar si el id del usuario del perfil está en el array de following del usuario ingresado

    const isFollowed = user.following.includes(Number(idProfile));
    console.log(isFollowed);
    // Actualizar el estado local isFollowing con el resultado de la verificación
    console.log(`${isFollowed ? "Son Amigos." : "No son Amigos."}`);
    setIsFollowing(isFollowed);
  };
  // Llamar a la función asíncrona
  getFriend();
}, []);
    
    
    
  return (

    <div className='wrapper'>


        <main className='profile' ref={profileRef}>
            <section className='profileUp'>
    
                    <figure className='profileUp__cover'>
                            <img className='cover' src={friend.cover} alt="cover" />
                            <svg className='back' xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24" fill="none"><path d="M10.0062 23.9999C9.7501 24.0008 9.49708 23.9442 9.2657 23.8345C9.03433 23.7247 8.83049 23.5645 8.66916 23.3657L0.389943 13.0809C0.137826 12.7742 0 12.3895 0 11.9924C0 11.5954 0.137826 11.2107 0.389943 10.904L8.96056 0.619231C9.25152 0.269179 9.66961 0.0490432 10.1229 0.00725332C10.5761 -0.0345366 11.0274 0.105442 11.3775 0.396395C11.7275 0.687348 11.9477 1.10544 11.9895 1.5587C12.0312 2.01196 11.8913 2.46326 11.6003 2.81331L3.93818 12.001L11.3432 21.1887C11.5528 21.4403 11.686 21.7467 11.7269 22.0716C11.7678 22.3965 11.7148 22.7264 11.5742 23.0221C11.4335 23.3178 11.2111 23.5671 10.9332 23.7404C10.6553 23.9137 10.3336 24.0037 10.0062 23.9999Z" fill="#2F2F2F"/></svg>
    
                            <svg className='points' xmlns="http://www.w3.org/2000/svg" width="25" height="5" viewBox="0 0 25 5" fill="none"><path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" fill="#2F2F2F"/><path d="M12.5 5C13.8807 5 15 3.88071 15 2.5C15 1.11929 13.8807 0 12.5 0C11.1193 0 10 1.11929 10 2.5C10 3.88071 11.1193 5 12.5 5Z" fill="#2F2F2F"/><path d="M22.5 5C23.8807 5 25 3.88071 25 2.5C25 1.11929 23.8807 0 22.5 0C21.1193 0 20 1.11929 20 2.5C20 3.88071 21.1193 5 22.5 5Z" fill="#2F2F2F"/></svg>
                    </figure>
    
                    <div className='profileUp__data'>
    
                            <div className='dataUp'>
                                <span className='dataUp__numbers'>
                                    <b>{numberFollowers}</b>
                                    <span>Followers</span>
                                </span>
    
                                <span className='story__friend'>
    
                                    <figure className='contentFriend'>
    
                                            <img className='contentFriend__img' src={friend.image} alt="picture" />
                                        
    
                                    </figure>
    
    
                                </span>
    
                                <span className='dataUp__numbers'>
                                    <b>{friend.totalLikes}</b>
                                    <span>Likes</span>
                                </span>
                            </div>
    
                            <div className='dataDown'>
    
                            <b>{friend.name}</b>
                            <span>{friend.greet}</span>
                            <span>{friend.description}</span>
    
                            </div>
    
                            <div className='actionsProfile'>
    
                            
                            {isFollowing ? (
                            <b onClick={() => handleFollow(user.id, friend.id)
                                // Usar then para obtener el resultado de la función handleFollow
                                .then((result) => {
                                // Usar setIsFollowing para actualizar el estado local con el resultado
                                setIsFollowing(result);
                                setNumberFollowers(numberFollowers-1);
                                user.following = user.following.filter((element) => element !== friend.id);
                                })
                            }>
                                <span>Unfollow</span>
                            </b>
                            ) : (
                            <b onClick={() => handleFollow(user.id, friend.id)
                                // Usar then para obtener el resultado de la función handleFollow
                                .then((result) => {
                                // Usar setIsFollowing para actualizar el estado local con el resultado
                                setIsFollowing(result);
                                setNumberFollowers(numberFollowers+1);
                                user.following.push(friend.id);
    
                                })
                            }>
                                <span>Follow</span>
                            </b>
                            )}
    
                                <b>
                                    <span className='mesagge'>Messages</span>
                                </b>
    
                            </div>
    
                    </div>
    
            </section>
    
            <section    className='profileDown'>
                <span className='profileDown__type'>
                    <span>Photos</span>
                    <span>Videos</span>
                    <span>Album</span>
                    <span>Tag</span>
    
                </span>
    
                <span className='profileDown__content'>
                    
                {friend.post &&
                friend.post.map((post) => (
                  <Photos key={post.id} image={post.content} id={post.id} />
                ))}
    
                </span>
            </section>
        </main>
      
    </div>
  )
}

export default Profile;