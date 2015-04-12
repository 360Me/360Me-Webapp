import React from "react";
import Authentication from "../../../common/authentication";

/*
 * Parent view for requests page.
 */

let Requests = React.createClass({
  mixins: [ Authentication ],

  render: function () {
    var token = Authentication.getToken();
    return (
      <div>
        <h1>Requests</h1>
      </div>
    );
  }
});

export default Requests