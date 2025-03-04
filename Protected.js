import React from 'react'

const Protected = () => {
    const isAuthenticated = localStorage.getItem("valid");
    console.log("this", isAuthenticated);
  return (
    <div>
      
    </div>
  )
}

export default Protected
