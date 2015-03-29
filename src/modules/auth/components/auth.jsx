import React from "react";
import Router from "react-router";
import Authentication from "../../../common/authentication";

let { Route, RouteHandler, Link, State } = Router;

/**
 * This is the component/view for /auth
 * Once a user has gone through the LinkedIn auth process,
 * our API will redirect here with a token param in the URL.
 **/
let Auth = React.createClass({
  mixins: [ Router.Navigation, State],

  componentDidMount: function () {

    let nextPath = this.getQuery().nextPath;
    let token = this.getQuery().token;

    // Hitting route without token
    if (!token) {
      console.log('No token boy!')
       this.transitionTo('login');
    } else {
      Authentication.authenticate(token, (err, user) => {
        if (err) return this.transitionTo('login');

        if (nextPath) {
          this.replaceWith(nextPath);
        } else {
          this.replaceWith('/people');
        }
      });
    }
  },

  render: function () {
    return (

        <div><h1>Authenticating</h1></div>

    );
  }
});

export default Auth