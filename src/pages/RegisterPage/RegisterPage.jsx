import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/slices/authSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import InputField from '../../components/InputField/InputField';
import { translateError } from '../../utils/translateError';
import './RegisterPage.scss';
import '../../styles/authStyles.css';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('Обязательное поле')
    .min(2, 'Минимум 2 символа')
    .max(30, 'Максимум 30 символов'),
  email: Yup.string()
    .email('Некорректный email')
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(8, 'Минимум 8 символов')
    .matches(/[a-z]/, 'Должна быть хотя бы одна маленькая буква')
    .matches(/[A-Z]/, 'Должна быть хотя бы одна большая буква')
    .matches(/[\d\W]/, 'Должна быть хотя бы одна цифра или символ'),
  confirmPassword: Yup.string()
    .required('Подтвердите пароль')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    setServerError('');
    setIsLoading(true);

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: 'user',
    };

    try {
      const result = await dispatch(registerUser(payload));
      
      if (registerUser.fulfilled.match(result)) {
        navigate('/dashboard');
      } else if (registerUser.rejected.match(result)) {
        const errorMessage = result.payload || 'Registration failed';
        setServerError(translateError(errorMessage));
      }
    } catch {
      setServerError(translateError('An unexpected error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword((prev) => !prev);
  };

  const inputFields = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Введите E-mail',
      autoComplete: 'email',
    },
    {
      label: 'Имя',
      name: 'name',
      type: 'text',
      placeholder: 'Введите ваше имя',
      autoComplete: 'name',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: isShowPassword ? 'text' : 'password',
      placeholder: 'Введите пароль',
      autoComplete: 'new-password',
      extra: (
        <div className="password_eye" onClick={togglePasswordVisibility}>
          {isShowPassword ? <FiEye className="eye_icon" /> : <FiEyeOff className="eye_icon" />}
        </div>
      ),
    },
    {
      label: 'Подтверждение пароля',
      name: 'confirmPassword',
      type: isShowConfirmPassword ? 'text' : 'password',
      placeholder: 'Пароль еще раз',
      autoComplete: 'new-password',
      extra: (
        <div className="password_eye" onClick={toggleConfirmPasswordVisibility}>
          {isShowConfirmPassword ? <FiEye className="eye_icon" /> : <FiEyeOff className="eye_icon" />}
        </div>
      ),
    },
  ];

  return (
    <div className="auth-container">
      <div className="login_page">
        <img src="/Mask group.png" alt="logo" className="logo" />
        <h1 className="login_title">Регистрация</h1>
        <h3>Пожалуйста, введите свои данные</h3>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={registerSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {inputFields.map((field) => (
                <div
                  key={field.name}
                  className={
                    field.name.includes('password') ? 'password-input-wrapper' : ''
                  }
                >
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

              <div className="enter_button">
                <Link to="/login" className="enter_button_link">
                  <p className="enter_button_p">Уже есть аккаунт?</p>
                </Link>
                <button
                  type="submit"
                  className="enter_button_text"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? 'Регистрация...' : 'Регистрация'}
                </button>
              </div>

              <div className="or">
                <p className="or_left"></p>
                <p className="or_middle">Или</p>
                <p className="or_right"></p>
              </div>

              <div className="social_buttons">
                <button type="button" className="social_button google">
                  <img src="/Google__G__Logo 1.svg" alt="google" />
                  <p>Войти с Google</p>
                </button>
                <button type="button" className="social_button facebook">
                  <img src="/Social media.svg" alt="facebook" />
                  <p>Войти с Facebook</p>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="bottom_logos">
        <img src="/Frame 24051.svg" alt="" />
        <img src="/Frame 24052.svg" alt="" />
      </div>
    </div>
  );
};

export default RegisterPage;