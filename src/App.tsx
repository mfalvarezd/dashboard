
import './App.css'

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';

function App() {


  return (
    <Grid container spacing={5}>
      <Grid xs={12}  lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12}  lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid> 
      <Grid xs={12}  lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12}  lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>   
      <Grid xs={12}  lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
      <Grid xs={12}  lg={2}>
	        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>         
      <Grid xs={12}  lg ={2}>
	        <Summary></Summary>
	    </Grid>
      <Grid xs={12} md={6} lg={10} >
	       <BasicTable />
	    </Grid> 
    
    </Grid>
    )
}

export default App
