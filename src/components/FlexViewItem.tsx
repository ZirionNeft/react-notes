import React, { Component } from 'react';
import './FlexView.css';

class FlexViewItem extends Component {
	render() {
		return <div className="flex-view__item">{this.props.children}</div>;
	}
}

export default FlexViewItem;
