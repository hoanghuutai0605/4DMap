import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import NavigationIcon from "@mui/icons-material/Navigation";
import NearMeIcon from "@mui/icons-material/NearMe";
import StraightenIcon from "@mui/icons-material/Straighten";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Box, IconButton, Link } from "@mui/material";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ClearIcon from "@mui/icons-material/Clear";
import cloneDeep from "lodash/cloneDeep";

import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import Crop54Icon from "@mui/icons-material/Crop54";
import "./style.css";
import { chunk } from "lodash";
import Zoom from "./Zoom";
import Direction from "./Direction";
import Geolocation from "./Geolocation";
import Bearing from "./Bearing";
import Tilt from "./Tilt";
import Footer from "./Footer";
import Panel from "./Panel";

function Map() {
  // VARIABLE FOR OPTIONS MAP4D

  const [zoom, setZoom] = useState(13);
  const [tilt, setTilt] = useState(20);
  const [bearing, setBearing] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [duration, setDuration] = useState(1000);

  const my4dMap = useRef(null);
  const cameraRef = useRef(null);
  const [show, setShow] = useState(true);
  const [target, setTarget] = useState({
    lat: 16.072163491469226,
    lng: 108.22690536081757,
  });
  let options = {
    center: target,
    zoom: zoom,
    tilt: tilt,
    bearing: bearing,
    controls: true,
  };
  let AnimationOptions = {
    duration: duration,
    animate: true,
  };
  
  useEffect(() => {
    my4dMap.current = new map4d.Map(document.getElementById("map"), options);
    cameraRef.current = my4dMap.current.getCamera();

    my4dMap.current.setMapType(map4d.MapType.raster);
  }, []);

  const handleMapZoom = (newZoom) => {
    cameraRef.current.setZoom(newZoom);
    setZoom(newZoom)
    if (newZoom < 17) {
      setShow(true);
      my4dMap.current.setMapType(map4d.MapType.raster);
      
    }
    my4dMap.current.moveCamera(cameraRef.current);
  };
  // SET TYPE MAP
  const handleSetMapType = () => {
    console.log(" aaaaaaaaaa", my4dMap.current);
    setShow(!show);
    if (show) {
      my4dMap.current.setMapType(map4d.MapType.map3d);
      setZoom(17);
      cameraRef.current.setZoom(17);
    } else {
      my4dMap.current.setMapType(map4d.MapType.raster);
    }
  };

  // NGHIÊNG MAP
  const handleMapTilt = (newTilt) => {
    // increase ? setTilt(tilt + 5) : setTilt(tilt - 5);
    setTilt(newTilt);
    cameraRef.current.setTilt(newTilt);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

  // XOAY MAP
  const handleMapBearing = (newBearing) => {
    setBearing(newBearing);
    setRotate(newBearing);

    cameraRef.current.setBearing(newBearing);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

  // LẤY VỊ TRÍ HIỆN TẠI
  const handleMapGeolocation = (target) => {
    cameraRef.current.setTarget(target);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
    let marker = new map4d.Marker({
      position: target,
    });
    marker.setMap(my4dMap.current);
  };

  // CHINH HUONG

  const handleDirectional = (value) => {
    console.log(value);
    setBearing(value);
    setRotate(value);
    cameraRef.current.setBearing(value);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

  return (
    //
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        // ref={my4dMap}
        id="map"
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 5,
          // top: {xs: 50, md: 'none'},
          right: 10,
          height: 250,
          width: 300,
          overflow: "hidden",
          borderTopLeftRadius: "100%",
          // backgroundColor: "red",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        <Box
          sx={{
            height: "90%",
            width: "100%",
            // backgroundColor: "blue",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          {/* Xoay Map */}
          <Bearing handleMapBearing={handleMapBearing} bearing = {bearing}></Bearing>
          {/* Nghiêng Map  */}
          <Tilt handleMapTilt={handleMapTilt} tilt={tilt}></Tilt>
          <Box
            sx={{
              width: "12%",
              height: "100%",
              // backgroundColor: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Geolocation
              handleMapGeolocation={handleMapGeolocation}
            ></Geolocation>
            <Box
              sx={{
                width: "100%",
                height: "30%",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Stack
                direction="column"
                alignItems="center"
                spacing={0}
                sx={{ height: "100%" }}
              >
                {/* MAPTYPE  */}
                <IconButton
                  onClick={handleSetMapType}
                  sx={{
                    height: "50%",
                    width: "100%",
                    borderRadius: 0,
                    transition: "0.2s",
                    background: "white",
                    borderBottom: "1px solid rgb(178, 178, 250)",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    fontSize: "15px",
                    fontWeight: 800,
                    "&:hover": {
                      background: "rgb(178, 178, 178)",
                    },
                  }}
                >
                  {show ? "3D" : "2D"}
                </IconButton>

                {/* DIRECTION  */}
                <Direction
                  handleDirectional={handleDirectional}
                  rotate={rotate}
                ></Direction>
              </Stack>
            </Box>
            {/* Zoom  */}
            <Zoom handleMapZoom={handleMapZoom} zoom={zoom}></Zoom>
          </Box>
        </Box>
        <Footer></Footer>
      </Box>
      <Panel options={options} my4dMap={my4dMap}></Panel>
    </Box>
  );
}

export default Map;
