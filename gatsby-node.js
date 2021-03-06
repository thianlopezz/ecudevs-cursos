const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const Axios = require('axios')

let urlCursosBase = 'http://localhost:3001'

if (process.env.NODE_ENV === 'production') {
  urlCursosBase = 'https://api.ecudevs.xyz'
  console.log('We are on ' + process.env.NODE_ENV)
} else {
  console.log('We are on ' + process.env.NODE_ENV)
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  let { data: dataCursos } = await Axios.get(
    `${urlCursosBase}/cursos/planner/${35}`
  )

  let { cursos } = dataCursos
  let cursosPageToCreate = cursos.filter(
    curso => curso.isInfoCompleted && curso.slug
  )

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              template
              title
            }
            fields {
              slug
              contentType
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const mdFiles = result.data.allMarkdownRemark.edges

    const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType')

    _.each(contentTypes, (pages, contentType) => {
      const pagesToCreate = pages.filter(page =>
        // get pages with template field
        _.get(page, `node.frontmatter.template`)
      )

      if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)

      console.log(`Creating ${pagesToCreate.length} ${contentType}`)

      pagesToCreate.forEach((page, index) => {
        const id = page.node.id
        createPage({
          // page slug set in md frontmatter
          path: page.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(page.node.frontmatter.template)}.js`
          ),
          // additional data can be passed via context
          context: {
            id
          }
        })
      })
    })

    console.log('Creating cursos page, finding id for query')
    let cursoDetallePage = contentTypes.pages.find(
      page => page.node.frontmatter.template == 'CursoDetallePage'
    )
    console.log(JSON.stringify(cursoDetallePage))

    cursosPageToCreate.forEach((page, index) => {
      const id = cursoDetallePage.node.id
      createPage({
        // page slug set in admin ecudevs
        path: `/cursos/${page.slug}/`,
        component: path.resolve(`src/templates/CursoDetallePage.js`),
        // additional data can be passed via context
        context: {
          id,
          idCurso: page.idCurso
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // convert frontmatter images
  fmImagesToRelative(node)

  // Create smart slugs
  // https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/gatsby-node.js
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (_.get(node, 'frontmatter.slug')) {
      slug = `/${node.frontmatter.slug.toLowerCase()}/`
    } else if (
      // home page gets root slug
      parsedFilePath.name === 'home' &&
      parsedFilePath.dir === 'pages'
    ) {
      slug = `/`
    } else if (_.get(node, 'frontmatter.title')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(
        node.frontmatter.title
      )}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    // Add contentType to node.fields
    createNodeField({
      node,
      name: 'contentType',
      value: parsedFilePath.dir
    })
  }
}

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => ['.json']
