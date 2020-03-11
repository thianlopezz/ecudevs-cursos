import React from 'react'
import moment from 'moment'

import './FeInicio.css'

export default function FeInicio({ feInicio }) {
  let mensaje = ''
  let fecha = moment(feInicio)
  if (fecha.isValid()) {
    mensaje = fecha.utc().format('ddd DD MMM YYYY')
  } else {
    mensaje = feInicio
  }
  return (
    <div className="feInicio">
      <h3 style={{ margin: 0 }}>
        <span>{mensaje}</span>
      </h3>
    </div>
  )
}
