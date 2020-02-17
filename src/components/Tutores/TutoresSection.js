import React from 'react';

import './TutoresSection.css';
import ValorAgregadoCard from './ValorAgregadoCard';

class TutoresSection extends React.Component {
	static defaultProps = {
		tutores: [],
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
		const { tutores, title, showLoadMore, loadMoreTitle } = this.props,
			{ limit } = this.state,
			visibleValores = tutores.slice(0, limit || tutores.length);

		return (
			<div className="TutoresSection">
				{title && <h2 className="TutoresSection--Title">{title}</h2>}
				{!!visibleValores.length && (
					<div className="TutoresSection--Grid">
						{visibleValores.map((valorAgregado, index) => (
							<ValorAgregadoCard key={valorAgregado.title + index} {...valorAgregado} />
						))}
					</div>
				)}
				{showLoadMore &&
				visibleValores.length < tutores.length && (
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

export default TutoresSection;
