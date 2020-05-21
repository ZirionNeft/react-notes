import React from 'react';

class NoteContentView extends React.Component {
	render() {
		return <div className="Note-content-view">{this.props.children}</div>;
	}
}

export default NoteContentView;
