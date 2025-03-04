import React, { useState ,useEffect} from 'react'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import './UpdateForm.css'
import axios from 'axios';
const Profile = () => {
    const [securitydata,setsecuritydata]= useState([])
    const validationSchema = Yup.object().shape({
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
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            nic: '',
            jobtype: '',
            password: '',
            mobilenumber: '',
            Staffid: '',
            Address: ''
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission here, e.g., make API call to update details
            console.log('Form submitted with values:', values);
        },
    });
    const getSecurityDetail = async(email) => {
        try {
            await axios.get(`http://localhost:5000/api/v1/one/${email}`)
                .then((response) => {
                    
                    if (response.status) {
                        // alert(response.data.message)
                     
                        console.log(response.data.visitor)
                        setsecuritydata(response.data.visitor)
                   
                    console.log(securitydata)
                    
                    }
                });
        } catch (error) {
            console.log(error)
            //    alert()
        }
    }
useEffect(()=>{
    const email = localStorage.getItem('email')

    getSecurityDetail(email);
},[])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
            <div style={{ fontSize: '25px', marginLeft: '30px', marginTop: '10px' }}>
                Profile
            </div>
            <div style={{ display: 'flex', flex: 1, width: '100%', alignItems: 'center' }}>
                <div style={{ display: 'flex', height: '100vh', width: '50%', alignItems: 'center', justifyContent: "start", }} >
                    <img />
                </div>
                <div style={{ flexDirection: "column", height: '100vh', width: '50%', display: 'flex' }}>
                    <h2 style={{ textAlign: "start" }}>User Detail</h2>


                    <form className="update-form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="error">{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="error">{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="nic">Nic:</label>
                            <input
                                type="text"
                                id="nic"
                                name="nic"
                                value={formik.values.nic}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.nic && formik.errors.nic ? (
                                <div className="error">{formik.errors.nic}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobtype">Jobtype:</label>
                            <input
                                type="text"
                                id="jobtype"
                                name="jobtype"
                                value={formik.values.jobtype}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.jobtype && formik.errors.jobtype ? (
                                <div className="error">{formik.errors.jobtype}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobilenumber">Mobile Number:</label>
                            <input
                                type="text"
                                id="mobilenumber"
                                name="mobilenumber"
                                value={formik.values.mobilenumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.mobilenumber && formik.errors.mobilenumber ? (
                                <div className="error">{formik.errors.mobilenumber}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Staffid">Staffid:</label>
                            <input
                                type="text"
                                id="Staffid"
                                name="Staffid"
                                value={formik.values.Staffid}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.Staffid && formik.errors.Staffid ? (
                                <div className="error">{formik.errors.Staffid}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Address">Address:</label>
                            <input
                                type="text"
                                id="Address"
                                name="Address"
                                value={formik.values.Address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.Address && formik.errors.Address ? (
                                <div className="error">{formik.errors.Address}</div>
                            ) : null}
                        </div>
                        {/* Add more fields here */}
                        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: "#007bff", color: "#fff", borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Profile
