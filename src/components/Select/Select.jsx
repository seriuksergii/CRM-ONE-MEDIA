import SelectBase from 'react-select';
import { useField } from 'formik';
import { IoMdCheckmark } from 'react-icons/io';
import './Select.scss';

const CustomOption = ({ innerProps, isSelected, children }) => (
  <div
    {...innerProps}
    className={`custom-select__option ${
      isSelected ? 'custom-select__option--is-selected' : ''
    }`}
  >
    <span className="custom-select__option-content">
      {isSelected && (
        <span className="custom-select__checkmark">
          <IoMdCheckmark style={{color: '#000'}} />
        </span>
      )}
      {children}
    </span>
  </div>
);

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
        components={{ Option: CustomOption }}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="error-message">{meta.error}</div>
      )}
    </div>
  );
};

export default Select;
