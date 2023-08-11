import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Header from "./Component/header/Header";
import { Login, Hijo } from "./Component/Login/Login";
import Registrar from "./Component/Registrar/Registrar";
import Plan from "./Component/Plan/Plan";
import Consulta from "./Component/Consulta/Consulta";
import Soporte from "./Component/Soporte/Soporte";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/Login">
          <Login />
          <Header />
        </Route>
        <Route exact path="/Registrar">
          <Registrar />
          <Header />
        </Route>
        <Route exact path="/Plan/:email">
          <Plan />
          <Header />
        </Route>
        <Route exact path="/Consulta/:email">
          <Consulta />
          <Header />
        </Route>
        <Route exact path="/Soporte/:email">
          <Soporte />
          <Header />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
