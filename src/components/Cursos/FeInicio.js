import React from 'react'
import moment from 'moment'

import './FeInicio.css'

export default function FeInicio({ feInicio, mensaje }) {
  let fecha = moment(feInicio)
  if (!mensaje) {
    mensaje = fecha.utc().format('ddd DD MMM YYYY')
  }
  return (
    <div className="feInicio">
      <h3 style={{ margin: 0 }}>
        <span>{mensaje}</span>
      </h3>
    </div>
  )
}
