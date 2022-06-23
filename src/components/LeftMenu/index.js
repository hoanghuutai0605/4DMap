import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";


export default function MenuLeft() {


  // let antennaUrl =
  //   "https://bts-gd2.vimap.vn/api/BTS/InforTruAnten/search-tru-anten?code=001053&chuSoHuu=&loaiTram=&loaiCot=&lat=0&lng=0&radius=0";
  // let access_token =
  //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI0OUIyQkE1ODcwRkM1OUJFMUZEMTg0QTBFMkEwREUxIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTU3OTg1NjIsImV4cCI6MTY4NzMzNDU2MiwiaXNzIjoiaHR0cHM6Ly9idHMtZ2QyLnZpbWFwLnZuIiwiYXVkIjoiSW9UIiwiY2xpZW50X2lkIjoiSW9UX0FwcCIsInN1YiI6ImNkMWQ0Zjc5LWExYzEtZDIyNC00OTYxLTM5ZmZkYzQ0MzM2NiIsImF1dGhfdGltZSI6MTY1NTc5ODU2MiwiaWRwIjoibG9jYWwiLCJyb2xlIjoiYWRtaW4iLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsIjoiYWRtaW5AYWJwLmlvIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1NTc5ODU2Miwic2NvcGUiOlsiSW9UIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.xIWBf650-S4FdloJI-L_fZ6SxphmOGdpyuHFWr6Ygw7JNC6pn6QZhFQCkawF8wHac9g7U1N76TzwCk7HD3_jaB8F00v596XcsotNJH9N-oGCgBs5ym0FWYrRF5pHPnzLCMgNTsPw5l5YzzxJdCk9YgWloEpdMYWRKAcZMF4MEhpGT0Tmd7A5fz2ROzqKtCu1W6Dx7jYXGDePHNyRENnsm2RNW6v7Jd4zO5Zz1XRh4VxH3iR-Dvjk6FFKteX2L9tdqD-nwTVc6tjh_r2m58sbfCVyrtCG7UpVoJ6VLbT0TXZkJ5YUYl8x8KqyF_zAgvVsPp942hTW5ZUyepIiE0VsEg";
  
  // axios
  //   .get(antennaUrl, {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const [state, setState] = React.useState({
    antenna: false,
    station: false,
    implicit: false,
    hang: false,
  });

  const handleChange = (event) => {

    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { antenna, station, implicit, hang } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={antenna} onChange={handleChange} name="antenna" />
            }
            label="Trụ ăng ten"
          />
          <FormControlLabel
            control={
              <Checkbox checked={station} onChange={handleChange} name="station" />
            }
            label="Nhà trạm"
          />
          <FormControlLabel
            control={
              <Checkbox checked={implicit} onChange={handleChange} name="implicit" />
            }
            label="Tuyến cáp ngầm"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hang} onChange={handleChange} name="hang" />
            }
            label="Tuyến cáp treo"
          />
        </FormGroup>
        
      </FormControl>
      
    </Box>
  );
}
