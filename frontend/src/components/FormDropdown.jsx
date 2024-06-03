/* eslint-disable react/prop-types */
const FormDropdown = ({ name, value, onChange, options, error }) => {
  return (
    <div className="input-container flex flex-col gap-2 justify-center">
      <select
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormDropdown;
