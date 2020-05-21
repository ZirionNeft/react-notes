import React, { Component } from 'react';
import './NotesList.css';
import { NotesListItemProps } from './NotesListItem';
import NotesListItem from './NotesListItem';

export interface NotesListProps {
	items: Array<NotesListItemProps>;
}

class NotesList extends Component<NotesListProps> {
	render() {
		return (
			<div className="notes-list">
				{this.props.items.map((item, i) => (
					<NotesListItem key={i} {...item} />
				))}
			</div>
		);
	}
}

export default NotesList;
