import { Box, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";

import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import MenuLeft from "../LeftMenu";
import Bearing from "./Bearing";
import Direction from "./Direction";
import Footer from "./Footer";
import Geolocation from "./Geolocation";
import Panel from "./Panel";
import "./style.css";
import Tilt from "./Tilt";
import Zoom from "./Zoom";
import axios from "axios";

function Map() {
  //   const { createProxyMiddleware } = require("http-proxy-middleware");

  //   module.exports = app => {
  //     app.use(
  //         createProxyMiddleware('',{
  //             target: '',
  //             changeOrigin: true
  //         })
  //     )
  // }

    let antennaUrl =
      "https://bts-gd2.vimap.vn/api/BTS/InforTruAnten/search-tru-anten?code=001053&chuSoHuu=&loaiTram=&loaiCot=&lat=0&lng=0&radius=0";
    let access_token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI0OUIyQkE1ODcwRkM1OUJFMUZEMTg0QTBFMkEwREUxIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTYxNDYzMDksImV4cCI6MTY4NzY4MjMwOSwiaXNzIjoiaHR0cHM6Ly9idHMtZ2QyLnZpbWFwLnZuIiwiYXVkIjoiSW9UIiwiY2xpZW50X2lkIjoiSW9UX0FwcCIsInN1YiI6ImNkMWQ0Zjc5LWExYzEtZDIyNC00OTYxLTM5ZmZkYzQ0MzM2NiIsImF1dGhfdGltZSI6MTY1NjE0NjMwOCwiaWRwIjoibG9jYWwiLCJyb2xlIjoiYWRtaW4iLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsIjoiYWRtaW5AYWJwLmlvIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1NjE0NjMwOSwic2NvcGUiOlsiSW9UIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.qY0HAzp_UzLw-4feOBiVfTjDQmGmUB4My3DZpFynrJNfmRjaJxruLJPradJqD2UYp6hPeIb0D43HQOVDrmeUZGs5YGfZans6q16-uaqxkE_6eg6qBeafRj8tam-V6yYKXe2kQucvyrMUR1sZMDFZwBfeh4617We1un2VKy1Aij-cLrMScjTRYDiUjIRS7XETNH6hARooR8sS4wKqLkKRfhgnflGUOWJ19kj6oJlAHL2qRrspzbcvjv-OTt3gGGy0tKa3RNilYKMNEwx4_kVRrIlWWEVK2_6U9UEXZpRyPJX1V4-rxaAjnji2FbL9FQr4uUpHj3NfU0rfg-xaQTzVKQ";

  useEffect(()=>{
    const fetchData  = async() => {
      const dataList = await axios
      .get(antennaUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
      },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(dataList);
    }
    fetchData();
    // console.log("object");
  }, []);

  // console.log(data);
  // VARIABLE FOR OPTIONS MAP4D

  const [zoom, setZoom] = useState(11);
  const [tilt, setTilt] = useState(20);
  const [bearing, setBearing] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [duration, setDuration] = useState(1000);

  const my4dMap = useRef(null);
  const cameraRef = useRef(null);
  const [show, setShow] = useState(true);
  const [target, setTarget] = useState({
    lat: 10.147193640283263,
    lng: 106.45478818935464,
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
    setZoom(newZoom);
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
          position: "absolute",
          // bottom: 5,
          top: { xs: 0, md: "none" },
          left: 0,
          right: 10,
          height: "100vh",
          width: 350,
          backgroundColor: "white",
          zIndex: 5,
        }}
      >
        <Header></Header>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 5,
          top: { xs: 0, md: "none" },
          left: 0,
          right: 10,
          height: "100vh",
          width: 300,
          // overflow: "hidden",
          // borderTopLeftRadius: "100%",
          backgroundColor: "white",
          zIndex: 2,
        }}
      >
        <MenuLeft></MenuLeft>
      </Box>
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
          <Bearing
            handleMapBearing={handleMapBearing}
            bearing={bearing}
          ></Bearing>
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
