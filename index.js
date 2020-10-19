"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const handlers = require("./handlers");
const path = require("path");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  // .use("/", express.static(path.join(__dirname, "build")))

  // REST endpoints
  .get("/items", handlers.handleItems)
  .get("/items/:itemId", handlers.handleItem)
  .get("/companies", handlers.handleCompanies)
  .get("/companies/:companyId", handlers.handleCompany)
  .get("/categories", handlers.handleCategories)
  .get("/categories/:categoryName", handlers.handleCategory)
  .put("/order", handlers.handlePurchase)

  // .get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, 'build', 'index.html'));
  // })  
  .get("/*", (req, res) => {
    res.send("this works!");
  })  


  .listen(process.env.PORT || PORT, () => console.info(`Listening on port ${PORT}`));
