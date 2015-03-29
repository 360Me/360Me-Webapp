import React from "react";
import Router from "react-router";
import Authentication from "../../../common/authentication";

let { Route, RouteHandler, Link, State } = Router;

let Login = React.createClass({
  mixins: [ Router.Navigation, State],

  render: function () {
    return (
      <div>
        <div>
          <h1>360Me</h1>
          <h3>A modern webapp for professional feedback</h3>
        </div>
         <div><a href="http://localhost:1337/auth/linkedin" className="btn btn-login-linkedin" onClick={this.login}><i className="fa fa-linkedin-square"></i> <div>Sign In with LinkedIn</div></a></div>
      </div>
    );
  }
});

export default Login