import React, { Component } from 'react';
import './Button.css';

export enum ButtonColor {
	Red = 0,
	Blue,
	Green,
}

export interface ButtonProps {
	title?: string;
	buttonColor?: ButtonColor;
}

class Button extends Component<ButtonProps> {
	private pickButtonColorClass(color?: ButtonColor) {
		return color
			? ['button__color-red', 'button__color-blue', 'button__color-green'][
					color
			  ]
			: '';
	}

	render() {
		return (
			<button
				className={
					'button ' + this.pickButtonColorClass(this.props.buttonColor)
				}
			>
				{this.props.title}
			</button>
		);
	}
}

export default Button;
