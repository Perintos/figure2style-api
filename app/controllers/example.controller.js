
// Create and Save a new example
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a example
  const example = {
    name: req.body.name,
    description: req.body.description,
  };

  // Save example in the database
  Examples.create(example)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Examples."
      });
    });
};

// Retrieve all example from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Examples.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving examples."
      });
    });
};

// Find a single example with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Examples.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find example with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving example with id=" + id
      });
    });
};

// Update a example by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Examples.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "example was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update example with id=${id}. Maybe example was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating example with id=" + id
      });
    });
};

// Delete a example with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Examples.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "example was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete example with id=${id}. Maybe example was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete example with id=" + id
      });
    });
};

// Delete all example from the database.
exports.deleteAll = (req, res) => {
  Examples.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} examples were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all examples."
      });
    });
};
