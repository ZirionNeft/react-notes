import React, { Component } from 'react';
import './SelectBox.css';

export interface SelectBoxProps {
	list: Array<string>;
	label?: string;
}

class SelectBox extends Component<SelectBoxProps, { value: string }> {
	constructor(props: SelectBoxProps) {
		super(props);
		this.state = { value: props.list[0] };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		this.setState({ value: event.target.value });
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
							<option key={i}>{el}</option>
						))}
					</select>
				</label>
			</div>
		);
	}
}

export default SelectBox;
