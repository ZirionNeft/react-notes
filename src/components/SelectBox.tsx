import React, { Component } from 'react';
import './SelectBox.css';

export interface SelectBoxProps {
	list: Array<string>;
	label?: string;
	onChange(value: number): void;
}

class SelectBox extends Component<SelectBoxProps, { value: number }> {
	constructor(props: SelectBoxProps) {
		super(props);
		this.state = { value: 0 };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		let value: number = Number.parseInt(event.target.value);
		this.setState({ value: value });
		this.props.onChange(value);
	}

	render() {
		return (
			<div className="select-box">
				<label>
					{this.props.label}&nbsp;
					<select
						className="select-box__input"
						value={this.state.value}
						onChange={this.handleChange}
					>
						{this.props.list.map((el, i) => (
							<option value={i} key={i}>
								{el}
							</option>
						))}
					</select>
				</label>
			</div>
		);
	}
}

export default SelectBox;
