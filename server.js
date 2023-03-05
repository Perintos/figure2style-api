const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: ["http://localhost:4200","*", "http://www.perintos.fr/"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/models/database.js")

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const stylisticdeviceRouter = require("./app/routes/stylisticdevice.routes");
app.use("/stylisticdevice", stylisticdeviceRouter);

const exempleRouter = require("./app/routes/example.routes");
app.use("/example", exempleRouter);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
