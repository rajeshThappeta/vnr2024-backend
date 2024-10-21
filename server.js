//create HTTP server
const exp = require("express");
const app = exp();
//assign port number
app.listen(3000, () => console.log("server on port 3000..."));

//import user and product apps
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productApi");

//if path starts with user-api, then send req to userApi.js
app.use("/user-api", userApp);

//if path starts with product-api, then send req to productApi.js
app.use("/product-api", productApp);


