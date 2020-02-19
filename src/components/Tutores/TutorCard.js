import React from 'react'
import Image from '../Image'

export default function TutorCard({ foto, nombre }) {
  return (
    <figure className="TutorCard">
      <div>
        <Image resolutions="small" src={foto} alt={nombre} />
      </div>
      {nombre && <figcaption>{nombre}</figcaption>}
    </figure>
  )
}
