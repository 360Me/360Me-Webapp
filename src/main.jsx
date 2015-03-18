/**
 * App entry point
 */

// Polyfill
import "babel-core/polyfill";

// Libraries
import React from "react";
import Router from "react-router";

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";


// Initialize routes depending on session
//import Routes from "./routes";

// Grab our simple auth library
import Authentication from "./common/authentication";

// Grab parent components for each module
import Requests from "./modules/requests/components/main";
import Reviews from "./modules/reviews/components/main";
import Profile from "./modules/profile/components/main";

let { Route, RouteHandler, Link, State } = Router;

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
          <li><Link to="requests">Requests</Link> (authenticated) </li>
          <li><Link to="reviews">Reviews</Link> (authenticated)</li>
          <li><Link to="profile">Profile</Link> (authenticated)</li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});


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


let Logout = React.createClass({
  componentDidMount: function () {
    Authentication.logout();
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

let routes = (
  <Route handler={App} path="/">
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="requests" handler={Requests} />
    <Route name="reviews" handler={Reviews} />
    <Route name="profile" handler={Profile} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
