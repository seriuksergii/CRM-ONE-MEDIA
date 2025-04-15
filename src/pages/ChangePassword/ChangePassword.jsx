import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../api/api';
import './ChangePassword.css';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    if (!isValid) return;
    
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');

      await dispatch(changePassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      })).unwrap();

      setSuccessMessage('Пароль успешно изменен!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      if (error === 'Требуется авторизация') {
        navigate('/login');
      } else {
        setError(error || 'Ошибка при изменении пароля');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = useCallback((field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, []);

  const newPasswordValidation = {
    required: 'Это поле обязательно',
    minLength: {
      value: 6,
      message: 'Минимум 6 символов'
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: 'Пароль должен содержать буквы и цифры'
    }
  };

  const confirmPasswordValidation = {
    required: 'Это поле обязательно',
    validate: value => value === newPassword || 'Пароли не совпадают'
  };

  return (
    <div className="login_page">
      <img src="/Mask group.png" alt="logo" className="logo" />
      <h1 className="login_title">Изменение пароля</h1>
      <h3>Пожалуйста, введите новый пароль</h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_group password_group">
          <label htmlFor="newPassword">Новый пароль</label>
          <div className="password_input_wrapper">
            <input
              id="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              placeholder="Введите новый пароль"
              {...register('newPassword', newPasswordValidation)}
            />
            <div 
              className="password_eye" 
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPasswords.new ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {errors.newPassword && (
            <p className="error_message">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="form_group password_group">
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <div className="password_input_wrapper">
            <input
              id="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              placeholder="Повторите новый пароль"
              {...register('confirmPassword', confirmPasswordValidation)}
            />
            <div 
              className="password_eye" 
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPasswords.confirm ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="error_message">{errors.confirmPassword.message}</p>
          )}
        </div>

        {error && <p className="error_message">{error}</p>}
        {successMessage && <p className="success_message">{successMessage}</p>}

        <div className="change_password_button">
          <button 
            type="submit" 
            className="enter_button_text"
            disabled={isLoading || !isValid}
          >
            {isLoading ? 'Изменение...' : 'Изменить пароль'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;