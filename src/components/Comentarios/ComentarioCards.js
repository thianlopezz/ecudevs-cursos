import React from 'react'

import Content from '../Content'
import './ComentarioCard.css'

const ComentarioCard = ({
  icon,
  titulo,
  comentario,
  className = '',
  ...props
}) => (
  <div className={`ComentarioCard ${className}`}>
    <div className="ComentarioCard--Content">
      {icon && (
        <h1 style={{ fontSize: '5rem', marginBottom: 0 }}>
          <span className={icon} />
        </h1>
      )}
      {titulo && <h3 className="ComentarioCard--Title">{titulo}</h3>}
      {comentario && <Content source={comentario} />}
    </div>
  </div>
)

export default ComentarioCard
