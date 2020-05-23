import { Note, CreateDate } from './react-app-env';
import { SortType } from './enums';

export type ServiceNote = Note & CreateDate;

export class NotesService {
	private static toNote(serviceNote: ServiceNote) {
		delete serviceNote.createDate;
		return serviceNote;
	}

	static create = async (note: ServiceNote | Note): Promise<Note> => {
		let serviceNote: ServiceNote = { ...note, ...{ createDate: new Date() } };
		localStorage.setItem(`note_${note.id}`, JSON.stringify(serviceNote));
		return NotesService.toNote(serviceNote);
	};

	static read = async (id: number): Promise<Note> => {
		let note: string | null = localStorage.getItem(`note_${id}`);

		if (!note) throw new Error('Запись не найдена');

		return NotesService.toNote(JSON.parse(note));
	};

	static update = async (note: Note): Promise<Note> => {
		let oldStringNote: string | null = localStorage.getItem(`note_${note.id}`);

		if (!oldStringNote) throw new Error('Запись не найдена');

		let newNote: ServiceNote = { ...JSON.parse(oldStringNote), ...note };

		localStorage.setItem(`note_${note.id}`, JSON.stringify(newNote));

		return NotesService.toNote(newNote);
	};

	static delete = async (id: number): Promise<void> => {
		return localStorage.removeItem(`note_${id}`);
	};

	static getAll = async (): Promise<Array<ServiceNote>> => {
		let notes: Array<ServiceNote> = [];
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

		return notes;
	};

	static getSortedAll = async (
		type: SortType = SortType.DESC
	): Promise<Array<ServiceNote>> => {
		return NotesService.sort(await NotesService.getAll(), type);
	};

	static nextId() {
		let nextId: string | null = localStorage.getItem('next_id');

		let id: number = 0;
		if (nextId) id = 1 + Number.parseInt(nextId);
		localStorage.setItem('next_id', '' + id);
		return id;
	}

	static sort = async <T extends CreateDate>(
		notes: Array<T>,
		type: SortType = SortType.DESC
	) => {
		return notes.sort((a: T, b: T): number =>
			type === SortType.DESC
				? new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
				: new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
		);
	};

	static search = async <T extends Note>(
		notes: Array<T>,
		searchKey: string
	): Promise<Array<T>> => {
		return notes.filter((value: T) =>
			value.title.toLowerCase().includes(searchKey.toLowerCase())
		);
	};
}
