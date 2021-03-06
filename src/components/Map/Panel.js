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
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Crop54Icon from "@mui/icons-material/Crop54";
import "./style.css";
import { chunk } from "lodash";

// const PanelPara = React.forwardRef((props, ref) => (
//   <Panel ref={ref}> {props.children} </Panel>
// ));

function Panel(props) {
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
  // props options ra, kh???i t???o l???i map
  //  const options = props.options;
  //  console.log("options panel", options.target);

  const my4dMap = props.my4dMap;

  // console.log("object", my4dMap.current);
  const [alignment, setAlignment] = useState(null);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

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
  // V??? ???????NG TH???NG C?? MOVE MOUSE
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
            // n???u c?? ??i???m ?????u r???i th?? b???t location move chu???t
            moveMouse.current = my4dMap.current.addListener(
              "mouseMove",
              (args) => {
                const values = Object.values(args.location);
                [values[0], values[1]] = [values[1], values[0]];
                let array = path1.current.concat(values);
                pathRef.current = chunk(array, 2);
                // PUSH LOCATION HI??N T???I C???A CHU???T V??O
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
              //X??A EVENT
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
  // V??? H??NH CH??? NH???T 
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
            // chuy???n t??? polygon sang polyline n???u mu???n t??nh di???n t??ch
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
            // n???u c?? ??i???m ?????u r???i th?? b???t location move chu???t
            moveMouse.current = my4dMap.current.addListener(
              "mouseMove",
              (args) => {
                const values = Object.values(args.location);
                [values[0], values[1]] = [values[1], values[0]];
                let array = path1.current.concat(values);
                pathRef.current = chunk(array, 2);
                // PUSH LOCATION HI??N T???I C???A CHU???T V??O M???NG
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
            // ????? 2 marker r???i n??, v??? polyline th??i
            if (polyline.current) {
              polyline.current.setMap(null);
            }
            // chuy???n t??? polygon sang polyline n???u mu???n t??nh di???n t??ch
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
      // L??m tr???ng m???ng ????? l???n v??? ti???p theo b???t ?????u l???i m???ng m???i, X??a c??c event
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
    <Box>
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
          <ToggleButton  value="location" onClick={getMarker} key="location">
            <NearMeIcon />
          </ToggleButton>
          <ToggleButton value="length" onClick={getLength} key="length">
            <StraightenIcon />
          </ToggleButton>
          <ToggleButton value="area" onClick={getArea} key="area">
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
                Kinh ????? (X):
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
                V?? ????? (Y):
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
            Chi???u d??i: {lengthMap} (m)
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
            Di???n t??ch: {areaMap} (m2)
          </Typography>
        </Box>
      ) : (
        <Box />
      )}
    </Box>
  );
}

export default Panel;
