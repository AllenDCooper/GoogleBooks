import React, { Component } from "react";
import Nav from "../components/Nav/Nav.js";
import Header from "../components/Header/Header.js";
import Axios from "axios";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


class Search extends Component {
  
  state = {
    searchTerm: "",
    foundBooks: ""
  }

  handleChange = (event) => {
    let value = event.target.value
    this.setState({
      searchTerm: value
    })
  }

  getBooks = () => {
      let queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchTerm

      Axios.get(queryURL).then(response => {
        console.log(response)
        this.setState({
            foundBooks: response
        })
      })
      .catch(error => {
          console.log(error)
          this.setState({
              foundBooks: "no books found"
          })
      });
  };

  render() {
    return(
      <div>
        <Nav/>
        <Header/>
        <Container maxWidth="sm">
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
        </Container>
      </div>
    )
  }
}

export default Search;