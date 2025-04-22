import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../store/slices/authSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import InputField from '../../components/InputField/InputField';
import { translateError } from '../../utils/translateError';
import './ChangePassword.scss';
import '../../styles/authStyles.css';

const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Обязательное поле')
    .min(8, 'Минимум 8 символов')
    .matches(/[a-z]/, 'Должна быть хотя бы одна маленькая буква')
    .matches(/[A-Z]/, 'Должна быть хотя бы одна большая буква')
    .matches(/[\d\W]/, 'Должна быть хотя бы одна цифра или символ'),
  confirmPassword: Yup.string()
    .required('Подтвердите пароль')
    .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать'),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });

  const onSubmit = async (values) => {
    setServerError('');
    setSuccessMessage('');

    try {
      await dispatch(
        changePassword({
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        })
      ).unwrap();

      setSuccessMessage('Пароль успешно изменен!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      if (error === 'Требуется авторизация') {
        navigate('/login');
      } else {
        setServerError(translateError(error) || 'Ошибка при изменении пароля');
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputFields = [
    {
      label: 'Новый пароль',
      name: 'newPassword',
      type: showPasswords.new ? 'text' : 'password',
      placeholder: 'Введите новый пароль',
      autoComplete: 'new-password',
      extra: (
        <div
          className="password_eye"
          onClick={() => togglePasswordVisibility('new')}
        >
          {showPasswords.new ? (
            <FiEye className="eye_icon" />
          ) : (
            <FiEyeOff className="eye_icon" />
          )}
        </div>
      ),
    },
    {
      label: 'Подтвердите пароль',
      name: 'confirmPassword',
      type: showPasswords.confirm ? 'text' : 'password',
      placeholder: 'Повторите новый пароль',
      autoComplete: 'new-password',
      extra: (
        <div
          className="password_eye"
          onClick={() => togglePasswordVisibility('confirm')}
        >
          {showPasswords.confirm ? (
            <FiEye className="eye_icon" />
          ) : (
            <FiEyeOff className="eye_icon" />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="auth-container">
      <div className="login_page">
        <img src="/Mask group.png" alt="logo" className="logo" />
        <h1 className="login_title">Изменение пароля</h1>
        <h3>Пожалуйста, введите новый пароль</h3>

        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={changePasswordSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {inputFields.map((field) => (
                <div key={field.name} className="password-input-wrapper">
                  <InputField
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                  />
                  {field.extra}
                </div>
              ))}

              {serverError && (
                <div className="error_message server_error">{serverError}</div>
              )}
              {successMessage && (
                <div className="success_message">{successMessage}</div>
              )}

              <div className="change_password_button">
                <button
                  type="submit"
                  className="enter_button_text"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Изменение...' : 'Изменить пароль'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
