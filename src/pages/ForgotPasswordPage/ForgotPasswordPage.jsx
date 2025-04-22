import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField/InputField';
import './ForgotPasswordPage.scss';
import '../../styles/authStyles.css';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
});

const ForgotPasswordPage = () => {
  const onSubmit = (values) => {
    console.log('Submitted data:', values);
  };

  return (
    <div className="auth-container">
      <div className="login_page">
        <img src="/Mask group.png" alt="logo" className="logo" />
        <h1 className="login_title">Забыли пароль?</h1>
        <h3 style={{ paddingInline: '20px' }}>
          Введите email, указанный при регистрации и мы отправим ссылку для
          сброса пароля
        </h3>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={onSubmit}
        >
          <Form>
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Введите E-mail"
              autoComplete="email"
            />

            <div className="enter_button">
              <Link to="/login" className="enter_button_link">
                <p className="enter_button_p">Назад</p>
              </Link>
              <button type="submit" className="enter_button_text">
                Отправить
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="bottom_logos">
        <img src="/Frame 24051.svg" alt="" />
        <img src="/Frame 24052.svg" alt="" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
