import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  HeadingXL,
  HeadingMD,
  BodyBase,
} from '../../Typography/Headlines&Texts';
import Select from '../../Select/Select';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import { IoClose } from 'react-icons/io5';
import Checkbox from '../../Checkbox/Checkbox';
import './InviteNewTeamMember.scss';

const InviteNewTeamMember = ({
  isOpen,
  onClose,
  initialValues = {
    name: '',
    email: '',
    role: '',
    permissions: {
      accessAccounts: false,
      accessCampaigns: false,
      campaignCloning: false,
      analyticsAccess: false,
      userManagement: false,
      systemSettings: false,
    },
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

  const permissionOptions = [
    { name: 'permissions.accessAccounts', label: 'Access to accounts' },
    { name: 'permissions.accessCampaigns', label: 'Access to campaigns' },
    { name: 'permissions.campaignCloning', label: 'Campaign cloning' },
    { name: 'permissions.analyticsAccess', label: 'Analytics access' },
    { name: 'permissions.userManagement', label: 'User management' },
    { name: 'permissions.systemSettings', label: 'System settings' },
  ];

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
          <HeadingXL>Invite New Team Member</HeadingXL>
          <HeadingMD>
            Send an invitation email with a one-time link to join<br></br> your
            team.
          </HeadingMD>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Form submitted with values:', values);
            console.log('Permissions:', values.permissions);
            onSave(values);
            setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
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

              <div className="permissions-section">
                <BodyBase style={{ paddingBottom: '13px' }}>
                  Permissions
                </BodyBase>
                <div className="permissions-grid">
                  {permissionOptions.map((option) => (
                    <Checkbox
                      key={option.name}
                      name={option.name}
                      label={option.label}
                      checked={values.permissions[option.name.split('.')[1]]}
                      onChange={(e) => {
                        const fieldName = option.name.split('.')[1];
                        setFieldValue(
                          `permissions.${fieldName}`,
                          e.target.checked
                        );
                      }}
                    />
                  ))}
                </div>
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
    </div>
  );
};

export default InviteNewTeamMember;
