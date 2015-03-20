import React from "react";
import Authentication from "../../../common/authentication";

import FriendsList from "./FriendsList";

/*
 * Parent view for requests page.
 */

let Friends = React.createClass({
  mixins: [ Authentication ],

  render: function () {
    var token = Authentication.getToken();
    return (
      <div>
        <h1>Friends</h1>
        <FriendsList></FriendsList>
      </div>
    );
  }
});

export default Friends