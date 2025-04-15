import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import './ResetPassword.css';
import '../../styles/authStyles.css';
import { resetPassword } from '../../api/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      const token = searchParams.get('token');
      
      if (!token) {
        setError('Недействительная ссылка для сброса пароля');
        return;
      }

      // Используем имитацию функции для сброса пароля
      await resetPassword(token, data.password);
      
      // Если запрос успешен, перенаправляем на страницу входа
      navigate('/login', { 
        state: { message: 'Пароль успешно изменен. Пожалуйста, войдите с новым паролем.' }
      });
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
      
      // Обрабатываем ошибки
      if (error.message) {
        setError(error.message);
      } else {
        setError('Произошла ошибка при сбросе пароля. Пожалуйста, попробуйте позже.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset_password_page">
      <img src="/Mask group.png" alt="logo" className="logo" />
      <h1 className="reset_password_title">Установка нового пароля</h1>
      <h3>Введите новый пароль</h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form_group password_group">
          <label htmlFor="password">Новый пароль</label>
          <div className="password_input_wrapper">
            <input
              id="password"
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Введите новый пароль"
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
            <button
              type="button"
              className="password_eye"
              onClick={() => setIsShowPassword(!isShowPassword)}
              aria-label={isShowPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              {isShowPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          {errors.password && (
            <p className="error_message">{errors.password.message}</p>
          )}
        </div>

        <div className="form_group password_group">
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <div className="password_input_wrapper">
            <input
              id="confirmPassword"
              type={isShowConfirmPassword ? 'text' : 'password'}
              placeholder="Подтвердите новый пароль"
              {...register('confirmPassword', {
                required: 'Поле подтверждение пароля обязательно',
                validate: value =>
                  value === password || 'Пароли не совпадают',
              })}
            />
            <button
              type="button"
              className="password_eye"
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              aria-label={isShowConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              {isShowConfirmPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="error_message">{errors.confirmPassword.message}</p>
          )}
        </div>

        {error && <p className="error_message">{error}</p>}

        <button 
          type="submit" 
          className="submit_button"
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить новый пароль'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
