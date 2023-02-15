module.exports = (sequelize, Sequelize) => {
  const Stylisticdevice = sequelize.define("stylisticdevice", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
  }, {
    timestamps: false
  });

  return Stylisticdevice;
};
