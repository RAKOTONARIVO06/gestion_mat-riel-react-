
import { Outlet,useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const navigate=useNavigate();
  const [users,setPerson]=useState({
    matricule:"",
    nom:"",
    prenom:"",
    contact:""
  })
  const handleChange = (e)=>{
   setPerson((prev)=>({...prev,[e.target.name]:e.target.value}));
  };

  const handleClick = async(e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/create/",users);
      alert("Submited");
      navigate("/users");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  return(
    <>
    <form action="">
      <label htmlFor="matricule">Entrer matricule</label>&nbsp;
      <input type="text"name="matricule" onChange={handleChange} /><br /><br />
      <label htmlFor="nom" >Entrer nom</label>&nbsp;
      <input type="text" name="nom" onChange={handleChange}/><br /><br />
      <label htmlFor="prenom" > Entrer prenom</label>&nbsp;
      <input type="text"  name="prenom" onChange={handleChange}/><br /><br />
      <label htmlFor="contact" >Entrer contact</label>&nbsp;
      <input type="number" name="contact" onChange={handleChange}/><br />
      <input type="button" value="Enregistrer" onClick={handleClick}/>
    </form>
      
    </>
  )
};

export default Contact;