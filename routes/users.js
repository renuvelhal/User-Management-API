// the file all of our routes start with
import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router(); // a router coming from express
let users = []; // changed from const to let, allowing reassignment of the filtered users array

router.get("/", (req, res) => {
  // all routes in here are starting with / we have already been redirected to this file for path /users
  // if we again write /users over here it would be redundant making it look like /users/users
  res.send(users); // just so that we can know if we got in a correct route in the browser
});

router.post("/", (req, res) => {
  // this particular function generates unique user IDs and we want to call this function to generate a new userID when we are generating a new user
  const user = req.body;
  users.push({ ...user, id: uuidv4() }); // creating a new object using the spread operation to convert the object 'user' into iterables, adding a unique id to the user and pushing it onto the database
  res.send(`User with the name ${user.firstName} added to the database.`); // corrected field to firstName based on your comments
});

// it is a POST request as we are sending data from frontend to the database. The data will be the values in the form that the user imported, e.g., sign up or log in. We send the data from client to server
router.get("/:id", (req, res) => {
  // when you go to the users/any random id, this route is going to be hit and that response is going to be sent
  const { id } = req.params; // destructuring only id as we know that through req.params we can get the id

  const found_user = users.find((user) => user.id === id);

  res.send(found_user);
}); // we show the details of the user with that id through the param and here the param is the id

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id); // filter() removes the user where id matches the id passed in the route

  res.send(`User with the id ${id} deleted from the database.`);
});

router.patch("./:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body; //we send all the param from the client in my case postman

  const user = users.find((user) => user.id === id);
  if (firstName) {
    // if we have the value of firstname recieved from the param to be updated
    user.firstName = firstName;
  }
  if (lastName) {
    user.firstName = lastName;
  }
  if (firstName) {
    user.age = age;
  }
  res.send(`User with the id ${id} has been updated`);
});

export default router; // exporting it so that we can make use of it in index.js file
