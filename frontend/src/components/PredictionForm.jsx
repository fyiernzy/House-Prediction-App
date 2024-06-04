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
    waterfront: "",
    view: "",
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
      max: 15,
    },
    {
      label: "View",
      name: "view",
      type: "number",
      min: 0,
      max: 4,
    },
  ];

  const zipcodeOptions = [
    { value: "", label: "Select Zipcode" },
    { value: "98001", label: "98001" },
    { value: "98002", label: "98002" },
    { value: "98003", label: "98003" },
    { value: "98004", label: "98004" },
    { value: "98005", label: "98005" },
    { value: "98006", label: "98006" },
    { value: "98007", label: "98007" },
    { value: "98008", label: "98008" },
    { value: "98010", label: "98010" },
    { value: "98011", label: "98011" },
    { value: "98014", label: "98014" },
    { value: "98019", label: "98019" },
    { value: "98022", label: "98022" },
    { value: "98023", label: "98023" },
    { value: "98024", label: "98024" },
    { value: "98027", label: "98027" },
    { value: "98028", label: "98028" },
    { value: "98029", label: "98029" },
    { value: "98030", label: "98030" },
    { value: "98031", label: "98031" },
    { value: "98032", label: "98032" },
    { value: "98033", label: "98033" },
    { value: "98034", label: "98034" },
    { value: "98038", label: "98038" },
    { value: "98039", label: "98039" },
    { value: "98040", label: "98040" },
    { value: "98042", label: "98042" },
    { value: "98045", label: "98045" },
    { value: "98052", label: "98052" },
    { value: "98053", label: "98053" },
    { value: "98055", label: "98055" },
    { value: "98056", label: "98056" },
    { value: "98058", label: "98058" },
    { value: "98059", label: "98059" },
    { value: "98065", label: "98065" },
    { value: "98070", label: "98070" },
    { value: "98072", label: "98072" },
    { value: "98074", label: "98074" },
    { value: "98075", label: "98075" },
    { value: "98077", label: "98077" },
    { value: "98092", label: "98092" },
    { value: "98102", label: "98102" },
    { value: "98103", label: "98103" },
    { value: "98105", label: "98105" },
    { value: "98106", label: "98106" },
    { value: "98107", label: "98107" },
    { value: "98108", label: "98108" },
    { value: "98109", label: "98109" },
    { value: "98112", label: "98112" },
    { value: "98115", label: "98115" },
    { value: "98116", label: "98116" },
    { value: "98117", label: "98117" },
    { value: "98118", label: "98118" },
    { value: "98119", label: "98119" },
    { value: "98122", label: "98122" },
    { value: "98125", label: "98125" },
    { value: "98126", label: "98126" },
    { value: "98133", label: "98133" },
    { value: "98136", label: "98136" },
    { value: "98144", label: "98144" },
    { value: "98146", label: "98146" },
    { value: "98148", label: "98148" },
    { value: "98155", label: "98155" },
    { value: "98166", label: "98166" },
    { value: "98168", label: "98168" },
    { value: "98177", label: "98177" },
    { value: "98178", label: "98178" },
    { value: "98188", label: "98188" },
    { value: "98198", label: "98198" },
    { value: "98199", label: "98199" },
  ];

  const waterfrontOptions = [
    { value: "", label: "Select Waterfront" },
    { value: "0", label: "No" },
    { value: "1", label: "Yes" },
  ];

  return (
    <div className="w-4/5 h-full mx-auto flex justify-center items-center gap-10 m-8 my-10 shadow-[0_0_70px_10px_rgba(0,0,0,0.1)] rounded-2xl">
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
            label="Zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            options={zipcodeOptions}
            error={errors.zipcode}
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
          <input
            className="col-span-2 mx-auto w-full bg-blue-500 text-white font-bold mt-3 mb-5 py-2 px-4 rounded hover:bg-blue-700 hover:shadow-md transition"
            type="submit"
            value="Predict"
          />
        </form>

        {prediction && (
          <div className="border border-slate-300">
            <h2 className="text-xl font-semibold font-playfair text-center w-full">
              Predicted Price: ${parseFloat(prediction).toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
