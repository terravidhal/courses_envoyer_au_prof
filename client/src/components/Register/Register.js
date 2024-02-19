import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Register = (props)=>{
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword:""
    })
  
    const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]: e.target.value 
      })
    }
  
    const register = e =>{
      e.preventDefault();
      axios.post('http://localhost:8000/api/register',
      user,
      {
        withCredentials: true,
      })
      .then(res =>{
        console.log(res.data);
        setUser({
          name:"",
          email:"",
          password:"",
          confirmPassword:""
        })
        setConfirmReg("Thank you for registering, you can now log in");
        setErrs({});
        navigate("/login_page");
      })
      .catch((err)=>{
       // console.log(err);
        setErrs(err.response.data.errors.errors);
        console.log("+++++++++",err.response.data.errors.errors);
      })
  };
  
  return(
    <div>
      <h2>Register</h2>
      {
        confirmReg?
        <h1 style={{color: "grey"}}>{confirmReg}</h1>
        :null
      }
      <form onSubmit={register}>
        <div>
          <label>name</label>
          {
            errs.name?
            <span className="error-text">{errs.name.message}</span>
            :null
          }
          <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Email</label>
          {
            errs.email?
            <span className="error-text">{errs.email.message}</span>
            :null
          }
          <input type="email" name="email" value={user.email} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Password</label>
          {
            errs.password?
            <span className="error-text">{errs.password.message}</span>
            :null
          }
          <input type="password" name="password" value={user.password} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Confirm Password</label>
          {
            errs.confirmPassword?
            <span className="error-text">{errs.confirmPassword.message}</span>
            :null
          }
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=> handleChange(e)}/>
        </div>
        <button type="submit">Register Me</button>
      </form>
    </div>
  );
  };
  
  export default Register;