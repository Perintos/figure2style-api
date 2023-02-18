module.exports = (sequelize, Sequelize) => {
  const Example = sequelize.define("example", {
    id_stylistic_device: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
  }, {
    timestamps: false
  });

  return Example;
};
