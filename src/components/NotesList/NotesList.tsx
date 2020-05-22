import './NotesList.css';

import React, { Component } from 'react';

import { Note } from '../../react-app-env';
import NotesListItem from './NotesListItem';

export interface NotesListProps {
	items: Array<Note>;
	onItemClick(
		id: number,
		event?: React.MouseEvent<HTMLDivElement, MouseEvent>
	): void;
}

interface NotesListState {
	loading: boolean;
	items: Array<Note>;
}

class NotesList extends Component<NotesListProps, NotesListState> {
	constructor(props: NotesListProps) {
		super(props);

		this.state = {
			loading: true,
			items: this.props.items,
		};

		this.onItemClick = this.onItemClick.bind(this);
	}

	onItemClick() {}

	render() {
		return (
			<div className="notes-list">
				{this.props.items.map((item, i) => (
					<NotesListItem key={i} {...item} onClick={this.props.onItemClick} />
				))}
			</div>
		);
	}
}

export default NotesList;
