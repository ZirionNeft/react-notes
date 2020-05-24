import { Note } from '../react-app-env';

export const EmptyNote: Note = {
	title: '',
	body: '',
	id: -1,
};

export default class Helper {
	static isEmptyNote = (id: number) => {
		return id === EmptyNote.id;
	};

	static pickFirstNoteIfEquals = (noteA: Note, noteB: Note) => {
		return noteA.id === noteB.id ? noteA : EmptyNote;
	};
}
