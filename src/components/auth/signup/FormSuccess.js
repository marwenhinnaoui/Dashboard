import React from 'react';
import '../assets/Form.css';
import success from '../assets/success.png';
//for test page
import { Redirect } from 'react-router-dom';
import logo from '../assets/logo.svg';

const FormSuccess = () => {




  return (
    <div className='form-container'>
    <span className='close-btn'></span>
    <div className='form-content-left'>
      <img className='form-img' src={logo} alt='spaceship' />
    </div>
    
    <div className='form-content-right'>
      <h1 className='form-success'>We have received your request!</h1>
      <img className='form-img-2' src={success} alt='error-login-image' />
    </div>
    </div>
    
  );
};

export default FormSuccess;
