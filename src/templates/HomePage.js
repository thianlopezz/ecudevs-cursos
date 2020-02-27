import React, { useEffect, useState } from 'react'
import { graphql, navigate } from 'gatsby'
import Axios from 'axios'

import Content from '../components/Content'
import Layout from '../components/Layout'

import PageVideoHeader from '../components/PageVideoHeader'
import ValoresAgregadosSection from '../components/valoresAgregados/ValoresAgregadosSection'
import CursosSection from '../components/Cursos/CursosSection'
import Tabs from '../components/Tabs/Tabs'
import TutoresSection from '../components/Tutores/TutoresSection'
import ComentariosSection from '../components/Comentarios/ComentariosSection'
import { proxyConfig } from '../helpers/proxyConfig'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loading from '../components/common/Loading/Loading'

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    cursos(idPlanner: 35) {
      idCurso
      idTipoCurso
      idPlanner
      tipoCurso
      agencia
      logoAgencia
      direccion
      contacto
      correo
      latitud
      longitud
      curso
      videoUrl
      descripcion
      requerimientos
      incluye
      precio
      cupos
      slug
      duracion
      urlFoto
      keyFoto
      isInfoCompleted
      isPublished
      feCreacion
      feCreacionFormat
      usCreacion
      feModificacion
      feModificacionFormat
      usModificacion
      estado
      categorias {
        idCategoria
        categoria
        image
        estado
        feCreacion
        usCreacion
        feModificacion
        usModificacion
      }
    }
    categorias {
      idCategoria
      categoria
      image
      estado
      feCreacion
      usCreacion
      feModificacion
      usModificacion
    }
  }
`

const filterCursos = (cursos = [], idCategoria) => {
  let retorno = cursos.filter(curso =>
    curso.categorias.find(categoria => categoria.idCategoria == idCategoria)
  )
  return retorno
}

// Export Template for use in CMS preview
export const HomePageTemplate = ({
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

  const { loading, error, data } = useQuery(APOLLO_QUERY, {
    errorPolicy: 'all'
  })
  console.log('error')
  console.log(error && JSON.stringify(error))

  useEffect(() => {
    if (data) {
      setTabs(
        data.categorias.map(categoria => {
          return { title: categoria.categoria, name: categoria.idCategoria }
        })
      )

      if (data.categorias.length > 0) {
        setActiveTab(data.categorias[0].idCategoria)
        setCursos(data.cursos)
        setCursosFiltered(
          filterCursos(data.cursos, data.categorias[0].idCategoria)
        )
      }
    }
  }, [data])

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       console.log('Llamada con fetch')
  //       let response = await fetch(
  //         `${proxyConfig.url}/api/cursos/planner/${35}`
  //       )

  //       let dataCursos = await response.json()
  //       // let { data: dataCursos } = await Axios.get(
  //       //   `${proxyConfig.url}/api/cursos/planner/${35}`
  //       // )
  //       let { cursos } = dataCursos

  //       response = await fetch(`${proxyConfig.url}/api/categoria`)

  //       let dataCategorias = await response.json()
  //       // let { data: dataCategorias } = await Axios.get(
  //       //   `${proxyConfig.url}/api/categoria`
  //       // )
  //       let { categorias } = dataCategorias

  //       setTabs(
  //         categorias.map(categoria => {
  //           return { title: categoria.categoria, name: categoria.idCategoria }
  //         })
  //       )

  //       if (categorias.length > 0) {
  //         setActiveTab(categorias[0].idCategoria)
  //         setCursos(cursos)
  //         setCursosFiltered(filterCursos(cursos, categorias[0].idCategoria))
  //       }
  //     } catch (e) {
  //       console.log('Couldnt fetch data from api')
  //       console.log(JSON.stringify(e))
  //     }
  //   }

  //   fetchData()
  // }, [])

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
          {loading ? (
            <section className="section taCenter">
              <Loading />
            </section>
          ) : (
            <>
              <Tabs
                activeTab={activeTab}
                tabs={tabs}
                onTabChange={name => {
                  setActiveTab(name)
                  setCursosFiltered(filterCursos(cursos, name))
                }}
              />
              <CursosSection
                cursos={cursosFiltered}
                onLoadMore={() => navigate('cursos')}
              />
            </>
          )}
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
const HomePage = ({ data: { page } }) => {
  return (
    <Layout meta={page.frontmatter.meta || false}>
      <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
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
