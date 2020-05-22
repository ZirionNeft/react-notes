import React, { Component } from 'react';

class Wrapper extends Component {
	render() {
		const wrappedChildren = React.Children.map(
			this.props.children,
			(child, i) => (
				<section className="wrapper__item" key={i}>
					{child}
				</section>
			)
		);

		return <div className="wrapper">{wrappedChildren}</div>;
	}
}

export default Wrapper;
