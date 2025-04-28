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
      .required('Обовʼязкове поле')
      .min(2, 'Мінімум 2 символи')
      .max(30, 'Максимум 30 символів'),
    email: Yup.string()
      .email('Невірний формат email')
      .required('Обовʼязкове поле'),
    role: Yup.string().required('Обовʼязкове поле'),
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
          <HeadingMD>
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
                  menuPosition="fixed"
                  menuShouldBlockScroll={true}
                  placeholder="Select a role"
                />
              </div>

              <div className="modal_buttons">
                <Button
                  type="button"
                  text="Cancel"
                  onClick={onClose}
                  className="white"
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
