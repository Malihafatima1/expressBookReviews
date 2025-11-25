const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send("Username/password missing");
  }
  //Username already exits
  for (let user of users) {
    if (user.username === username) {
      return res.send("User already exists");
    }
  }

  //Add new user
  users.push({ username, password });

  return res.send("User registered successfully");
});


// Get the book list available in the shop
public_users.get("/", (req, res) => {
  
  // async callback style function
  const getBooks = (callback) => {
    setTimeout(() => {
      callback(null, books); 
    }, 0);
  };

  getBooks((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(JSON.stringify(result, null, 4));
  });

});


// Get book details based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  axios
    .get("http://localhost:5000/")
    .then((response) => {
      const book = response.data[isbn];

      if (book) {
        res.send(JSON.stringify(book, null, 4));
      } else {
        res.status(404).send("Book not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});


// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  //Write your code here
  try {
    const authorName = req.params.author;

    const response = await axios.get("http://localhost:5000/");

    const book = response.data;

    const bookArray = Object.values(book);

    const filterdBooks = bookArray.filter((book) => book.author === authorName);

    if (filterdBooks.length > 0) {
      res.send(JSON.stringify(filterdBooks, null, 4));
    } else {
      res.status(404).send("Book not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all books based on title
public_users.get("/title/:title", async(req, res)=>{
  
try{
  const title = req.params.title;

  const response = await axios.get("http://localhost:5000/");

  const book = response.data;

  const bookArray = Object.values(book);

  const filteredBook=bookArray.filter(book=>book.title===title);
  
  if(filteredBook.length>0){
    res.send(JSON.stringify(filteredBook, null, 4));
  }else{
    res.status(404).send("Book not found");
  }
  }catch(err){
    res.status(500).send(err.message)
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn].reviews, null, 4));
  }
  return res.status(404).json({ message: "Not found" });
});

module.exports.general = public_users;
