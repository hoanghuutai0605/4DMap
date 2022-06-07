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
  // VARIABLE FOR MARKER

  const [isMarker, setIsMarker] = useState(false);
  const geolocation = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const x = useRef();
  const y = useRef();

  // VARIABLE for DRAW STRAIGHT LINES
  const polygon = useRef(null);
  const circle = useRef(null);
  const [isLength, setIsLength] = useState(false);
  const [array, setArray] = useState([]);
  const [arrayConvert, setArrayConvert] = useState([]);
  const length = useRef(null);
  const moveMouse = useRef(null);
  const [lengthMap, setLengthMap] = useState([]);
  const path1 = useRef(null);
  const pathRef = useRef(null);
  const dblClick = useRef(null);
  const [isDblClick, setIsDblClick] = useState(false);
  // VARIABLE for AREA
  const [isArea, setIsArea] = useState(false);
  const area = useRef(null);
  const polyline = useRef(null);

  const polylineMove = useRef(null);
  const [areaMap, setAreaMap] = useState(null);

  useEffect(() => {
    my4dMap.current = new map4d.Map(document.getElementById("map"), options);
    cameraRef.current = my4dMap.current.getCamera();

    my4dMap.current.setMapType(map4d.MapType.raster);
  }, []);

  // ZOOM MAP
  const handleSetZoom = (isZoomIn) => {
    if (isZoomIn) {
      setZoom(zoom + 1);
      cameraRef.current.setZoom(zoom + 1);
    } else {
      setZoom(zoom - 1);
      cameraRef.current.setZoom(zoom - 1);
      if (options.zoom < 17) {
        setShow(true);
        my4dMap.current.setMapType(map4d.MapType.raster);
      }
    }
    // console.log(my4dMap.current.getBounds(PaddingOptions));
    my4dMap.current.moveCamera(cameraRef.current);
  };

  // SET TYPE MAP
  const handleSetMapType = () => {
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
  const handleSetTilt = (increase) => {
    increase ? setTilt(tilt + 5) : setTilt(tilt - 5);
    cameraRef.current.setTilt(increase ? tilt + 5 : tilt - 5);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

  // XOAY MAP
  const handleSetBearing = (turn) => {
    if (turn) {
      setBearing(bearing + 15);
      setRotate(rotate + 15);
    } else {
      setBearing(bearing - 15);
      setRotate(rotate - 15);
    }
    cameraRef.current.setBearing(turn ? bearing + 15 : bearing - 15);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

  // LẤY VỊ TRÍ HIỆN TẠI
  const handleMoveCamera = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        cameraRef.current.setTarget({
          lat: lat,
          lng: lng,
        });

        // // cameraRef.current = my4dMap.current.getCamera();
        // setZoom(18);
        // cameraRef.current.setZoom(18);
        my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
        let marker = new map4d.Marker({
          position: { lat: lat, lng: lng },
        });
        marker.setMap(my4dMap.current);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  // CHINH HUONG

  const handleDirectional = () => {
    setBearing(0);
    setRotate(0);
    cameraRef.current.setBearing(0);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

  // Marker

  // UI
  const [alignment, setAlignment] = React.useState(null);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
  // LAY VI TRI
  const getMarker = (e) => {
    setIsMarker(!isMarker);
    if (!isMarker) {
      geolocation.current = my4dMap.current.addListener(
        "click",
        (args) => {
          // cloneArrayMarker.push(args.location);
          if (marker.current) {
            marker.current.setMap(null);
          }

          console.log("object", args.location.lng);
          x.current = args.location.lng;
          y.current = args.location.lat;

          console.log("Kinh ddoj", x.current);
          setLat(y.current);
          setLng(x.current);
          marker.current = new map4d.Marker({
            position: args.location,
          });
          marker.current.setMap(my4dMap.current);

          // console.log("object", args.location);
        },
        {
          location: true,
          marker: true,
        }
      );
    } else {
      geolocation.current.remove();
      marker.current.setMap(null);
      setLat(null);
      setLng(null);
    }
  };
  // console.log(lng);
  // VẼ ĐƯỜNG THẲNG CÓ MOVE MOUSE
  const getLength = (e) => {
    if (!isLength) {
      const cloneArray = cloneDeep(array);
      const cloneArrayConvert = cloneDeep(arrayConvert);

      length.current = my4dMap.current.addListener(
        "click",
        (args) => {
          // dblClick.current.remove();
          if (circle.current) {
            circle.current.setMap(null);
          }

          circle.current = new map4d.Circle({
            center: args.location,
            fillColor: "#ffffff",
            radius: 50,
            zIndex: 100,
            strokeWidth: 2.0,
            strokeColor: "#0b1561",
          });
          circle.current.setMap(my4dMap.current);
          const propertyValues = Object.values(args.location);
          [propertyValues[0], propertyValues[1]] = [
            propertyValues[1],
            propertyValues[0],
          ];
          cloneArray.push(propertyValues);
          path1.current = cloneArray[cloneArray.length - 1];
          if (cloneArray.length >= 1) {
            // nếu có điểm đầu rồi thì bắt location move chuột
            moveMouse.current = my4dMap.current.addListener(
              "mouseMove",
              (args) => {
                const values = Object.values(args.location);
                [values[0], values[1]] = [values[1], values[0]];
                let array = path1.current.concat(values);
                pathRef.current = chunk(array, 2);
                // PUSH LOCATION HIÊN TẠI CỦA CHUỘT VÀO MẢNG NHƯNG MÀ LÀM SAO ĐỂ NÓ HIỆN LÊN ĐƯỜNG THẲNG :)))
                if (polylineMove.current) {
                  polylineMove.current.setMap(null);
                }
                polylineMove.current = new map4d.Polyline({
                  path: pathRef.current,
                  strokeColor: "#44749b",
                  strokeOpacity: 1,
                  strokeWidth: 2,
                });
                polylineMove.current.setMap(my4dMap.current);
              },
              { marker: true, polygon: true, polyline: true, location: true }
            );
          }
          if (cloneArray.length >= 2) {
            if (polyline.current) {
              polyline.current.setMap(null);
            }

            polyline.current = new map4d.Polyline({
              path: cloneArray,
              strokeColor: "#44749b",
              strokeOpacity: 1,
              strokeWidth: 2,
            });
            polyline.current.setMap(my4dMap.current);
            let measure = new map4d.Measure(cloneArray);
            let length = measure.length;
            setLengthMap(length);
          }

          // dbclick
          dblClick.current = my4dMap.current.addListener(
            "dblClick",
            (args) => {
              const values = Object.values(args.location);
              console.log("object", values);
              length.current.remove();
              moveMouse.current.remove();
              path1.current = [];
              pathRef.current = [];
            },
            {
              location: true,
              mappoi: true,
              mapbuilding: true,
              marker: true,
              polygon: true,
              polyline: true,
              circle: true,
              poi: true,
              building: true,
              place: true,
            }
          );
        },
        {
          location: true,
          polygon: true,
          polyline: true,
          circle: true,
        }
      );
      // dblClick.current.remove();
      setArray(cloneArray);
      setArrayConvert(cloneArrayConvert);
      // console.log("array 1", array.length);
    } else {
      setArray([]);
      length.current.remove();
      moveMouse.current.remove();
      polyline.current.setMap(null);
      circle.current.setMap(null);
      polylineMove.current.setMap(null);
      path1.current = [];
      pathRef.current = [];
      setLengthMap(null);
    }
    setIsLength(!isLength);
  };

  // VẼ HÌNH CHỮ NHẬT
  const getArea = (e) => {
    if (!isArea) {
      const cloneArray = cloneDeep(array);
      const cloneArrayConvert = cloneDeep(arrayConvert);
      area.current = my4dMap.current.addListener(
        "click",
        (args) => {
          dblClick.current = my4dMap.current.addListener(
            "dblClick",
            (args) => {
              area.current.remove();
              moveMouse.current.remove();
              path1.current = [];
              pathRef.current = [];
            },
            {
              location: true,
              mappoi: true,
              mapbuilding: true,
              marker: true,
              polygon: true,
              polyline: true,
              circle: true,
              poi: true,
              building: true,
              place: true,
            }
          );
          // dblClick.current.remove();
          // setArray([]);
          // setArrayConvert([]);
          // path1.current = [];
          // pathRef.current = [];
          // setAreaMap(null);

          if (circle.current) {
            circle.current.setMap(null);
          }

          circle.current = new map4d.Circle({
            center: args.location,
            fillColor: "#ffffff",
            radius: 50,
            zIndex: 100,
            strokeWidth: 2.0,
            strokeColor: "#0b1561",
          });
          circle.current.setMap(my4dMap.current);

          //ve polygon
          cloneArrayConvert.push(args.location);
          // console.log("Array Convert", cloneArrayConvert);
          let firstElement = [cloneArrayConvert[0]];
          if (cloneArrayConvert.length >= 2) {
            if (polygon.current) {
              polygon.current.setMap(null);
              // console.log("object", polygon.current);
            }
            const array = cloneArrayConvert.concat(firstElement);
            // chuyển từ polygon sang polyline nếu muốn tính diện tích
            polygon.current = new map4d.Polygon({
              fillOpacity: 0.1,
              strokeColor: "#44749b",
              userInteractionEnabled: true,
              strokeWidth: 1.5,
              paths: [array],
            });

            // console.log(("object", polygon.current));
            polygon.current.setMap(my4dMap.current);
          }

          // ve polyline
          const propertyValues = Object.values(args.location);
          [propertyValues[0], propertyValues[1]] = [
            propertyValues[1],
            propertyValues[0],
          ];
          cloneArray.push(propertyValues);
          path1.current = cloneArray[cloneArray.length - 1];
          // console.log(path1.current);
          if (cloneArray) {
            // nếu có điểm đầu rồi thì bắt location move chuột
            moveMouse.current = my4dMap.current.addListener(
              "mouseMove",
              (args) => {
                const values = Object.values(args.location);
                [values[0], values[1]] = [values[1], values[0]];
                let array = path1.current.concat(values);
                pathRef.current = chunk(array, 2);
                // PUSH LOCATION HIÊN TẠI CỦA CHUỘT VÀO MẢNG NHƯNG MÀ LÀM SAO ĐỂ NÓ HIỆN LÊN ĐƯỜNG THẲNG :)))
                if (polylineMove.current) {
                  polylineMove.current.setMap(null);
                  // console.log("object", polylineMove.current);
                }
                polylineMove.current = new map4d.Polyline({
                  path: pathRef.current,
                  strokeColor: "#44749b",
                  strokeOpacity: 1,
                  strokeWidth: 2,
                });
                // console.log(("object", polylineMove.current));
                polylineMove.current.setMap(my4dMap.current);
              },
              { marker: true, polygon: true, polyline: true, location: true }
            );
          }
          if (cloneArray.length >= 2) {
            // đủ 2 marker rồi nè, vẽ polyline thôi

            if (polyline.current) {
              polyline.current.setMap(null);
              // console.log("object", polyline.current);
            }

            // chuyển từ polygon sang polyline nếu muốn tính diện tích
            polyline.current = new map4d.Polyline({
              path: cloneArray,
              strokeColor: "#44749b",
              strokeOpacity: 1,
              strokeWidth: 2,
              closed: true,
            });

            // console.log(("object", polyline.current));
            polyline.current.setMap(my4dMap.current);
            let measure = new map4d.Measure(cloneArray);
            let area = measure.area;
            // console.log("Area", area);
            setAreaMap(area);
          }
        },
        {
          location: true,
          polygon: true,
          polyline: true,
          circle: true,
        }
      );
      setArray(cloneArray);
      setArrayConvert(cloneArrayConvert);
      // console.log("array 1", array.length);
    } else {
      setArray([]);
      setArrayConvert([]);
      area.current.remove();
      moveMouse.current.remove();
      polyline.current.setMap(null);
      polygon.current.setMap(null);
      circle.current.setMap(null);
      polylineMove.current.setMap(null);
      path1.current = [];
      pathRef.current = [];
      setAreaMap(null);
    }
    setIsArea(!isArea);
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
          <Box
            sx={{
              width: "24%",
              height: "15%",
              // backgroundColor: "red",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={0}
              sx={{ height: "100%" }}
            >
              <IconButton
                onClick={() => handleSetBearing(true)}
                sx={{
                  height: "100%",
                  width: "50%",
                  borderRadius: 0,
                  transition: "0.2s",
                  background: "white",
                  borderRight: "1px solid rgb(178, 178, 250)",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  "&:hover": {
                    background: "rgb(178, 178, 178)",
                  },
                }}
              >
                <TurnSlightRightIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={() => handleSetBearing(false)}
                sx={{
                  height: "100%",
                  width: "50%",
                  borderRadius: 0,
                  transition: "0.2s",
                  background: "white",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  "&:hover": {
                    background: "rgb(178, 178, 178)",
                  },
                }}
              >
                <TurnSlightLeftIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Box>
          <Box
            sx={{
              width: "12%",
              height: "30%",
              // backgroundColor: "red",
              display: "flex",
              flexDirection: "column",
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
              <IconButton
                onClick={() => handleSetTilt(true)}
                sx={{
                  height: "50%",
                  width: "100%",
                  borderRadius: 0,
                  transition: "0.2s",
                  background: "white",
                  borderBottom: "1px solid rgb(178, 178, 250)",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  "&:hover": {
                    background: "rgb(178, 178, 178)",
                  },
                }}
              >
                <ArrowDropUpIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={() => handleSetTilt(false)}
                sx={{
                  height: "50%",
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
                <ArrowDropDownIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          </Box>
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
            <Box
              sx={{
                width: "100%",
                height: "30%",
                // backgroundColor: "green",
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
                <IconButton
                  onClick={handleDirectional}
                  sx={{
                    height: "50%",
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
                  <NavigationIcon
                    fontSize="inherit"
                    sx={{ color: "#e01a33", transform: `rotate(${rotate}deg)` }}
                  />
                </IconButton>
              </Stack>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "30%",
                // backgroundColor: "green",
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
                <IconButton
                  onClick={() => handleSetZoom(true)}
                  sx={{
                    height: "50%",
                    width: "100%",
                    borderRadius: 0,
                    transition: "0.2s",
                    background: "white",
                    borderBottom: "1px solid rgb(178, 178, 250)",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    "&:hover": {
                      background: "rgb(178, 178, 178)",
                    },
                  }}
                >
                  <ZoomInIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => handleSetZoom(false)}
                  sx={{
                    height: "50%",
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
                  <ZoomOutIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "10%",
            width: "100%",
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "60%",
              backgroundColor: "white",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              borderRight: "1px solid rgb(178, 178, 250)",
              ml: "4px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            Map4D data
            <Link
              href="http://iotlink.com.vn/"
              underline="block"
              sx={{ color: "black" }}
            >
              {"@IOT link"}
            </Link>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "40%",
              backgroundColor: "white",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              ml: "4px",
            }}
          >
            {" "}
            contributors{" "}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          top: 5,
          left: "50%",
          transform: "translate(-50%, 0%)",
          zIndex: 2,
          // TODO Replace with Stack
          "& > :not(style) + :not(style)": { mt: 2 },
          background: "white",
        }}
      >
        <ToggleButtonGroup size="large" {...control}>
          <ToggleButton onClick={getMarker} value="location" key="location">
            <NearMeIcon />
          </ToggleButton>
          <ToggleButton onClick={getLength} value="length" key="length">
            <StraightenIcon />
          </ToggleButton>
          <ToggleButton onClick={getArea} value="area" key="area">
            <Crop54Icon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {isMarker ? (
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 10,
            height: 60,
            width: 270,
            zIndex: 1000,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              transform: "translate(0%, 10%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 0,
              }}
            >
              <Typography sx={{ pl: 2 }} variant="subtitle2" gutterBottom>
                Kinh độ (X):
              </Typography>
              <Typography sx={{ pl: 0.5 }} variant="subtitle2" gutterBottom>
                {lng}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ pl: 2 }} variant="subtitle2" gutterBottom>
                Vĩ độ (Y):
              </Typography>
              <Typography sx={{ pl: 2.5 }} variant="subtitle2" gutterBottom>
                {lat}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box />
      )}
      {isLength ? (
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 10,
            height: 60,
            width: 280,
            zIndex: 1000,
            backgroundColor: "white",
            borderRadius: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography sx={{ pl: 2 }} variant="subtitle2" gutterBottom>
            Chiều dài: {lengthMap} (m)
          </Typography>
        </Box>
      ) : (
        <Box />
      )}
      {isArea ? (
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 10,
            height: 60,
            width: 280,
            zIndex: 1000,
            backgroundColor: "white",
            borderRadius: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography sx={{ pl: 2 }} variant="subtitle2" gutterBottom>
            Diện tích: {areaMap} (m2)
          </Typography>
        </Box>
      ) : (
        <Box />
      )}
    </Box>
  );
}

export default Map;
