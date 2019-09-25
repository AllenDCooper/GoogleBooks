import React, { Component } from "react";
import Nav from "../components/Nav/Nav.js";
import Header from "../components/Header/Header.js";
import { SavedBookCardContainer, SavedBookCardItem }from "../components/SavedBookCardItem/SavedBookCardItem.js"
import Axios from "axios";

class Saved extends Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.getSavedBooks();
  };

  getSavedBooks = () => {
    Axios.get("/api/saved/")
    .then(response => {
      console.log(response.data);
      this.setState({
        savedBooks: response.data
      })
    })
    .catch(error => {
      this.setState({
        savedBooks: "error"
      })
      console.log(error)
    })
  }

  deleteBook = (bookID) => {
    console.log(bookID);
    Axios.delete("/api/saved/" + bookID)
    .then(response => {
      console.log(response);
      window.open("/saved");
    })
    .catch(err => {
      console.log(err)
    }) 
  }

  render() {
    return(
      <div>
        <Nav/>
        <Header/>
        <SavedBookCardContainer>
          {this.state.savedBooks.map( (item, iterator) => (
            <SavedBookCardItem {...item} deleteBookFunction={this.deleteBook} id={item._id}/>
          ))}
        </SavedBookCardContainer>
      </div>
    )
  }
}

export default Saved;