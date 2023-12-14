import React, { useState, useEffect } from 'react'
import "./Signup.css"
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import showToast from 'crunchy-toast';

function Signup() {

  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  // const signup = async () => {
  //   if (!name) {
  //     alert("Name is required")
  //     return;
  //   }
  //   if (!email) {
  //     alert("Email is required")
  //     return;
  //   }

  //   if (!password) {
  //     alert("password is required")
  //     return;
  //   }

  //   if (!mobile) {
  //     alert("Mobile is required")
  //     return;
  //   }
  //   if (!address) {
  //     alert("Adress is required")
  //     return;
  //   }

  //   const response = await axios.post('/api/signup', {
  //     name: name,
  //     email: email,
  //     password: password,
  //     mobile: mobile,
  //     address: address,
  //     gender: gender

  //   })

  //   if (response.data.success) {
  //     showToast(response.data.message, "success", 3000);
  //     window.location.href = "/login";
  //   } else {
  //     showToast(response.data.message, "alert", 3000);
  //     setName("");
  //     setEmail("");
  //     setMobile("");
  //     setPassword("");
  //     setAddress("");
  //   }
  // }

  async function signup() {
    if (!name) {
      showToast("name is required", "alert", 4000);
      return;
    }
    if (!email) {
      showToast("email is required", "alert", 4000);
      return;
    }
    if (!password) {
      showToast("password is required", "alert", 4000);
      return;
    }
    if (!mobile) {
      showToast("mobile number is required", "alert", 4000);
      return;
    }
    if (!address) {
      showToast("address is required", "alert", 4000);
      return;
    }
    const response = await axios.post("/api/signup", {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      address: address,
      gender: gender,
    });
    console.log(response.data);
    if (response.data.success) {
      showToast(response.data.message, "success", 3000);
      window.location.href = "/login";
    } else {
      showToast(response.data.message, "alert", 3000);

      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setAddress("");
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
        <form className='signup-form-container'>
          <h2 className='signup-heading'>Signup Form</h2>

          <input type='text'
            placeholder='Enter Your Name'
            value={name}
            className='text-box'
            onChange={(e) => {
              setName(e.target.value);
            }} /><br />

          <input type='email'
            placeholder='Enter Your Email'
            value={email}
            className='text-box'
            onChange={(e) => {
              setEmail(e.target.value);
            }} /><br />

          <input type='password'
            placeholder='Enter Your Password'
            value={password}
            className='text-box'
            onChange={(e) => {
              setPassword(e.target.value);
            }} /><br />

          <input type='text'
            value={mobile}
            placeholder='Enter Your Mobile No'
            className='text-box'
            onChange={(e) => {
              setMobile(e.target.value);
            }} /><br />

          <input type='text'
            placeholder='Enter Your Address'
            value={address}
            className='text-box'
            onChange={(e) => {
              setAddress(e.target.value);
            }} /><br />

          {/* <label className='text-center'>Select Gender</label><br /> */}

          <div>

            <input type='radio'
              name='gender'
              id='male'
              className='gender'
              checked={gender === "male"}
              onClick={() => {
                setGender("male");
              }} />
            <label htmlFor='male'>Male</label>

            <input type='radio'
              name='gender'
              id='female'
              className='gender'
              checked={gender === "female"}
              onClick={() => {
                setGender("female");
              }} />
            <label htmlFor='female'>Female</label>

          </div>

          <button className='btn-signup' onClick={signup}>Signup</button>

        </form>
      </div>
    </div>
  )
}

export default Signup
