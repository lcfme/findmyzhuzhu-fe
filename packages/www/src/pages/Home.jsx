import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Home</div>;
  }
}

export default withRouter(Home);
