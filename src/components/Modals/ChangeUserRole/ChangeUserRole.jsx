import React from 'react';
import { Formik, Form } from 'formik';
import {
  HeadingXL,
  HeadingMD,
  LabelXS,
} from '../../Typography/Headlines&Texts';
import * as Yup from 'yup';
import Select from '../../Select/Select';
import Button from '../../Button/Button';

const ChangeUserRole = ({
  onClose,
  initialValues,
  availableRoles,
  onSave,
  currentUserName,
}) => {
  const validationSchema = Yup.object().shape({
    role: Yup.string().required('Обовʼязкове поле'),
  });

  return (
    <div className="change_role_modal">
      <div className="modal_title">
        <HeadingXL>Change User Role</HeadingXL>
        <HeadingMD>Change the role for {currentUserName}.</HeadingMD>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSave(values)}
        enableReinitialize
      >
        <Form>
          <div className="select-container">
            <Select
              label="Role"
              name="role"
              options={availableRoles.map((role) => ({
                value: role,
                label: role.charAt(0).toUpperCase() + role.slice(1),
              }))}
              menuPlacement="auto"
              menuShouldScrollIntoView={false}
              menuPosition="static"
              menuShouldBlockScroll={true}
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

          <LabelXS style={{ color: '#64748B' }}>
            Can manage campaigns, accounts, and perform cloning operations
          </LabelXS>
          <div className="modal_buttons">
            <Button
              type="button"
              text="Cancel"
              onClick={onClose}
              className="white"
            />
            <Button type="submit" text="Save Changes" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangeUserRole;