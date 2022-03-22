import { useState, useEffect } from 'react';
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    singup()
  };

  const api= axios.create({
    baseURL:'http://localhost:8070',
    headers: {
        "Content-Type": "application/json"
        }
    
    }
)

const singup =()=>{

  let resutl =api.post('/register',{
      email:  values.email,
      username: values.username,
      password: values.password,
      is_staff:true
  }).then(userResponse =>{
      console.log(userResponse)
      //setLoading(true)
    

  }).catch((errorResponse)=>{
      console.log(errorResponse)
  })
}





  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
