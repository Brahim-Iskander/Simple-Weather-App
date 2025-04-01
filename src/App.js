import Container from '@mui/material/Container';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import moment from "moment";


function App() {
  const [Temp,setTemp] = useState({min:"",max:"",now:"",des:"",icon:""})
  
  useEffect(()=>{
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=36.8065&lon=10.1815&appid=0e1df1c4939b7318ff607597be3ac9a4')
    .then(function (response) {
      console.log(response);
      const mi = Math.round(response.data.main.temp_min -272.15)
      const mx = Math.round(response.data.main.temp_max -272.15)
      const nn = Math.round(response.data.main.temp -272.15)
      const desc =response.data.weather[0].description
      const ico = response.data.weather[0].icon
      setTemp({min:mi,max:mx,now:nn,des:desc,icon:`https://openweathermap.org/img/wn/${ico}@2x.png`})
    })
    .catch(function (error) {
    // handle error
     console.log(error);
    })
  })

  return (
    <div className="App"style={{background:"rgba(4, 53, 228, 0.9)",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Container  maxWidth="sm">
      <Card sx={{ minWidth: 275 ,bgcolor:"blue" ,borderRadius:3}}>
      <CardContent>
      <Grid container spacing={2} style={{direction: "rtl",color:"white",textAlign: "right", }}>
        {/* city*/}
        <Grid size={8}>
        <Typography variant="h4" gutterBottom style={{fontFamily:"Alex",fontWeight:"200"}}>
        تونس
        </Typography>
        </Grid>
        {/*=== city===*/}
        {/* date*/}
        <Grid size={4}>
        <Typography variant="h5" gutterBottom>
        {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
        </Grid>
        {/*=== date===*/}
        <Grid size={12} style={{margin:"0",padding:"0"}}>
          <hr></hr>
        </Grid>
        
        {/*information*/}
        
        <Grid size={6}>
        <div style={{display:"flex"}}>
        <Typography style={{paddingLeft:"30px",textAlign: "right"}} variant="h2" gutterBottom>
         {Temp.now}
        </Typography>
        <div >
          <img alt="logo"src={Temp.icon}/>
        </div>
        </div>
        <Typography variant="h6" gutterBottom style={{fontFamily:"Alex",fontWeight:"bold"}}>
        <p>الحالة : {Temp.des}</p>
        </Typography>
        <div >
        <Typography variant="h6" gutterBottom style={{display:"flex",justifyContent:"space-between",fontFamily:"Alex",fontWeight:"bold" }}>
        <p>الصغرى : {Temp.min}</p>
        <p> الكبرى : {Temp.max} </p>
        </Typography>  
        </div>
        </Grid>
        {/*===information===*/}
        {/*icon*/}
        <Grid size={6} style={{display:"flex",justifyContent:"center",alignItems:""}}>
          <img alt="logo"src={Temp.icon}></img>
        </Grid>
        {/*===icon===*/}
      </Grid>
      </CardContent>
      </Card>
      </Container>
    </div>
  );
}

export default App;
