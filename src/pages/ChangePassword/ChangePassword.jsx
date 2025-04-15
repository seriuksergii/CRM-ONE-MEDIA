import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../api/api';

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

      setSuccessMessage('Пароль успішно змінено!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      if (error === 'Необхідна авторизація') {
        navigate('/login');
      } else {
        setError(error || 'Помилка при зміні паролю');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="login_page">
      <img src="/Mask group.png" alt="logo" className="logo" />
      <h1 className="login_title">Зміна паролю</h1>
      <h3>Будь ласка, введіть новий пароль</h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Новий пароль */}
        <div className="form_group password_group">
          <label htmlFor="newPassword">Новий пароль</label>
          <div className="password_input_wrapper">
            <input
              id="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              placeholder="Введіть новий пароль"
              {...register('newPassword', {
                required: 'Це поле обов\'язкове',
                minLength: {
                  value: 6,
                  message: 'Мінімум 6 символів'
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: 'Пароль має містити літери та цифри'
                }
              })}
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

        {/* Підтвердження пароля */}
        <div className="form_group password_group">
          <label htmlFor="confirmPassword">Підтвердіть пароль</label>
          <div className="password_input_wrapper">
            <input
              id="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              placeholder="Повторіть новий пароль"
              {...register('confirmPassword', {
                required: 'Це поле обов\'язкове',
                validate: value => 
                  value === newPassword || 'Паролі не збігаються'
              })}
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

        <div className="enter_button">
          <button 
            type="submit" 
            className="enter_button_text"
            disabled={isLoading || !isValid}
          >
            {isLoading ? 'Зміна...' : 'Змінити пароль'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;