import SelectBase from 'react-select';
import { useField } from 'formik';
import './Select.scss';

const Select = ({ label, name, options, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const normalizedOptions = options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option
  );

  const handleChange = (selectedOption) => {
    helpers.setValue(selectedOption?.value || '');
  };

  const selectedOption = normalizedOptions.find(
    (option) => String(option.value) === String(field.value)
  );

  return (
    <div className="form_group">
      {label && <label htmlFor={name}>{label}</label>}
      <SelectBase
        inputId={name}
        name={name}
        options={normalizedOptions}
        isSearchable={false}
        value={selectedOption}
        onChange={handleChange}
        classNamePrefix="custom-select"
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </div>
  );
};

export default Select;
