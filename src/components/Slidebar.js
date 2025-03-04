import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Slidebar.css'

import { useNavigate, Link } from 'react-router-dom';


const Slidebar = () => {
  const [active ,setActive]=useState(1);

  return (


    <div className='slidebar d-flex justify-content-between flex-column bg-info text-white p-3 ps-3 pe-5 vh-100'>
      <div>
        <span className='p-3'>
        
              <span>  Dashboard </span>
        </span>
        <hr className='text-white mt-2' />
        <ul className='nav nav-pills flex-column mt-2'>
          <li className={active===1 ? 'active nav-item p-2' :'nav-item p-2'}  onClick={e=>setActive(1)}>
            <Link to={'/Dashboard'} className='p-1' style={{textDecoration:'none',color:"white"}}>
             
              <span style={{textDecoration:'none'}}> <strong> Dashboard </strong></span>
            </Link>

          </li>
          <li className={active===2 ? 'active nav-item p-2' :'nav-item p-2'}  onClick={e=>setActive(2)}>
            <Link to={'/Schedule'} className='p-1' style={{textDecoration:'none',color:"white"}}>
          
              <span> <strong> Schedule </strong></span>
            </Link>

          </li>
          <li className={active===3 ? 'active nav-item p-2' :'nav-item p-2'}  onClick={e=>setActive(3)}>
            <Link to={'/Visitor'} className='p-1' style={{textDecoration:'none',color:"white"}}>
             
              <span> <strong> Visitor Detail </strong></span>
            </Link>

          </li>
          <li className={active===4 ? 'active nav-item p-2' :'nav-item p-2'}  onClick={e=>setActive(4)}>
            <Link to={'/Student'} className='p-1' style={{textDecoration:'none',color:"white"}}>
         
              <span> <strong> Student Detail </strong></span>
            </Link>

          </li>
          <li className={active===5 ? 'active nav-item p-2' :'nav-item p-2'}  onClick={e=>setActive(5)}>
            <Link to={'/Staff'} className='p-1' style={{textDecoration:'none',color:"white"}}>
            
              <span> <strong>Staff Detail  </strong></span>
            </Link>

          </li>
        </ul>
      </div>

      <div className='slidebar'>
      <hr className=' text-white mt-2' />
      <div className={active===6 ? 'active nav-item p-2' :'nav-item p-2'}  onClick={e=>setActive(6)}>
            <Link href='' className='p-1' style={{textDecoration:'none',color:"white"}}>
              <span> <strong> Setting </strong></span>
            </Link>

          </div>
      </div>
    </div>
  )
}

export default Slidebar
