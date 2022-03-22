import React, { useState,  } from 'react';
import '../assets/Form.css';
import FormSignin from './FormSignin';
// import FormSuccess from './FormSuccess';
import logo from '../assets/logo.svg';

import {useNavigate} from "react-router-dom";

const FormSin = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const name='';
  function submitForm() {
    setIsSubmitted(true);
  }
  const navigate = useNavigate();
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'></span>
        <div className='form-content-left'>
          <img className='form-img' src={logo} alt='spaceship' />
        </div>
        <FormSignin submitForm={submitForm}  username={name}/>
      </div>
    </>
  );
};

export default FormSin;
