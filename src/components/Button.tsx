import React, { Component } from 'react';

export interface ButtonProps {
	title?: string;
}

class Button extends Component<ButtonProps> {
	render() {
		return <button>{this.props.title}</button>;
	}
}

export default Button;
