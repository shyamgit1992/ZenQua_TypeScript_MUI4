import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

interface MyComponentState {
  navigateToOtherRoute: boolean;
  id: string; // Assuming id is a string
}

class MyComponent extends Component<{}, MyComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      navigateToOtherRoute: false,
      id: "" // Initialize id state
    };
    this.handleView = this.handleView.bind(this);
  }

  handleView(id: string) {
    // Navigate to other route with the given id
    this.setState({ navigateToOtherRoute: true, id: id });
  }

  render() {
    const { navigateToOtherRoute, id } = this.state;

    if (navigateToOtherRoute) {
      return <Navigate to={`/check2/${id}`} />;
    }

    return (
      <div>
        <h1>My Component</h1>
        {/* Button with onClick event calling handleView function with id */}
        <button onClick={() => this.handleView("1")}>Navigate</button>
      </div>
    );
  }
}

export default MyComponent;
