import React from 'react';
import { Link } from 'gatsby';

import './ValorAgregadoCard.css';

const ValorAgregadoCard = ({ icon, title, description, slug, className = '', ...props }) => (
	<Link to={slug} className={`ValorAgregadoCard ${className}`}>
		<div className="ValorAgregadoCard--Content">
			{icon && (
				<h1 style={{ fontSize: '5rem', marginBottom: 0 }}>
					<span className={icon} />
				</h1>
			)}
			{title && <h3 className="ValorAgregadoCard--Title">{title}</h3>}
			{description && <div className="ValorAgregadoCard--Excerpt">{description}</div>}
		</div>
	</Link>
);

export default ValorAgregadoCard;
