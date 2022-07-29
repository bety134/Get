import React,{useEffect, useState} from 'react'
import axios from "axios";
import './index.css'

let urlApi = "https://frozen-ocean-20076.herokuapp.com/auth/register";



 export const FormularioVideo= () => {

 // Inicializar el estado del formulario en blanco
const [video, setVideo] = React.useState('');


// Inicializar el estado de error y éxito
const [error, setError] = React.useState('');
const [success, setSuccess] = React.useState(false);

//get conexion con api de base de datos
const [data, setData] = React.useState({})
useEffect(()=>{
const axios = require('axios').default;
axios.get(urlApi)
.then(resp => {
console.log(resp.data);
setData (resp.data)
})
.catch(err=> {
//handle error here
console.error(err);
})
},[])

const getData = Object.entries(data).map(([key, item],index) => (
<div className='save'>
<p>video: {item.Video}</p>
</div>

))

//post sirve para mandar la informacion a la base de datos
const newPost = {
video:  video,

};

const sendPostRequest = async () => {
try{
const resp =await axios.post(urlApi,newPost);
console.log(resp.data);
} catch (err) {
//handle error here
console.error(err);
}
};
//sendPostRequest();

const handleSubmit = (event) => {
// Prevenir el comportamiento predeterminado del formulario
event.preventDefault();

// Resetear el estado de error
setError("");


// Validar el formulario
if (video.trim() === '' 
){
setError('Please fill in all fields');
return;
}

//enviar los datos callback envia la informacion que voy a subir
sendPostRequest(); 

console.log(`Data submitted:
video: ${video}
`);

// Mostrar el mensaje de éxito
setSuccess(true);
}

// Mostrar el mensaje de éxito si el estado success es true
if (success)
return <div className="registration-datos registration-datos__success"> Su video se ha subido con exito</div>

// Mostrar el formulario
return (
<>

<div className="container">
<div className="row">
<div className="col-0 col-md-2 col-lg-3"></div>
<div className="col-12 col-md-8 col-lg-6">
<div className="card text-center">
<div className="card-header">Video de presentacion</div>
<div className="card-body">
<form className="registration-datos" onSubmit={handleSubmit}>
{error && <div className='registration-datos__error'>{error}</div>}



<h3>Ingrese su Link </h3>


<input type="text" name = "video" value={video} onChange={(e) => setVideo(e.currentTarget.value)} />


<button type="submit" className='registration-datos__submit'>Enviar</button>
</form > 
</div>
</div>
</div>
</div>
</div>

</> 
)
}



















