import { BrowserRouter, Routes, Route, Outlet,redirect} from "react-router-dom";
import './App.css';
import { ToastContainer, toast } from 'react-toastify';

import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Slidebar from "./components/Slidebar";
import Visitor from "./components/Visitor";
import Student from "./components/Student";
import Staff from "./components/Staff";
import NavBar from "./components/NavBar";
import Schedule from "./components/Schedule";
import 'bootstrap/dist/css/bootstrap.css';
import Profile from "./components/Profile";
function App() {

   const isAuthenticated = localStorage.getItem("valid");
    console.log("this", isAuthenticated);
  return (
    <BrowserRouter>
    <Routes >
    
      <Route path="/" element={<LoginPage />} />
      <Route path="/Signup" element={<Signup />} />

      <Route element={<Layout />}>
        <Route path="/Visitor" element={<Visitor />} />
      </Route>

      <Route element={<Layout />}>
     
        <Route path="/dashboard" element={ <Dashboard />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/Visitor" element={<Visitor />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/Student" element={<Student />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/Staff" element={<Staff />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/Schedule" element={<Schedule />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/Profile" element={<Profile />} />
      </Route>
    </Routes>
    <ToastContainer />
  </BrowserRouter>
  );
}
function Layout() {
  return (
      <div>
          <NavBar />
          <div className='d-flex ' >
              <div className='w-auto'>
                  <Slidebar />
              </div>
              <div className='col'>
                  <Outlet />
              </div>
          </div>
      </div>
  );
}
export default App;
