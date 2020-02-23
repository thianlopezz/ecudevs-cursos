import React from 'react'
import { Link } from 'gatsby'

import Image from '../Image'
import './CursoCard.css'

const CursoCard = ({
  urlFoto,
  curso,
  descripcion,
  slug,
  categories = [],
  className = '',
  ...props
}) => {
  return (
    <Link to={'/cursos/' + slug} className={`CursoCard ${className}`}>
      {urlFoto && (
        <div className="CursoCard--Image relative">
          <Image background src={urlFoto} alt={curso} />
        </div>
      )}
      <div className="CursoCard--Content">
        {curso && <h3 className="CursoCard--Title">{curso}</h3>}
        <div className="CursoCard--Category">
          {categories && categories.map(cat => cat.category).join(', ')}
        </div>
        {descripcion && <div className="CursoCard--Excerpt">{descripcion}</div>}
      </div>
    </Link>
  )
}

export default CursoCard
