import React from "react";
import Router from "react-router";
import Authentication from "../../../common/authentication";

let { Route, RouteHandler, Link, State } = Router;

let Login = React.createClass({
  mixins: [ Router.Navigation, State],

  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var nextPath = this.getQuery().nextPath;
    var email = this.refs.email.getDOMNode().value;
    var pass = this.refs.pass.getDOMNode().value;
    Authentication.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true });

      if (nextPath) {
        this.replaceWith(nextPath);
      } else {
        this.replaceWith('/requests');
      }
    });
  },

  render: function () {
    var errors = this.state.error ? <p>Bad login information</p> : '';
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
        <label><input ref="pass" placeholder="password"/></label> (hint: password1)<br/>
        <button type="submit">login</button>
        {errors}
      </form>
    );
  }
});

export default Login