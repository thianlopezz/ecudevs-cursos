import React from 'react'
import Image from '../Image'

import './TutorCard.css'
import '../Image.css'

export default function TutorCard({ foto, nombre }) {
  return (
    <figure className="TutorCard">
      <div className="BackgroundImage">
        <Image resolutions="small" src={foto} alt={nombre} />
      </div>
      {nombre && <figcaption>{nombre}</figcaption>}
    </figure>
  )
}
