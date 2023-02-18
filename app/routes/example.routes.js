module.exports = app => {
    const { QueryTypes } = require('sequelize');

    const example = require("../controllers/example.controller.js");
    var router = require("express").Router();
    var db = require("../models/index.js")

    // Create a new example
    router.post("/", example.create);
  
    // Retrieve all example
    router.get("/", example.findAll);
  
    // // Retrieve a single example with id
    // router.get("/:id", example.findOne);
    
    // Retrieve a single stylisticdevice with id
    router.get('/random', async (req, res) => {
        await db.sequelize.query("SELECT * FROM examples ORDER BY rand() LIMIT 10;" ,{ type: QueryTypes.SELECT }
        ).then( (results) => {
            res.send(results).end();
        }).catch( err => {
            res.status(500).send('Err executing command ' + err).end()
        });
    })
  
    // Update a example with id
    router.put("/:id", example.update);
  
    // Delete a example with id
    router.delete("/:id", example.delete);
  
    // Delete all example
    router.delete("/", example.deleteAll);
  
    app.use('/example', router);
  };
  