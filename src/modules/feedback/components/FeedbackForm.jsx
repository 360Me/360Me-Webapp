import React from "react";
import Reflux from "reflux";
import FeedbackActions from "../actions/FeedbackActions";

let FeedbackForm = React.createClass({
  propTypes: {
    to: React.PropTypes.string.isRequired,
    closeModal: React.PropTypes.func
  },

  getDefaultProps: function () {
    people: []
  },


  componentDidMount: function() {
      /** Note - Store subscription handled in mixin */
  },
  componentWillUnmount: function() {
    /** Note - Store unsubscription handled in mixin */
  },

  handleCreateFeedback: function (event) {
    let feedback = {
      to: this.props.to,
      text: this.refs.text.getDOMNode().value
    }
    FeedbackActions.createFeedback(feedback);

    if (this.props.closeModal) this.props.closeModal();
  },

  render: function() {
    return (
         <div>
          <textarea ref="text" autoFocus placeholder="Enter some feedback"></textarea>
          <button onClick={this.handleCreateFeedback}>Send feedback</button>
         </div>
      )
  }
});

export default FeedbackForm