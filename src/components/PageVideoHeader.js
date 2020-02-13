import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import './PageHeader.css';
import BackgroundVideo from './BackgroundVideo';

const PageVideoHeader = ({ title, subtitle, backgroundVideo, videoType, large, className = '' }) => {
	if (large) className += ' PageHeader-large';
	return (
		<div className={`PageHeader relative ${className}`}>
			{backgroundVideo && (
				<BackgroundVideo>
					<source src={backgroundVideo} type={videoType} />
				</BackgroundVideo>
			)}
			<div className="container relative">
				<h1 className="PageHeader--Title">{title}</h1>
				{subtitle && <Content className="PageHeader--Subtitle" src={subtitle} />}
			</div>
		</div>
	);
};

PageVideoHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default PageVideoHeader;
