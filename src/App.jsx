import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './pages/Layout';
import Materiel from './pages/materials/Materiels';
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Afficher from "./pages/Afficher";
import Users from "./pages/Users";
import Update from "./pages/update";
import NewMateriel from "./pages/newMateriel";
 export default  function App() {
    if(0<2){
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="users" element={<Users />} >
                <Route path="/users/newUsers" element={<Contact/>} />
                <Route path="/users/update/:id" element={<Update/>} />
              </Route>
              <Route path="/materiels" element={<Materiel/>}>
                 <Route path="/materiels/newMateriels" element={<NewMateriel/>} />
                 <Route path="/materiels/newMateriels/:id" element={<NewMateriel/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }
    else{
       return(
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
     </BrowserRouter>
       )
    };
    
   
  }
  
  
  

