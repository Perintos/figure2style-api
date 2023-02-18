module.exports = app => {
  const { QueryTypes } = require('sequelize');

  const stylisticdevice = require("../controllers/stylisticdevice.controller.js");
  var router = require("express").Router();
  var db = require("../models/index.js")

  // Create a new stylisticdevice
  router.post("/", stylisticdevice.create);

  // Retrieve all stylisticdevice
  // router.get("/", stylisticdevice.findAll);

  router.get('/', async (req, res) => {
    await db.sequelize.query("Select * FROM stylisticdevices" ,{ type: QueryTypes.SELECT }
      ).then( (results) => {
          res.send(results).end();
      }).catch( err => {
          res.status(500).send('Err executing command ' + err).end()
      });
  })

  router.get('/random/:id', async (req, res) => {
    await db.sequelize.query("SELECT * FROM stylisticdevices as fs WHERE fs.id!= ? ORDER BY rand() LIMIT 3;" ,{ type: QueryTypes.SELECT, replacements: [req.params.id] }
      ).then( (results) => {
          res.send(results).end();
      }).catch( err => {
          res.status(500).send('Err executing command ' + err).end()
      });
  })

  // // Retrieve a single stylisticdevice with id
  // router.get("/:id", stylisticdevice.findOne);

  // Retrieve a single stylisticdevice with id
  router.get('/:id', async (req, res) => {
    await db.sequelize.query("Select * FROM stylisticdevices as s, examples as e where s.id=e.id_stylistic_device && s.id= ?;" ,{ type: QueryTypes.SELECT, replacements: [req.params.id] }
      ).then( (results) => {
          res.send(results[0]).end();
      }).catch( err => {
          res.status(500).send('Err executing command ' + err).end()
      });
  })
  
  // Update a stylisticdevice with id
  router.put("/:id", stylisticdevice.update);

  // Delete a stylisticdevice with id
  router.delete("/:id", stylisticdevice.delete);

  // Delete all stylisticdevice
  router.delete("/", stylisticdevice.deleteAll);

  app.use('/stylisticdevice', router);
};
