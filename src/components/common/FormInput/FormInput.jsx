import React from 'react';
import { useField } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './FormInput.scss';

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  showPasswordToggle = false,
  ...props
}) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPasswordToggle 
    ? showPassword 
      ? 'text' 
      : 'password'
    : type;

  return (
    <div className={`form_group ${showPasswordToggle ? 'password_group' : ''}`}>
      {label && <label htmlFor={name}>{label}</label>}
      
      <div className={showPasswordToggle ? "password_input_wrapper" : ""}>
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...field}
          {...props}
          className={meta.touched && meta.error ? 'input-error' : ''}
        />
        
        {showPasswordToggle && (
          <div className="password_eye" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FiEye className="eye_icon" />
            ) : (
              <FiEyeOff className="eye_icon" />
            )}
          </div>
        )}
      </div>
      
      {meta.touched && meta.error && (
        <p className="error_message">{meta.error}</p>
      )}
    </div>
  );
};

export default FormInput;