import React from 'react';
import './LeftSidebar.css';
import SidebarComponent from './SidebarComponent';

class LeftSidebar extends React.Component {
	render() {
		const wrappedChildren = React.Children.map(this.props.children, (child) => (
			<SidebarComponent>{child}</SidebarComponent>
		));

		return <div className="left-sidebar">{wrappedChildren}</div>;
	}
}

export default LeftSidebar;
