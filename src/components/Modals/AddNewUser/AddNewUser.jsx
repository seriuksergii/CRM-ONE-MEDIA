import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { HeadingXL, HeadingMD } from '../../Typography/Headlines&Texts';
import Select from '../../Select/Select';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import { IoClose } from 'react-icons/io5';
import './AddNewUser.scss';

const AddNewUser = ({
  isOpen,
  onClose,
  initialValues = {
    name: '',
    email: '',
    role: '',
  },
  availableRoles = [],
  onSave,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required field')
      .min(2, 'Minimum 2 characters')
      .max(30, 'Maximum 30 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field'),
    role: Yup.string().required('Required field'),
  });

  if (!isOpen) return null;

  const inputFields = [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
      placeholder: 'John Doe',
      autoComplete: 'name',
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'john.doe@example.com',
      autoComplete: 'email',
    },
  ];

  const roleOptions = availableRoles.map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));

  return (
    <div className="edit_modal">
      <div className="modal_content">
        <button
          type="button"
          className="modal_close_button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoClose size={24} />
        </button>

        <div className="modal_title">
          <HeadingXL>Add New User</HeadingXL>
          <HeadingMD style={{ color: '#64748B' }}>
            Enter user details and assign a role to add them to the system.
          </HeadingMD>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSave(values);
            setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              {inputFields.map((field) => (
                <div key={field.name} className="input_container">
                  <InputField
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                  />
                </div>
              ))}

              <div className="select-container">
                <Select
                  label="Assign Role"
                  name="role"
                  options={roleOptions}
                  menuPlacement="auto"
                  menuShouldScrollIntoView={false}
                  menuPosition="static"
                  menuShouldBlockScroll={true}
                  placeholder="Select a role"
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      position: 'relative',
                      boxShadow: 'none',
                      border: '1px solid #e4e4e7',
                      marginTop: '4px',
                    }),
                    control: (provided) => ({
                      ...provided,
                      boxShadow: 'none',
                    }),
                  }}
                />
              </div>

              <div className="modal_buttons">
                <Button
                  type="button"
                  text="Cancel"
                  variant="secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  text={'Add User'}
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewUser;
