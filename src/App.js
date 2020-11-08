import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/header';
import Formulario from './components/formulario';
import MostrarClima from './components/MostrarClima';
import Error from './components/Error';

function App() {

  const [busqueda, guardarBusqueda] = useState({
      ciudad: '',
      pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() => {      
      const consultarAPI = async () => {
        
        if(consultar){
          const appid = 'd929ea5f658941cd2ce904b10cbcc39b';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`;
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);

          //Verificar si hubo resultados correctos en la consulta
          if (resultado.cod === "404"){
            guardarError(true);
          }
          else{
            guardarError(false);
          }

        }

      }
      consultarAPI();
      //eslint-disable-next-line
  }, [consultar, ciudad, pais])

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />   
  }
  else{
    componente = <MostrarClima resultado={resultado}/>
  }

  return (
    <Fragment>
        <Header titulo="Clima React App"/>      

        <div className="contenedor-form">
            <div className="container">
              <div className="row">
                  <div className="col m6 s12">
                      <Formulario 
                          busqueda={busqueda}
                          guardarBusqueda={guardarBusqueda}
                          guardarConsultar={guardarConsultar}
                        />
                  </div>
                  <div className="col m6 s12">
                    {componente}
                  </div>
              </div>
            </div>
        </div>

    </Fragment>

  );
}

export default App;
