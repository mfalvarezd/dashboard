import "./App.css";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Indicator from "./components/Indicator";
import Summary from "./components/Summary";
import BasicTable from "./components/BasicTable";
import WeatherChart from "./components/WeatherChart";
import ControlPanel from "./components/ControlPanel";
import { useEffect, useState } from "react";
function App() {
  
  {
    /* Variable de estado y función de actualización */
  }

  let [indicators, setIndicators] = useState<JSX.Element[]>([]);
  let [rowsTable, setRowsTable] = useState([]);
  let [infoGraphic, setInfoGraphic] = useState([]);
  let [informacion, setInformacion] = useState([]);
  let [selectedVariable, setSelectedVariable] = useState(-1);
  {
    /* Hook: useEffect */
  }

  {
    /* Función para el efecto secundario a ejecutar y Arreglo de dependencias */
  }

  useEffect(() => {
    (async () => {
      //{
      ///* Request */
      //}

      //let API_KEY = "c6b275e1842b7d17ad1ee3483de4ac4d";
      //let response = await fetch(
      //`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
      //);
      {
        /* 2. Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */
      }

      let savedTextXML = localStorage.getItem("openWeatherMap");
      let expiringTime = localStorage.getItem("expiringTime");
      {
        /* 3. Obtenga la estampa de tiempo actual */
      }

      let nowTime = new Date().getTime();
      {
        /* 4. Realiza la petición asicrónica cuando: 
                 (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
                 (2) La estampa de tiempo actual es mayor al tiempo de expiración */
      }

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        {
          /* 5. Request */
        }

        let API_KEY = "c6b275e1842b7d17ad1ee3483de4ac4d"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        let savedTextXML = await response.text();

        console.log(savedTextXML)

        {
          /* 6. Diferencia de tiempo */
        }

        let hours = 1;
        let delay = hours * 3600000;

        {
          /* 7. En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */
        }

        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", (nowTime + delay).toString());
      }

      {
        /* XML Parser */
      }
      
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");
      {
        /* Arreglo para agregar los resultados */
      }

      let dataToIndicators = new Array();

      {
        /* 
         Análisis, extracción y almacenamiento del contenido del XML 
         en el arreglo de resultados
     */
      }

      let location = xml.getElementsByTagName("location")[1];

      if (location) {
        let geobaseid = location.getAttribute("geobaseid");
        dataToIndicators.push(["Location", "geobaseid", geobaseid]);

        let latitude = location.getAttribute("latitude");
        dataToIndicators.push(["Location", "Latitude", latitude]);

        let longitude = location.getAttribute("longitude");
        dataToIndicators.push(["Location", "Longitude", longitude]);
      } else {
        console.error("Location element not found in XML");
      }

      // console.log(dataToIndicators);
      {
        /* Renderice el arreglo de resultados en un arreglo de elementos Indicator */
      }

      let indicatorsElements = Array.from(dataToIndicators).map((element) => (
        <Indicator
          title={element[0]}
          subtitle={element[1]}
          value={element[2]}
        />
      ));
      {
        /* Modificación de la variable de estado mediante la función de actualización */
      }

      setIndicators(indicatorsElements);


      let arrayObjects = Array.from( xml.getElementsByTagName("time") ).map( (timeElement) =>  {
					
        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];

        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " "+  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
        let precipitation = timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability");
        let humidity = timeElement.getElementsByTagName("humidity")[0].getAttribute("value");
        let clouds = timeElement.getElementsByTagName("clouds")[0].getAttribute("all");
        return { "rangeHours": rangeHours,"windDirection": windDirection,"precipitation":precipitation,"humidity":humidity,"clouds":clouds }
    
      })

      //DECLARO LAS VARIABLES QUE IRAN PARA LA INFORMACION DEL GRAFICO
      let arrayObjectsG = Array.from( xml.getElementsByTagName("time") ).map( (timeElement) =>  {
					
        let hour = timeElement.getAttribute("from").split("T")[1].substring(0, 5);  
        let precipitation = timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability");
        let humidity = timeElement.getElementsByTagName("humidity")[0].getAttribute("value");
        let clouds = timeElement.getElementsByTagName("clouds")[0].getAttribute("all");
        return {"hour": hour,"precipitation":precipitation,"humidity":humidity,"clouds":clouds }
        
      })




      let sun = xml.getElementsByTagName("sun")[0];
      let riseUTC = sun.getAttribute("rise");
      let setUTC = sun.getAttribute("set");
  
      // Función para convertir UTC a hora local de Ecuador (UTC-5)
      const convertToEcuadorTime = (utcTime) => {
        const dateUTC = new Date(utcTime);
        const offset = -5 * 60; // Offset en minutos para UTC-5 (Ecuador)
        const dateLocal = new Date(dateUTC.getTime() + offset * 60 * 1000);
        return dateLocal.toLocaleString('es-EC', { timeZone: 'America/Guayaquil', hour12: false });
      };
  
      let riseLocal = convertToEcuadorTime(riseUTC);
      let setLocal = convertToEcuadorTime(setUTC);
  
      // Actualización del estado con la información convertida
      let infSun = [
        ['Salida del Sol', 'Rise', riseLocal],
        ['Puesta del Sol', 'Set', setLocal]
      ];
  
      let infElements = infSun.map((element, index) => (
        <Indicator
          key={index}
          title={element[0]}
          subtitle={element[1]}
          value={element[2]}
        />
      ));
  
      setInformacion(infElements);

    

     
    

    {/* 3. Actualice de la variable de estado mediante la función de actualización */}

    setRowsTable(arrayObjects)
    setInfoGraphic(arrayObjectsG)


      
    })();
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid xs={12} lg={3}>
        {indicators[0]}
        {/*<Indicator title="Precipitación" subtitle="Probabilidad" value={0.13} />*/}
      </Grid>
      <Grid xs={12} lg={3}>
        {indicators[1]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
      </Grid>
      <Grid xs={12}  lg={3}>
        {indicators[2]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
      </Grid>
      <Grid xs={12}  lg={3}>
        

        { <Indicator title='País' subtitle='Ecuador-Guayaquil' value= "UTC-5" /> }
      </Grid>
      
      <Grid xs={12} md={4} lg={4}>
        <Summary informacion={informacion}></Summary>
      </Grid>
      <Grid xs={12} md={8} lg ={8}>
        <ControlPanel onChange={setSelectedVariable}/>
      </Grid>
      <Grid xs={12} md={12} lg={12}>
        <WeatherChart selectedVariable={selectedVariable} graficos = {infoGraphic}></WeatherChart>
      </Grid>
      <Grid xs={12} md={6} lg={12}>
      <BasicTable rows={rowsTable}></BasicTable>
      </Grid>
      
      
    </Grid>
  );
}

export default App;
