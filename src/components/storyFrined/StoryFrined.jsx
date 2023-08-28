import React from 'react'
import './storyFriend.scss'
import { useNavigate } from 'react-router-dom'

const StoryFrined = ({image, name, id}) => {
  const navigate = useNavigate();
  const handleFriendClick = () => 
  {
    console.log('Has dado Click a un amigo.')
    navigate(`/profile/${id}`);
  }
  return (

    <span className='story__friend'>

      <figure className='contentFriend'>

        <img onClick={handleFriendClick} className='contentFriend__img' src={image} alt="picture" />

      </figure>

      <span className='userName'>{name}</span>

    </span>

  )
}

export default StoryFrined