import React, { Component } from 'react';
import './FlexView.css';
import FlexViewItem from './FlexViewItem';

class FlexView extends Component {
	render() {
		const wrappedChildren = React.Children.map(
			this.props.children,
			(child, i) => <FlexViewItem key={i}>{child}</FlexViewItem>
		);

		return <div className="flex-view">{wrappedChildren}</div>;
	}
}

export default FlexView;
