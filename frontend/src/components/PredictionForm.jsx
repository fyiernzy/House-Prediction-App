import { useState } from "react";
import FormInput from "./FormInput";
import FormDropdown from "./FormDropdown";
import axios from "axios";
import house from "../assets/house2.jpg";
import "../css/styles.css"; // Import the CSS file

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
    grade: "",
    view: "",
    waterfront: "",  
  });

  const [errors, setErrors] = useState({});

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const numericFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        parseFloat(value) || 0,
      ])
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        numericFormData,
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
    {
      label: "Bedrooms",
      name: "bedrooms",
      type: "number",
      min: 1,
      max: 10,
    },
    {
      label: "Bathrooms",
      name: "bathrooms",
      type: "number",
      min: 1,
      max: 10,
    },
    {
      label: "Sqft Living",
      name: "sqft_living",
      type: "number",
    },
    {
      label: "Floors",
      name: "floors",
      type: "number",
      min: 1,
      max: 5,
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      min: 0,
      max: 100,
    },
    {
      label: "Price per Sqft",
      name: "price_per_sqft",
      type: "number",
    },
    {
      label: "Renovated",
      name: "renovated",
      type: "number",
      min: 1900,
      max: new Date().getFullYear(),
    },
    {
      label: "Grade",
      name: "grade",
      type: "number",
      min: 1,
      max: 13,
    },
  ];

  const zipcodeOptions = [
    { value: "", label: "Select Zipcode" },
    { value: "98019", label: "98019" },
    { value: "98052", label: "98052" },
    { value: "98101", label: "98101" },
  ];

  const viewOptions = [
    { value: "", label: "Select View" },
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const waterfrontOptions = [
    { value: "", label: "Select Waterfront" },
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];

  return (
    <div className="w-4/5 h-[95vh] mx-auto flex justify-center items-center gap-10 m-8 shadow-[0_0_70px_10px_rgba(0,0,0,0.1)] rounded-2xl">
      <div className="w-2/5 h-full">
        <img
          src={house}
          alt="House"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-3/5 flex flex-col justify-center items-start gap-8 p-8">
        <h1 className="text-4xl font-bold font-playfair">
          House Price Prediction
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 w-full text-md"
        >
          {formProps.map((prop, index) => (
            <FormInput
              key={index}
              type={prop.type}
              label={prop.label}
              name={prop.name}
              value={formData[prop.name]}
              onChange={handleChange}
              min={prop.min}
              max={prop.max}
              error={errors[prop.name]}
            />
          ))}
          <FormDropdown
            label="View"
            name="view"
            value={formData.view}
            onChange={handleChange}
            options={viewOptions}
            error={errors.view}
            className="col-span-2"
          />
          <FormDropdown
            label="Waterfront"
            name="waterfront"
            value={formData.waterfront}
            onChange={handleChange}
            options={waterfrontOptions}
            error={errors.waterfront}
            className="col-span-2"
          />
          <FormDropdown
            label="Zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            options={zipcodeOptions}
            error={errors.zipcode}
            className="col-span-2"
          />
          <input
            className="col-span-2 mx-auto w-full bg-blue-500 text-white font-bold mt-3 mb-5 py-2 px-4 rounded hover:bg-blue-700 hover:shadow-md transition"
            type="submit"
            value="Predict"
          />
        </form>
        {prediction && (
          <div>
            <h2 className="text-xl font-semibold">
              Predicted Price: ${prediction}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
