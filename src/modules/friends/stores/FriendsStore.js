import Reflux from "reflux";
import FriendActions from "../actions/FriendActions";
import request from "superagent";

/** Some mock data */
let friendsMocks = [
    {
      id: 0,
      firstName: "Joel",
      lastName: "Peters",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/jlantunez/128.jpg"
    },

    {
      id: 2,
      firstName: "Clay",
      lastName: "Mathews",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/peterlandt/128.jpg"
    },

    {
      id: 3,
      firstName: "Jackson",
      lastName: "Teller",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/mijustin/128.jpg"
    },

    {
      id: 4,
      firstName: "Jemma",
      lastName: "Teller",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/jina/128.jpg"
    },

    {
      id: 5,
      firstName: "Opie",
      lastName: "Badass",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/emirik/128.jpg"
    },

    {
      id: 6,
      firstName: "Chuck",
      lastName: "Weirdo",
      avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/shalt0ni/128.jpg"
    }
];

// Creates a DataStore
let FriendsStore = Reflux.createStore({
  data: { friends: friendsMocks },

  listenables: [FriendActions],
  // Initial setup
  init: function() {
  },
  // Handle actions
  onFriendAdded: function() {},
  onFriendRemoved: function() {},
  onFriendUpdated: function() {},

  // this will be called by all listening components as they register their listeners
  getInitialState: function() {
    return {
      friends: this.data.friends
    }
  }
});

export default FriendsStore