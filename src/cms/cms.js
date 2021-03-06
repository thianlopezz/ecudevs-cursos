import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { ComponentsPageTemplate } from '../templates/ComponentsPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { SinglePostTemplate } from '../templates/SinglePost'
import { CursosPageTemplate } from '../templates/CursosPage'
import { CursoDetallePageTemplate } from '../templates/CursoDetallePage'
import { CheckoutPageTemplate } from '../templates/CheckoutPage'
import { PurchaseSuccessTemplate } from '../templates/PurchaseSuccessPage'
import { YoMeQuedoEnCasaTemplate } from '../templates/YoMeQuedoEnCasaPage'

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('cursos-page', ({ entry }) => (
  <CursosPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('curso-detalle-page', ({ entry }) => (
  <CursoDetallePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('checkout-page', ({ entry }) => (
  <CheckoutPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('purchase-success-page', ({ entry }) => (
  <PurchaseSuccessTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('components-page', ({ entry }) => (
  <ComponentsPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('infoPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('en-casa', ({ entry }) => (
  <YoMeQuedoEnCasaTemplate {...entry.toJS().data} />
))
