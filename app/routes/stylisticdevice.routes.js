const stylisticDeviceController = require("../controllers/stylisticdevice.controller.js");
var router = require("express").Router();
const mysql = require('mysql2');
const dbConfig = require("../config/db.config.js");
const logger = require('pino')()

const findAll ='SELECT * FROM stylisticdevice'
const randomThree ='SELECT * FROM stylisticdevice as fs WHERE fs.id!= ? ORDER BY rand() LIMIT 3;'
const findOne = 'Select s.id as id , s.name as name, s.description as description, e.text as text, e.id as id_example, e.author as author FROM stylisticdevice as s, example as e where s.id=e.id_stylistic_device && s.id= ?';

function insertOneRecord(stylisticdevice, example)  {
  let con = mysql.createConnection(dbConfig)
  con.connect(function(err) {
    if (err) res.send(err);
    con.query(stylisticdevice, function (err, result) {
      if (err) res.send(err);
      console.log("executed -> "+ stylisticdevice)

      con.query(example, [result.insertId], function (err, result) {
        if (err) res.send(err);
        console.log("executed -> "+ example)
        con.end()
      });
    });
  })
}

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

router.get('/initialize', async (req, res) => {
  const nReadlines = require('n-readlines');
  var path = require('path');
  const broadbandStylisticDevice = new nReadlines(path.join(__dirname)+'/../utils/insert-stylistic-device.sql'); 
  const broadbandExample = new nReadlines(path.join(__dirname)+'/../utils/insert-example.sql'); 
  let executeQueries = await function() {
      while (stylisticDevice = broadbandStylisticDevice.next() ) {
        example =  broadbandExample.next()
        insertOneRecord(stylisticDevice.toString('utf-8'), example.toString('utf-8'));
      }
  };
  executeQueries()
  res.send("ok");
});

router.get('/random/:id', async (req, res) => {
  con = mysql.createConnection(dbConfig)
  con.connect(function(err) {
    if (err) res.send(err);
    con.query(randomThree.replace('?',req.params.id), function (err, result) {
      if (err) res.send(err);

      logger.info(`router.get('/random/${req.params.id}`)
      result.forEach(element => {
        logger.info("stylistic_device =>  " + element.name)
      });

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
