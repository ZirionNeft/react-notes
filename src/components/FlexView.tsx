import React, { Component } from 'react';
import './FlexView.css';
import FlexViewItem from './FlexViewItem';

export interface FlexViewProps {
	className?: string;
}

class FlexView extends Component<FlexViewProps> {
	render() {
		const wrappedChildren = React.Children.map(
			this.props.children,
			(child, i) => <FlexViewItem key={i}>{child}</FlexViewItem>
		);

		return (
			<div
				className={
					'flex-view' + (this.props.className ? ' ' + this.props.className : '')
				}
			>
				{wrappedChildren}
			</div>
		);
	}
}

export default FlexView;
