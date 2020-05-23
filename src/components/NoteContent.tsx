import React, { Component } from 'react';
import EditableTextBox from './EditableTextBox';
import './NoteContent.css';
import { Note } from '../react-app-env';

export interface NoteContentProps {
	title: string;
	body: string;
	id: number;
	inEditMode: boolean;
	onChange(note: Note): void;
}

interface NoteContentState {
	title: string;
	body: string;
	id: number;
}

class NoteContent extends Component<NoteContentProps, NoteContentState> {
	constructor(props: NoteContentProps) {
		super(props);

		this.state = {
			title: this.props.title,
			body: this.props.body,
			id: this.props.id,
		};

		this.collectNote = this.collectNote.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.bodyChange = this.bodyChange.bind(this);
	}

	static getDerivedStateFromProps(
		props: NoteContentProps,
		state: NoteContentState
	) {
		if (props.id !== state.id) {
			return {
				title: props.title,
				body: props.body,
				id: props.id,
			};
		}
		return null;
	}

	collectNote() {
		this.props.onChange({
			title: this.state.title ? this.state.title : this.props.title,
			body: this.state.body ? this.state.body : this.props.body,
			id: this.props.id,
		});
	}

	private async titleChange(value: string) {
		await this.setState({ title: value });
		this.collectNote();
	}

	private async bodyChange(value: string) {
		await this.setState({ body: value });
		this.collectNote();
	}

	render() {
		return (
			<div className="note-content" key={this.props.id}>
				<EditableTextBox
					className="note-content__title"
					content={this.props.title}
					inEditMode={this.props.inEditMode}
					onChange={this.titleChange}
					errorExpression={() =>
						this.state.title === '' && this.state.id !== -1
					}
				/>

				<EditableTextBox
					className="note-content__body"
					content={this.props.body}
					inEditMode={this.props.inEditMode}
					onChange={this.bodyChange}
					errorExpression={() => this.state.body === '' && this.state.id !== -1}
				/>
			</div>
		);
	}
}

export default NoteContent;
