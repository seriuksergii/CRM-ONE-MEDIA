import { Field, ErrorMessage } from 'formik';
import './InputField.scss';

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  as = 'input',
  autocomplete,
  className = '',
}) => {
  return (
    <div className={`input-field ${className}`}>
      <label className="input-field-label">
        <span>{label}</span>
        <Field
          as={as}
          type={type}
          name={name}
          placeholder={placeholder}
          className="input-field-input"
          autoComplete={autocomplete}
        />
      </label>

      <ErrorMessage name={name}>
        {(msg) => <div className="input-field-error">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
