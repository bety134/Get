import React,{ useEffect,useState} from "react";
import "./index.css"
import axios from "axios";

let urlApi = "https://frozen-ocean-20076.herokuapp.com/auth/register";


export const Laboral =() =>{
  

  const [descripcion, setDescripcion] = React.useState('');
  const [requisitos, setRequisitos] = React.useState('');
  const [sueldo, setSueldo] = React.useState('');
  const [localidad, setLocalidad] = React.useState('');
  const [video, setVideo] = React.useState('');




    //para el select list
const [areatype, /*setAreatype*/] = useState(["",  "Recursos Humanos","Ventas", "Marketing", "Tecnologia de la informacion", "Inmobiliara"  ])
const [area, setArea] = useState('')
const AddArea= areatype.map(AddArea => AddArea)
const handlerAreaTypeChange = (e) => {
  console.clear();
  console.log((areatype[e.target.value]));
  setArea(areatype[e.target.value])
}

//para el select list
const [roltype, setRolType] = useState([" ","Programador","Analista", "Infraestructura", "Soporte" ])
const [rol, setRol] = useState('')
const AddRol = roltype.map(AddRol=> AddRol)
const handlerRolTypeChange = (e) => {
  console.clear();
  console.log((roltype[e.target.value]));
  setRol(roltype[e.target.value])
}

//para el select list
const [modalidadtype, setModalidadType] = useState([" ","Presencial", "Virtual" ])
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
<p>Descripcion: {item.Descripcion }</p>
<p>Requisitos: {item.Requisitos }</p>
<p>Sueldo: {item.Sueldo }</p>
<p>Localidad: {item.Localidad }</p>
<p>Video: {item.Video }</p>

</div>

))

//post sirve para mandar la informacion a la base de datos
const newPost = {
Area:  area,
Rol:  rol,
modalidad: modalidad,
tipo:  tipo,
descripcion:descripcion,
requisitos:requisitos,
sueldo:sueldo,
localidad:localidad,
video:video,
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
     tipo.trim() === "" ||
     descripcion.trim()==="" ||
     requisitos.trim()===""||
     sueldo.trim() ===""||
     localidad.trim()===""||
     video.trim()===""
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
descripcion: ${descripcion}
requisitos: ${requisitos}
sueldo: ${sueldo}
localidad: ${localidad}
video: ${video}

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
         Vacantes Disponibles
       </div>
       <div className="card-body">
         <form className='registration-datos' onSubmit={handleSubmit}>
          
         {error && <div className='registration-datos__error'>{error}</div>}
 
         
       
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
        
            <label className='puesto'>
                 Descripcion del Puesto
                 <textarea type="text" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.currentTarget.value)} />
            </label> 


            <label className='requisitos'>
                 Requisitos de la vacante
                 <textarea type="text" name="requsitos" value={requisitos} onChange={(e) => setRequisitos(e.currentTarget.value)} />
            </label> 
           
            <label className='sueldo'>
                 Sueldo de la Vacante
                 <textarea type="text" name="sueldo" value={sueldo} onChange={(e) => setSueldo(e.currentTarget.value)} />
            </label> 

   
             <label className='localidad'>
                 Direccion de la empresa
                 <textarea type="text" name="localidad" value={localidad} onChange={(e) => setLocalidad(e.currentTarget.value)} />
            </label> 
            
            <label className="video">
            Link del Video explicativo
            <input type="text" name = "video" value={video} onChange={(e) => setVideo(e.currentTarget.value)} />
            </label>


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








