const db = require("../models");
const Stylisticdevice = db.stylisticdevice;
const Op = db.Sequelize.Op;

// Create and Save a new stylisticdevice
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a stylisticdevice
  const stylisticdevice = {
    name: req.body.name,
    description: req.body.description,
  };

  // Save stylisticdevice in the database
  Stylisticdevice.create(stylisticdevice)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stylisticdevice."
      });
    });
};

// Retrieve all stylisticdevice from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Stylisticdevice.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stylisticdevices."
      });
    });
};

// Find a single stylisticdevice with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stylisticdevice.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find stylisticdevice with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving stylisticdevice with id=" + id
      });
    });
};

// Update a stylisticdevice by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Stylisticdevice.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "stylisticdevice was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update stylisticdevice with id=${id}. Maybe stylisticdevice was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating stylisticdevice with id=" + id
      });
    });
};

// Delete a stylisticdevice with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Stylisticdevice.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "stylisticdevice was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete stylisticdevice with id=${id}. Maybe stylisticdevice was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete stylisticdevice with id=" + id
      });
    });
};

// Delete all stylisticdevice from the database.
exports.deleteAll = (req, res) => {
  Stylisticdevice.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} stylisticdevices were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stylisticdevices."
      });
    });
};
