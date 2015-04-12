import React from "react";
import Router from "react-router";

// Grab parent components for each module
import Auth from "./modules/auth/components/auth";
import Logout from "./modules/auth/components/logout";
import Login from "./modules/auth/components/login";
import Requests from "./modules/requests/components/main";
import Profile from "./modules/profile/components/main";
import People from "./modules/people/components/main";
import Feedback from "./modules/feedback/components/main";

let { Route, RouteHandler, Link, State, Redirect, DefaultRoute } = Router;

/** Setup routes for app **/
let getRoutes = function (app) {
  return  (
    <Route handler={app} path="/">
      // Set default route
      <Route name="login" handler={Login}/>
      <Route name="logout" handler={Logout}/>
      <Route name="requests" handler={Requests} />
      <Route name="profile" handler={Profile} />
      <Route name="feedback" handler={Feedback} />
      <Route name="auth" handler={Auth} />

     // Make /people an abstract route
      <Redirect from="people" to="/people/coworkers" />
      <Route name="people" handler={People}>
        <Route name="coworkers" handler={People} />
        <Route name="contacts" handler={People} />
      </Route>

    </Route>
  );
}
export default { getRoutes }