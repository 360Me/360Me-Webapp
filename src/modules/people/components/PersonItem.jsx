import React from "react";
import Reflux from "reflux";
import PeopleActions from "../actions/PeopleActions";

let PersonItem = React.createClass({
  propTypes: {
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    avatarUrl: React.PropTypes.string.isRequired,
    isCoworker: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired
  },

    initialize: function() { },

    componentDidMount: function() {
       /** Note - Store subscription handled in mixin */
    },
    componentWillUnmount: function() {
      /** Note - Store unsubscription handled in mixin */
    },

    handleAddCoworker: function () {
      PeopleActions.addCoworker(this.props.id);
    },

    handleRemoveCoworker: function () {
      PeopleActions.removeCoworker(this.props.id);
    },

    render: function() {
        let coworkerOrNot = this.props.isCoworker ?
          <button onClick={this.handleRemoveCoworker}>Remove Co-Worker</button> :
          <button onClick={this.handleAddCoworker}>Add Co-Worker</button>;
        return (
          <div>
                <img src={this.props.avatar_url} />
                    <h4>{this.props.firstName} {this.props.lastName}</h4>
                    {coworkerOrNot}
                  </div>
        )
    }
});

export default PersonItem