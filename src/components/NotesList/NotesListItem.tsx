import React, { Component } from 'react';
import './NotesList.css';
import { Note } from '../../react-app-env';

export interface NotesListItemProps extends Note {
	onClick(
		id: number,
		event?: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void;
}

class NotesListItem extends Component<NotesListItemProps> {
	constructor(props: NotesListItemProps) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		this.props.onClick(this.props.id, event);
	}

	render() {
		return (
			<div className="notes-list__item" onClick={this.onClick}>
				<h2 className="notes-list__item_title">{this.props.title}</h2>
				<h4 className="notes-list__item_subtitle">{this.props.body}</h4>
			</div>
		);
	}
}

export default NotesListItem;
