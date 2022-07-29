import React,{ useEffect,useState} from "react";
import "./index.css"
import axios from "axios";

let urlApi = "https://enigmatic-island-27450.herokuapp.com/auth/signup/";


export const Trabajo =() => {

//para el select list
const [areatype, /*setAreatype*/] = useState(["",  "Finanzas","Ventas", "Marketing", "Tecnologia de la informacion", "Inmobiliara"  ])
const [area, setArea] = useState('')
const AddArea= areatype.map(AddArea => AddArea)
const handlerAreaTypeChange = (e) => {
  console.clear();
  console.log((areatype[e.target.value]));
  setArea(areatype[e.target.value])
}

//para el select list
const [roltype, setRolType] = useState([" ","Backend","Front-end", "Administracion", "Contabilidad","Economia","Comercio Internacional", "Mercadotecnia", "Diseño Grafico", "Bachillerato General","Licenciatura Trunca" ])
const [rol, setRol] = useState('')
const AddRol = roltype.map(AddRol=> AddRol)
const handlerRolTypeChange = (e) => {
  console.clear();
  console.log((roltype[e.target.value]));
  setRol(roltype[e.target.value])
}

//para el select list
const [modalidadtype, setModalidadType] = useState([" ","Home office","Presencial", "Hibrido" ])
const [modalidad, setModalidad] = useState('')
const AddModalidad = modalidadtype.map(AddModalidad=> AddModalidad)
const handlerModalidadTypeChange = (e) => {
  console.clear();
  console.log((modalidadtype[e.target.value]));
  setModalidad(modalidadtype[e.target.value])
}

//para el select list
const [tipotype, setTipoType] = useState([" ","Medio Tiempo","Tiempo Completo" ])
const [tipo, setTipo] = useState('')
const AddTipo = tipotype.map(AddTipo=> AddTipo)
const handlerTipoTypeChange = (e) => {
  console.clear();
  console.log((tipotype[e.target.value]));
  setTipo(tipotype[e.target.value])
}
      
// Inicializar el estado de error y éxito
const [error, setError] = React.useState('');
const [success, setSuccess] = React.useState(false);
    
      

//get conexion con api de base de datos
const [data, setData] = React.useState({})
// eslint-disable-next-line react-hooks/rules-of-hooks
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
<p>Area: {item.Area }</p>
<p>Rol: {item.Rol}</p>
<p>Modalidad: {item.Modalidad}</p>
<p>Tipo de trabajo: {item.Tipo }</p>
</div>

))

//post sirve para mandar la informacion a la base de datos
const newPost = {
Area:  area,
Rol:  rol,
modalidad: modalidad,
tipo:  tipo,
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
setError('');


//validar el formulario 

if (area.trim() === '' ||
     rol.trim() ==="" ||
     modalidad.trim() === ''||
     tipo.trim() === "" 
     ) {
      setError('Please fill in all fields');
      return;
    }
 
//enviar los datos callback envia la informacion que voy a subir
sendPostRequest();

console.log(`Data submitted:
area: ${area}
rol: ${rol}
modalidad: ${modalidad}
tipo: ${tipo}
`);

// Mostrar el mensaje de éxito
setSuccess(true);
  }

// Mostrar el mensaje de éxito si el estado success es true
if (success)
return <div className="registration-datos__success"> informacion actualizada con exito</div>

   
 //Mostrar el formulario     
  return (
        <>
        <div className="container">
          <div className="row">
          <div className="col-0 col-md-2 col-lg-3"></div>
     
     <div className="col-12 col-md-8 col-lg-6">
      <div className="card text-center">
       <div className="card-header">
         Informacion complementaria
       </div>
       <div className="card-body">
         <form className='registration-datos' onSubmit={handleSubmit}>
          
         {error && <div className='registration-datos__error'>{error}</div>}
         <h3>Elige tus opciones</h3>
         
       
         <label  className=" uno" for="Area"> Area:</label>
              <select 
                  onChange={e => handlerAreaTypeChange(e)}
                  className="browser-default custom-select" >

                  {
                  AddArea.map((address, key)=>
                  <option
                  key={key}
                  value={key}> {address}
                  </option>)
                  }
             </select>
                
          <p></p>

        <label className="dos" for="rol"> Rol:</label>
              <select
                  onChange={e => handlerRolTypeChange(e)}
                  className="browser-default custom-select">
                  {
                  AddRol.map((address, key)=>
                  <option
                  key={key}
                  value={key}> {address}
                  </option>)
                  }
              </select>
                 
          <p></p>
              <label className="tres" for="Modalidad"> Modalidad:</label>
              <select 
                  onChange={e => handlerModalidadTypeChange(e)}
                  className="browser-default custom-select" >
                  {
                  AddModalidad.map((address, key)=>
                  <option
                  key={key}
                  value={key}> {address}
                  </option>)
                  }
               </select>
                

              <p></p>  
            <label className="cuatro" for="Tipo"> Tipo:</label>
                  <select
                  onChange={e => handlerTipoTypeChange(e)}
                  className="browser-default custom-select" >
                  {
                  AddTipo.map((address, key)=>
                  <option
                  key={key}
                  value={key}> {address}
                  </option>)
                  }
           
                </select>
        
                <button type="submit" className='registration-datos__submit'>Enviar</button>
               </form>
        </div>
       </div>
      </div>  
     </div>
    </div>
    
     <div className= "col-0  col-md-2 col-lg-3"></div>
       
   
      
       
      </>
          
     )
 
}

