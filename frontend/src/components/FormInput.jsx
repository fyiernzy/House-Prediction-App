/* eslint-disable react/prop-types */
const FormInput = ({ label, name, value, onChange, type, min, max, error }) => {
  return (
    <div className="input-container flex flex-col gap-2 justify-center">
      <input
        className="border border-gray-300 rounded-md p-1 py-2 px-2 placeholder-transparent focus:outline-none focus:border-blue-500"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required
        placeholder=" " // Placeholder with a single space to trigger the floating label
      />
      <label className="floating-label" htmlFor={name}>
        {label}
      </label>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput;
