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

  /*
   * Lifecycle methods
   */

  componentWillMount: function() {
    let path = this.getPath();
    // Set last path
    this.lastPath = path;
    // Set correct subset of people
    this.setInitialFilteredState(path);
  },

  /** Get a subset of state.people */
  setInitialFilteredState: function (path) {
     switch(path) {
        case '/people/coworkers':
          this.state._people = this.getCoworkers();
          break;
        default:
          this.state._people = this.getContacts();
      }

    this.state.filteredList = this.state._people;
  },

  /*
   * Other methods
   */

  getCoworkers: function () {
    return this.state.people.filter(function(item){ return item.isCoworker; });
  },

  getContacts: function () {
    return this.state.people.slice(0);
  },

  pathChanged: function () {
    return this.lastPath !== this.getPath();
  },

  filterList: function (event) {
    var updatedList = this.state._people.slice(0);
    updatedList = updatedList.filter(function(item){
      var fullName  = item.firstName + " " + item.lastName;
      return fullName.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });

    this.setState({filteredList: updatedList});
  },

  render: function () {

    /** Handle tab switches */
    if (this.pathChanged()) {
      let path = this.getPath();
      // Filter by subset
      this.setInitialFilteredState(path);

      this.lastPath = path;
    }



    return (
      <div className="list-view">
        <div className="list-view-header">
          <input type="text" placeholder="Search" onChange={this.filterList}/>

          <div className="switcher">
            <Link to="coworkers" className="switcher-switch" activeClassName="active">Co-Workers</Link>
            <Link to="contacts" className="switcher-switch" activeClassName="active">Contacts</Link>
          </div>
        </div>

        <div className="list-view-body">
          <PeopleList people={this.state.filteredList}></PeopleList>
        </div>
      </div>
    );
  }
});

export default People