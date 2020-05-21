import './App.css';

import React from 'react';

import Button, { ButtonColor } from './components/Button';
import LeftSidebar from './components/LeftSidebar';
import NoteContentView from './components/NoteContentView';
import SearchBox from './components/SearchBox';
import SelectBox from './components/SelectBox';
import NotesList from './components/NotesList/NotesList';

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<div className="wrapper">
					<section className="wrapper__item">
						<LeftSidebar>
							<Button title="Добавить заметку" buttonColor={ButtonColor.Blue} />
							<SearchBox />
							<SelectBox
								label="Сортировать по"
								list={['убыванию даты', 'возрастанию даты']}
							/>
							<NotesList
								items={[
									{ title: 'test', description: 'descr123...', noteId: 0 },
									{
										title: 'test',
										description:
											'lorem ipsum dolor sit amet dlm mldsa; m;d;amslmgldks lkngldsn nlgsd',
										noteId: 1,
									},
								]}
							/>
						</LeftSidebar>
					</section>
					<section className="wrapper__item">
						<NoteContentView>Test content 2</NoteContentView>
					</section>
				</div>
			</div>
		);
	}
}

export default App;
