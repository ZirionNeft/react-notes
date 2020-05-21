import React from 'react';
import './App.css';
import LeftSidebar from './components/LeftSidebar';
import NoteContentView from './components/NoteContentView';

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<div className="wrapper">
					<div className="wrapper__item" style={{ backgroundColor: 'red' }}>
						<LeftSidebar>left sidebar</LeftSidebar>
					</div>
					<div
						className="wrapper__item wrapper__item-content-view"
						style={{ backgroundColor: 'green' }}
					>
						<NoteContentView>Test content 2</NoteContentView>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
