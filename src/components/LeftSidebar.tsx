import React from 'react';

class LeftSidebar extends React.Component {
	render() {
		return <div className="feft-sidebar">{this.props.children}</div>;
	}
}

export default LeftSidebar;
