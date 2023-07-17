import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            body:JSON.stringify({name, price, category, company}),
            headers:{
                "Content-Type":"application/json",
                Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        navigate("/");
    }

    return(
        <div className='SignUpForm'>
            <h1>Update Product</h1>
            <div className='FormInputContainer'>
            <input type="text"className='inputBox' placeholder='Enter Product Name' onChange={(e)=>setName(e.target.value)} value={name}/>
            
            <input type="text"className='inputBox' placeholder='Enter Product Price' onChange={(e)=>setPrice(e.target.value)} value={price}/>
   
            <input type="text"className='inputBox' placeholder='Enter Product Category' onChange={(e)=>setCategory(e.target.value)} value={category}/>

            <input type="text"className='inputBox' placeholder='Enter Product Company' onChange={(e)=>setCompany(e.target.value)} value={company}/>
  
            <button type="submit" className='btn inputBox' onClick={updateProduct}>Update</button>
            </div>
            <div className='UpdateProductWhiteSpace'></div>

        </div>
    );
}

export default UpdateProduct;