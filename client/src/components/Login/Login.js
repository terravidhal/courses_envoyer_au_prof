import React,{ useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";





const Login = (props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const cookies = new Cookies();
  
    
  
    const login = (event) =>{
      event.preventDefault();
      axios.post('http://localhost:8000/api/login',{
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      })
      .then(async(res)=>{
        cookies.set('USER_OBJ', res.data.user);
        await localStorage.setItem("USER_OBJ", JSON.stringify(res.data.user));
        navigate("/courses");
      })
      .catch((err)=>{
        console.log(err.response);
        setErrorMessage(err.response.data.message);
      })
  };
  
  return(
    <div>
      <h2>Login</h2>
      <p className="error-text">{errorMessage? errorMessage : ""}</p>
      <form onSubmit={login}>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <button type="submit">Sign in</button>
      </form>
      </div>
    );
  };
  
  export default Login;