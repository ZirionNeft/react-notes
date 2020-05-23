import './App.css';

import React, { Component } from 'react';

import Button, { ButtonColor } from './components/Button';
import FlexView from './components/FlexView';
import SearchBox from './components/SearchBox';
import SelectBox from './components/SelectBox';
import NotesList from './components/NotesList/NotesList';
import Wrapper from './components/Wrapper';
import NoteContent from './components/NoteContent';
import { NotesService, ServiceNote } from './notesService';
import { Note } from './react-app-env';
import { SortType } from './enums';

interface AppState {
	notes: Array<ServiceNote>;
	notesSort: SortType;
	activeNote: Note;
	bufferNote: Note;
	inEditMode: boolean;
	lastSearch?: string;
}

const EMPTY_NOTE: Note = {
	title: '',
	body: '',
	id: -1,
};

class App extends Component<any, AppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			notes: [],
			notesSort: SortType.DESC,
			activeNote: EMPTY_NOTE,
			bufferNote: EMPTY_NOTE,
			inEditMode: false,
			lastSearch: '',
		};

		// Click event handlers
		this.onClickCreate = this.onClickCreate.bind(this);
		this.onClickListItem = this.onClickListItem.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onClickSave = this.onClickSave.bind(this);

		this.onChangeSearchBox = this.onChangeSearchBox.bind(this);

		this.onListSortChange = this.onListSortChange.bind(this);
		this.updateBufferNote = this.updateBufferNote.bind(this);
		this.refreshNotes = this.refreshNotes.bind(this);
	}

	private async onClickCreate() {
		let nextId: number = NotesService.nextId();
		let note: Note = await NotesService.create({
			title: `Новая заметка #${nextId}`,
			body: 'Введите текст',
			id: nextId,
		});
		this.refreshNotes();
		this.onClickListItem(note.id);
	}

	private async onClickDelete(id?: number) {
		if (this.state.activeNote.id === EMPTY_NOTE.id && id === EMPTY_NOTE.id)
			return;

		await NotesService.delete(id ? id : this.state.activeNote.id);

		if (id === this.state.activeNote.id || typeof id === 'undefined')
			this.setState({ activeNote: EMPTY_NOTE, inEditMode: false });

		this.refreshNotes();
	}

	private async refreshNotes() {
		this.setState({
			notes: await NotesService.getSortedAll(this.state.notesSort),
		});
	}

	private onClickEdit() {
		if (this.state.activeNote.id === EMPTY_NOTE.id || this.state.inEditMode)
			return;

		this.setState({ inEditMode: true });
	}

	private static async pickNoteIfEquals(noteA: Note, noteB: Note) {
		return noteA.id === noteB.id ? noteA : EMPTY_NOTE;
	}

	private async onClickSave() {
		if (!this.state.inEditMode) return;

		let bufferNote: Note = this.state.bufferNote;

		if (bufferNote.id === EMPTY_NOTE.id) {
			this.setState({ inEditMode: false, activeNote: EMPTY_NOTE });
			return;
		}

		try {
			let note: Note = await NotesService.update(bufferNote);

			this.setState({
				activeNote: note,
				inEditMode: false,
				bufferNote: await App.pickNoteIfEquals(note, this.state.activeNote),
			});

			this.refreshNotes();
		} catch (e) {
			console.error(e);
		}
	}

	updateBufferNote(note: Note) {
		this.setState({
			bufferNote: note,
		});
	}

	private async onListSortChange(value: SortType) {
		this.setState({
			notesSort: value,
			notes: await NotesService.sort(this.state.notes, value),
		});
	}

	private async onClickListItem(id: number) {
		try {
			let note: Note = await NotesService.read(id);

			this.setState({
				activeNote: note,
				bufferNote: await App.pickNoteIfEquals(note, this.state.activeNote),
				inEditMode:
					id === this.state.activeNote.id ? this.state.inEditMode : false,
			});
			this.updateBufferNote(note);
		} catch (e) {
			console.error(e);
		}
	}

	private async onChangeSearchBox(value: string) {
		await this.setState({
			lastSearch: value,
		});

		if (value === '') {
			this.refreshNotes();
			return;
		}

		let allNotes: ServiceNote[] = await NotesService.getSortedAll(
			this.state.notesSort
		);

		this.setState({
			notes: await NotesService.search(allNotes, value),
		});
	}

	componentDidMount() {
		this.refreshNotes();
	}

	render() {
		return (
			<div className="app">
				<Wrapper>
					<FlexView>
						<Button
							onClick={this.onClickCreate}
							title="Добавить заметку"
							buttonColor={ButtonColor.Blue}
						/>
						<SearchBox
							onChange={(e) => this.onChangeSearchBox(e.target.value)}
						/>
						<SelectBox
							label="Сортировать по"
							list={['убыванию даты', 'возрастанию даты']}
							onChange={this.onListSortChange}
						/>
						<NotesList
							items={this.state.notes}
							onItemClick={this.onClickListItem}
							onItemDelete={this.onClickDelete}
							activeNoteId={this.state.activeNote.id}
						/>
					</FlexView>

					<FlexView className="note-content__container">
						<div className="buttons-group">
							<Button
								onClick={this.onClickDelete}
								title="Удалить"
								buttonColor={ButtonColor.Red}
							/>

							{this.state.inEditMode ? (
								<Button
									onClick={this.onClickSave}
									title="Сохранить"
									buttonColor={ButtonColor.Green}
								/>
							) : (
								<Button
									onClick={this.onClickEdit}
									title="Редактировать"
									buttonColor={ButtonColor.Orange}
								/>
							)}
						</div>

						<NoteContent
							{...this.state.activeNote}
							inEditMode={this.state.inEditMode}
							onChange={this.updateBufferNote}
						/>
					</FlexView>
				</Wrapper>
			</div>
		);
	}
}

export default App;
