import React, { Component } from 'react';
import './NotesList.css';

export interface NotesListItemProps {
	title: string;
	description?: string;
	noteId: number;
}

class NotesListItem extends Component<NotesListItemProps> {
	render() {
		return (
			<div className="notes-list__item">
				<h2 className="notes-list__item_title">{this.props.title}</h2>
				<h4 className="notes-list__item_subtitle">{this.props.description}</h4>
			</div>
		);
	}
}

export default NotesListItem;
