import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { HeadingXL, HeadingMD } from '../../Typography/Headlines&Texts';
import Select from '../../Select/Select';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import './SendInvitation.scss';

const SendInvitation = ({
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

  const inputFields = [
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'user@example.com',
      autoComplete: 'email',
    },
  ];

  const roleOptions = availableRoles.map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));

  return (
    <div className="invite_team_member">
      <div className="modal_title">
        <HeadingXL>Send Invitation</HeadingXL>
        <HeadingMD>
          Send an invitation email to add a new user to the system.
        </HeadingMD>
      </div>

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
                text={'Send Invitation'}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendInvitation;
