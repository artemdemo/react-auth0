import React from 'react';

class RouteNotFoundView extends React.PureComponent {
    goToHomePage = () => {
        this.props.router.push('/');
    };

    render() {
        return (
            <div>
                <h3>Page not found</h3>
                <p>We are sorry, but the page you are looking for does not exist.</p>
                <button onClick={this.goToHomePage}>
                    Back Home
                </button>
            </div>
        );
    }
}

export default RouteNotFoundView;
