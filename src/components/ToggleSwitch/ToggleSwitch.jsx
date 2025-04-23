import { useField, Formik, Form } from 'formik';
import './ToggleSwitch.scss';

const ToggleSwitch = ({ name, disabled = false }) => {
  const [field, , helpers] = useField(name);

  return (
    <label className={`toggle-switch ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        checked={field.value}
        onChange={(e) => helpers.setValue(e.target.checked)}
        disabled={disabled}
      />
      <span className="slider" />
    </label>
  );
};

export default ToggleSwitch;