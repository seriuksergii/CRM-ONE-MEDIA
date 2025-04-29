import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import {
  HeadingXL,
  HeadingMD,
  LabelXS,
  BodyBase,
  LabelSmall,
} from '../../Typography/Headlines&Texts';
import * as Yup from 'yup';

import './ConnectFBAdAccount.scss';
import Button from '../../Button/Button';
import { IoClose } from 'react-icons/io5';
import SelectButtonGroup from '../../SelectButtonGroup/SelectButtonGroup';
import InputField from '../../InputField/InputField';

const ConnectFBAdAccount = ({ isOpen, onClose, initialValues, onSave }) => {
  const [activeTab, setActiveTab] = useState('b');

  const validationSchema = Yup.object().shape({
    accessToken: Yup.string()
      .required('Access Token')
      .min(32, 'Access token is too short - please check your token'),
  });

  if (!isOpen) return null;

  const handleSelectionChange = (value) => {
    setActiveTab(value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values);
    setSubmitting(false);
  };

  return (
    <div className="edit_modal">
      <div className="modal_content">
        <button type="button" className="modal_close_button" onClick={onClose}>
          <IoClose size={24} />
        </button>
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
                          >
                            <use
                              href="/sprite.svg#token_key"
                              fill="currentColor"
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
                      <div className="modal_buttons">
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
                      fill="#1877F2"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    />
                  </svg>
                  <BodyBase style={{ color: '#09090B' }}>
                    Connect with Facebook
                  </BodyBase>
                  <LabelSmall style={{ color: '#3E4655' }}>
                    The easiest way to connect. You'll be redirected to Facebook
                    to authorize access to your ad accounts.
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
                <div className="modal_buttons">
                  <Button
                    type="button"
                    text="Cancel"
                    onClick={onClose}
                    className="white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectFBAdAccount;
