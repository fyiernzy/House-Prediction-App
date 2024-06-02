import { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    bedrooms: "",
    bathrooms: "",
    sqft_living: "",
    floors: "",
    zipcode: "",
    age: "",
    price_per_sqft: "",
    renovated: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  const formProps = [
    { label: "Bedrooms", name: "bedrooms", placeholder: "Enter number of bedrooms" },
    { label: "Bathrooms", name: "bathrooms", placeholder: "Enter number of bathrooms" },
    { label: "Sqft Living", name: "sqft_living", placeholder: "Enter square footage of living area" },
    { label: "Floors", name: "floors", placeholder: "Enter number of floors" },
    { label: "Zipcode", name: "zipcode", placeholder: "Enter zipcode, e.g. 98019" },
    { label: "Age", name: "age", placeholder: "Enter age of the house" },
    { label: "Price per Sqft", name: "price_per_sqft", placeholder: "Enter price per square foot" },
    { label: "Renovated", name: "renovated", placeholder: "Enter year of renovation (if any)" },
  ];

  return (
    <div className="border border-black-100 flex flex-col justify-center items-center m-0">
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
            placeholder={prop.placeholder} 
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