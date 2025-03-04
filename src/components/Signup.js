import React from 'react'
import { Card } from "primereact/card";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const navigate = useNavigate()
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' first name requied'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' last name required'),
    nic: Yup.string()
      .required("nic required")
      .length(10)
      .matches(/^\d{9}[vVxX]$/, 'Invalid NIC format')
    ,
    email: Yup.string().email('Invalid email').required('email Required'),
    jobtype: Yup.string()
      .required("Job Type is required"),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      )
      .required('Password is required'),
    mobilenumber: Yup.string()
      .matches(
        /^[0-9]{1}[0-9]{9}$/,
        'Mobile number must be a valid 10-digit number'
      )
      .required('Mobile number is required'),
    Staffid: Yup.string()
      .required('staff id is required ')
    ,
    Address: Yup.string()
      .required('Address is required')
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent:'center',
      height: '100%',
      backgroundColor: '#c7d0d9'
    }} >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        width: '40%',
        margin: '10%',
        borderRadius: '20px'
      }}>

        <div style={{ padding: '30px' }}>
          <h1 style={{ textAlign: 'center' }}>Signup</h1>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              nic: '',
              jobtype: '',
              password: '',
              mobilenumber: '',
              Staffid: '',
              Address: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
              axios.post('http://localhost:5000/v1/register', values).then((res) => {
                if (res && res.data) {
                  console.log(res.data);
                  toast.success(res.data);
                  navigate('/');
                } else {
                  console.log('Unexpected response:', res);
                  toast.error('Unexpected response from the server.');
                }
                // console.log(res.data)
                // toast.success(res.data  , {autoClose:3000})
                // alert(res.data)
                // navigate('/')

              }).catch((err) => {
                if (err && err.response && err.response.data) {
                  const error = err.response.data;
                  console.log(error);
                  toast.error(error);
                } else {
                  console.log('Error occurred:', err.message);
                  toast.error('Error occurred while processing the request.');
                }
                // console.log(err.response.data)
                // alert(err.response.data)
              })
            }}

          >
            {({ errors, touched, resetForm }) => (
              <Form style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', marginBottom: '25px' }}>
                  <div style={{ marginRight: '100px' }}>
                    <Field name="firstName" placeholder="First Name" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                    {errors.firstName && touched.firstName ? (
                      <div>{errors.firstName}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field name="lastName" placeholder="LastName" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                    {errors.lastName && touched.lastName ? (
                      <div>{errors.lastName}</div>
                    ) : null}
                  </div>

                </div>

                <div style={{ marginBottom: '25px' }} >
                  <Field name="nic" type="nic" placeholder="nic" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.nic && touched.nic ? <div>{errors.nic}</div> : null}
                </div>

                <div style={{ marginBottom: '25px' }} >
                  <Field name="email" type="email" placeholder="Email" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.email && touched.email ? <div>{errors.email}</div> : null}
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label>
                    <div> <label>Jobtype</label></div>

                    <Field type="radio" name="jobtype" value="SecurityAdmin" />
                    Security Admin
                  </label>
                  <label>
                    <Field type="radio" name="jobtype" value="securtiy officer" />
                    securtiy officer
                  </label>
                  {errors.jobtype && touched.jobtype ? <div>{errors.jobtype}</div> : null}

                </div>


                <div style={{ marginBottom: '25px' }} >
                  <Field name="password" type="password" placeholder="password" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.password && touched.password ? <div>{errors.password}</div> : null}
                </div>
                <div style={{ marginBottom: '25px' }} >
                  <Field name="mobilenumber" type="mobilenumber" placeholder="mobilenumber" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.mobilenumber && touched.mobilenumber ? <div>{errors.mobilenumber}</div> : null}
                </div>
                <div style={{ marginBottom: '25px' }} >
                  <Field name="Staffid" type="Staffid" placeholder="Staffid" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.Staffid && touched.Staffid ? <div>{errors.Staffid}</div> : null}
                </div>
                <div style={{ marginBottom: '25px' }} >
                  <Field name="Address" type="Address" placeholder="Address" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#929692', fontSize: '18px', border: 'none' }} />
                  {errors.Address && touched.Address ? <div>{errors.Address}</div> : null}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" onSubmit={onsubmit} style={{ width: '200px', height: '40px', border: 0, borderRadius: "15px", backgroundColor: '#14b31b', color: 'white ', fontSize: '18px' }} >Create Account</button>

                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
