//create mini express app
const exp = require("express");
const userApp = exp.Router();

//add body parser middleware
userApp.use(exp.json());

//create USER REST API(routes)

//route to handle get users
userApp.get("/users", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get users from db (find() returns db cursor, convert cursor to array using toArray())
  const usersList = await usersCollectionObj.find().toArray();
  //send res
  res.send({ message: "users", payload: usersList });
});

//route to handle get a user by id(URL param)
userApp.get("/users/:id", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");

  //get id from url
  const userId = Number(req.params.id);
  //find user by id
  const userObj = await usersCollectionObj.findOne({ id: userId });
  //send res
  res.send({ message: "user", payload: userObj });
});

//route to handle create user
userApp.post("/user", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get user obj from req.body
  const newUser = req.body;
  //insert into db
  await usersCollectionObj.insertOne(newUser);
  //send res
  res.send({ message: "User created" });
});

//route to handle update user
userApp.put("/user", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get modified user obj from req.body
  const modifiedUser = req.body;
  //update
  let dbRes = await usersCollectionObj.updateOne(
    { id: modifiedUser.id },
    { $set: { ...modifiedUser } }
  );
  console.log(dbRes);
  if (dbRes.modifiedCount === 1) {
    res.send({ message: "User updated" });
  } else {
    res.send({ message: "User not modified" });
  }
});

//route to handle delete a user by id
userApp.delete("/users/:id", async (req, res) => {
  //get usersCollectionObj
  const usersCollectionObj = req.app.get("usersCollectionObj");
  //get id from url
  const userId = Number(req.params.id);
  //delete
  let dbRes = await usersCollectionObj.deleteOne({ id: userId });
  console.log(dbRes);
  if (dbRes.deletedCount === 1) {
    res.send({ message: "User deleted" });
  } else {
    res.send({ message: "No user deleted" });
  }
});

module.exports = userApp;
