import React, { Component } from 'react';
import './Button.css';

export enum ButtonColor {
	Red = 0,
	Blue,
	Green,
	Orange,
}

export interface ButtonProps {
	title?: string;
	buttonColor?: ButtonColor;
	onClick(): void;
}

class Button extends Component<ButtonProps> {
	constructor(props: ButtonProps) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick();
	}

	private pickButtonColorClass(color?: ButtonColor) {
		return color
			? [
					'button__color-red',
					'button__color-blue',
					'button__color-green',
					'button__color-orange',
			  ][color]
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
