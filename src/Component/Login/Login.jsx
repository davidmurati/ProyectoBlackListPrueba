import { useState, useEffect  } from 'react'
import './Login.css';
import logo1 from './logo1.jpg';
import { createClient } from '@supabase/supabase-js'



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const REACT_APP_SUPABASE_URL="https://fdjlhodftevqqfkldufl.supabase.co"
  //const REACT_APP_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkamxob2RmdGV2cXFma2xkdWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzMjIxMDMsImV4cCI6MjAwNjg5ODEwM30.nmW9fa1ACDv-Y-W6FZFGlx7xl4-5ogSVlW-ofc2JV4g"
  // le quito el .com para poderlo apsar por parametro en el enlace 
 
  const correoConvertido=email
  const variable = correoConvertido.replace(/.com/g, '');

  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
                                import.meta.env.VITE_APP_SUPABASE_ANON_KEY);
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    


    try {
        const result = await supabase.auth.signInWithPassword({email: email, password: password});
        console.log(result)
        window.location.href = '/Consulta/'+ (variable);
        //window.location.href = '/Consulta';

    } catch (error) {
        console.error(error);
        alert('No ha podido ingresar');
    }



  };

  

  return (
    
    <form onSubmit={handleSubmit}>
    
    <div className="logo-container">
        <img src={logo1} className="App-logo" alt="logo" />
        </div>

    <div className="contenido">

      <label>
        Correo electrónico:
        <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="boton" type="submit">Iniciar sesión</button  >


      
    </div> 
    <Hijo mensaje={email} />

    </form>
    
  );

}

// funcion hijo al que se le puede pasar un parametro de otra funcion que en este caso el intento fue email. no se uso al final
function Hijo (props) {
    return ;
  };

export { Login, Hijo };