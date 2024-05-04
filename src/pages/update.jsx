import axios from "axios";
import React from "react";

import { useState,useEffect } from "react";
import { useLocation,useNavigate, useParams } from "react-router-dom";
 
const Update= ()=>{
    const location = useLocation();
    const {matricule}=useParams();
    const navigate = useNavigate();

     
     
    const [users,setUser]=useState({
        matricule:"",
        nom:"",
        prenom:"",
        contact:""
    })
    
    const handleChange = (e)=>{
     setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    useEffect(()=>{
        axios.get("http://localhost:3001/search/"+userMatr).then(res=>{
            console.log(userMatr);
            setUser(res.data[0]);
            console.log(users);

        }).catch(err=>console.log(err))
    },[])

    const userMatr=location.pathname.split("/")[3];

    const handleClick = async (e) => {
        e.preventDefault();
        try {
         axios.put(`http://localhost:3001/update/${userMatr}`,users);
            navigate('/users');
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    return(
        <>
      
      <form action="">
      <label htmlFor="matricule">Entrer matricule</label>&nbsp;
      <input type="text"name="matricule" onChange={handleChange} value={userMatr} disabled /><br /><br />
      <label htmlFor="nom" >Entrer nom</label>&nbsp;
      <input type="text" name="nom" onChange={handleChange} value={users.nom}/><br /><br />
      <label htmlFor="prenom" > Entrer prenom</label>&nbsp;
      <input type="text"  name="prenom" onChange={handleChange} value={users.prenom}/><br /><br />
      <label htmlFor="contact" >Entrer contact</label>&nbsp;
      <input type="number" name="contact" onChange={handleChange} value={users.contact}/><br />
      <input type="button" value="Enregistrer" onClick={handleClick}/>
    </form>
    </>
  
    )
}

export default Update;