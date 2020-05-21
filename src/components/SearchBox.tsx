import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
	render() {
		return (
			<div className="search-box">
				<input type="text" placeholder="Поиск..." />
			</div>
		);
	}
}

export default SearchBox;
