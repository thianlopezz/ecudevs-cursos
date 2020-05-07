import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import Content from '../components/Content'
import CursosSection from '../components/Cursos/CursosSection'
import { proxyConfig } from '../helpers/proxyConfig'
import Axios from 'axios'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (posts, title, contentType) => {
  const isCategory = contentType === 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const YoMeQuedoEnCasaTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  posts = [],
  postCategories = [],
  enableSearch = true,
  contentType
}) => {
  const [loading, setLoading] = useState(true)
  const [cursos, setCursos] = useState([])

  useEffect(() => {
    async function fetchData() {
      let { data: dataCursos } = await Axios.get(
        `${proxyConfig.url}/cursos/planner/${35}`
      )
      let { cursos } = dataCursos

      setLoading(false)

      setCursos(
        cursos.filter(curso => [50, 52, 55].indexOf(curso.idCurso) != -1)
      )
    }

    fetchData()
  }, [])
  return (
    <Location>
      {({ location }) => {
        let filteredPosts =
          posts && !!posts.length
            ? byCategory(byDate(posts), title, contentType)
            : []

        let queryObj = location.search.replace('?', '')
        queryObj = qs.parse(queryObj)

        if (enableSearch && queryObj.s) {
          const searchTerm = queryObj.s.toLowerCase()
          filteredPosts = filteredPosts.filter(post =>
            post.frontmatter.title.toLowerCase().includes(searchTerm)
          )
        }

        return (
          <main className="Blog">
            <PageHeader
              title={title}
              subtitle={subtitle}
              backgroundImage={featuredImage}
            />
            <section className="section">
              <div className="container pt-4 mt-4">
                <Content source={body} />
              </div>
            </section>

            <section className="section">
              <div className="container">
                <CursosSection cursos={cursos} showLoadMore={false} />
              </div>
            </section>

            <section className="section">
              <div className="container">
                <h1>¿Qué herramientas usamos para impartir nuestros cursos?</h1>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div style={{ display: 'flex', height: '100%' }}>
                      <h1 className="m-auto">Microsoft Teams</h1>
                    </div>
                  </div>
                  {/* <div className="col-lg-6 col-md-6 col-sm-12">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ecudevs-dc803.appspot.com/o/fotos-landing%2FHerramientas%20cursos%20(1)-1.jpg?alt=media&token=6bad7139-c176-4174-9e3c-b98aa11f3cde"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div> */}
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/ecudevs-dc803.appspot.com/o/fotos-landing%2FHerramientas%20cursos%20(1)-2.jpg?alt=media&token=dd484dcb-0a31-4394-bf03-da81313e2db8"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div style={{ display: 'flex', height: '100%' }}>
                      <h1 className="m-auto">Visual Studio Code</h1>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/ecudevs-dc803.appspot.com/o/fotos-landing%2FHerramientas%20cursos%20(1)-3.jpg?alt=media&token=0a571d20-ce7d-4947-80be-344e8416a800"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div style={{ display: 'flex', height: '100%' }}>
                      <h1 className="m-auto">
                        Visual Studio Live Share (extensión)
                      </h1>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/ecudevs-dc803.appspot.com/o/fotos-landing%2FHerramientas%20cursos-1.jpg?alt=media&token=eb16f7da-44ae-4367-965a-10ddeaaddfca"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div style={{ display: 'flex', height: '100%' }}>
                      <h1 className="m-auto">Github</h1>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/ecudevs-dc803.appspot.com/o/fotos-landing%2FHerramientas%20cursos%20(1)-5.jpg?alt=media&token=0a9477f5-1dd3-4bce-bde9-035feefffcb7"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        )
      }}
    </Location>
  )
}

// Export Default BlogIndex for front-end
const YoMeQuedoEnCasa = ({ data: { page, posts, postCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <YoMeQuedoEnCasaTemplate
      {...page}
      body={page.html}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      postCategories={postCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default YoMeQuedoEnCasa

export const pageQuery = graphql`
  ## Query for YoMeQuedoEnCasa data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query YoMeQuedoEnCasa($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
