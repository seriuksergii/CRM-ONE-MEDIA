import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField/InputField';
import {
  HeadingXL,
  HeadingMD,
} from '../../components/Typography/Headlines&Texts';
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
        <div className="login_page_title_block">
          <img src="/Mask group.png" alt="logo" className="logo" />
          <HeadingXL>Забыли пароль?</HeadingXL>
          <HeadingMD>
            Введите email, указанный при регистрации<br></br> и мы отправим
            ссылку для сброса пароля
          </HeadingMD>
        </div>

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
