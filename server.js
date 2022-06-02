const express = require("express");

// Initialize environment variables
require("dotenv").config();

//Initialize express
let app = express();

//Render static files directory
app.use(express.static("public"));

// Set port and start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}.`)
);
