import React, { Component } from 'react';
import './EditableTextBox.css';

export interface EditableTextBoxProps {
	content: string;
	className?: string;
	inEditMode: boolean;
	onChange(value: string): void;
	errorExpression(): boolean;
}

class EditableTextBox extends Component<
	EditableTextBoxProps,
	{ value?: string }
> {
	constructor(props: EditableTextBoxProps) {
		super(props);

		this.state = {
			value: this.props.content,
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({ value: event.target.value });
		this.props.onChange(event.target.value);
	}

	render() {
		return (
			<textarea
				rows={1}
				className={
					'text-box ' +
					(this.props.errorExpression() ? 'text-box_error ' : '') +
					this.props.className
				}
				readOnly={!this.props.inEditMode}
				defaultValue={this.props.content}
				onChange={this.onChange}
			/>
		);
	}
}

export default EditableTextBox;
