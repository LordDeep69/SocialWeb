import React, { useEffect, useState } from 'react'
import './comment.scss'
import { getUser } from '../../services/userService';
const Comment = ({ userId, date, content}) => {

    const [author, setAuthor] = useState(null);

    useEffect( () =>
    {
        const getAuthor = async ()=> 
        {
            const userAuthor = await getUser(userId);
            setAuthor(userAuthor); 
            console.log(author);

        }
        getAuthor();
    },[])

    return (
        <div className="comment">
          <div className="comment-header">
          <span className='story__friend '>

            <figure className='contentFriend '>

                {author && <img className='contentFriend__img ' src={author.image} alt="picture" />}
                

            </figure>
            </span>
            {author && <span className="comment-user-id">{author.name}</span> }
            <span className="comment-post-info">
              <b>{date}</b>
              <b>3:43:18 p. m.</b>
            </span>
          </div>
          <div className="comment-content">
            <p>{content}</p> 
          </div>

        </div>
      );

}

export default Comment;