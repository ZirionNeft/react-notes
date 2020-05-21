import React, { Component } from 'react';
import './LeftSidebar.css';

class SidebarComponent extends Component {
	render() {
		return <div className="left-sidebar__component">{this.props.children}</div>;
	}
}

export default SidebarComponent;
