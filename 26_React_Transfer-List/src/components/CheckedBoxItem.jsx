import React, { useId } from "react";

const CheckedBoxItem = ({ label, onChange, checked }) => {
  const id = useId();
  return (
    <div>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckedBoxItem;
