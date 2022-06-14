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

  // console.log("1", cameraRef.current);
  // ZOOM MAP

  // const handleSetZoomIn = () => {

  // };
  const handleMapZoom = (zoom) => {
    cameraRef.current.setZoom(zoom);
    if (zoom < 17) {
      setShow(true);
      my4dMap.current.setMapType(map4d.MapType.raster);
    }
    my4dMap.current.moveCamera(cameraRef.current);
  };

  // const handleSetZoom = (isZoomIn) => {
  //   if (isZoomIn) {
  //     setZoom(zoom + 1);
  //     cameraRef.current.setZoom(zoom + 1);
  //   } else {
  //     setZoom(zoom - 1);
  //     cameraRef.current.setZoom(zoom - 1);
  //     if (options.zoom < 17) {
  //       setShow(true);
  //       my4dMap.current.setMapType(map4d.MapType.raster);
  //     }
  //   }
  //   // console.log(my4dMap.current.getBounds(PaddingOptions));
  //   my4dMap.current.moveCamera(cameraRef.current);
  // };

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
  const handleMapTilt = (value) => {
    // increase ? setTilt(tilt + 5) : setTilt(tilt - 5);
    setTilt(value);
    cameraRef.current.setTilt(value);
    my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

  // XOAY MAP
  const handleMapBearing = (bearing) => {
    setBearing(bearing);
    setRotate(bearing);

    cameraRef.current.setBearing(bearing);
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

  // Marker

  // UI
  // const [alignment, setAlignment] = React.useState(null);

  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  // const control = {
  //   value: alignment,
  //   onChange: handleChange,
  //   exclusive: true,
  // };
  // LAY MARKER
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
          const valueArr = Object.values(args.location);
          [valueArr[0], valueArr[1]] = [valueArr[1], valueArr[0]];
          cloneArray.push(valueArr);
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
                // PUSH LOCATION HIÊN TẠI CỦA CHUỘT VÀO
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
              //XÓA EVENT
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

  //
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
              strokeWidth: 2,
              paths: [array],
            });

            // console.log(("object", polygon.current));
            polygon.current.setMap(my4dMap.current);
          }

          // ve polyline
          const valueArr = Object.values(args.location);
          [valueArr[0], valueArr[1]] = [valueArr[1], valueArr[0]];
          cloneArray.push(valueArr);
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
                // PUSH LOCATION HIÊN TẠI CỦA CHUỘT VÀO MẢNG
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
            // đủ 2 marker rồi nè, vẽ polyline thôi
            if (polyline.current) {
              polyline.current.setMap(null);
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
    } else {
      // Làm trống mảng để lần vẽ tiếp theo bắt đầu lại mảng mới, Xóa các event
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
          {/* Xoay Map */}
          <Bearing handleMapBearing={handleMapBearing}></Bearing>
          {/* Nghiêng Map  */}
          <Tilt handleMapTilt={handleMapTilt}></Tilt>
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
            <Zoom handleMapZoom={handleMapZoom}></Zoom>
          </Box>
        </Box>
        <Footer></Footer>
      </Box>
      {/* <Box
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
      )} */}
      <Panel options = {options}></Panel>
    </Box>
  );
}

export default Map;
