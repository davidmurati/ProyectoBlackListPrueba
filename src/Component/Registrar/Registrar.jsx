import { useState, useEffect  } from 'react'
import './Registrar.css';
import logo1 from '../Login/logo1.jpg';
import { createClient } from '@supabase/supabase-js'




function Registrar() {
      


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  
 
  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
                                import.meta.env.VITE_APP_SUPABASE_ANON_KEY);
  
// le quito el .com para poderlo apsar por parametro en el enlace 
const correoConvertido=email
const variable = correoConvertido.replace(/.com/g, '');

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
        const result = await supabase.auth.signUp({email: email, password: password});
        console.log(result)
        window.location.href = '/Plan/'+ (variable);

    } catch (error) {
        console.error(error);
        alert('No ha iniciar el registro');
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
    </form>
    
  );

}

export default Registrar