import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
    });
const handleLogin = async ()=>{
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login",{
        method:"post",
        body:JSON.stringify({email, password}),
        headers:{
            'Content-Type':'application/json'
        },
    });
    result = await result.json();
    console.log(result);
    if(result.auth){
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
    }
    else{
        alert("Enter a valid email or password");
    }
}

    return(
        <div class="login SignUpForm">
        <h1>Login</h1>
        <div className="FormInputContainer">
            <input className="inputBox" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email"></input>
            <input className="inputBox" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password"></input>
            <button type="submit" className="inputBox btn" onClick={handleLogin}>Login</button>
        </div>
        <div className="loginWhiteSpace"></div>
        </div>
    );
}

export default Login;