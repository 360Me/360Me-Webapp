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
  mixins: [ Router.Navigation ],

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
    // Redirect to /login
    if (!this.state.loggedIn) this.transitionTo('login');

    Authentication.onChange = this.setStateOnAuth;
  },

  componentWillUpdate: function (nextProps, nextState) {
    //if (!this.state.loggedIn) this.transitionTo('login');
  },

  render: function () {
    let userName = window.user ? window.user.firstName + " " + window.user.lastName : "";
    // Show naviagtion if logged in
    let loggedIn = (
      <div>
        <div id="navigation-view">
          <div id="navigation-view-header">
            {userName}
          </div>

          <ul>
            <li><Link to="requests" activeClassName="active"><i className="fa fa-inbox"></i> Requests</Link></li>
            <li><Link to="feedback" activeClassName="active"><i className="fa fa-pie-chart"></i> Feedback</Link></li>
            <li><Link to="people" activeClassName="active"><i className="fa fa-user"></i> People</Link></li>
          </ul>

           <Link to="logout"><div className="btn btn-logout">Log out</div></Link>
        </div>

        <div id="primary-view">
          <RouteHandler/>
        </div>
      </div>
      );

    // Hide navigation if logged out
    let loggedOut = (
        <div id="full-screen-view">
            <RouteHandler/>
        </div>
      );

    // Render correct layout
    let loginOrOut = this.state.loggedIn ? loggedIn : loggedOut;
    return loginOrOut;
  }
});

/** Run the router */
Router.run(Routes.getRoutes(App), function (Handler) {
  React.render(<Handler/>, document.body);
});
