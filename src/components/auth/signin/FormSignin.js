import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import '../assets/Form.css';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const FormSignin = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Get started with us today! . Log in Now
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        
        <button className='form-input-btn' type='submit'>
          Sign In
        </button>
        <span className='form-input-login'>
        New user?<Link to="/singup"> Create Account</Link>
        </span>
      </form>
    </div>
  );
};

export default FormSignin;
