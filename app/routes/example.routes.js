

const example = require("../controllers/example.controller.js");
var router = require("express").Router();
const mysql = require('mysql2');
const dbConfig = require("../config/db.config.js");

const findAll ='SELECT * FROM example'
const random ='SELECT * FROM example ORDER BY rand() LIMIT 10;'

// Create a new example
router.post("/", example.create);

router.get('/', async (req, res) => {
    con = mysql.createConnection(dbConfig)
    con.connect(function(err) {
        if (err) res.send(err);
        con.query(findAll, function (err, result) {
            if (err) res.send(err);
            res.send(JSON.stringify(result));
            con.end()
        });
    })
});

// // Retrieve a single example with id
// router.get("/:id", example.findOne);

// Retrieve a single stylisticdevice with id
router.get('/random', async (req, res) => {
    con = mysql.createConnection(dbConfig)
    con.connect(function(err) {
        if (err) res.send(err);
        con.query(random, function (err, result) {
            if (err) res.send(err);
            res.send(JSON.stringify(result));
            con.end()
        });
    })
})

// Update a example with id
router.put("/:id", example.update);

// Delete a example with id
router.delete("/:id", example.delete);

// Delete all example
router.delete("/", example.deleteAll);

module.exports = router;

