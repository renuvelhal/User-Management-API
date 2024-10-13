//starting point of our app
import express from "express";
import bodyParser from "body-parser"; //this allows us to take incomming post request body
import usersRoutes from "./routes/users.js"; // we have made a default export of the users file so we can import it with any name and usersRoutes is the given name because it very descriptive

const app = express(); // called express a s func
const PORT = 5000; // port for our backend capital letter because we will never change port
app.use(bodyParser.json()); // initialized body parser middleware bodyParser.json() tells us that we will use json data in our whole application

app.use("/users", usersRoutes); //starting path for all the files in user.js in there we are specifying the path of /users
//in the above line we specif what happens when the users visit the users file what routes we are going to run

//creating our first route below through get req the first param is path we are expecting our get request to i.e "/" when we make a  get requets at "/" we get the response as welcome to home page browsers can only make a get request to google.com domain
app.get("/", (req, res) => res.send("Hello From home page"));
app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
); // specifying the PORT on which we want our application to listen onto
