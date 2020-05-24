import './App.css';

import React, { Component } from 'react';

import Button, { ButtonColor } from './components/Button';
import FlexView from './components/FlexView';
import SearchBox from './components/SearchBox';
import SelectBox from './components/SelectBox';
import NotesList from './components/Notes/NotesList';
import Wrapper from './components/Wrapper';
import NoteContent from './components/Notes/NoteContent';
import NotesService, { ServiceNote } from './services/NotesService';
import { Note } from './react-app-env';
import { SortType } from './enums';
import Helper, { EmptyNote } from './services/HelperService';

interface AppState {
	notes: Array<ServiceNote>;
	notesSort: SortType;
	activeNote: Note;
	bufferNote: Note;
	inEditMode: boolean;
	lastSearch?: string;
}

class App extends Component<any, AppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			notes: [],
			notesSort: SortType.DESC,
			activeNote: EmptyNote,
			bufferNote: EmptyNote,
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
		const activeNote: Note = this.state.activeNote;

		if (Helper.isEmptyNote(activeNote.id) && Helper.isEmptyNote(id ?? -1))
			return;

		await NotesService.delete(id ?? activeNote.id);

		if (id === activeNote.id || typeof id === 'undefined')
			this.setState({ activeNote: EmptyNote, inEditMode: false });

		this.refreshNotes();
	}

	private async refreshNotes() {
		const searchKey: string = this.state.lastSearch ?? '';

		let allNotes: ServiceNote[] = await NotesService.getSortedAll(
			this.state.notesSort
		);

		this.setState({
			notes:
				searchKey === ''
					? allNotes
					: await NotesService.search(allNotes, searchKey),
		});
	}

	private onClickEdit() {
		if (Helper.isEmptyNote(this.state.activeNote.id) || this.state.inEditMode)
			return;

		this.setState({ inEditMode: true });
	}

	private async onClickSave() {
		if (!this.state.inEditMode) return;

		let bufferNote: Note = this.state.bufferNote;

		if (Helper.isEmptyNote(bufferNote.id)) {
			this.setState({ inEditMode: false, activeNote: EmptyNote });
			return;
		}

		try {
			let note: Note = await NotesService.update(bufferNote);

			this.setState({
				activeNote: note,
				inEditMode: false,
				bufferNote: Helper.pickFirstNoteIfEquals(note, this.state.activeNote),
			});

			this.refreshNotes();
		} catch (e) {
			console.error(e);
		}
	}

	private async updateBufferNote(note: Note) {
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
		const activeNote: Note = this.state.activeNote;

		try {
			let note: Note = await NotesService.read(id);

			this.setState({
				activeNote: note,
				bufferNote: Helper.pickFirstNoteIfEquals(note, activeNote),
				inEditMode: id === activeNote.id ? this.state.inEditMode : false,
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
		this.refreshNotes();
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
