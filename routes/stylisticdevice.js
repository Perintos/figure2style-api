var express = require('express');
var StylisticDevice = require("../model/stylisticdevice")
var router = new express.Router();

/* GET stylisticdevice lisiting. */
router.get('/', function(req, res, next) {
  res.send('get stylisticdevice')
});

router.get('/:id', function(req, res, next) {
  res.send('get stylisticdevice id')
});


router.post('/', function (req, res) {
  res.send('post stylisticdevice')
});

router.put('/', function (req, res) {
  res.send('put stylisticdevice')
});

router.delete('/', function (req, res) {
  res.send('delete stylisticdevice')
});

module.exports = router;
