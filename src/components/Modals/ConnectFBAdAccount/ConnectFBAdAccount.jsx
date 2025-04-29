import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  HeadingXL,
  HeadingMD,
  LabelXS,
  BodyBase,
  LabelSmall,
} from '../../Typography/Headlines&Texts';
import * as Yup from 'yup';
import Button from '../../Button/Button';
import SelectButtonGroup from '../../SelectButtonGroup/SelectButtonGroup';
import InputField from '../../InputField/InputField';
import './ConnectFBAdAccount.scss';

const ConnectFBAdAccount = ({ onSave, onClose, initialValues }) => {
  const [activeTab, setActiveTab] = useState('b');

  const validationSchema = Yup.object().shape({
    accessToken: Yup.string()
      .required('Access Token')
      .min(32, 'Access token is too short - please check your token'),
  });

  const handleSelectionChange = (value) => {
    setActiveTab(value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values);
    setSubmitting(false);
  };

  return (
    <>
      <div className="modal_title">
        <HeadingXL>Connect Facebook Ad Account</HeadingXL>
        <HeadingMD>
          Connect your ad account to start managing campaigns. Your token will
          be securely stored.
        </HeadingMD>
      </div>
      <div className="select-buttons">
        <SelectButtonGroup
          defaultValue={activeTab}
          options={[
            { value: 'a', label: 'Access Token' },
            { value: 'b', label: 'Facebook OAuth' },
          ]}
          onChange={handleSelectionChange}
        />
        <div className="tab-content">
          {activeTab === 'a' && (
            <Formik
              initialValues={initialValues || { accessToken: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div>
                    <InputField
                      label="Access Token"
                      name="accessToken"
                      placeholder="Paste your Facebook access token here"
                      type="text"
                      className={`access_token_input ${
                        errors.accessToken && touched.accessToken
                          ? 'has-error'
                          : ''
                      }`}
                      showError={false}
                      extra={
                        <svg
                          className={`token_icon ${
                            errors.accessToken && touched.accessToken
                              ? 'error'
                              : ''
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.2713 7.3698L13.6805 8.77898C13.795 8.89124 13.949 8.95412 14.1094 8.95412C14.2698 8.95412 14.4237 8.89124 14.5383 8.77898L15.8249 7.49233C15.9372 7.3778 16.0001 7.22382 16.0001 7.06345C16.0001 6.90308 15.9372 6.7491 15.8249 6.63457L14.4157 5.22538M15.6411 4L9.75928 9.88182"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.3698 15.64C9.23088 15.64 10.7396 14.1313 10.7396 12.2702C10.7396 10.4091 9.23088 8.90039 7.3698 8.90039C5.50871 8.90039 4 10.4091 4 12.2702C4 14.1313 5.50871 15.64 7.3698 15.64Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    />

                    {errors.accessToken && touched.accessToken && (
                      <div className="input-field-error">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="#DC2626"
                        >
                          <path d="M6 1C3.24 1 1 3.24 1 6s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-.5-7h1v4h-1V3zm0 5h1v1h-1V8z" />
                        </svg>
                        {errors.accessToken}
                      </div>
                    )}
                    <div className="access_token_info">
                      <LabelSmall>How to get your access token:</LabelSmall>
                      <ol className="access_token_steps">
                        <li>
                          Go to{' '}
                          <a
                            href="https://developers.facebook.com/tools/explorer/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Graph API Explorer
                          </a>
                        </li>
                        <li>Select your app from the dropdown</li>
                        <li>Generate a User or Page token</li>
                        <li>Request permissions: ads_management, ads_read</li>
                        <li>Copy the generated token</li>
                      </ol>
                    </div>
                    <div className="form_buttons">
                      <Button
                        type="button"
                        text="Cancel"
                        onClick={onClose}
                        className="white"
                      />
                      <Button
                        type="submit"
                        text="Connect Account"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          {activeTab === 'b' && (
            <div>
              <div className="connect_fb">
                <svg className="facebook_icon" viewBox="0 0 24 24">
                  <path
                    fill="#0066CC"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  />
                </svg>
                <BodyBase style={{ color: '#09090B', marginTop: '16px' }}>
                  Connect with Facebook
                </BodyBase>
                <LabelSmall
                  style={{
                    color: '#3E4655',
                    marginTop: '4px',
                    textAlign: 'center',
                  }}
                >
                  The easiest way to connect. You'll be redirected to Facebook
                  to<br></br> authorize access to your ad accounts.
                </LabelSmall>
                <div className="modal_button">
                  <Button
                    type="button"
                    text="Connect with Facebook"
                    className="bg-primary"
                    iconLeft="icon-facebook_button"
                    IconClassLeft="icon"
                    onClick={() => onSave({ method: 'oauth' })}
                  />
                </div>
                <LabelXS style={{ color: '#3E4655' }}>
                  We only request permissions needed to manage your ads.
                </LabelXS>
              </div>
              <div className="form_buttons">
                <Button
                  type="button"
                  text="Cancel"
                  onClick={onClose}
                  className="btn white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConnectFBAdAccount;
