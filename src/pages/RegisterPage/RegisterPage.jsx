import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import './RegisterPage.css';
import '../../styles/authStyles.css';

const RegisterPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const password = watch('password');

  return (
    <>
      <div className="login_page">
        <img src="/Mask group.png" alt="logo" className="logo" />
        <h1 className="login_title">Регистрация</h1>
        <h3>Пожалуйста, введите свои данные</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Введите E-mail" />
            {errors.email && (
              <p className="error_message">{errors.email.message}</p>
            )}
          </div>

          <div className="form_group">
            <label htmlFor="name">Имя</label>
            <input id="name" type="text" placeholder="Введите ваше имя" />
            {errors.name && (
              <p className="error_message">{errors.name.message}</p>
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
              <div className="password_eye" onClick={togglePasswordVisibility}>
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

          <div className="form_group password_group">
            <label htmlFor="confirmPassword">Подтверждение пароля</label>
            <div className="password_input_wrapper">
              <input
                id="confirmPassword"
                type={isShowConfirmPassword ? 'text' : 'password'}
                placeholder="Пароль еще раз"
                {...register('confirmPassword', {
                  required: 'Пожалуйста, подтвердите пароль',
                  validate: (value) =>
                    value === password || 'Пароли не совпадают',
                })}
              />
              <div
                className="password_eye"
                onClick={toggleConfirmPasswordVisibility}
              >
                {isShowConfirmPassword ? (
                  <FiEye className="eye_icon" />
                ) : (
                  <FiEyeOff className="eye_icon" />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="error_message">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="enter_button">
            <Link to="/login">
              <p>Уже есть аккаунт?</p>
            </Link>
            <button type="submit" className="enter_button_text">
              Регистрация
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
    </>
  );
};

export default RegisterPage;
