const express = require('express');
const app = express();
const mysql = require("mysql");
const port = 3001;
const cors= require("cors");
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "gestion_de_materiel"
 }
)

app.get('/materiels',(req,res)=>{
    const q = "SELECT * from materiel";
    db.query(q,(err,data) => {
        return res.json(data);
    })
});

app.get('/count',(req,res)=>{
    //ceci retoure les quantités de chaques types d'etat des materiels
    const q = "SELECT sum(idMateriel) as sum, etat as type,count(idMateriel) as quantite from materiel group by etat";
    //validation
    db.query(q,(err,data) => {
        return res.json(data);
    })
    
});

app.get('/countSum',(req,res)=>{
    const q="SELECT count(idMateriel) as total from materiel";
    db.query(q,(err,data)=>{
        return res.json(data[0].total);
    })
})

app.post('/create',(req,res)=>{
  const design= req.body.design;
  const etat= req.body.etat;
  const quantite= req.body.quantite;
  const q = "INSERT into materiel(idMateriel,design,etat,quantite) VALUES (?,?,?,?)"
  db.query(q,[null,design,etat,quantite],(err,result) =>{
    if(err){
        console.log(err);
    }
    else{
        return res.send("OK");
    }
  } )
});

app.delete('/delete/:id',(req,res)=>{
    const id= req.params.id;
    const q="delete from materiel where idMateriel=?";
    db.query(q,id,(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        res.send("Ok, delete successfully");
    }
})
}
);

app.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    const design=req.body.design;
    const etat=req.body.etat;
    const quantite=req.body.quantite; 
    const q= "update materiel set design=?,etat=?,quantite=? where idMateriel=?";

    db.query(q,[design,etat,quantite,id],(err,data)=>{
        if(err){
           res.send(err);
        }
        else{
            res.json(data);
        }
    })
})

app.get('/search/:id',(req,res)=>{
  const id = req.params.id;
  const q = "SELECT * from materiel where idMateriel=?";
  db.query(q,id,(err,data)=>{
     if(err){
        console.log (err);
     }
     else{
        res.json(data);
     }
  })
})

app.get('/quantityEtat',(req,res)=>{
    const q="SELECT etat,sum(quantite) as quantite from materiel group by etat"
    db.query(q,(err,data)=>{
      if(err){
        console.log(err)
      }
      else{
        res.json(data);
      }
    })
})

app.listen(port,()=>{
    console.log("listening")
})