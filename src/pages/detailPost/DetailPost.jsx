import React, { useContext, useRef, useState } from 'react'
import { useForm, Controller, useFormContext } from "react-hook-form";
import './detailPost.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { createComment, getPostDetail } from '../../services/userService';
import { useEffect } from 'react';
import { AppContext } from '../../components/router/Router';
import Comment from '../../components/comment/Comment';
import Footer from '../../components/footer/Footer';
const DetailPost = () => {
  const {user: {userLogin: {user}}} = useContext(AppContext)

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
  const navigate = useNavigate();

  const {idPost} = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    // Definir una función asíncrona que llama a la función 
    const getPost = async () =>
    {
      const detailPost = await getPostDetail(idPost);
      setPost(detailPost);
      setComments(detailPost.comments);
    }
  // Llamar a la función asíncrona
  getPost();
}, []);


  useEffect(() => 
  {

  }
  
  ,[])


  const handleClickBck = () =>
  {
    navigate('/');
  }


  // usa el hook useForm para crear una instancia del formulario
  const {
    register, // una función para registrar los inputs del formulario
    handleSubmit, // una función para manejar el evento de enviar el formulario
    formState: { errors }, // un objeto que contiene el estado del formulario y los errores de validación
    reset, // una función para resetear el formulario
  } = useForm({
    mode: "onBlur", // una opción para configurar la estrategia de validación antes de enviar el formulario (en este caso se valida al perder el foco)
    defaultValues: {
      comment: "", // un valor por defecto para el input de comentario
    },
  });

  // crea una función para manejar el evento de enviar el comentario
