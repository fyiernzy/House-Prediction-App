import React, { useState } from "react";
import FormInput from "./FormInput";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    bedrooms: 0,
    bathrooms: 0,
    sqftLiving: 0,
    floors: 0,
    zipcode: 0,
    age: 0,
    pricePerSqft: 0,
    renovated: 0,
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setPrediction(data))
      .catch((error) => console.error("Error:", error));
  };

  const formProps = [
    { label: "Bedrooms", name: "bedrooms" },
    { label: "Bathrooms", name: "bathrooms" },
    { label: "Sqft Living", name: "sqftLiving" },
    { label: "Floors", name: "floors" },
    { label: "Zipcode", name: "zipcode" },
    { label: "Age", name: "age" },
    { label: "Price per Sqft", name: "pricePerSqft" },
    { label: "Renovated", name: "renovated" },
  ];

  return (
    <div className="border border-black-100 h-screen w-screen flex flex-col justify-center items-center m-0">
      <h1 className="text-3xl my-8 font-bold m-0">House Price Prediction</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 h-4/5 w-4/5 md:w-3/5 xl:w-2/5 m-0"
      >
        {formProps.map((prop, index) => (
          <FormInput
            key={index}
            label={prop.label}
            name={prop.name}
            value={formData[prop.name]}
            onChange={handleChange}
          />
        ))}
        <input
          className="mx-auto w-full bg-blue-500 text-white font-bold mt-3 mb-5 py-2 px-4 rounded hover:bg-blue-700 hover:shadow-md hover:shadow-slate-400"
          type="submit"
          value="Predict"
        />
      </form>
      {prediction && (
        <div>
          <h2>Predicted Price: ${prediction}</h2>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
