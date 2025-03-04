import React ,{useState,useEffect}from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { Formik, Field } from 'formik';
const validationSchema = Yup.object().shape({
    ScheduleID: Yup.string()
    .required("checkout detail is required "),
    date: Yup.date()
    .typeError('Invalid date format')
    .required('Date is required'),
    Description: Yup.string()
    .required("description detail is required "),
        Asssignedto: Yup.string()
        .required("checkout detail is required "),
        EndTime: Yup.string()
        .required("checkout detail is required "),
        startTime: Yup.string()
        .required("checkout detail is required "),
});
const Schedule = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        ScheduleID:'',
        date:'',
        Description:'',
        Asssignedto:'',
        EndTime:'',
        startTime:''
    });
    const [errors, setErrors] = useState([]);
    const [Schedule,setSchedule]=useState([]);

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
            const response = await axios.post('http://localhost:5000/api/v4/create', formData);
            if (response.data.success) {
                alert('Data saved successfully.');
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
            const response = await axios.get('http://localhost:5000/api/v4/allSchedule');
            if(!response){
                console.log("nodata")
            }else{
                setSchedule(response.data.Schedule)
                console.log(response.data)
        
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
                await axios.delete(`http://localhost:5000/api/v4/delete/${id}`)
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
                    <h2 className="table-title">Schedule  Detail</h2> {/* Updated table title */}
                    <div className="table-header">


                        <Button variant="primary" onClick={handleShow}>
                            Add New schedule 
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>create new schedule</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form  onSubmit={handleSubmit} >
                                <Form.Group className="mb-3" controlId="ScheduleID">
                                        {/* <Form.Label>Email address</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            placeholder="ScheduleID"
                                            autoFocus
                                            className='mb-2'
                                            name='ScheduleID'
                                            value={formData.ScheduleID}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.ScheduleID}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.ScheduleID}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="date">
                                        {/* <Form.Label>Email address</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            placeholder="date"
                                            autoFocus
                                            className='mb-2'
                                            name='date'
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.date}

                                        />
                                        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="Description">
                                        <Form.Control
                                            type="text"
                                            placeholder="Description"
                                            autoFocus
                                            className='mb-2'
                                            name='Description'
                                            value={formData.Description}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.Description}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Description}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="Asssignedto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Asssignedto"
                                            autoFocus
                                            className='mb-2'
                                            name='Asssignedto'
                                            value={formData.Asssignedto}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.Asssignedto}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Asssignedto}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="startTime">
                                        <Form.Control
                                            type="text"
                                            placeholder="startTime"
                                            autoFocus
                                            className='mb-2'
                                            name='startTime'
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.startTime}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.startTime}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="EndTime">
                                        <Form.Control
                                            type="text"
                                            placeholder="EndTime"
                                            autoFocus
                                            className='mb-2'
                                            name='EndTime'
                                            value={formData.vehicleType}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.EndTime}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.EndTime}</Form.Control.Feedback>
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
                            <th>Schedule id</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Asssignedto</th>
                                <th>startTime</th>
                                <th>EndTime</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table rows with time schedule data */}
{
    Schedule.map((item, index) => (
          <tr key={index}>
          <td>{index+1}</td>
            <td>{item.ScheduleID}</td>
            <td>{item.date}</td>
            <td>{item.Description}</td>
            <td>{item.Asssignedto}</td>
            <td>{item.startTime}</td>
            <td>{item.EndTime}</td>
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

export default Schedule
