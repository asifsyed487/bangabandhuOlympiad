import React from "react";

const MyInput = ({
  placeholder,
  onChange,
  type,
  value,
  name,

  disabled,
}) => {
  return (
    <div class="input-block">
      <input
        class="input"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        disabled={disabled}
      />
    </div>
  );
};

export default MyInput;
