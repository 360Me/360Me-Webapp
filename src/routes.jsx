import React from "react";
import Router from "react-router";


let routes = (
  <Route handler={App} path="/">
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="requests" handler={Requests} />
    <Route name="reviews" handler={Reviews}>
      <Route name="review" path="/review/:reviewId" handler={Review} />
      <NotFoundRoute handler={ReviewNotFound}/>
    </Route>
    <Route name="profile" handler={Profile} />
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

export default { routes }