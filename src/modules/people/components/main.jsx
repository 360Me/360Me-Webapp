import React from "react";
import Reflux from "reflux";
import Router from "react-router";
import Authentication from "../../../common/authentication";

import PeopleList from "./PeopleList";
import PeopleStore from "../stores/PeopleStore";

let { Route, RouteHandler, Link, State } = Router;

/*
 * Parent view for requests page.
 */

let People = React.createClass({
  mixins: [Authentication, Router.State, Reflux.ListenerMixin, Reflux.connect(PeopleStore)],

  render: function () {
    let filteredList;

    // Filter coworkers
    switch(this.getPath()) {
      case '/people/coworkers':
        filteredList = this.state.people.filter(function(item){ return item.isCoworker; });
        break;
      case '/people/contacts':
        filteredList = this.state.people.filter(function(item){ return !item.isCoworker; });
        break;
      default:
        filteredList = this.state.people;
    }

    return (
      <div className="list-view">
        <div className="list-header">
          <div className="switcher">
            <div className="switch"><Link to="coworkers">Co-Workers</Link></div>
            <div className="switch"><Link to="contacts">Contacts</Link></div>
          </div>
        </div>

        <div className="list-body">
          <PeopleList people={filteredList}></PeopleList>
        </div>
      </div>
    );
  }
});

export default People