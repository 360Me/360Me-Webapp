import React from "react";
import Authentication from "../../../common/authentication";

/*
 * Parent view for profile page.
 */

let Profile = React.createClass({
  mixins: [ Authentication ],

  render: function () {
    var token = Authentication.getToken();
    return (
      <div>
        <h1>Profile</h1>
        <p>You made it!</p>
      </div>
    );
  }
});

export default Profile