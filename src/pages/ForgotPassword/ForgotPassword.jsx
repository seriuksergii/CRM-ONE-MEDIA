import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import '../../styles/authStyles.css';
import { requestPasswordReset } from '../../api/api';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Проверяем существование пользователя по email
      const user = await requestPasswordReset(data.email);
      
      if (user) {
        // Если пользователь найден, показываем сообщение об успехе
        setIsEmailSent(true);
      } else {
        setError('Пользователь с таким email не найден');
      }
    } catch (error) {
      setError(error.message || 'Произошла ошибка при отправке email. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot_password_page">
      <img src="/Mask group.png" alt="logo" className="logo" />
      <h1 className="forgot_password_title">Восстановление пароля</h1>
      <h3>Введите email, указанный при регистрации</h3>

      {isEmailSent ? (
        <div className="success_message">
          <p>Инструкции по восстановлению пароля отправлены на ваш email.</p>
          <Link to="/login" className="back_to_login">
            Вернуться к входу
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

          {error && <p className="error_message">{error}</p>}

          <div className="buttons_group">
            <Link to="/login" className="back_button">
              Назад
            </Link>
            <button 
              type="submit" 
              className="submit_button"
              disabled={isLoading}
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword; 