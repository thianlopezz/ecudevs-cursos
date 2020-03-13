import React, { useEffect, useState } from 'react'
import { graphql, navigate } from 'gatsby'
import Axios from 'axios'

import Layout from '../components/Layout'

import './CheckoutPage.css'
import CursoInfo from '../components/Cursos/CursoInfo'
import TemasAccordion from '../components/Cursos/TemasAccordion'
import Image from '../components/Image'
import { proxyConfig } from '../helpers/proxyConfig'
import withLocation from '../components/withLocation'
import ModuloInfo from '../components/Modulo/ModuloInfo'
import CheckoutForm from '../components/Checkout/CheckoutForm'

// Export Template for use in CMS preview
const PageTemplate = ({ title, discover, body, search }) => {
  const [modulo, setModulo] = useState({})

  useEffect(() => {
    const { mod } = search

    async function fetchModulo() {
      try {
        let { data } = await Axios.get(`${proxyConfig.url}/api/modulo/${mod}`)
        let { modulo } = data

        setModulo(modulo)
      } catch (e) {
        if (e.response && e.response.status) window.location = '/404'
      }
    }
    fetchModulo()
  }, [])

  return (
    <main className="Checkout">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <ModuloInfo {...modulo} />
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div
                className="reserva-form-container"
                style={{ display: 'flex' }}
              >
                <div style={{ margin: 'auto' }}>
                  <h1>Reservar</h1>
                  <p>Para reservar este curso déjanos los siguientes datos</p>
                  <CheckoutForm
                    idModulo={modulo.idModulo}
                    name="Formulario de contacto"
                    onReservaSuccess={() =>
                      navigate(`purchase-success?type=web`)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const CheckoutPageTemplate = withLocation(PageTemplate)

// Export Default HomePage for front-end
const CheckoutPage = ({ data: { page }, ...props }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <CheckoutPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default CheckoutPage

export const pageQuery = graphql`
  ## Query for CheckoutPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query CheckoutPage($id: String!) {
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
