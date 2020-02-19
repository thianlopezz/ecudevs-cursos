import React from 'react'
import ComentarioCard from './ComentarioCards'
import Content from '../Content'

import './ComentariosSection.css'

export default function ComentariosSection({
  queDicenDescripcion,
  comentarios
}) {
  return (
    <>
      <div className="container skinny">
        <Content source={queDicenDescripcion} />
      </div>
      <div className="ComentariosSection--Grid">
        {comentarios.map(comentario => (
          <ComentarioCard {...comentario} />
        ))}
      </div>
    </>
  )
}
