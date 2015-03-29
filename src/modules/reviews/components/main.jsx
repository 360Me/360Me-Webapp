import React from "react";
import Authentication from "../../../common/authentication";

/*
 * Parent view for profile page.
 */

let Reviews = React.createClass({
  mixins: [ Authentication ],

  render: function () {
    var token = Authentication.getToken();
    return (
      <div>
        <h1>Reviews</h1>
        <p>You made it!</p>
      </div>
    );
  }
});

export default Reviews