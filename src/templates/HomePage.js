import React from 'react';
import { graphql } from 'gatsby';

import PageHeader from '../components/PageHeader';
import Content from '../components/Content';
import Layout from '../components/Layout';
import BackgroundVideo from '../components/BackgroundVideo';
import PageVideoHeader from '../components/PageVideoHeader';
import ValoresAgregadosSection from '../components/valoresAgregados/ValoresAgregadosSection';

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredVideo, valoresAgregados, body }) => (
	<main className="Home">
		{/* <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    /> */}
		<PageVideoHeader backgroundVideo={featuredVideo} videoType="video/mp4" title={title} subtitle={subtitle} />
		{!!valoresAgregados.length && (
			<section className="section">
				<div className="container">
					<ValoresAgregadosSection valoresAgregados={valoresAgregados} />
				</div>
			</section>
		)}
		<section className="section">
			<div className="container">
				<Content source={body} />
			</div>
		</section>
	</main>
);

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
	<Layout meta={page.frontmatter.meta || false}>
		<HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
	</Layout>
);

export default HomePage;

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
				valoresAgregados
			}
		}
	}
`;
