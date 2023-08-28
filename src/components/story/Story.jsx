import React from 'react'
import './story.scss'
const Story = ({image, name}) => {
  return (
   
            <span className='story__user'>
                <figure className='content'>
                    <img className='content__img' src= {image} alt="picture" />
                    <span className="material-symbols-outlined add">add</span>
                </figure>
                <span className='userName'>{name}</span>
            </span>

  )
}

export default Story;