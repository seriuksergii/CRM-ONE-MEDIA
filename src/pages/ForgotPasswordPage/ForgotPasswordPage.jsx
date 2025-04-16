import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';
import '../../styles/authStyles.css';

const ForgotPasswordPage = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  return (
    <>
      <div className="auth-container">
        <div className="login_page">
          <img src="/Mask group.png" alt="logo" className="logo" />
          <h1 className="login_title">Забыли пароль?</h1>
          <h3 style={{ paddingInline: '20px' }}>
            Введите еmail, указанный при регистрации и мы отправим ссылку для
            сброса пароля
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Введите E-mail" />
              {errors.email && (
                <p className="error_message">{errors.email.message}</p>
              )}
            </div>

            <div className="enter_button">
              <Link to="/login" className="enter_button_link">
                <p className="enter_button_p">Назад</p>
              </Link>
              <button type="submit" className="enter_button_text">
                Отправить
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

export default ForgotPasswordPage;
