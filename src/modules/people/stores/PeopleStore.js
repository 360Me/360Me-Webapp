import React from "react";
import Reflux from "reflux";
import PeopleActions from "../actions/PeopleActions";
import request from "superagent";
/** Some mock data */
let peopleMock = [{
    id: 0,
    firstName: "Joel",
    lastName: "Peters",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/jlantunez/128.jpg",
    isCoworker: true
}, {
    id: 2,
    firstName: "Clay",
    lastName: "Mathews",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/peterlandt/128.jpg",
    isCoworker: false
}, {
    id: 3,
    firstName: "Jackson",
    lastName: "Teller",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/mijustin/128.jpg",
    isCoworker: true
}, {
    id: 4,
    firstName: "Jemma",
    lastName: "Teller",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/jina/128.jpg",
    isCoworker: false
}, {
    id: 5,
    firstName: "Opie",
    lastName: "Badass",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/emirik/128.jpg",
    isCoworker: false
}, {
    id: 6,
    firstName: "Chuck",
    lastName: "Weirdo",
    avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/shalt0ni/128.jpg",
    isCoworker: false
}];

function getItemByKey(list,itemKey) {
  return list.find(function (item) {
    return item.id === itemKey;
  });
}

// Creates a DataStore
let PeopleStore = Reflux.createStore({
    data: {
        people: peopleMock
    },
    propTypes: {
            people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
    listenables: [PeopleActions],
    // Initial setup
    init: function() {},
    // Handle actions
    onAddCoworker: function(itemKey) {
       let foundItem = getItemByKey(this.data.people, itemKey);
       if (!foundItem) return;

       foundItem.isCoworker = true;
       this.updatePeople(this.data.people);
    },
    onRemoveCoworker: function(itemKey) {
      let foundItem = getItemByKey(this.data.people, itemKey);
       if (!foundItem) return;

       foundItem.isCoworker = false;
       this.updatePeople(this.data.people);
    },
    // called whenever we change a list. normally this would mean a database API call
    updatePeople: function(people) {
        // localStorage.setItem(localStorageKey, JSON.stringify(list));
        // if we used a real database, we would likely do the below in a callback
        this.data.people = people;
        this.trigger(people); // sends the updated list to all listening components (TodoApp)
    },
    // this will be called by all listening components as they register their listeners
    getInitialState: function() {
        return {
            people: this.data.people
        }
    }
});
export default PeopleStore