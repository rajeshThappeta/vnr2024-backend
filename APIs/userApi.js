//create mini express app
const exp = require("express");
const userApp = exp.Router();


//add body parser middleware
userApp.use(exp.json());

//create USER REST API(routes)
//test data(it will be replaced with DB later)
let users = [
  { id: 1, name: "kiran", age: 21 },
  { id: 2, name: "ravi", age: 23 },
];

//route to handle get users
userApp.get("/users", (req, res) => {
  //send all users
  res.send({ message: "all users", payload: users });
});

//route to handle get a user by id(URL param)
userApp.get("/users/:id", (req, res) => {
  // console.log(req.params) //{ id:  1 }
  //get id from url (convert the string ID to number ID)
  const paramId = Number(req.params.id);

  //search user with this paramId
  let result = users.find((user) => user.id === paramId);
  //if user not found
  if (result === undefined) {
    res.send({ mesage: "User not found" });
  }
  //if user found
  else {
    res.send({ message: "user", payload: result });
  }
});

//route to handle create user
userApp.post("/user", (req, res) => {
  //get user obj from req
  let newUser = req.body;
  //add newUser to users array
  users.push(newUser);
  //send
  res.send({ message: "New user created" });
});

//route to handle update user
userApp.put("/user", (req, res) => {
  //get modified user from client
  let modifiedUser = req.body;
  //find and replace user
  let userIndex = users.findIndex((user) => user.id === modifiedUser.id);
  //if user not found
  if (userIndex === -1) {
    res.send({ message: "User not found to update" });
  } else {
    users.splice(userIndex, 1, modifiedUser);
    res.send({ message: "User modified" });
  }
});

//route to handle delete a user by id
userApp.delete("/users/:id", (req, res) => {
  //get id from url param
  let paramId = Number(req.params.id);
  //find index of user matched with paramId
  let userIndex = users.findIndex((user) => user.id === paramId);
  //if user not found
  if (userIndex === -1) {
    res.send({ message: "User not found to delete" });
  } else {
    users.splice(userIndex, 1);
    res.send({ message: "User removed" });
  }
});

module.exports=userApp;
