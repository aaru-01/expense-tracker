import React, { useState, useEffect } from 'react'
import "./Login.css"
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {

        const response = await axios.get("/api/login", {
            email: email,
            password: password
        });
        alert(response?.data?.message);
        if (response?.data?.success) {
            localStorage.setItem("user", JSON.stringify(response?.data?.data));
            window.location.href = "/";
        }

    }

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
        if (storageUser?.email) {
            alert("You are already logged in!");
            window.location.href = "/";
        }
    }, [])

    return (
        <div>
            <Navbar />

            <div>
                <form className='login-form-container'>
                    <h1 className='login-heading'>Login Form</h1>
                    <input type='email' placeholder='Enter Your Email' value={email} className='text-box' onChange={(e) => {
                        setEmail(e.target.value);
                    }} /><br />
                    <input type='text' placeholder='Enter Your Password' value={password} className='text-box' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <br />
                    <button type='button' className='login-btn' onClick={login}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
