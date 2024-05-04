
import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Users= () =>{
 const navigate = useNavigate();
  const [users,setUser]=useState([]);
  useEffect(()=>{
    const fetchAllUsers= async()=>{
      try {
        const res=await axios.get("http://localhost:3001/users");
        setUser(res.data);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  },[]);

  const handleDelete = async (matricule) =>{
  
    try {
      await axios.delete(`http://localhost:3001/delete/${matricule}`);
      window.location.reload();
      navigate('/users')
    } catch (error) {
      console.log(error);
    }
  }
  return(
    <>
      <div>
        <Link to="/users/newUsers"><button>Add new Users</button></Link>
        <table>
          <thead>
            <tr>
              <th>Matricule </th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>  
          </thead>
          <tbody>
            {users.map((user)=>{
              
                return(
                  <tr key={user.matricule}>
                    <td>{user.matricule}</td>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.contact}</td>
                    <td>
                    
                      <Link to={`/users/update/${user.matricule}`}>Update</Link>&nbsp;
                      <button onClick={() => handleDelete(user.matricule)} className="btn btn-primary">remove</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>

          </tfoot>
        </table>
      </div>
      <Outlet />
    </>
  )
}

export default Users;