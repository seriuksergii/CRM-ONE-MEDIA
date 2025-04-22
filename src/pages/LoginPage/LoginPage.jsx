import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { Formik, Form } from 'formik';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import InputField from '../../components/InputField/InputField';
import './LoginPage.scss';
import '../../styles/authStyles.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const translateError = (errorMessage) => {
    const errorTranslations = {
      'Invalid credentials': 'Неверный email или пароль',
      'User not found': 'Пользователь не найден',
      'Account is locked': 'Аккаунт заблокирован',
      'Too many login attempts':
        'Слишком много попыток входа. Попробуйте позже',
      'Network error': 'Ошибка сети. Проверьте подключение',
      'Authentication error': 'Ошибка авторизации',
      'An unexpected error occurred': 'Произошла непредвиденная ошибка',
    };

    return errorTranslations[errorMessage] || errorMessage;
  };

  const onSubmit = async (values) => {
    console.log('Submitted login data:', values);
    setServerError('');

    try {
      const result = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(result)) {
        navigate('/dashboard');
      } else if (loginUser.rejected.match(result)) {
        const errorMessage = result.payload || 'Authentication error';
        setServerError(translateError(errorMessage));
      }
    } catch (err) {
      console.error('Login error:', err);
      setServerError(translateError('An unexpected error occurred'));
    }
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <div className="auth-container">
        <div className="login_page">
          <img src="/Mask group.png" alt="logo" className="logo" />
          <h1 className="login_title">С возвращением!</h1>
          <h3>Пожалуйста, введите свои данные</h3>

          <Formik
            initialValues={{ email: '', password: '' }}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Введите E-mail"
                  autocomplete="off"
                  className={errors.email && touched.email ? 'error shake' : ''}
                />

                <div className="password-input-wrapper">
                  <InputField
                    label="Пароль"
                    name="password"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    className={
                      errors.password && touched.password ? 'error shake' : ''
                    }
                  />
                  <div
                    className="password_eye"
                    onClick={togglePasswordVisibility}
                  >
                    {isShowPassword ? (
                      <FiEye className="eye_icon" />
                    ) : (
                      <FiEyeOff className="eye_icon" />
                    )}
                  </div>
                  {errors.password && touched.password && (
                    <div className="error_message">{errors.password}</div>
                  )}
                </div>

                {serverError && (
                  <div className="error_message server_error">
                    {serverError}
                  </div>
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
                  <button className="social_button google">
                    <img src="/Google__G__Logo 1.svg" alt="google" />
                    <p>Войти с Google</p>
                  </button>
                  <button className="social_button facebok">
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
    </>
  );
};

export default LoginPage;
