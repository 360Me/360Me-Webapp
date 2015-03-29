import React from "react";
import Router from "react-router";
import Authentication from "../../../common/authentication";

let { Route, RouteHandler, Link, State } = Router;

let Logout = React.createClass({
  componentDidMount: function () {
    Authentication.logout();
  },

  render: function () {
    return <p>You are now logged out</p>;
  }
});

export default Logout