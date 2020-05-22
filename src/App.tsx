import './App.css';

import React, { Component } from 'react';

import Button, { ButtonColor } from './components/Button';
import FlexView from './components/FlexView';
import SearchBox from './components/SearchBox';
import SelectBox from './components/SelectBox';
import NotesList from './components/NotesList/NotesList';
import Wrapper from './components/Wrapper';
import NoteContent from './components/NoteContent';
import { NotesService } from './notesService';
import { Note } from './react-app-env';

interface AppState {
	notes: Array<Note>;
	activeNote: Note;
}

const emptyNote: Note = {
	title: '',
	body: '',
	id: -1,
};

class App extends Component<any, AppState> {
	constructor(props: any) {
		super(props);

		this.state = {
			notes: [],
			activeNote: emptyNote,
		};

		this.onClickCreate = this.onClickCreate.bind(this);
		this.onClickListItem = this.onClickListItem.bind(this);
	}

	private async onClickCreate() {
		await NotesService.create({
			title: 'Новая заметка',
			body: 'Введите текст',
			id: NotesService.nextId(),
		});
		this.setState({ notes: await NotesService.getAll() });
	}

	private async onClickListItem(id: number) {
		try {
			let note: Note = await NotesService.read(id);
		} catch (e) {
			console.error(e);
		}
	}

	componentWillMount() {
		NotesService.getAll().then((notes) => {
			this.setState({ notes: notes });
		});
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
						<SearchBox />
						<SelectBox
							label="Сортировать по"
							list={['убыванию даты', 'возрастанию даты']}
						/>
						<NotesList
							items={this.state.notes}
							onItemClick={this.onClickListItem}
						/>
					</FlexView>

					<FlexView>
						<div className="buttons-group">
							<Button
								onClick={() => {}}
								title="Редактировать"
								buttonColor={ButtonColor.Green}
							/>
							<Button
								onClick={() => {}}
								title="Удалить"
								buttonColor={ButtonColor.Red}
							/>
						</div>
						<NoteContent {...this.state.activeNote} />
					</FlexView>
				</Wrapper>
			</div>
		);
	}
}

export default App;
