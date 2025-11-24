# Express Book Reviews Application

This project is part of your Node.js learning journey and demonstrates
how to create REST APIs using **Express.js**, **Axios**, and **Promises
/ Async-Await**.\
It also includes tasks such as fetching books by **ISBN**, **Author**,
and **Title**, both using **callbacks** and **async--await**.

------------------------------------------------------------------------

## 📌 Project Overview

The application exposes REST API endpoints for:

-   Fetching all books\
-   Fetching books by ISBN\
-   Fetching books by Author\
-   Fetching books by Title\
-   Registering users\
-   Logging in users\
-   Managing book reviews

You implemented asynchronous versions using **Axios** and **Promises**,
especially for:

✔ Fetch book details by **Author**\
✔ Fetch book details by **Title**\
✔ Fetch book details by **ISBN**

------------------------------------------------------------------------

## 📁 Project Structure

    ├── index.js
    ├── package.json
    ├── controllers/
    │   └── auth.js
    ├── routes/
    │   ├── general.js
    │   └── auth_users.js
    ├── data/
    │   └── booksdb.js
    └── README.md

------------------------------------------------------------------------

## 🚀 How to Run the Project

### **1. Install dependencies**

    npm install

### **2. Start the server**

    node index.js

If nodemon is installed:

    npm run dev

------------------------------------------------------------------------

## 🔥 APIs Implemented

### **1. Get all books (Async/Await + Axios)**

    GET http://localhost:5000/

### **2. Get book by ISBN (Async/Await + Axios)**

    GET /isbn/:isbn

### **3. Get books by Author (Async/Await + Axios)**

    GET /author/:author

### **4. Get books by Title (Async/Await + Axios)**

    GET /title/:title

------------------------------------------------------------------------

## 📘 Example Code (Author Search)

    public_users.get('/author/:author', async (req, res) => {
      try {
        const authorName = req.params.author;

        const response = await axios.get('http://localhost:5000/');
        const books = response.data;

        const bookArray = Object.values(books);
        const filteredBooks = bookArray.filter(book => book.author === authorName);

        if (filteredBooks.length > 0) {
          res.send(JSON.stringify(filteredBooks, null, 4));
        } else {
          res.status(404).send("Book not found");
        }
      } catch (err) {
        res.status(500).send(err.message);
      }
    });

------------------------------------------------------------------------

## 📘 Example Code (Title Search)

    public_users.get("/title/:title", async (req, res)=>{
      try {
        const title = req.params.title;
        const response = await axios.get("http://localhost:5000/");

        const books = response.data;
        const bookArray = Object.values(books);

        const filteredBooks = bookArray.filter(book => book.title === title);

        if (filteredBooks.length > 0) {
          res.send(JSON.stringify(filteredBooks, null, 4));
        } else {
          res.status(404).send("Book not found");
        }
      } catch (err) {
        res.status(500).send(err.message)
      }
    });

------------------------------------------------------------------------

## 🧪 Testing the APIs

You can test APIs using:

-   **Postman**
-   **Thunder Client (VS Code)**
-   **Browser (GET requests only)**

------------------------------------------------------------------------

## 📜 Features Completed from Assignment

  Task      Description                  Status
  --------- ---------------------------- --------
  Task 4    Get books by title           ✔ Done
  Task 10   Promise-based ISBN fetch     ✔ Done
  Task 11   Promise-based Author fetch   ✔ Done
  Task 12   Promise-based Title fetch    ✔ Done
  Task 13   Async-Await using Axios      ✔ Done

------------------------------------------------------------------------

## 📝 Conclusion

This project helped you practice:

-   Express routing\
-   Axios with async/await\
-   Promises\
-   Filtering JSON data\
-   Writing REST API endpoints

