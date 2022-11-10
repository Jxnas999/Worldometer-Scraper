/* IMPORTANT: If you decide to use this script and especially the Routes on a publicly accessable Server make sure to PROTECT these Routes
otherwise it is possible for people to POST or UPDATE things in your Database. For more Information https://dev.to/medaymentn/securing-your-node-js-api-with-json-web-token-5o5
 */
const express = require("express");
const { findOneAndUpdate, db } = require("../models/dataModel");
const router = express.Router();
const DataModel = require("../models/dataModel");

router.get("", async (req, res) => {
  const data = await DataModel.find({}, { _id: 0 });
  res.json(data);
});

router.get("/category/:category", async (req, res) => {
  const data = await DataModel.find(
    { category: req.params.category },
    { _id: 0 }
  );
  res.json(data);
});

router.post("/data", async (req, res) => {
  const data = await DataModel.create({
    item: req.body.item,
    counter: req.body.counter,
    category: req.body.category,
  });
  res.json(data);
});

router.put("/data/:id", async (req, res) => {
  
  DataModel.findOneAndUpdate({item: `${req.params.id}`}, 
  {counter: req.body.counter}, (error, data) => {
    if(error){
    console.log(error)
  }
    else{
      res.json(data);
    }
  }
  )
  
});
module.exports = router;
