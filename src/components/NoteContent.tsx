import React, { Component } from 'react';
import EditableTextBox from './EditableTextBox';

export interface NoteContentProps {
	title: string;
	body?: string;
}

class NoteContent extends Component<NoteContentProps> {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<EditableTextBox>
					{this.props.body ? this.props.body : this.props.children}
				</EditableTextBox>
			</div>
		);
	}
}

export default NoteContent;
