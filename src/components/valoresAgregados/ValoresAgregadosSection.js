import React from 'react';

import './ValoresAgregadosSection.css';
import ValorAgregadoCard from './ValorAgregadoCard';

class ValoresAgregadosSection extends React.Component {
	static defaultProps = {
		valoresAgregados: [],
		title: '',
		limit: 12,
		showLoadMore: true,
		loadMoreTitle: 'Load More',
		perPageLimit: 12
	};

	state = {
		limit: this.props.limit
	};

	increaseLimit = () =>
		this.setState((prevState) => ({
			limit: prevState.limit + this.props.perPageLimit
		}));

	render() {
		const { valoresAgregados, title, showLoadMore, loadMoreTitle } = this.props,
			{ limit } = this.state,
			visibleValores = valoresAgregados.slice(0, limit || valoresAgregados.length);

		return (
			<div className="ValoresAgregadosSection">
				{title && <h2 className="ValoresAgregadosSection--Title">{title}</h2>}
				{!!visibleValores.length && (
					<div className="ValoresAgregadosSection--Grid">
						{visibleValores.map((valorAgregado, index) => (
							<ValorAgregadoCard key={valorAgregado.title + index} {...valorAgregado} />
						))}
					</div>
				)}
				{showLoadMore &&
				visibleValores.length < valoresAgregados.length && (
					<div className="taCenter">
						<button className="button" onClick={this.increaseLimit}>
							{loadMoreTitle}
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default ValoresAgregadosSection;
