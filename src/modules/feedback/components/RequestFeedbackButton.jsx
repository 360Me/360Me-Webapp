import React from "react";
import Reflux from "reflux";
import FeedbackActions from "../actions/FeedbackActions";

let RequestFeedbackButton = React.createClass({
  propTypes: {
    from: React.PropTypes.string.isRequired
  },


  componentDidMount: function() {
      /** Note - Store subscription handled in mixin */
  },
  componentWillUnmount: function() {
    /** Note - Store unsubscription handled in mixin */
  },

  handleRequestFeedback: function (event) {
    FeedbackActions.createFeedbackRequest(this.props.from);
    swal("Feedback Requested", "You requested feedback from [name]", "success")
  },

  render: function() {
    return (
         <button className="person-item-button" onClick={this.handleRequestFeedback}>Request Feedback</button>
      )
  }
});

export default RequestFeedbackButton