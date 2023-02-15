module.exports = app => {
  const stylisticdevice = require("../controllers/stylisticdevice.controller.js");

  var router = require("express").Router();

  // Create a new stylisticdevice
  router.post("/", stylisticdevice.create);

  // Retrieve all stylisticdevice
  router.get("/", stylisticdevice.findAll);

  // Retrieve a single stylisticdevice with id
  router.get("/:id", stylisticdevice.findOne);

  // Update a stylisticdevice with id
  router.put("/:id", stylisticdevice.update);

  // Delete a stylisticdevice with id
  router.delete("/:id", stylisticdevice.delete);

  // Delete all stylisticdevice
  router.delete("/", stylisticdevice.deleteAll);

  app.use('/stylisticdevice', router);
};
