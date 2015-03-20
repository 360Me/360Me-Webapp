/**
 * App entry point
 */

// Polyfill
import "babel-core/polyfill";

// Libraries
import React from "react";
import Router from "react-router";

// Initialize routes depending on session
import Routes from "./routes";
// Grab our simple auth library
import Authentication from "./common/authentication";

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

let { Route, RouteHandler, Link, State } = Router;

/** Setup route app component */
let App = React.createClass({
  getInitialState: function () {
    return {
      loggedIn: Authentication.loggedIn()
    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function () {
    Authentication.onChange = this.setStateOnAuth;
    Authentication.login();
  },

  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Log out</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="requests">Requests</Link> </li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="friends">Friends</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

/** Run the router */
Router.run(Routes.getRoutes(App), function (Handler) {
  React.render(<Handler/>, document.body);
});
