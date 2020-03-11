import React, { useEffect, useState } from 'react'

import './ModuloInfo.css'
import moment from 'moment'
import Image from '../Image'
import FeInicio from '../Cursos/FeInicio'

export default function ModuloInfo({
  curso,
  urlFoto,
  feInicio,
  duracion,
  fechas,
  precio,
  isPromo,
  onReserva
}) {
  return (
    <div className="card">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="titulo">{curso}</h1>
        </div>
        {urlFoto && (
          <div className="CursoInfo--Image relative">
            <Image background src={urlFoto} alt={curso} />
          </div>
        )}
        <div className="flex items-center justify-between w-full">
          <h3>Fecha de inicio</h3>
        </div>
        <div
          className="items-center justify-between w-full"
          style={{ marginBottom: '0.5em' }}
        >
          <FeInicio feInicio={feInicio} />
        </div>
        {/* <div className="flex items-center justify-between w-full">
          <h3>Duración</h3>
        </div> */}
        <div className="flex items-center justify-between w-full">
          <h3>Duración</h3>
          <h3 style={{ color: '#8d8d9d' }}>{duracion}H</h3>
        </div>
        <div className="flex items-center justify-between w-full">
          <h3 style={{ marginBottom: '0.01em' }}>Horario</h3>
        </div>
        <div className="flex items-center justify-between w-full">
          {fechas && (
            <h3 style={{ color: '#8d8d9d' }}>
              {fechas
                .map(fecha =>
                  moment(fecha.fecha)
                    .utc()
                    .format('dddd DD')
                )
                .join(', ')}
              {' - '}
              {moment(fechas[0].horaInicio)
                .utc()
                .format('hh:mma') +
                ' a ' +
                moment(fechas[0].horaFin)
                  .utc()
                  .format('hh:mma')}
            </h3>
          )}
        </div>

        <div className="flex flex-col mt-16">
          <div className="flex items-center justify-between w-full">
            <p className="">
              <span className="signo">US$</span>
              <span className="precio">{precio}</span>
            </p>
          </div>
          {isPromo && (
            <>
              <div className="flex items-center justify-between w-full">
                <span className="precioRegular">Precio Regular</span>
                <span className="precioRegular valorRegular">US$ 57</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="precioRegular">Ahorras</span>
                <span className="precioRegular">US$42.01 (73%)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
