import React from "react";
import Reflux from "reflux";
import FriendsStore from "../stores/FriendsStore";

let FriendsList = React.createClass({
    mixins: [Reflux.ListenerMixin, Reflux.connect(FriendsStore)],

    initialize: function() { },

    componentDidMount: function() {
       /** Note - Store subscription handled in mixin */
    },
    componentWillUnmount: function() {
      /** Note - Store unsubscription handled in mixin */
    },
    render: function() {
        return (
          <ul>
            {this.state.friends.map(function(friend, i){
                return (
                  <li friend={friend} key={i}>
                    <img src={friend.avatar_url} />
                    <h4>{friend.firstName} {friend.lastName}</h4>
                  </li>
                );
            })}
          </ul>
        )
    }
});

export default FriendsList