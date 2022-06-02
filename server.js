const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

// Initialize environment variables
require("dotenv").config();

//Initialize express
let app = express();

//Render static files directory
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

//Create client object for mongodb
const client = new MongoClient(process.env.DB_URL);

app.get("/", (req, res)=>{
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
})

app.get("/medicines", (req, res) => {
  client
    .connect()
    .then((client) => {
      let db = client.db("medicine-tracker");
      let collection = db.collection("medicines");
      let medicines = collection.find().toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Some unknown error has occured." });
    });
});

app.post("/add", (req, res) => {
  client
    .connect()
    .then((client) => {
      let { name, quantity, min } = req.body;
      quantity = parseInt(quantity);
      min = parseInt(min);
      let obj = { name, quantity, min };

      let db = client.db("medicine-tracker");
      let collection = db.collection("medicines");
      collection.insertOne(obj, (err, result) => {
        if (err) throw err;
        console.log("Document inserted successfully.", obj);
        res.sendFile(path.resolve(__dirname, "public", "index.html"));
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Some unknown error has occured." });
    });
});

app.post("/week", (req, res) => {
  client
    .connect()
    .then((client) => {
      let db = client.db("medicine-tracker");
      let collection = db.collection("medicines");

      collection.updateMany(
        {},
        [{ $set: { quantity: { $subtract: ["$quantity", "$min"] } } }],
        (err, result) => {
          if (err) throw err;
          console.log("Document updated successfully.");
          res.sendFile(path.resolve(__dirname, "public", "index.html"));
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Some unknown error has occured." });
    });
});

// Set port and start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}.`)
);
