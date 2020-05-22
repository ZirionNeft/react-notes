import React, { Component } from 'react';

class EditableTextBox extends Component {
	render() {
		return <div>{this.props.children}</div>;
	}
}

export default EditableTextBox;
