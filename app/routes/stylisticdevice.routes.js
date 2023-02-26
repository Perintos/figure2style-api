const stylisticDeviceController = require("../controllers/stylisticdevice.controller.js");
var router = require("express").Router();
const mysql = require('mysql2');
const dbConfig = require("../config/db.config.js");

const findAll ='SELECT * FROM stylisticdevice'
const randomThree ='SELECT * FROM stylisticdevice as fs WHERE fs.id!= ? ORDER BY rand() LIMIT 3;'
const findOne = 'Select * FROM stylisticdevice as s, example as e where s.id=e.id_stylistic_device && s.id= ?';

router.post("/", stylisticDeviceController.create);

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
})

router.get('/random/:id', async (req, res) => {
  con = mysql.createConnection(dbConfig)
  con.connect(function(err) {
    if (err) res.send(err);
    con.query(randomThree.replace('?',req.params.id), function (err, result) {
      if (err) res.send(err);
      res.send(JSON.stringify(result));
      con.end()
    });
  })
})

router.get('/:id', async (req, res) => {
  con = mysql.createConnection(dbConfig)
  con.connect(function(err) {
    if (err) res.send(err);
    con.query(findOne.replace('?',req.params.id), function (err, result) {
      if (err) res.send(err);
      res.send(JSON.stringify(result[0]));
      con.end()
    });
  })
})

router.put("/:id", stylisticDeviceController.update);

router.delete("/:id", stylisticDeviceController.delete);

router.delete("/", stylisticDeviceController.deleteAll);

module.exports = router;
