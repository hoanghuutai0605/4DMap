import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, IconButton } from "@mui/material";
import React from "react";
import "./style.css";


function Geolocation(props) {
  const handleMapGeolocation = props.handleMapGeolocation;
  const handleMoveCamera = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const pos = {lat: lat, lng: lng};
        console.log("lat", pos); 
        handleMapGeolocation(pos);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );


  };


    return (
        <Box
              sx={{
                width: "100%",
                height: "15%",
                borderRadius: 1,
                overflow: "hidden",
                // backgroundColor: "green",
              }}
            >
              <IconButton
                onClick={handleMoveCamera}
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 0,
                  transition: "0.2s",
                  background: "white",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  "&:hover": {
                    background: "rgb(178, 178, 178)",
                  },
                }}
              >
                <MyLocationIcon fontSize="inherit" />
              </IconButton>
            </Box>
    );
}

export default Geolocation;