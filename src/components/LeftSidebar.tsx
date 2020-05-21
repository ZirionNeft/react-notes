import React from 'react';
import './LeftSidebar.css';
import SidebarComponent from './SidebarComponent';

class LeftSidebar extends React.Component {
	render() {
		const children = React.Children.map(this.props.children, (child) => (
			<SidebarComponent>{child}</SidebarComponent>
		));

		return <div className="left-sidebar">{children}</div>;
	}
}

export default LeftSidebar;
