import Request from "superagent";

function loggedIn() {
    return !!localStorage.token;
}

let Authentication = {
    statics: {
        willTransitionTo: function(transition) {
            let nextPath = transition.path;
            if (!loggedIn()) {
                transition.redirect('/login', {}, {
                    'nextPath': nextPath
                });
            }
        },
    },

    /**
     * Take the token we got from LinkedIn OAuth and send to our API
     * for confirmation. If it's a valid token, API will respond with
     * user object.
     **/
    authenticate: function (token, cb) {
      Request
        .get('http://localhost:1337/auth/user')
        .set('Accept', 'application/json')
        .set('token', token)
        .end((err, response) => {
          let user = JSON.parse(response.text).user; // stupid
          if (err) console.log(err);
          else if (user) {
            // So we can access globally
            window.user = user;
            // Save user to local storage
            localStorage.token = user.token;
            // Let app know we are logged in so it can reredner correct layout
            this.onChange(true);
          }
          cb(err, user);
        });
    },

    getToken: function() {
        return localStorage.token;
    },
    logout: function(cb) {
        delete window.user;
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false);
    },
    loggedIn: function() {
        return !!localStorage.token;
    },
    onChange: function() {}
};
export default Authentication