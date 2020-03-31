import React, { useEffect, useState } from 'react'

import './CursoInfo.css'
import Calendar from '../Calendar/Calendar'
import moment from 'moment'
import AccordionItem from '../Accordion/AccordionItem'
import FeInicio from './FeInicio'

export default function CursoInfo({
  curso,
  precioDefault,
  modulos,
  promocion,
  categorias,
  onReserva
}) {
  const [selectedDate, setSelectedDate] = useState()
  // const [moduloSelected, setModuloSelected] = useState()

  useEffect(() => {
    const setDefaultDate = () => {
      if (modulos[0]) {
        setSelectedDate(moment(modulos[0].feInicio))
      }
    }

    setDefaultDate()
  }, [modulos])

  const onSelectDate = fecha => {
    let existeFecha = modulos.find(modulo =>
      moment(modulo.feInicio).isSame(moment(fecha), 'date')
    )
    existeFecha && setSelectedDate(moment(fecha))
  }

  let fechaModulos = modulos.map(modulo => moment(modulo.feInicio).utc())

  let moduloSelected = modulos.find(modulo => {
    return moment(modulo.feInicio).isSame(moment(selectedDate), 'date')
  })

  moduloSelected = moduloSelected || {}

  return (
    <div className="card">
      {categorias &&
        categorias.map(categoria => (
          <div className="badge">
            <span>{categoria.categoria}</span>
          </div>
        ))}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="titulo">{curso}</h1>
        </div>
        {fechaModulos && fechaModulos.length > 0 && (
          <div className="flex items-center justify-between w-full">
            {moment(selectedDate).isSame(moment(fechaModulos[0]), 'date') ? (
              <h3>Próxima fecha</h3>
            ) : (
              <h3>Fecha</h3>
            )}
          </div>
        )}
        <div
          className="items-center justify-between w-full"
          style={{ marginBottom: '0.5em' }}
        >
          {!fechaModulos || fechaModulos.length == 0 ? (
            <>
              <FeInicio mensaje="No hay nuevas fechas disponibles" />
              <p style={{ textAlign: 'justify' }} className="mt-1">
                Pero no te preocupes, también puedes preguntar por este curso en
                modalidad <strong>In Company</strong>.
              </p>
            </>
          ) : (
            <AccordionItem title={moment(selectedDate).format('DD/MM/YYYY')}>
              <h5>Elige entre las fechas disponibles</h5>
              <Calendar
                datesChecked={fechaModulos}
                value={selectedDate}
                onChange={date => onSelectDate(date)}
              />
            </AccordionItem>
          )}
        </div>
        {/* <div className="flex items-center justify-between w-full">
          <h3>Duración</h3>
        </div> */}
        {fechaModulos && fechaModulos.length > 0 && (
          <>
            <div className="flex items-center justify-between w-full">
              <h3>Duración</h3>
              <h3 style={{ color: '#8d8d9d' }}>{moduloSelected.duracion}H</h3>
            </div>
            <div className="flex items-center justify-between w-full">
              <h3 style={{ marginBottom: '0.01em' }}>Horario</h3>
            </div>
            <div className="flex items-center justify-between w-full">
              {moduloSelected.fechas && (
                <h3 style={{ color: '#8d8d9d' }}>
                  {moduloSelected.fechas
                    .map(fecha =>
                      moment(fecha.fecha)
                        .utc()
                        .format('dddd DD')
                    )
                    .join(', ')}
                  {' - '}
                  {/* en prod funciona con utc() */}
                  {moment(moduloSelected.fechas[0].horaInicio)
                    .utc()
                    .format('hh:mma') +
                    ' a ' +
                    moment(moduloSelected.fechas[0].horaFin)
                      .utc()
                      .format('hh:mma')}
                </h3>
              )}
            </div>
            <div className="flex flex-col mt-16">
              <div className="flex items-center justify-between w-full">
                <p className="">
                  <span className="signo">US$</span>
                  <span className="precio">
                    {(moduloSelected && moduloSelected.precio) || precioDefault}
                  </span>
                </p>
              </div>
              {promocion && (
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
          </>
        )}
      </div>
      {fechaModulos && fechaModulos.length > 0 && (
        <div className="botonera">
          <button
            onClick={() => {
              let index = fechaModulos.findIndex(d =>
                moment(selectedDate).isSame(d, 'day')
              )
              onReserva(modulos[index])
            }}
            className="Button w-full"
            type="button"
          >
            Reservar
          </button>
        </div>
      )}
    </div>
  )
}
