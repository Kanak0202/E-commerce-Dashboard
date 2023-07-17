import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const AddProduct = ()=>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const addProduct = async ()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        
        console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method:"post",
            body:JSON.stringify({name, price, category, company, userId}),
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
            <h1>Add Product</h1>
            <div className='FormInputContainer'>
            <input type="text"className='inputBox' placeholder='Enter Product Name' onChange={(e)=>setName(e.target.value)} value={name}/>
            {error && !name && <span className='error-warning'>*Enter valid name</span>}
            <input type="text"className='inputBox' placeholder='Enter Product Price' onChange={(e)=>setPrice(e.target.value)} value={price}/>
            {error && !price && <span className='error-warning'>*Enter valid price</span>}
            <input type="text"className='inputBox' placeholder='Enter Product Category' onChange={(e)=>setCategory(e.target.value)} value={category}/>
            {error && !category && <span className='error-warning'>*Enter valid category</span>}
            <input type="text"className='inputBox' placeholder='Enter Product Company' onChange={(e)=>setCompany(e.target.value)} value={company}/>
            {error && !company && <span className='error-warning'>*Enter valid company</span>}
            <button type="submit" className='btn inputBox' onClick={addProduct}>Add</button>
            </div>
            <div className='AddProductWhiteSpace'></div>

        </div>
    );
}

export default AddProduct;