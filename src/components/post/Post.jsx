import React, { useContext, useState } from 'react'
import './post.scss'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../router/Router';
import { modifyLikes, modifySavedPosts } from '../../services/userService';
const Post = ({name, idPost, image, description, userId, type, content, date, likes, tags, shares, comments}) => 
{
    const {user: {userDispatch, userLogin: {user}}, posts, setPosts, friends, setFriends} = useContext(AppContext)
    const {like} = useContext(AppContext);
    const navigate = useNavigate();

    const likedPost = likes.includes(user.id);
    const valueSaved  = user.savedPosts.includes(idPost);

    const [savedPost, setSavedPost] = useState(valueSaved);

    

    const handleClickPost = () =>
    {
        navigate(`/post/${idPost}`);
    }

    const handleNavigateProfile = ( ) => 
    {
      navigate(`/profile/${userId}`)
    }

    const handleLike = () => {

        console.log('Usuario: ', user.name , ' Dió Click a: ' + description, '.' )
        // Llamar a la función modifyLikes con los parámetros postId y userId
        modifyLikes(idPost, user.id)
          .then((result) => {
            // Obtener el resultado de la función modifyLikes, que será true si se agregó el like o false si se eliminó
            const isAdded = result;
            // Buscar el post con el id dado en el array de posts del estado global
            const post = posts.find((post) => post.id === idPost);
            // Crear una copia del post encontrado y modificar la propiedad likes según si se agregó o eliminó el like
            const updatedPost = isAdded
              ? { ...post, likes: [...post.likes, user.id] } // Si se agregó, usar spread para añadir el id del usuario al final
              : { ...post, likes: post.likes.filter((id) => id !== user.id) }; // Si se eliminó, usar filter para quitar el id del usuario
            // Crear un nuevo array de posts con el post modificado y el resto igual usando map
            const updatedPosts = posts.map((post) =>
              post.id === idPost ? updatedPost : post
            );
            // Actualizar el estado global con el nuevo array de posts
            setPosts(updatedPosts);
          })
          .catch((error) => {
            // Mostrar el error por consola
            console.log(error);
          });
      };

      const handleSaved = async () => 
      {
        const saved = await modifySavedPosts (idPost, user.id);

        if(saved)
        {
            user.savedPosts.push(idPost);
            console.log('Has Guardado el pots, queda así tu array: ', user.savedPosts);
            setSavedPost(!savedPost);
            
        }
        else 
        {
            user.savedPosts = user.savedPosts.filter(postSaved => {return postSaved !=idPost});

            console.log('Has Eliminado el pots, queda así tu array: ', user.savedPosts);
            setSavedPost(!savedPost);
        }

      }
  return (

                <article  className='post'>
                    <section className='post__user'>
                        <span className='story__friend'>

                                <figure className='contentFriend'>

                                    <img onClick={handleNavigateProfile} className='contentFriend__img' src={image} alt="picture" />
                                    

                                </figure>
                                <span className='userName'>{name}</span>



                        </span>
                    </section>

                    <figure className='post__content'>
                        <img onClick={handleClickPost} src={content} alt="MOB" />
                    </figure>

                    <section className='post__actions'>

                        <div className='lcs'>
                        <span className='favorite'>
                          <svg className='liked' onClick={handleLike} xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26"  fill={likedPost ? "red": "#FFF"}><path d="M2.65002 13.2665C-0.283353 9.35532 0.69444 3.48856 5.5834 1.53298C10.4724 -0.422605 13.4057 3.48856 14.3835 5.44415C15.3613 3.48856 19.2725 -0.422605 24.1615 1.53298C29.0504 3.48856 29.0504 9.35532 26.117 13.2665C23.1837 17.1777 14.3835 25 14.3835 25C14.3835 25 5.5834 17.1777 2.65002 13.2665Z" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          <span className='numberLike'>{likes.length}</span>
                        </span>
                                {/* <span style={{fill: "red"} } onClick={handleLike} className={`material-symbols-outlined like`} >favorite  </span> */}
                                <figure className='commentPost'>
                                    <img onClick={handleClickPost} className='commentPostIcom' src="https://res.cloudinary.com/dibw7aluj/image/upload/v1692762950/Vector_2_fk98jm.svg" alt="comment" />
                                    <span onClick={handleClickPost}  className='numberComments'>{comments}</span>
                                </figure>

                                <figure className='sharePost'>
                                    <img src="https://res.cloudinary.com/dibw7aluj/image/upload/v1692763063/Vector_3_qmtojf.svg" alt="share" />
                                    <span className='numberShare'>{shares}</span>
                                </figure>
                        </div>

                        <span onClick={handleSaved} className='saved'><svg stroke="black" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="#FFF">
                        <path d="M2.00798e-07 2.99993V23.2495C-9.50885e-05 23.3797 0.033726 23.5077 0.0981346 23.6209C0.162543 23.7341 0.255319 23.8286 0.367329 23.895C0.479339 23.9615 0.606723 23.9976 0.736941 23.9999C0.867158 24.0021 0.995722 23.9705 1.10997 23.908L8.99979 19.6031L16.8896 23.908C17.0039 23.9705 17.1324 24.0021 17.2626 23.9999C17.3929 23.9976 17.5203 23.9615 17.6323 23.895C17.7443 23.8286 17.837 23.7341 17.9015 23.6209C17.9659 23.5077 17.9997 23.3797 17.9996 23.2495V2.99993C17.9996 2.2043 17.6835 1.44126 17.1209 0.87866C16.5583 0.316063 15.7953 0 14.9997 0L2.99993 0C2.2043 0 1.44126 0.316063 0.87866 0.87866C0.316063 1.44126 2.00798e-07 2.2043 2.00798e-07 2.99993Z" fill={savedPost ? " rgb(246, 198, 53)":"#FFF" }/>
                        <defs>
                        <linearGradient id="paint0_linear_42_420" x1="8.99979" y1="0" x2="8.99979" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF7674"/>
                        <stop offset="1" stopColor="#EB5E5C"/>
                        </linearGradient>
                        </defs>
                        </svg></span>
                    </section>

                    <section className='post__comments'>

                            <span><b>{name}</b> {description}</span>

                    </section>
                </article>

    )
}

export default Post;