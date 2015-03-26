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
      <Link to="logout"><div className="btn btn-logout">Log out</div></Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <div id="navigation-view">
          <div id="navigation-view-header">
            360Me
          </div>

          <ul>
            <li><Link to="requests" activeClassName="active"><i className="fa fa-inbox"></i> Requests</Link></li>
            <li><Link to="profile" activeClassName="active"><i className="fa fa-pie-chart"></i> Results</Link></li>
            <li><Link to="people" activeClassName="active"><i className="fa fa-user"></i> People</Link></li>
          </ul>

          {loginOrOut}
        </div>

        <div id="primary-view">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

/** Run the router */
Router.run(Routes.getRoutes(App), function (Handler) {
  React.render(<Handler/>, document.body);
});
