import React from "react";
import Router from "react-router";

// Grab parent components for each module
import Login from "./modules/login/components/login";
import Logout from "./modules/login/components/logout";
import Requests from "./modules/requests/components/main";
import Profile from "./modules/profile/components/main";
import Friends from "./modules/friends/components/main";

let { Route, RouteHandler, Link, State } = Router;

/** Setup routes for app **/
let getRoutes = function (app) {
  return  (
    <Route handler={app} path="/">
      <Route name="login" handler={Login}/>
      <Route name="logout" handler={Logout}/>
      <Route name="requests" handler={Requests} />
      <Route name="profile" handler={Profile} />
      <Route name="friends" handler={Friends} />
    </Route>
  );
}


export default { getRoutes }