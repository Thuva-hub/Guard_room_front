import React from 'react';
import './LoginPage.css'; // Import the CSS file for styling
import itumlogo from './itumlogo.png'
import security from './security.JPG'
import { Formik, Form, Field } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';


const LoginPage = () => {
  const navigate = useNavigate()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('email Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      )
      .required('Password is required'),
  })
  return (
    <div className="login-page">
      <div className="left-part">
        <img src={security} alt="security" />
      </div>

      <div className="right-part">
        <div className='itumlogo'>
          <img src={itumlogo} alt="itumlogo" />
        </div>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            console.log(values)
            axios.post('http://localhost:5000/v1/login', values).then((res) => {

              console.log(res.data)
              alert("Login successgully")
              toast.success(res.data, { autoClose: 3000 })
              localStorage.setItem("valid", res.data);
              localStorage.setItem("email", values.email);

              navigate('/Dashboard')

            }).catch((err) => {
              console.log(err.response.data)
              alert(err.response.data)
              toast.warning(err.response.data, { autoClose: 3000 })
            })
          }}
        >
          {({ errors, touched, resetForm }) => (
            <Form>
              <div className="login-form">
                <div style={{ marginBottom: '25px' }} >
                  <Field name="email" type="email" placeholder="Email" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </div>
                <div style={{ marginBottom: '25px' }} >
                  <Field name="password" type="password" placeholder="password" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.password && touched.password ? <div>{errors.password}</div> : null}
                </div>
                <button className="login-button">Login</button>
                <div className="forgot-password">
                  <a href="#">Forgot password?</a>
                </div>
                <Link to="/Signup" state={{}}><button className="create-account-button" >Create new account</button></Link>
              </div>
            </Form>
          )}

        </Formik>

      </div>
    </div>
  );
};

export default LoginPage;
