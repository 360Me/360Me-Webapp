/**
 * App entry point
 */

// Polyfill
import "babel-core/polyfill";

// Libraries
import React from "react";
import Router from "react-router";

// Common utilities
import Session from "./common/session";

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";


// Initialize routes depending on session
let routes;
import Routes from "routes";

if (Session.isLoggedIn()) {
  routes = Routes.getLoggedInRoutes();
} else {
  routes = Routes.getLoggedOutRoutes();
}

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});