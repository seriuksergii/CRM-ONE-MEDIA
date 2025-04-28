import React from 'react';
import { useField } from 'formik';
import './Checkbox.scss';

const Checkbox = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          {...field}
          {...props}
          checked={field.value}
          className="checkbox-input"
        />
        <span className="checkbox-custom"></span>
        <span className="checkbox-text">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
