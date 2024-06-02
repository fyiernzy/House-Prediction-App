/* eslint-disable react/prop-types */
const FormInput = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <label className="text-lg" htmlFor={name}>
        {label}:
      </label>
      <input
        className="border rounded-md p-1 border-black-500 py-2 px-2"
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
