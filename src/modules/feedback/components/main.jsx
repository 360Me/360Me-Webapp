import React from "react";
import Reflux from "reflux";
import FeedbackStore from "../stores/FeedbackStore";

/*
 * Parent view for profile page.
 */

let Feedback = React.createClass({
  mixins: [Reflux.ListenerMixin, Reflux.connect(FeedbackStore)],

  render: function () {
    return (
      <div>
        <h1>Feedback</h1>

         <ul>
            {this.state.feedbacks.map((feedback, i) => {
                return (
                  <li key={feedback.id}>{feedback.text}</li>
                );
            })}
          </ul>
      </div>
    );
  }
});

export default Feedback