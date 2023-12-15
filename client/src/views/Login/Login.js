import React, { useState, useEffect } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import showToast from 'crunchy-toast';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
  
    const login = async () => {
      const response = await axios.post('/api/login', {
        email: email,
        password: password
      });
  
      showToast(response?.data?.message);
  
      if (response?.data?.success) {
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        window.location.href = "/addtransaction";
      }
  
    };
  
    useEffect(() => {
      const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
     console.log(storageUser);
     
      if (storageUser?.email) {
        alert("You are already logged in!");
        window.location.href = "/";
      }
    }, [])

    return (
        <>
            <div>
                <Navbar />

                <div>
                    <form className='login-form-container'>
                        <h1 className='login-heading'>Login Form</h1>

                        <input type='email' placeholder='Enter Your Email' value={email} className='text-box' onChange={(e) => {
                            setEmail(e.target.value);
                        }} /><br />

                        <input type='password' placeholder='Enter Your Password' value={password} className='text-box' onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        <br />

                        <button type='button' className='login-btn' onClick={login}>Login</button>

                        <p className="text-right">
                            <Link to="/signup">Create a new account?</Link>
                        </p>


                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
