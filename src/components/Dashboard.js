import React from 'react'
import Slidebar from './Slidebar';

import NavBar from './NavBar';
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";
const Dashboard = () => {
  const headerStyle = {
    backgroundColor: '#3b68bb',
    color: '#fff',
    padding: '20px',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const navbarMenuStyle = {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
  };

  const navbarButtonStyle = {
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  const leftPanelStyle = {
    backgroundColor: '#335188',
    width: '200px',
    padding: '20px',
  };

  const leftPanelMenuStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const leftPanelButtonStyle = {
    color: '#000',
    backgroundColor: 'rgb(94, 94, 217)',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const bodySectionStyle = {
    flex: '1',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const iconSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '10px',
    width: '50%',
  };

  const iconStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#6bb7e3',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const iconImgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: '#6bb7e3',
    objectFit: 'contain',
  };

  const iconTextStyle = {
    marginTop: '16px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#161515',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  };
  const navigate = useNavigate()
 
  return (
    <>
    <div style={containerStyle} className="container">
      <div style={bodySectionStyle} className="body-section">
        <div style={iconSectionStyle} className="icon-section">
          <button style={iconStyle} className="icon">
            <img style={iconImgStyle} onClick={()=>navigate('/Schedule')} src="https://icon-library.com/images/schedule-icon-png/schedule-icon-png-26.jpg" alt="Schedule" />
            <span style={iconTextStyle} className="icon-text">Schedule</span>
          </button>
          <button style={iconStyle} className="icon">
            <img style={iconImgStyle}  onClick={()=>navigate('/Visitor')} src="https://icons.veryicon.com/png/o/miscellaneous/merchant-edition/visitor-5.png" alt="Visitor Details" />
            <span style={iconTextStyle} className="icon-text">Visitor Details</span>
          </button>
          <button style={iconStyle} className="icon">
            <img style={iconImgStyle}  onClick={()=>navigate('/Student')} src="https://cdn-icons-png.flaticon.com/512/3135/3135773.png" alt="Student Details" />
            <span style={iconTextStyle} className="icon-text">Student Details</span>
          </button>
          <button style={iconStyle} className="icon">
            <img style={iconImgStyle}  onClick={()=>navigate('/Staff')} src="https://cdn-icons-png.flaticon.com/512/484/484619.png" alt="Staff Details" />
            <span style={iconTextStyle} className="icon-text">Staff Details</span>
          </button>
        </div>
      </div>
    </div>
  </>
  );
}

export default Dashboard



