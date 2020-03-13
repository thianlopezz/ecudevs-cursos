import React, { useEffect, useState } from 'react'
import { graphql, navigate } from 'gatsby'
import Axios from 'axios'

import Layout from '../components/Layout'

// import './CheckoutPage.css'
import withLocation from '../components/withLocation'
import Content from '../components/Content'
import PageHeader from '../components/PageHeader'

// Export Template for use in CMS preview
const PageTemplate = ({ title, subtitle, featuredImage, body, search }) => {
  useEffect(() => {
    const { type } = search
    console.log('Type', type)
  }, [])

  return (
    <main className="Checkout">
      <PageHeader
        title={title}
        subtitle={subtitle}
        backgroundImage={featuredImage}
      />
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              <h1>{title}</h1>
              <Content src={body} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const PurchaseSuccessTemplate = withLocation(PageTemplate)

// Export Default HomePage for front-end
const PurchaseSuccessPage = ({ data: { page }, ...props }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <PurchaseSuccessTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default PurchaseSuccessPage

export const pageQuery = graphql`
  ## Query for PurchaseSuccessPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query PurchaseSuccessPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
