import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet,useNavigate,Link ,useLocation,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NewMateriel= (props)=>{
   const location=useLocation();
   //const {idMateriel}=useParams();
  //  const materielId=location.pathname.split("/")[3];
  const [placeTag,setPlaceTag]=useState();
    
  var err;
    const height="30px";
    const navigate=useNavigate();
    const [materiels,setMateriel]=useState({
      idMateriel:"",
      design:"",
      quantite:"",
      etat:"Mauvais",
     
    })

    useEffect(()=>{
      if(props.id){
        const userDetails=async ()=>{
          // Si idMateriel est présent, récupérez les détails du matériel à modifier
         console.log(props.id+ "io le params");
         axios.get("http://localhost:3001/search/"+props.id).then(res=>{
           setMateriel(res.data[0]);
           props.id=null;
           console.log(materiels);
           console.log(props.id+ "io le params");
         }
         ).catch(err=>console.log(err));
         
        };
        userDetails();
      }
      
    },[props.id])

    const handleChange = (e)=>{
        setMateriel((prev)=>({...prev,[e.target.name]:e.target.value}));
       };
     
       const handleClick = async(e) =>{
         e.preventDefault();
         if(props.id){
          try {
            if(materiels.design===""){
              
              setPlaceTag(1)
              
            }else if(materiels.quantite===""){
              
              setPlaceTag(3)
          
            }else{
              await axios.put(`http://localhost:3001/update/${props.id}`, materiels);
              alert("updated");
              navigate("/materiels", {state: {updateList:true} }) ;
              window.location.reload();
            }}catch (error) {
              alert(error+" dea");
            
            }
           // Si idMateriel est présent, effectuez une requête de mise à jour
       
        } else {
          try {
           if(materiels.design===""){
             
             setPlaceTag(1)
             
           }else if(materiels.quantite===""){
             
             setPlaceTag(3)
         
           }else if(materiels.etat===""){
             err="etat field is required"
             setPlaceTag(2)
            
           }
           else{
            const response = await axios.post("http://localhost:3001/create/",materiels);
            console.log("design:"+materiels.design+"quantite:"+materiels.quantite+"etat:"+materiels.etat);
            alert("Submited");
             // Rediriger en passant une fonction de rappel pour mettre à jour la liste
            navigate("/materiels", { state: { updateList:true } });
             window.location.reload();
            } 
            
         }catch (error) {
          alert(error+" dea");
        
        }
      }
    }

   return (
    <>
    <div className='container'>
    <form action="">
        
        <label htmlFor="id">{placeTag==1? <p style={{color:"red"}}>designation*</p>:"designation"} </label>
        <input type="text" className='form-control' style={placeTag==1?{borderColor:"red"}:{}} value={materiels.design} name="design" onChange={handleChange} /><br /> 
        <label htmlFor="etat">etat</label>
        <select name="etat" value={materiels.etat} id="" className='form-control'onChange={handleChange}>
            <option name="mauvais" value="Mauvais">Mauvais</option>
            <option name="bon" value="Bon">Bon</option>
            <option name="abime" value="Abimé">Abimé</option>

        </select><br />
        <label htmlFor="quantite">{placeTag==3? <p style={{color:"red"}}>quantite*</p>:"quantite"}</label>
        <input type="text" className='form-control'style={placeTag==3?{borderColor:"red"}:{}} name="quantite" value={materiels.quantite} onChange={handleChange}/><br />
        <button className="btn btn-outline-primary" onClick={handleClick}>enregist..</button>
        {/* <p>{idMateriel}</p> */}
    </form>
    
    </div>
    


    </>
    
   )
}
export default NewMateriel