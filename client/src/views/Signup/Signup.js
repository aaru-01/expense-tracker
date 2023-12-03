import React, { useState } from 'react'
import "./Signup.css"
import Navbar from '../../components/Navbar/Navbar'

function Signup() {

  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
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

          <button className='btn-signup'>Signup</button>

        </form>
      </div>
    </div>
  )
}

export default Signup
