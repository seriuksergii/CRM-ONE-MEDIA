import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import InputField from '../../components/InputField/InputField';
import { translateError } from '../../utils/translateError';
import './LoginPage.scss';
import '../../styles/authStyles.css';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(8, 'Минимум 8 символов')
    .matches(/[a-z]/, 'Должна быть хотя бы одна маленькая буква')
    .matches(/[A-Z]/, 'Должна быть хотя бы одна большая буква')
    .matches(/[\d\W]/, 'Должна быть хотя бы одна цифра или символ'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (values) => {
    setServerError('');
    try {
      const result = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(result)) {
        navigate('/dashboard');
      } else if (loginUser.rejected.match(result)) {
        const errorMessage = result.payload || 'Authentication error';
        setServerError(translateError(errorMessage));
      }
    } catch {
      setServerError(translateError('An unexpected error occurred'));
    }
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev);
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
      label: 'Пароль',
      name: 'password',
      type: isShowPassword ? 'text' : 'password',
      placeholder: 'Введите пароль',
      autoComplete: 'current-password',
      extra: (
        <div onClick={togglePasswordVisibility}>
          {isShowPassword ? <FiEye /> : <FiEyeOff />}
        </div>
      ),
    },
  ];

  return (
    <div className="auth-container">
      <div className="login_page">
        <img src="/Mask group.png" alt="logo" className="logo" />
        <h1 className="login_title">С возвращением!</h1>
        <h3>Пожалуйста, введите свои данные</h3>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={onSubmit}
        >
          <Form>
            {inputFields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                extra={field.extra}
              />
            ))}

            {serverError && (
              <div className="error_message server_error">{serverError}</div>
            )}

            <div className="enter_button">
              <Link to="/forgotpassword" className="enter_button_link">
                <p className="enter_button_p">Забыли пароль?</p>
              </Link>
              <button type="submit" className="enter_button_text">
                Вход
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
        </Formik>
      </div>

      <div className="bottom_logos">
        <img src="/Frame 24051.svg" alt="" />
        <img src="/Frame 24052.svg" alt="" />
      </div>
      <Formik
        initialValues={{ isSubscribed: false }}
        onSubmit={(values) => {
          console.log('Submitted:', values);
        }}
      >
        {() => (
          <Form className="add-offer-form">
            <ToggleSwitch name="isSubscribed" disabled={false} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
