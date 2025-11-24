const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) {
      return true;
    }
  }

  return false;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  for (let user of users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }

  return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  //Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  //Authenticateuser
  if (authenticatedUser(username, password)) {
    //Generate the jwt token
    let accessToken = jwt.sign(
      {
        data: username,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    //store acccess token and usrename in session
    req.session.authorization = {
      accessToken,
      username,
    };

    console.log("Session stored:",req.session.authorization);
    return res.status(202).send("User succesfully logged in");

  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login.Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  //get the isbn,review,and username
  let isbn=req.params.isbn
  let review=req.query.review
  let username=req.session.authorization.username

  //Chck if ISBN id exits
  if(!books[isbn]){
    return res.status(404).json({message:"Book not found"})
  }

  //Check if  the review text is  provided
  if(!review){
    return res.status(404).json({message:"Review text missing"});
  }

  //Add or modify the review
  books[isbn].reviews[username]=review


  return res.send('Review added/Updated successfullt!!')
  
});



//deleting a book review 
regd_users.delete("/auth/review/:isbn", (req, res) => {
  let isbn=req.params.isbn
  let username=req.session.authorization.username


  //Chck if ISBN id exits
  if(!books[isbn]){
    return res.status(404).json({message:"Book not found"})
  }


  if(books[isbn].reviews[username]){
    delete books[isbn].reviews[username]
    return res.send("Review deleted successfully");
}
  
 return res.status(404).send('No review found for this user')


});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
