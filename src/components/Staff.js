import React ,{useState,useEffect}from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { Formik, Field } from 'formik';
const validationSchema = Yup.object().shape({
    StaffID: Yup.string().required('StaffID is required'),
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
    .matches(/^\d{9}[vVxX]$/, 'Invalid NIC format'),
    vehicleType:Yup.string()
    .required("Vehicle type is required "),
    licenceNo: Yup.string()
    .required("licenceNo is required "),
        checkIn:Yup.string()
        .required("checkIn detail is required "),
        checkout: Yup.string()
        .required("checkout detail is required "),
       
});
const Staff = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        StaffID: '',
        lastName: '',
        firstName: '',
        nic: '',
        vehicleType: '',
        licenceNo: '',
        checkIn: '',
        checkout: '',
    });
    const [errors, setErrors] = useState([]);
    const [staff,setstaff]=useState([]);

    const handleClose = () => {
        setShow(false)
        setErrors({});
    };

    const handleShow = () => setShow(true);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log(formData)


            const response = await axios.post('http://localhost:5000/api/v3/create', formData);
            if (response.data.success) {
                console.log('Data saved successfully.');
                toast.success(response.data  , {autoClose:3000})
                handleClose();
                setFormData("")
                getallstudent()
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((validationError) => {
                    newErrors[validationError.path] = validationError.message;
                    console.log(error)
                });
                setErrors(newErrors);
                console.log(newErrors)
            } else {
                console.error('Error saving data:', error);
                // Handle other errors (e.g., server error) if necessary.
            }
        }
    };
    const getallstudent=async()=>{
        try {
            const response = await axios.get('http://localhost:5000/api/v3/allStaff');
            if(!response){
                console.log("nodata")
            }else{

                setstaff(response.data.Staff)
                console.log(response)
        
            }
        } catch (error) {
            console.log(error)
        }
        }
        useEffect(()=>{
            getallstudent();
        },[])

        async function DeleteData(id) {
            try {
                await axios.delete(`http://localhost:5000/api/v3/delete/${id}`)
                    .then((response) => {
                        if (response.status){
                            alert(response.data.message)
                            console.log(response.data)
                        }
    
                    });
    
            } catch (error) {
                console.log(error)
                //    alert()
            }
        }
  return (
    <div>
            <div className="container">
                <div className="content-area">
                    <h2 className="table-title">staff  Detail</h2> {/* Updated table title */}
                    <div className="table-header">


                        <Button variant="primary" onClick={handleShow}>
                            Add New staff Detail
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>create new staff</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form  onSubmit={handleSubmit} >
                                    <Form.Group className="mb-3" controlId="StaffID">
                                        {/* <Form.Label>Email address</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            placeholder="StaffID"
                                            autoFocus
                                            className='mb-2'
                                            name='StaffID'
                                            value={formData.StaffID}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.StaffID}

                                        />
                                        <Form.Control.Feedback type="invalid">{errors.StaffID}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Control
                                            type="text"
                                            placeholder="LastName"
                                            autoFocus
                                            className='mb-2'
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Control
                                            type="text"
                                            placeholder="firstName"
                                            autoFocus
                                            className='mb-2'
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="nic">
                                        <Form.Control
                                            type="text"
                                            placeholder="nic"
                                            autoFocus
                                            className='mb-2'
                                            name='nic'
                                            value={formData.nic}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.nic}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.nic}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="vehicleType">
                                        <Form.Control
                                            type="text"
                                            placeholder="vehicle Type"
                                            autoFocus
                                            className='mb-2'
                                            name='vehicleType'
                                            value={formData.vehicleType}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.vehicleType}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.vehicleType}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="licenceNo">
                                        <Form.Control
                                            type="text"
                                            placeholder="licenceNo"
                                            autoFocus
                                            className='mb-2'
                                            name='licenceNo'
                                            value={formData.licenceNo}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.licenceNo}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.licenceNo}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="checkIn">
                                        <Form.Control
                                            type="text"
                                            placeholder="checkIn"
                                            autoFocus
                                            className='mb-2'
                                            name='checkIn'
                                            value={formData.checkIn}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.checkIn}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.checkIn}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="checkout">
                                        <Form.Control
                                            type="text"
                                            placeholder="checkout"
                                            autoFocus
                                            className='mb-2'
                                            name='checkout'
                                            value={formData.checkout}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.checkout}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.checkout}</Form.Control.Feedback>

                                    </Form.Group>


                                   
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSubmit} type='submit'  >
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                            <th></th>
                                <th>staff id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>NIC</th>
                               
                                <th>Vehicle Type</th>
                                <th>licenceNo</th>
                                <th>Check in</th>
                                <th>Check out</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* Table rows with time schedule data */}
{
    staff.map((item, index) => (
          <tr key={index}>
          <td>{index+1}</td>
            <td>{item.StaffID}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.nic}</td>
          
            <td>{item.vehicleType}</td>
            <td>{item.licenceNo}</td>
            <td>{item.checkIn}</td>
            <td>{item.checkout}</td>
            <td> <button onClick={() => DeleteData(item._id)}>Delete</button> </td>

           
          </tr>
        ))
}
                            {/* Add more table rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
  )
}

export default Staff
