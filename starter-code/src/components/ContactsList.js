import React, { Component } from "react";
import Contact from "./Contact";
import AddContact from "./AddContact";

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: props.contacts.splice(0, 5)
    };
  }

  deleteContactHandler = contactIndex => {
    const contactsCopy = [...this.state.contacts];
    contactsCopy.splice(contactIndex, 1);
    this.setState({
      contacts: contactsCopy
    });
  };

  addContactHandler = contact => {
    const contactsCopy = [...this.state.contacts];
    contactsCopy.unshift(contact);
    this.setState({
      contacts: contactsCopy
    });
  };

  addContact = () => {
    let rand = Math.floor(Math.random() * this.props.contacts.length);
    let contact = this.props.contacts[rand];
    const contactsNew = [...this.state.contacts]; // or .slice()
   
    contactsNew.unshift(contact);
    this.setState({ contacts: contactsNew });
  };

  sortByName = () => {
    let sortedByName = [...this.state.contacts].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    this.setState({ contacts: sortedByName });
  };

  sortByPopularity = () => {
    let sortedByPop = [...this.state.contacts].sort((a, b) => {
      return b.popularity - a.popularity;
    });
    this.setState({ contacts: sortedByPop });
  };

  render() {
    return (
      <div>
        <AddContact addTheContact={this.addContactHandler} />
        <button onClick={this.addContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by Name</button>
        <button onClick={this.sortByPopularity}>Sort by Popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((el, index) => (
              <Contact
                key={index}
                {...el}
                clickToDelete={() => this.deleteContactHandler(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactsList;
