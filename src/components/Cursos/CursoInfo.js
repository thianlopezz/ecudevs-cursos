import React from 'react'

import './CursoInfo.css'

export default function CursoInfo({
  curso,
  precio,
  inicio,
  promocion,
  categorias,
  onReserva
}) {
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
        <div className="flex items-center justify-between w-full">
          <h3>{inicio}</h3>
        </div>

        <div className="flex flex-col mt-16">
          <div className="flex items-center justify-between w-full">
            <p className="">
              <span className="signo">US$</span>
              <span className="precio">{precio}</span>
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
      </div>
      <div className="botonera">
        <button onClick={onReserva} className="Button w-full" type="button">
          Reservar
        </button>
      </div>
    </div>
  )
}
