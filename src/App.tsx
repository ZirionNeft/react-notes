import './App.css';

import React from 'react';

import Button, { ButtonColor } from './components/Button';
import LeftSidebar from './components/LeftSidebar';
import NoteContentView from './components/NoteContentView';
import SearchBox from './components/SearhBox';

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<div className="wrapper">
					<div className="wrapper__item">
						<LeftSidebar>
							<Button title="Добавить заметку" buttonColor={ButtonColor.Blue} />
							<SearchBox />
						</LeftSidebar>
					</div>
					<div className="wrapper__item wrapper__item-content-view">
						<NoteContentView>Test content 2</NoteContentView>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
