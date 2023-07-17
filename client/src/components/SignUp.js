import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = ()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData = async ()=> {
        console.log(name, password, email);
        if(!name || !email || !password){
            alert("Please enter all the details");
        }
        else{
            let result = await fetch("http://localhost:5000/register", {
            method:'POST',
            body:JSON.stringify({name, email, password}),
            headers:{
                'Content-Type':'application/json'
            },
        }); 
        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        if(result){
            navigate('/');
        }
        }
        
    }

    return(
        <div className="SignUpForm">
            <h1>Register</h1>
            <div className="FormInputContainer">
            <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"></input>
            <input className="inputBox" type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></input>
            <input className="inputBox" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></input>
            <button type="submit" onClick={collectData} className="inputBox btn">Sign Up</button>
            </div>
            <div className="signUpWhiteSpace"></div>
        </div>
    );
}

export default SignUp;