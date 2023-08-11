import { useState, useEffect } from 'react'
import './Plan.css';
import logo1 from '../Login/logo1.jpg';
import { createClient } from '@supabase/supabase-js'

import Select from 'react-select'
import { useParams} from 'react-router'


function Plan() {
  const [email1, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState('');
  const [option, setOption] = useState('');
  

// use destructuracion y paso de parametros que se tiene en el link
  let {email} = useParams();
  console.log(useParams);
//
  

  const options = [
    { value: 'Free', label: 'Free' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Top', label: 'Top' }
  ]
  
 
  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
                                import.meta.env.VITE_APP_SUPABASE_ANON_KEY);

  
  // usuario = supabase.auth.getUser(); 
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    alert("Hola mundo");
    

    const { error } = await supabase
     .from('Usuarios')
     .insert({ Correo: email+".com", Plan: option })

    
    window.location.href = '/Consulta';

    


  };

  // sacar dato del selector para enviarlo con el boton que es la otra funcion 
  const find = ({ value }) => {
    
    console.log(value);
    setOption(value);
  };

  

  return (
    
    <form onSubmit={handleSubmit}>

   
    
    <div className="logo-container">
        <img src={logo1} className="App-logo" alt="logo" />
        </div>

    <div className="contenido">

    
    <input  type="text" value={email} onChange={(e) => setUsuario(e.target.value)} />
      
      <div className="selector">
      <label>
        Plan de pago:
      </label>
            <Select options={options} 
             onChange={(e) => find(e)}/>
      
      </div>
      

      <button className="boton" type="submit">Iniciar sesión</button  >

      
    </div> 

    </form>
    
    
  );

}

export default Plan