import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import '../../styles/authStyles.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../api/api';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

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

  const onSubmit = async (data) => {
    console.log('Submitted login data:', data);
    setServerError('');

    try {
      const result = await dispatch(loginUser(data));

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Введите E-mail"
                {...register('email', {
                  required: 'Поле email обязательно',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Некорректный формат email',
                  },
                })}
              />
              {errors.email && (
                <p className="error_message">{errors.email.message}</p>
              )}
            </div>

            <div className="form_group password_group">
              <label htmlFor="password">Пароль</label>
              <div className="password_input_wrapper">
                <input
                  id="password"
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  {...register('password', {
                    required: 'Поле пароль обязательно',
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/,
                      message: 'Пароль должен содержать буквы и цифры',
                    },
                    minLength: {
                      value: 3,
                      message: 'Пароль должен быть больше 3 символов',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Пароль должен быть меньше 20 символов',
                    },
                  })}
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
              </div>
              {errors.password && (
                <p className="error_message">{errors.password.message}</p>
              )}
            </div>

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
              <button className="social_button google">
                <img src="/Google__G__Logo 1.svg" alt="google" />
                <p>Войти с Google</p>
              </button>
              <button className="social_button facebok">
                <img src="/Social media.svg" alt="facebook" />
                <p>Войти с Facebook</p>
              </button>
            </div>
          </form>
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
