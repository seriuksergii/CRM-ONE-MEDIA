import { useField, Formik, Form } from 'formik';
import './ToggleSwitch.scss';

const ToggleSwitch = ({ name, disabled = false, submitForm }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (e) => {
    helpers.setValue(e.target.checked);
    submitForm();
  };

  return (
    <label className={`toggle-switch ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        checked={field.value}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="slider" />
    </label>
  );
};

export default ToggleSwitch;
