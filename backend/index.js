const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/predict", async (req, res) => {
  const { features } = req.body;
  try {
    const response = await axios.post("http://localhost:5000/predict", {
      bedrooms: features.bedrooms,
      bathrooms: features.bathrooms,
      sqft_living: features.sqft_living,
      floors: features.floors,
      zipcode: features.zipcode,
      age: features.age,
      price_per_sqft: features.price_per_sqft,
      renovated: features.renovated,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
