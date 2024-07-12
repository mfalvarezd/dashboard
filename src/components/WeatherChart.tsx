import { Chart } from "react-google-charts";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

interface Config {
  selectedVariable: number;
  graficos: Array<object>;
}

export default function WeatherChart({ selectedVariable, graficos }: Config) {
  const [dato, setDato] = useState<Array<object>>([]);

  useEffect(() => {
    setDato(graficos);
  }, [graficos]);

  let options = {
    title: "Precipitación, Humedad y Nubosidad vs Hora",
    curveType: "function",
    legend: { position: "right" },
  };

  let filteredData: (string | number)[][] = [["Hora", "Precipitación", "Humedad", "Nubosidad"]];
  
  if (selectedVariable >= 0) {
    const headers = ["Hora", Object.keys(dato[0])[selectedVariable + 1]];
    filteredData = [
      headers,
      ...dato.map((row: any) => {
        switch (selectedVariable) {
          case 0: // Precipitación
            return [row.hour, parseFloat(row.precipitation)];
          case 1: // Humedad
            return [row.hour, parseInt(row.humidity)];
          case 2: // Nubosidad
            return [row.hour, parseInt(row.clouds)];        
          default:
            return [row.hour, null];
        }
      }),
    ];
  }else {
    // Mostrar todas las variables para cada hora
    filteredData = [
      ["Hora", "Precipitación", "Humedad", "Nubosidad"],
      ...dato.map((row: any) => [row.hour, parseFloat(row.precipitation), parseInt(row.humidity), parseInt(row.clouds)])
    ];
  }
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Chart
        chartType="LineChart"
        data={filteredData}
        width="100%"
        height="400px"
        options={options}
      />
    </Paper>
  );
}
