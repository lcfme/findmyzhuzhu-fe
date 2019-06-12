import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="login-page">
        <div className="page-title">注册/登录</div>
      </div>
    );
  }
}

export default withRouter(Login);
