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
          <button className="person-item-button person-item-button-remove" onClick={this.handleRemoveCoworker}>Remove Co-Worker</button> :
          <button className="person-item-button" onClick={this.handleAddCoworker}>Add Co-Worker</button>;
        return (
          <div className="person-item">
                <div className="person-item-avatar">
                  <img src={this.props.avatarUrl}/>
                </div>
                <div className="person-item-content">
                    <h4>{this.props.firstName} {this.props.lastName}</h4>
                    <h5>LinkedIn</h5>
                </div>
                {coworkerOrNot}
              </div>
        )
    }
});

export default PersonItem