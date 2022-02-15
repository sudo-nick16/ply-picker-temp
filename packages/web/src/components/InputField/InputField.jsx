import "./InputField.scss"

const InputField = (props) => {
  const { type, placeholder, value, setValue, className, ...rest } = props;
  // console.log(value, "value");
  return (
    <div className={`input-field-container ${value && 'input-field-active'} ${className}`}>
      <label>
        {placeholder}
      </label>
      <input
        {...rest}
        value={value}
        className="input-field"
        type={type || "text"}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputField;
