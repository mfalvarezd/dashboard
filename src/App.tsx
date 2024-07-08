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
  let [rowsTable, setRowsTable] = useState([])
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
					
        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]

        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " "+  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code") 
 
        return { "rangeHours": rangeHours,"windDirection": windDirection }

    })

    arrayObjects = arrayObjects.slice(0,8)

    {/* 3. Actualice de la variable de estado mediante la función de actualización */}

    setRowsTable(arrayObjects)

      
    })();
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid xs={12} lg={2}>
        {indicators[0]}
        {/*<Indicator title="Precipitación" subtitle="Probabilidad" value={0.13} />*/}
      </Grid>
      <Grid xs={12} lg={2}>
        {indicators[1]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
      </Grid>
      <Grid xs={12} lg={2}>
        {indicators[2]}

        {/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}
      </Grid>
      <Grid xs={12} lg={2}>
        <Indicator title="Precipitación" subtitle="Probabilidad" value={0.13} />
      </Grid>
      <Grid xs={12} lg={2}>
        <Indicator title="Precipitación" subtitle="Probabilidad" value={0.13} />
      </Grid>
      <Grid xs={12} lg={2}>
        <Indicator title="Precipitación" subtitle="Probabilidad" value={0.13} />
      </Grid>
      <Grid xs={12} lg={2}>
        <Summary></Summary>
      </Grid>
      <Grid xs={12} md={6} lg={10}>
      <BasicTable rows={rowsTable}></BasicTable>
      </Grid>
      <Grid xs={12} md={12} lg ={12}>
        <ControlPanel />
      </Grid>
      <Grid xs={12} md={12} lg={12}>
        <WeatherChart></WeatherChart>
      </Grid>
    </Grid>
  );
}

export default App;
