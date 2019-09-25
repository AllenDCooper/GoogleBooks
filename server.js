const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require ("mongoose");
const router = express.Router();
const Books = require("./models/book.js");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

// Define API routes here
// save a book
app.post("/api/saved/", function(req, res) {
  console.log(req);
  Books.create({
    title: req.body.bookData.volumeInfo.title,
    authors: req.body.bookData.volumeInfo.authors.join(", "),
    description: req.body.bookData.volumeInfo.description,
    imageLink: req.body.bookData.volumeInfo.imageLinks ? req.body.bookData.volumeInfo.imageLinks.thumbnail : "https://books.google.com/googlebooks/images/no_cover_thumb.gif",
    infoLink: req.body.bookData.volumeInfo.previewLink
  })
  .then(res.send("Book successfully saved"))
  .catch(err => res.status(422).json(err))
})
// get saved books
app.get("/api/saved", function(req, res) {
  Books.find({})
  .then(bookData => res.json(bookData))
  .catch(err => res.status(422).json(err))
})

app.delete("/api/saved", function(req, res) {

})

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
