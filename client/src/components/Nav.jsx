import React from "react";
import {Link, useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate("/login"); 
    }
    return (
        <div className="navContainer">
        <img className="imgLogo" src="data:image/jpeg;base64,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" alt="Logo" />
        { auth ?  <ul className="nav-ul">
                <li><Link className="nli" to="/"  >Products</Link></li>
                <li><Link className="nli" to="/add"  >Add product</Link></li>
                {/* <li><Link className="nli" to="/update"  >Update Product</Link></li> */}
                {/* <li>{auth ? <Link onClick={logout} to="/signup" >Logout</Link> : <li><Link to="/signup"  >SignUp</Link></li> }</li> */}
                <li><Link className="nli" to="/profile/:id"  >Profile ({JSON.parse(auth).name})</Link></li>
                <span className="LogoutContainer"><Link className="nli logout-link" onClick={logout} to="/login" >Logout</Link></span>
                </ul>
                :
                <div className="logContainer"><ul className="nav-ul nav-right">
                <li><Link className="nli" to="/signup"  >SignUp</Link></li>
                    <li><Link className="nli nav-right-link" to="/login" >Login </Link></li>
                </ul></div>
        }       
                    
            
        </div>
    );
}

export default Nav;