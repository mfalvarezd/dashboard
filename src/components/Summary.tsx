import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import sunrise from '../assets/sunrise.jpeg'
interface Config {
    informacion: Array<object>;
  }
export default function Summary(data:Config) {
    let [inf, setInformacion] = useState([])
    useEffect( () => {

        (()=> {

            setInformacion(data.informacion)

        })()

    }, [data] )
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={sunrise}
                    alt="Amanecer"
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        {inf[0]}
                        {inf[1]}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
        </Card>
    )
}