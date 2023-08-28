import React from 'react'
import './photos.scss'
const Photos = ({image, id}) => {
  return (
    <figure className='photo'>
        <img className='imgPhotos' src={image} alt="img" />
    </figure>
  )
}

export default Photos;