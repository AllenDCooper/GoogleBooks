import React, { Component } from "react";
import Nav from "../components/Nav/Nav.js";
import Header from "../components/Header/Header.js";
import Axios from "axios";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { BookCardContainer, BookCardItem } from "../components/BookCard/BookCard.js"


class Search extends Component {
  
  state = {
    searchTerm: "",
    foundBooks: []
  }

  handleChange = (event) => {
    let value = event.target.value
    this.setState({
      searchTerm: value
    })
  }
  
  getBooks = (event) => {
    event.preventDefault();
    let queryTerm = this.state.searchTerm.replace(/\s+/g, '+').toLowerCase()
    let queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + queryTerm
    Axios.get(queryURL).then(response => {
      console.log(response)
      this.setState({
          foundBooks: response.data.items
      })
      console.log(this.state.foundBooks);
    })
    .catch(error => {
        console.log(error)
        this.setState({
            foundBooks: "no books found"
        })
    });
  };

  saveBook = (id) => {
    console.log(id);
    Axios.post("/api/saved", {
      bookData: this.state.foundBooks[id]
    })
    .then(response => {
      console.log(response);
      window.location.replace("/saved");
    })
    .catch(err => {
      console.log(err)
    }) 
  }

  render() {
    return(
      <div>
        <Nav/>
        <Container>
          <Header/>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.searchTerm}
              fullWidth
            />
            <Button onClick={this.getBooks} variant="contained" color="primary">
              Search
            </Button>
          </form>
          <BookCardContainer>
            {this.state.foundBooks.map( (item, iterator) => (
              <BookCardItem bookElement={item} id={iterator} title={item.volumeInfo.title} authors={item.volumeInfo.authors.join(", ")} description={item.volumeInfo.description} imageLink={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "https://books.google.com/googlebooks/images/no_cover_thumb.gif"}  link={item.volumeInfo.previewLink} saveBookFunction={this.saveBook} />
            ))}
          </BookCardContainer>
        </Container>
      </div>
    )
  }
}

export default Search;