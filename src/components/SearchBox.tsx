import React, { Component } from 'react';
import './SearchBox.css';

export interface SearchBoxProps {
	onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

class SearchBox extends Component<SearchBoxProps> {
	render() {
		return (
			<div className="search-box">
				<input
					onChange={this.props.onChange}
					type="search"
					placeholder="Поиск..."
				/>
			</div>
		);
	}
}

export default SearchBox;
