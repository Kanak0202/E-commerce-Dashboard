import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const ProductList = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async ()=>{
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        console.log(result);
        setProducts(result);
    }

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"delete",
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        if(result){
            getProducts(result);
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if (key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
        result = await result.json();
        if(result){
            setProducts(result);
        }
        }
        else{
            getProducts();
        }
    }

    return(
        <div class="ProductListContainer">
            <h1>Products List</h1>
            <input type="text" className="searchProduct" placeholder="Search Product" onChange={searchHandle} />
            <ul className="ItemList">
                <li className="ProductListItem heading">S. No</li>
                <li className="ProductListItem heading">Name</li>
                <li className="ProductListItem heading">Price</li>
                <li className="ProductListItem heading">Category</li>
                <li className="ProductListItem heading">Company</li>
                <li className="ProductListItem heading">Operations</li>
            </ul>
            {products.length>0 ? products.map((item,index)=>{
                return(
                    <ul key={item._id} className="ItemList">
                <li className="ProductListItem">{index + 1}</li>
                <li className="ProductListItem">{item.name}</li>
                <li className="ProductListItem">$ {item.price}</li>
                <li className="ProductListItem">{item.category}</li>
                <li className="ProductListItem">{item.company}</li>
                <li className="ProductListItem">
                <button className="btnPList"><Link className="UpdateLink" to={"/update/" + item._id} >Update</Link></button>
                <button type="submit" className="btnPList" onClick={()=>deleteProduct(item._id)}>Delete</button>
                
                </li>
            </ul>
                )
               
            }) : 
            <img className="noResults" src="https://cdn.dribbble.com/users/1242216/screenshots/9326781/dribbble_shot_hd_-_3_4x.png" alt="No results found"/>
            }
            
            
        </div>
    );
}

export default ProductList;