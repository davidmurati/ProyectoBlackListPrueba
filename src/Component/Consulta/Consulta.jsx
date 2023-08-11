import { useState, useEffect } from 'react'
import './Consulta.css';
import logo1 from '../Login/logo1.jpg';
import { createClient } from '@supabase/supabase-js'

import { useParams} from 'react-router'


function Consulta() {
  const [textoC, setTextoC] = useState('');
  const [option, setOption] = useState('');
  const [tarea, setTarea] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [Plan, setPlan] = useState([]);
  const [ContadorPlan, setContadorPlan] = useState("");
  const [CorreoD, setCorreoD] = useState([]);
  

  let n=0;
  let cont1=0;
  let contador=0;


  // use destructuracion y paso de parametros que se tiene en el link
  let {email} = useParams();
  console.log(useParams);
//

  
 
  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
                                import.meta.env.VITE_APP_SUPABASE_ANON_KEY);

// capturar el conteo y el plan del usuario

//lectura de datos get para leer plan y usuario

async function getTablaPlan() { 

        const { data, error } = await supabase
        .from('Usuarios')
        .select("Correo")

        if (data!=null){
        setTarea(Object.values(data));
    }
   

};

async function getBusquedaPlan() { 

  const { data, error } = await supabase
  .from('Usuarios')
  .select('Plan')

  setBusqueda(Object.values(data));


  // le quito el .com para poderlo apsar por parametro en el enlace 

  const correoConvertido=email
  const variable = email+".com";

// busqueda si el correo esta registrado
  for (let i = 0; i < tarea.length; i++) {
      if (variable === Object.values(tarea[i])[0]) {
         //cont1=i;
         setCont1(i)
         
        //alert("si entra "+ Object.values( busqueda[i] ));
        
        break;
      }
      
    }

    // asignar cantidad de consulta segun su condicion
    
    
};

async function getContadorPlan() { 

    const { data, error } = await supabase
    .from('Usuarios')
    .select('Contador')
  
    setContadorPlan(Object.values(data));

};

async function getCorreoD() { 

    const { data, error } = await supabase
    .from('TablaCorreo')
    .select('NoDeseado')
  
    setCorreoD(Object.values(data));

};



useEffect( () => { 

    getTablaPlan();
    getBusquedaPlan();
    getContadorPlan();
    getCorreoD();

    
    
}, []);

const Ayuda = (event) => {
    
    if (Object.values( busqueda[cont1] )[0]==="Free") {
        alert("Aumente su plan para porde usar el soporte");
        
        
      } else if (Object.values( busqueda[cont1] )[0]==="Premium") {
        alert("soporte");
        window.location.href = '/Soporte/'+ (email);
      }  else if (Object.values( busqueda[cont1] )[0]==="Top") {
        alert("soporte");
        window.location.href = '/Soporte/'+ (email);
      }else {
        alert("No posee plan");
      }
    

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Consultar();

  };

  
  const Consultar = async (event) => {
    event.preventDefault();


      // consulta para agarrar la cantidad del contador
      for (let i = 0; i < tarea.length; i++) {
        if (email+".com" === Object.values(tarea[i])[0]) {
            getContadorPlan();
            contador=Object.values(ContadorPlan[i])[0];
          break;
        }
      }
      


// asignar cantidad de consulta segun su condicion

if (Object.values( busqueda[cont1] )[0]==="Free") {
    n=20;
    setPlan("Free")
    
  } else if (Object.values( busqueda[cont1] )[0]==="Premium") {
    n=40;
    setPlan("Premium")
    
  }  else if (Object.values( busqueda[cont1] )[0]==="Top") {
    n=60;
    setPlan("Top")
     
  }else {
    n=0;
    alert("No tiene plan asignado revise su registro");
  }

  if (contador<=n) {
    
    // consulta
    for (let i = 0; i < CorreoD.length; i++) {
        if (textoC === Object.values(CorreoD[i])[0]) {
            alert("Correo o dominio NO deseado");
          break;
        } else if (i === CorreoD.length-1) {
            alert("El correo o dominio no esta en la base de datos");
          
        }
      } 

      // incremento del contador y subida a supabase
      const { error } = await supabase
      .from('Usuarios')
      .update({ Contador: contador+1 })
      .eq('Correo', 'davidmurati5@gmail.com') 
    
    }else {
        alert("No puede buscar mas");
      }




  };

 

  

  return (

    
    <form onSubmit={handleSubmit}>

   
    
    <div className="logo-container">
        <img src={logo1} className="App-logo" alt="logo" />
        </div>

    <div className="contenido">

    
     <label>
        Correo o dominio a inspeccionar:
        <input  type="text" value={textoC} onChange={(e) => setTextoC(e.target.value)} />
      </label>
      
      <label>
        Tipo de plan que tiene:{Plan} 
      </label>

      
      <button className="boton" onClick={Consultar}>Consultar</button>
      <button className="boton" onClick={Ayuda}>Solicitar soporte</button>
      
    </div> 

    </form> 
    
   

  );

}

export default Consulta