const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const IntegrantesModel = require("./models/Integrantes");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://Admin:lVwACYT9oVxafemv@integrador.2tohq.mongodb.net/integrantes?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
    }
);

app.post("/insert", async (req, res) => {
    
    const nombreIntegrante = req.body.nombreIntegrante;
    const codigoIntegrante = req.body.codigoIntegrante;
    const rolIntegrante = req.body.rolIntegrante;

    const integrantes = new IntegrantesModel({ 
        nombreIntegrante: nombreIntegrante,
        codigoIntegrante: codigoIntegrante,
        rolIntegrante: rolIntegrante
    });
    try{
        await integrantes.save();
        res.send("Datos insertados");
    }
    catch(err){
        console.log(err)
    }
});

app.get("/read", async (req, res) => {
    IntegrantesModel.find({}, (err, result) => {
        if (err){
            res.send(err);
        }

        res.send(result);
    })
    
});

app.put("/update", async (req, res) => {
    const nuevoNombre = req.body.nuevoNombre;
    const id = req.body.id;
    
    try{
        await IntegrantesModel.findById(id,(err, nombreActualizado)=> {
            nombreActualizado.nombreIntegrante = nuevoNombre;
            nombreActualizado.save();
            res.send("Actualizado");
        })
    }
    catch(err){
        console.log(err)
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    
    await IntegrantesModel.findByIdAndRemove(id).exec();
    res.send("Eliminado");
});

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});