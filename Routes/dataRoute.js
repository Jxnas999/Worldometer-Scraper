const express = require("express");
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
  const data = await DataModel.findById(req.params.id);
  if (!data) {
    res.status(400);
    console.log("Data not found");
  }

  const updateData = await DataModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updateData);
});
module.exports = router;
