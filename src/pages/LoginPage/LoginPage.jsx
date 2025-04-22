import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import * as Yup from 'yup';
import FormInput from '../../components/common/FormInput/FormInput';
import './LoginPage.css';
import '../../styles/authStyles.css';



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Некорректный email')
      .required('Поле email обязательно'),
    password: Yup.string()
      .required('Поле пароль обязательно')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/,
        'Пароль должен содержать буквы и цифры'
      )
      .min(3, 'Пароль должен быть больше 3 символов')
      .max(20, 'Пароль должен быть меньше 20 символов'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const result = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(result)) {
        navigate('/dashboard');
      } else {
        setErrors({ server: result.payload });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="login_page">
        <img src="/Mask group.png" alt="logo" className="logo" />
        <h1 className="login_title">С возвращением!</h1>
        <h3>Пожалуйста, введите свои данные</h3>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.server && (
                <div className="error_message server_error">
                  {errors.server}
                </div>
              )}

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="Введите E-mail"
              />

              <FormInput
                name="password"
                label="Пароль"
                placeholder="Введите пароль"
                showPasswordToggle
              />

              <div className="enter_button">
                <Link to="/forgotpassword" className="enter_button_link">
                  <p className="enter_button_p">Забыли пароль?</p>
                </Link>
                <button
                  type="submit"
                  className="enter_button_text"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Вход...' : 'Вход'}
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
  );
};

export default LoginPage;
