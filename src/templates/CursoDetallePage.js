import React, { useEffect, useState } from 'react'
import { graphql, navigate } from 'gatsby'
import Axios from 'axios'

import Layout from '../components/Layout'

import './CursoDetallePage.css'
import CursoInfo from '../components/Cursos/CursoInfo'
import TemasAccordion from '../components/Cursos/TemasAccordion'
import Image from '../components/Image'
import { proxyConfig } from '../helpers/proxyConfig'
import moment from 'moment'

// Export Template for use in CMS preview
export const CursoDetallePageTemplate = ({
  idCurso,
  title,
  discover,
  body
}) => {
  const [curso, setCurso] = useState({})
  const [modulos, setModulos] = useState([])

  useEffect(() => {
    async function fetchCurso() {
      let { data } = await Axios.get(`${proxyConfig.url}/curso/${idCurso}`)
      let { curso } = data
      setCurso(curso)
    }

    async function fetchModulos() {
      let { data } = await Axios.get(
        `${proxyConfig.url}//modulo/curso/${idCurso}`
      )

      let { modulos = [] } = data
      setModulos(
        modulos.filter(modulo =>
          moment(modulo.feInicio).isSameOrAfter(moment())
        )
      )
    }

    fetchCurso()
    fetchModulos()
  }, [])

  return (
    <main className="CursoDetalle">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-sm-12 taCenter">
              {curso.videoUrl ? (
                <iframe
                  className="video"
                  src={curso.videoUrl}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              ) : (
                <Image
                  className="video"
                  background
                  src={curso.urlFoto}
                  alt={curso.curso}
                />
              )}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <CursoInfo
                curso={curso.curso}
                precioDefault={curso.precio}
                categorias={curso.categorias}
                modulos={modulos}
                onReserva={modulo =>
                  navigate('checkout?mod=' + modulo.idModulo)
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section thin">
        <div className="container">
          <h2>Acerca de este curso</h2>
          <p>{curso.descripcion}</p>
        </div>
      </section>
      <section className="section thin">
        <div className="container">
          <h2>Tecnologías a usar</h2>
          <div className="row">
            {curso.tecnologias &&
              curso.tecnologias.map(tecnologia => (
                <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
                  <img
                    className="mr-3"
                    src={tecnologia.image}
                    width="32px"
                    height="32px"
                  />
                  <p>{tecnologia.tecnologia}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="section thin">
        <div className="container">
          <h2>4 cosas que aprenderás durante el curso</h2>
          <div className="row">
            {curso.capacidades &&
              curso.capacidades.map(capacidad => (
                <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
                  <p>{capacidad.capacidad}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="section thin">
        <div className="container">
          <h2>¿Qué requieres para tomar este curso?</h2>
          <p>{curso.requerimientos}</p>
        </div>
      </section>
      <section className="section thin">
        <div className="container">
          <h2>¿Qué incluye este curso?</h2>
          <p>{curso.incluye}</p>
        </div>
      </section>
      <section className="section thin">
        <div className="container">
          <h2>Clases del curso</h2>
          <TemasAccordion temas={curso.temas} />
        </div>
      </section>
    </main>
  )
}

// Export Default HomePage for front-end
const CursoDetallePage = ({ data: { page }, ...props }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <CursoDetallePageTemplate
      {...page}
      {...page.frontmatter}
      body={page.html}
      idCurso={props.pageContext.idCurso}
    />
  </Layout>
)

export default CursoDetallePage

export const pageQuery = graphql`
  ## Query for CursoDetallePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query CursoDetallePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`
