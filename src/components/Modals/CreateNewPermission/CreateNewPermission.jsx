import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { HeadingXL, HeadingMD } from '../../Typography/Headlines&Texts';
import Select from '../../Select/Select';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';

import './CreateNewPermission.scss';

const CreateNewPermission = ({
  onClose,
  initialValues = {
    name: '',
    description: '',
    category: '',
  },
  onSave,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required field')
      .min(2, 'Minimum 2 characters')
      .max(30, 'Maximum 30 characters'),
    description: Yup.string().required('Required field'),
    category: Yup.string().required('Required field'),
  });

  const inputFields = [
    {
      label: 'Permission Name',
      name: 'name',
      type: 'text',
      placeholder: 'e.g., Export Reports',
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      placeholder: 'What does this permission allow?',
    },
  ];

  const categoryOptions = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'campaigns', label: 'Campaigns' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'accounts', label: 'Accounts' },
    { value: 'settings', label: 'Settings' },
  ];

  return (
    <div className="create_new_permission">
      <div className="modal_title">
        <HeadingXL>Create New Permission</HeadingXL>
        <HeadingMD styles={{ color: '#64748B' }}>
          Define a new permission for specific system functionality
        </HeadingMD>
      </div>

      <div className="formik_form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Form submitted with values:', values);
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
                  label="Category"
                  name="category"
                  options={categoryOptions}
                  menuPlacement="auto"
                  menuShouldScrollIntoView={false}
                  menuPosition="static"
                  menuShouldBlockScroll={true}
                  placeholder="Select a category"
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
                      '&:hover': {
                        borderColor: '#0066cc',
                      },
                    }),
                  }}
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
                  text={'Create Permission'}
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

export default CreateNewPermission;
