import React from "react";
import Reflux from "reflux";
import PeopleActions from "../actions/PeopleActions";
import FeedbackForm from "../../feedback/components/FeedbackForm"
import RequestFeedbackButton from "../../feedback/components/RequestFeedbackButton"
import Modal from "react-modal";

var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

let PersonItem = React.createClass({
  propTypes: {
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    avatarUrl: React.PropTypes.string.isRequired,
    isCoworker: React.PropTypes.bool.isRequired,
    //showModal:   React.PropTypes.func,
    id: React.PropTypes.number.isRequired
  },

  getInitialState: function () {
    return {modalIsOpen: false };
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

  /*
   * Modal methods
   */

  openModal: function (personId) {
    this.setState({modalIsOpen: true});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
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
                <div className="person-item-button-container-right">
                  <RequestFeedbackButton from={this.props.id}></RequestFeedbackButton>
                  <button className="person-item-button" onClick={this.openModal}>Send Review</button>
                </div>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={null}
                  closeTimeoutMS={10}
                >
                  <h1>Create Feedback</h1>
                  <FeedbackForm to={this.props.id} closeModal={this.closeModal}></FeedbackForm>
                  <button onClick={this.closeModal}>Cancel</button>
                </Modal>
              </div>
        )
    }
});

export default PersonItem