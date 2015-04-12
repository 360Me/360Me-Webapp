import React from "react";
import Reflux from "reflux";
import FeedbackActions from "../actions/FeedbackActions";
import request from "superagent";

function getItemByKey(list, itemKey) {
    return list.find(function(item) {
        return item.id === itemKey;
    });
}
// Creates a DataStore
let FeedbackStore = Reflux.createStore({
    data: {
        feedbacks: [{id: 0, text: "Test feedbacl"}, {id: 1, text: "More feedback yo"}],
        feedbackRequests: []
    },
    propTypes: {
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    listenables: [FeedbackActions],
    // Initial setup
    init: function() {},
    /*
     * Respond to actions
     */
    onCreateFeedback: function(feedbackItem) {
        console.log(feedbackItem)
        return;
        /*
         * Send data to server
         */


         /*
          * Update locally
          */
        this.updateFeedback([{
            id: todoCounter++,
            created: new Date(),
            to: feedbackItem.to,
            text: feedbackItem.text
        }].concat(this.data.feedbacks));

    },
    onCreateFeedbackRequest: function (personId) {
        console.log(personId)
        /*
         * Send data to server
         */

         /*
          * Update locally
          */
        this.updateFeedbackRequests([{
           to: personId
        }].concat(this.data.feedbackRequests));
    },
    /*
     * Update function (send local data to remote)
     */
    // called whenever we change a list. normally this would mean a database API call
    updateFeedback: function(feedbacks) {
        // localStorage.setItem(localStorageKey, JSON.stringify(list));
        // if we used a real database, we would likely do the below in a callback
        this.data.feedbacks = feedbacks;
        this.trigger(feedbacks); // need to send feedbackRequests also?
    },
    updateFeedbackRequests: function (feedbackRequests) {
        this.data.feedbackRequests = feedbackRequests;
        this.trigger(feedbackRequests); // need to send feedbacks also?
    },
    // this will be called by all listening components as they register their listeners
    getInitialState: function() {
        return {
            feedbacks: this.data.feedbacks,
            feedbackRequests: this.data.feedbackRequests
        }
    }
});
export
default FeedbackStore