//create HTTP server
const exp = require("express");
const app = exp();

//Connect to mongodb server
const {MongoClient}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017')
.then(mClient=>{
    //get database object
    const dbObj=mClient.db('testvnr')
    //get users  & products collection objects 
    const usersCollectionObj=dbObj.collection("users")
    const productsCollectionObj=dbObj.collection("products")
    //share usersCollectionObj to userApi
    app.set('usersCollectionObj',usersCollectionObj)
    app.set('productsCollectionObj',productsCollectionObj)
    //assign port number
    app.listen(3000, () => console.log("server on port 3000..."));
    console.log("DB connection success")


})
.catch(err=>console.log("err in connecting db :",err))



//import user and product apps
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productApi");

//if path starts with user-api, then send req to userApi.js
app.use("/user-api", userApp);

//if path starts with product-api, then send req to productApi.js
app.use("/product-api", productApp);





//db.users.insertOne()
//usersCOllection.insertOne()