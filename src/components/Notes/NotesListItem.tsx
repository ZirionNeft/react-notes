import React, { Component } from 'react';
import './NotesList.css';
import { Note } from '../../react-app-env';

export interface NotesListItemProps extends Note {
	onClick(
		id: number,
		event?: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void;
	onClickDelete(id: number): void;
	isActive: boolean;
}

class NotesListItem extends Component<NotesListItemProps> {
	constructor(props: NotesListItemProps) {
		super(props);

		this.onClick = this.onClick.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
	}

	onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		this.props.onClick(this.props.id, event);
	}

	onClickDelete(event: React.MouseEvent<HTMLElement, MouseEvent>) {
		event.stopPropagation();
		this.props.onClickDelete(this.props.id);
	}

	render() {
		return (
			<div
				className={
					'notes-list__item' +
					(this.props.isActive ? ' notes-list__active-item' : '')
				}
				onClick={this.onClick}
			>
				<h2 className="notes-list__item_title">{this.props.title}</h2>
				<h4 className="notes-list__item_subtitle">{this.props.body}</h4>
				<i
					className="notes-list__item_delete"
					title="Удалить заметку"
					onClick={this.onClickDelete}
				/>
			</div>
		);
	}
}

export default NotesListItem;
