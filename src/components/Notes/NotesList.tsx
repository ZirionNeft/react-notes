import './NotesList.css';

import React, { Component } from 'react';

import { Note } from '../../react-app-env';
import NotesListItem from './NotesListItem';

export interface NotesListProps {
	items: Array<Note>;
	activeNoteId: number;
	onItemClick(
		id: number,
		event?: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void;
	onItemDelete(id: number): void;
}

class NotesList extends Component<NotesListProps> {
	render() {
		return (
			<div className="notes-list">
				{this.props.items.map((item, i) => (
					<NotesListItem
						key={i}
						{...item}
						onClick={this.props.onItemClick}
						onClickDelete={this.props.onItemDelete}
						isActive={this.props.activeNoteId === item.id}
					/>
				))}
			</div>
		);
	}
}

export default NotesList;
