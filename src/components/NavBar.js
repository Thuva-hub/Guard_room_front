/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, Link } from 'react-router-dom';
function NavBar() {
    const navigate = useNavigate()
    const showBox = () => (
        <div style={{ width: '100px', height: "100px" }}>
            sdvfvf
        </div>
    )

    const logout=()=>{
        localStorage.clear();
        navigate('/')
    }
  
    return (
        <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary">
            <div className="container-fluid">
                <a className="navbar-brand ms-5" ><i class="bi bi-house-fill"></i></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">

                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                <i class="bi bi-person-circle" ></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item   onClick={()=>navigate('/Profile')}>profile</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={logout} >Logout</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default NavBar