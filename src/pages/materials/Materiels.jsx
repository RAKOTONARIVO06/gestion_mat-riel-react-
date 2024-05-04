import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import { Navigate,Link,Outlet, createPath, useNavigate } from "react-router-dom";
import NewMateriel from '../newMateriel';
import './materials.css'
import DeleteModal from '../../components/deleteModal/deleteModal';
import {Bar,Line} from  "react-chartjs-2";
import {Chart, CategoryScale ,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
Chart.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
const Materiel= () => {
  const [total,setTotal]=useState();
   const [abime,setAbime]=useState();
   const [mauvais,setMauvais]=useState();
   const [bon,setBon]=useState();
   const navigate = useNavigate();
   const [addModal,setAddModal]=useState(false);
   const [editModal,setEditModal]=useState(false);   
   const [materiels,setMateriel]=useState([]);
   const [idEdit,setIdEdit]=useState();
   const [idDelete,setIdDelete]=useState();
   const [deleteModal,setDeleteModal]=useState();
    const [dat,setDat]=useState([]);
    const [etat,setEtat]=useState(
      [{
        value:"abimé",
      },
      {
        value:"bon",
      },
      {
        value:"mauvais",
      }
    ]
    )
    const [colo,setColor]=useState(
      [{
        color:"red",
      },
      {
        color:"blue",
      },
      {
        color:"green",
      }
    ]
    )

   const fetchAllUsers= async()=>{
    try {
      const res=await axios.get("http://localhost:3001/materiels");
      setMateriel(res.data);
      console.log(materiels);
       // Vérifier si une mise à jour de la liste est nécessaire
       const shouldUpdateList = navigate?.location?.state?.updateList;
       if (shouldUpdateList) {
         // Actualiser la liste
        setMateriel(res.data);
         // Réinitialiser l'indicateur de mise à jour
         navigate("/materiels", { replace: true, state: { updateList: false } });
       }
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchArrayData = async() =>{
    let abimeCount = 0;
    let mauvaisCount = 0;
    let bonCount = 0;
     try{
       const res=await axios.get("http://localhost:3001/count");
        for(var i=0; res.data.length>i ; i++){
          const typeLowerCase = res.data[i].type.toLowerCase();
          
           if(typeLowerCase === "abimé"){
             abimeCount=res.data[i].quantite
             console.log(abime + " isa ")
           }
           else if(typeLowerCase === "bon"){
             bonCount=res.data[i].quantite
          }
          else if(typeLowerCase=="mauvais"){
             mauvaisCount=res.data[i].quantite
           }
       }
       setAbime(abimeCount)
       setBon(bonCount)
       setMauvais(mauvaisCount)
       console.log(abime + " isa ")
       console.log(mauvais +"isa")
       console.log(bon + "isa")       
    }catch(error){
      
    }
  };

  const hideModal=async()=>{
    setAddModal(false);
    setEditModal(false);
  }
  

  
   const countSum= async ()=>{
   try {
      const res= await axios.get("http://localhost:3001/countSum");
       setTotal(res.data);
     } catch (error) {
      
     }
   }
   useEffect(()=>{
    countSum();
    fetchAllUsers();
    fetchArrayData();
     fetchCount();
    
  },[navigate]);


  //Données de l'histogramme
  const fetchCount= async() =>{
     try {
       const res= await axios.get("http://localhost:3001/quantityEtat");
       setDat(res.data)
     } catch (error) {
       alert(error+"gjhg")
     }
   }

  //  const handleEdit= async (idMateriel) =>{
  //   navigate(`/materiels/newMateriels/${idMateriel}`);
  //  }

   const handleDelete = async (idMateriel) =>{
  //  try {
  //     console.log(idMateriel);
  //     await axios.delete(`http://localhost:3001/delete/${idMateriel}`);
  //     setMateriel((prevMateriels) => prevMateriels.filter(materiel => materiel.idMateriel !== idMateriel));
  //     // window.location.reload();
  //    navigate('/materiels');
  //    fetchArrayData();
  //    countSum();
  //   } catch (error) {
  //     console.log(error);
  //   }
   setIdDelete(idMateriel)
   setDeleteModal(true)
  }

  const showEditModal=  async (idMateriel)=>{
    setIdEdit(idMateriel);
    setEditModal(true);
  }

  const showAddModal=  async ()=>{
         setAddModal(true);
    }


   const marginLeft="20%";
   const textAlign="center";
   const width="95%";
   const float="right";
   const backgroundColor="red";
   const color="white"
   const btn = {
    width:"90px",
    
   }
  
    return(
      <>
      <div id='materiel'style={{margin:"30px",display:"flex"}}>
        <div className=' card card-body container' style={{width:"60%"}}>
          <h5 style={{textAlign}}>Voici les listes des matériels </h5><br />
          <button className='btn btn-outline-primary' onClick={showAddModal}>Ajout..</button>
          <table className='table table-striped' style={{width}}>
            <thead>
              <tr style={{textAlign}} >
                <th scope='col' >n°matériel</th>
                <th scope='col'>designation</th>
                <th scope='col'>etat</th>
                <th scope='col'>quantite</th>
                <th scope='col' rowSpan={2}>actions</th>
              </tr>  
            </thead>
            <tbody>
              {materiels.map((materiel)=>{
              return(
                <tr key={materiel.idMateriel} style={{textAlign}}>
                  <td>{materiel.idMateriel}</td>
                  <td>{materiel.design}</td>
                  <td>{materiel.etat}</td>
                  <td>{materiel.quantite}</td>
                  <td>
                    <button className='btn btn-outline-primary' onClick={() => showEditModal(materiel.idMateriel)}>modif..</button>&nbsp;
                    <button onClick={() => handleDelete(materiel.idMateriel)} className="btn btn-outline-danger">suppr..</button> 
                  </td>
                </tr>
              )
              })
              }
              </tbody>
            </table>
          </div>
          <div className='container' style={{marginTop:"5px",width:"40%"}}>
            <div className='card card-body container' style={{padding:"50px"}}>
              <h5>Nombres de types de matériels: <b className='afficheEtat'>{total}</b> </h5><br />
              <div style={{}}>
              <p >- matériel abimé: <b className='afficheEtat'>{abime}</b></p><br />
              <p >- matériel mauvais: <b className='afficheEtat'>{mauvais}</b>  </p><br />
              <p >- matériel bon: <b className='afficheEtat'>{bon}</b></p>
              </div>
            </div>
            <div className='card card-body container' style={{marginTop:"5px"}}>
              <h5 style={{textAlign:"center"}}>Histogramme montrant les quantités de chaques états des matériels</h5> 
              <div style={{backgroundColor:"white",width:"100%",borderRadius:"30px"}}><br />
        
        <Bar data={{
        
          labels:dat.map((data)=>data.etat),
         
          datasets:
                 
                    [{
                    label:"quantités",
                    data:dat.map((data)=>data.quantite),
                  backgroundColor:"red",
                    
                    borderRadius:10,
                    }
            
          ]
        }}
            
             options={{
              plugins:{
                 legend:{
                   display:true,
                   position:'top',
                   labels:{
                     font:{
                       size:10,
                      
                     }
                   }
                 },
                tooltip:{
                  enabled:true,
                  callbacks:{
                    label:(context)=>{
                      const value=context.raw;
                      return 'valeur : '+value
                    }
                  }
                }
              }
            }}/>   
      </div>
            </div>
          </div>
          
          {addModal?
          <div  style={{position:"fixed",top:"0px",left:"0px",bottom:"0px",right:"0px",background:"rgb(0, 0, 0,0.7)"}}>
            <div style={{width:"400px",margin:"auto",marginTop:"100px",padding:"20px 50px", backgroundColor:"#ffffff",borderRadius:"20px"}}>
              <button type="button" onClick={hideModal} class="btn-close" aria-label="Close" style={{float:"right", backgroundColor: "white"}} ></button><br/><br/>
              <NewMateriel />
            </div>  
          </div>:editModal? 
          <div style={{position:"fixed",top:"0px",left:"0px",bottom:"0px",right:"0px",background:"rgb(0, 0, 0,0.7)"}}>
            <div style={{width:"400px",margin:"auto",marginTop:"100px",padding:"20px 50px", backgroundColor:"#ffffff",borderRadius:"20px"}}>
              <button type="button" onClick={hideModal} class="btn-close" aria-label="Close" style={{float:"right", backgroundColor: "red"}} ></button><br/><br/>
              <NewMateriel id={idEdit} />
            </div>
          </div> :
          deleteModal? 
              <DeleteModal id={idDelete} />:""
          }
             
       </div>
       <Outlet />
    </> 
    )
}
 export default Materiel;