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
export const CursosPageTemplate = ({ title, discover, body }) => {
  const [cursos, setCursos] = useState([])
  const [cursosFilteredByCategory, setCursosFilteredByCategory] = useState([])
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState([])
  const [busqueda, setBusqueda] = useState('')

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
        setCursosFilteredByCategory(
          filterCursos(cursos, categorias[0].idCategoria)
        )
      }
    }

    fetchData()
  }, [])

  const filterFunction = curso => {
    return (
      curso.curso.toLowerCase().indexOf(busqueda.toLocaleLowerCase()) != -1 ||
      curso.categorias.find(
        categoria =>
          categoria.categoria
            .toLowerCase()
            .indexOf(busqueda.toLocaleLowerCase()) != -1
      )
    )
  }

  return (
    <main className="Home">
      {/* <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    /> */}
      <section className="section">
        <div className="container">
          <h1 className="taCenter">Todos los cursos</h1>
          <div className="Form--Group">
            <label
              className="Form--Label"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Curso"
                name="curso"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <span>Buscar un curso</span>
            </label>
          </div>
          {busqueda.length == 0 ? (
            <>
              <Tabs
                activeTab={activeTab}
                tabs={tabs}
                onTabChange={name => {
                  setActiveTab(name)
                  setCursosFilteredByCategory(filterCursos(cursos, name))
                }}
              />
              <CursosSection
                cursos={cursosFilteredByCategory}
                showLoadMore={false}
              />
            </>
          ) : cursos.filter(filterFunction).length > 0 ? (
            <CursosSection
              cursos={cursos.filter(filterFunction)}
              showLoadMore={false}
            />
          ) : (
            <p>No hay cursos para mostrar</p>
          )}
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
      }
    }
  }
`
