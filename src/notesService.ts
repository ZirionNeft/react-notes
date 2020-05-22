import { Note } from './react-app-env';

export class NotesService {
	static create = (note: Note): Promise<void> => {
		note.createDate = new Date();
		return new Promise((resolve) =>
			resolve(localStorage.setItem(`note_${note.id}`, JSON.stringify(note)))
		);
	};

	static read = (id: number): Promise<Note> => {
		return new Promise((resolve, reject) => {
			let note: string | null = localStorage.getItem(`note_${id}`);

			if (!note) return reject('Запись не найдена');

			resolve(JSON.parse(note));
		});
	};

	static update = (note: Note): Promise<void> => {
		return new Promise((resolve, reject) => {
			let oldStringNote: string | null = localStorage.getItem(
				`note_${note.id}`
			);

			if (!oldStringNote) return reject('Запись не найдена');

			let oldNote: Note = JSON.parse(oldStringNote);

			note.createDate = oldNote.createDate;

			resolve(
				localStorage.setItem(
					`note_${note.id}`,
					JSON.stringify({ ...oldNote, ...note })
				)
			);
		});
	};

	static delete = (id: number): Promise<void> => {
		return new Promise((resolve) =>
			resolve(localStorage.removeItem(`note_${id}`))
		);
	};

	static getAll = (): Promise<Array<Note>> => {
		return new Promise((resolve) => {
			let notes: Array<Note> = [];
			for (
				let i = 0, next = localStorage.key(i);
				(next = localStorage.key(i++));
				next
			) {
				if (!next.includes('note_')) continue;
				let note = localStorage.getItem(next);
				if (!note) continue;
				notes.push(JSON.parse(note));
			}

			resolve(notes);
		});
	};

	static nextId() {
		let nextId: string | null = localStorage.getItem('next_id');

		let id: number = 0;
		if (nextId) id = 1 + Number.parseInt(nextId);
		localStorage.setItem('next_id', '' + id);
		return id;
	}
}
