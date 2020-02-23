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
    <div class="card">
      {categorias &&
        categorias.map(categoria => (
          <div className="badge">
            <span>{categoria.categoria}</span>
          </div>
        ))}

      <div class="flex flex-col">
        <div class="flex justify-between">
          <h1 class="titulo">{curso}</h1>
        </div>
        <div class="flex items-center justify-between w-full">
          <h3>{inicio}</h3>
        </div>

        <div class="flex flex-col mt-16">
          <div class="flex items-center justify-between w-full">
            <p class="">
              <span class="signo">US$</span>
              <span class="precio">{precio}</span>
            </p>
          </div>
          {promocion && (
            <>
              <div class="flex items-center justify-between w-full">
                <span class="precioRegular">Precio Regular</span>
                <span class="precioRegular valorRegular">US$ 57</span>
              </div>
              <div class="flex items-center justify-between w-full">
                <span class="precioRegular">Ahorras</span>
                <span class="precioRegular">US$42.01 (73%)</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div class="botonera">
        <button onClick={onReserva} className="Button w-full" type="button">
          Reservar
        </button>
      </div>
    </div>
  )
}
