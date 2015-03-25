import React from "react";
import Reflux from "reflux";
import PeopleActions from "../actions/PeopleActions";
import PersonItem from "../components/PersonItem";

let PeopleList = React.createClass({
  propTypes: {
    people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  getDefaultProps: function () {
    people: []
  },

    initialize: function() { },

    componentDidMount: function() {
       /** Note - Store subscription handled in mixin */
    },
    componentWillUnmount: function() {
      /** Note - Store unsubscription handled in mixin */
    },

    handleAddCoworker: function () {
      PeopleActions.addCoworker(this.props.id)
    },

    render: function() {
        return (
          <ul>
            {this.props.people.map((person, i) => {
                return (
                  <li><PersonItem firstName={person.firstName} lastName={person.lastName} avatarUrl={person.avatar_url} isCoworker={person.isCoworker} id={person.id} key={person.id}></PersonItem></li>
                );
            })}
          </ul>
        )
    }
});

export default PeopleList