// crea una función para manejar el evento de enviar el comentario
const onSubmit = async (data) => {
  // usa un bloque try-catch para manejar los posibles errores
  try {
    // usa la variable data para acceder al valor del input de comentario
    const comment = data.comment;
    // imprime en consola lo digitado por el usuario
    console.log("El valor es:", comment);
    // llama a la función createComment con await y guarda el resultado en una variable
    const commentData = await createComment(comment, user.id, post.id);
    // actualiza el estado comments con el nuevo comentario
    setComments([...comments, commentData]);
    // resetea el formulario
    reset();
  } catch (error) {
    // muestra un mensaje de error
    console.error(error);
  }
};



  return (
    

    <div className='wrapper”'>
      <main className='detailPost' ref={profileRef}>
          {post && <section    className='detailPost__content'>

              <figure className='content'>
                  <img className='imgContent' src={post.content} alt="img" />
                  <svg onClick={handleClickBck} className='back' xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24" fill="none"><path d="M10.0062 23.9999C9.7501 24.0008 9.49708 23.9442 9.2657 23.8345C9.03433 23.7247 8.83049 23.5645 8.66916 23.3657L0.389943 13.0809C0.137826 12.7742 0 12.3895 0 11.9924C0 11.5954 0.137826 11.2107 0.389943 10.904L8.96056 0.619231C9.25152 0.269179 9.66961 0.0490432 10.1229 0.00725332C10.5761 -0.0345366 11.0274 0.105442 11.3775 0.396395C11.7275 0.687348 11.9477 1.10544 11.9895 1.5587C12.0312 2.01196 11.8913 2.46326 11.6003 2.81331L3.93818 12.001L11.3432 21.1887C11.5528 21.4403 11.686 21.7467 11.7269 22.0716C11.7678 22.3965 11.7148 22.7264 11.5742 23.0221C11.4335 23.3178 11.2111 23.5671 10.9332 23.7404C10.6553 23.9137 10.3336 24.0037 10.0062 23.9999Z" fill="#FFF"/></svg>
                  <svg className='points' xmlns="http://www.w3.org/2000/svg" width="25" height="5" viewBox="0 0 25 5" fill="none"><path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" fill="#FFF"/><path d="M12.5 5C13.8807 5 15 3.88071 15 2.5C15 1.11929 13.8807 0 12.5 0C11.1193 0 10 1.11929 10 2.5C10 3.88071 11.1193 5 12.5 5Z" fill="#FFF"/><path d="M22.5 5C23.8807 5 25 3.88071 25 2.5C25 1.11929 23.8807 0 22.5 0C21.1193 0 20 1.11929 20 2.5C20 3.88071 21.1193 5 22.5 5Z" fill="#FFF"/></svg>

                  <div className='info'>
                  <span className='story__friend userImg'>

                      <figure className='contentFriend'>

                          <img className='contentFriend__img' src={post.user.image} alt="picture" />
                      </figure>
                      <span className='userName'>{post.user.name}</span>
                  </span>

                  <div className='lcs'>
                                  <span className="material-symbols-outlined like" >favorite  <span className='numberLike'>{post.likes.length}</span></span>
                                  <figure className='commentPost'>
                                      <img className='commentPostIcom' src="https://res.cloudinary.com/dibw7aluj/image/upload/v1692762950/Vector_2_fk98jm.svg" alt="comment" />
                                      <span className='numberComments'>{comments.length}</span>
                                  </figure>

                                  <figure className='commentPost'>
                                      <img  className='commentPostIcom' src="https://res.cloudinary.com/dibw7aluj/image/upload/v1692763063/Vector_3_qmtojf.svg" alt="share" />
                                      <span className='numberComments'>{post.shares.length}</span>
                                  </figure>
                  </div>

              </div>
              </figure>



            <div className='postDes'>
                  <span className='postDescription'>
                          <b>{post.description}</b>
                      </span>
            </div>

              <section className='comments'>

              {comments.map((comment) => (
              // usa un fragmento para envolver cada comentario
              
                <Comment
                  key = {comment.id}
                  content={comment.content}
                  date={comment.date}
                  userId={comment.userId}
                /> // usa el componente Comments para mostrar cada comentario con sus props
            
            ))}

              </section>
            <section className='commentSection'>

                  <span className='story__friend commentar'>

                          <figure className='contentFriend'>

                              <img className='contentFriend__img' src={user.image} alt="picture" />
                              

                          </figure>
                  </span>

                  <span className='write'>

                  <form onSubmit={handleSubmit(onSubmit)}>

                  <input
                    className="inputComment"
                    type="text"
                    {...register("comment", {
                      // usa el operador spread para pasar las propiedades que te devuelve la función register
                      required: true, // una regla de validación que indica que el input es obligatorio
                      maxLength: 200, // una regla de validación que indica que el input tiene un máximo de 200 caracteres
                    })}
                  />
                      <svg onClick={handleSubmit(onSubmit)} className='send' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 21 20" fill="none"><path d="M1.58045 0.108405L20.1808 9.00428C20.3688 9.09405 20.5276 9.23521 20.6387 9.41143C20.7499 9.58765 20.8088 9.79173 20.8088 10.0001C20.8088 10.2084 20.7499 10.4125 20.6387 10.5887C20.5276 10.7649 20.3688 10.9061 20.1808 10.9959L1.58045 19.8917C1.38977 19.9831 1.17687 20.0177 0.967071 19.9915C0.757274 19.9653 0.559418 19.8794 0.397043 19.744C0.234668 19.6086 0.11461 19.4294 0.0511529 19.2277C-0.0123038 19.026 -0.0164874 18.8104 0.0390999 18.6064L1.90002 11.7842C1.9228 11.7006 1.96969 11.6255 2.03484 11.5684C2.09998 11.5112 2.18051 11.4745 2.26638 11.4628L11.2797 10.2384C11.3173 10.2331 11.353 10.2181 11.3832 10.1949C11.4133 10.1716 11.437 10.141 11.4518 10.106L11.4677 10.0513C11.4747 10.002 11.4648 9.95179 11.4396 9.90884C11.4144 9.86589 11.3755 9.83271 11.3291 9.81468L11.2805 9.80144L2.27609 8.57701C2.19038 8.56516 2.11005 8.52839 2.04507 8.47126C1.98009 8.41413 1.93333 8.33916 1.91061 8.25567L0.0390999 1.39463C-0.0167125 1.19059 -0.0126992 0.974798 0.0506618 0.772969C0.114023 0.571141 0.234061 0.391778 0.39648 0.256243C0.558898 0.120708 0.756851 0.0347146 0.966761 0.00850392C1.17667 -0.0177068 1.38969 0.0169704 1.58045 0.108405Z" fill="#FF7674"/></svg>
                  </form>



                  </span>

            </section>
          </section>}

          <Footer/>
      </main>
      
    </div>
    
  )
}

export default DetailPost