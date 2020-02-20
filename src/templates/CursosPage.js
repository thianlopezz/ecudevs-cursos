import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Axios from 'axios'

import Content from '../components/Content'
import Layout from '../components/Layout'

import PageVideoHeader from '../components/PageVideoHeader'
import ValoresAgregadosSection from '../components/valoresAgregados/ValoresAgregadosSection'
import CursosSection from '../components/Cursos/CursosSection'
import Tabs from '../components/Tabs/Tabs'
import TutoresSection from '../components/Tutores/TutoresSection'
import ComentariosSection from '../components/Comentarios/ComentariosSection'

const filterCursos = (cursos = [], idCategoria) => {
  let retorno = cursos.filter(curso =>
    curso.categorias.find(categoria => categoria.idCategoria == idCategoria)
  )
  return retorno
}

// Export Template for use in CMS preview
export const CursosPageTemplate = ({
  title,
  subtitle,
  featuredVideo,
  discover,
  valoresAgregados = [],
  tutores,
  dicen,
  queDicenDescripcion,
  comentarios,
  body
}) => {
  const [cursos, setCursos] = useState([])
  const [cursosFiltered, setCursosFiltered] = useState([])
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState([])

  useEffect(() => {
    async function fetchData() {
      let { data: dataCursos } = await Axios.get(
        `http://localhost:3001/api/cursos/planner/${35}`
      )
      let { cursos } = dataCursos

      let { data: dataCategorias } = await Axios.get(
        `http://localhost:3001/api/categoria`
      )
      let { categorias } = dataCategorias

      setTabs(
        categorias.map(categoria => {
          return { title: categoria.categoria, name: categoria.idCategoria }
        })
      )

      if (categorias.length > 0) {
        setActiveTab(categorias[0].idCategoria)
        setCursos(cursos)
        setCursosFiltered(filterCursos(cursos, categorias[0].idCategoria))
      }
    }

    fetchData()
  }, [])

  return (
    <main className="Home">
      {/* <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    /> */}
      <PageVideoHeader
        backgroundVideo={featuredVideo}
        videoType="video/mp4"
        title={title}
        subtitle={subtitle}
      />
      {!!valoresAgregados.length && (
        <section className="section">
          <div className="container">
            <ValoresAgregadosSection valoresAgregados={valoresAgregados} />
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <h1 className="taCenter">{discover}</h1>
          <Tabs
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={name => {
              setActiveTab(name)
              setCursosFiltered(filterCursos(cursos, name))
            }}
          />
          <CursosSection cursos={cursosFiltered} showLoadMore />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="taCenter">Tutores</h1>
          <TutoresSection tutores={tutores} />
        </div>
      </section>
      <section className="section thick">
        <div className="container">
          <h1 className="taCenter">{dicen}</h1>
          <ComentariosSection
            queDicenDescripcion={queDicenDescripcion}
            comentarios={comentarios}
          />
        </div>
      </section>
      <section className="section">
        <div className="container taCenter">
          <Content source={body} />
        </div>
      </section>
    </main>
  )
}

// Export Default HomePage for front-end
const CursosPage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <h1>Vamoooo!</h1>
    <CursosPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default CursosPage

export const pageQuery = graphql`
  ## Query for CursosPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query CursosPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredVideo
        discover
        valoresAgregados {
          icon
          title
          description
        }
        tutores {
          foto
          nombre
          descripcion
        }
        dicen
        queDicenDescripcion
        comentarios {
          titulo
          comentario
        }
      }
    }
  }
`