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
	onClick(...args: any): void;
}

class Button extends Component<ButtonProps> {
	constructor(props: ButtonProps) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(...args: any) {
		this.props.onClick(args);
	}

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
				onClick={this.handleClick}
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
