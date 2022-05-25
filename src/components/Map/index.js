import { Box, IconButton, Link } from "@mui/material";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Stack from "@mui/material/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ExploreIcon from "@mui/icons-material/Explore";
import "./style.css";

function Map() {
  // const [map, setMap] = useState(null);
  const [lng, setLng] = useState(108.22690536081757);
  const [lat, setLat] = useState(16.072163491469226);
  const [zoom, setZoom] = useState(10);
  const [tilt, setTilt] = useState(0);
  const my4dMap = useRef(null);
  const cameraRef = useRef(null);
  // const [state, dispatch] = useReducer(reducer, initialArg);

  let options = {
    center: { lat: lat, lng: lng },
    zoom: zoom,
    tilt: tilt,
    controls: true,
  };

  useEffect(() => {
    // if (!my4dMap.current) return;
    // let optionsRef = [... options];
    // console.log(optionsRef);

    // RENDER 2 MAP
    console.log(options);
    my4dMap.current = new map4d.Map(document.getElementById("map"), options);

    // CHO RA NGOÀI
    // cameraRef.current = my4dMap.current.getCamera();
    // // cameraRef.current.setZoom(20);
    // cameraRef.current.setTilt(60);
    // my4dMap.current.moveCamera(cameraRef.current);
    console.log("Camera", cameraRef.current);
    // console.log(" Type map ", my4dMap.current.getMapType());
    // THIẾU DEPENDENCIES
  }, [options]);
  const handleSetZoomIn = () => {


    setZoom(zoom + 1);
    cameraRef.current = my4dMap.current.getCamera();
    my4dMap.current.moveCamera(cameraRef.current);
    console.log("Value ", options.zoom);

  };
  // const handleSetZoomOut = () => {
  //   // cameraRef.current.setZoom(cameraRef.current.zoom + 1);

  //   // setZoom(cameraRef.current.zoom + 1);
  //   setZoom(zoom - 1);
  //   console.log("Value ", my4dMap.current);
  // };
  console.log("Zoom", options.zoom);

  return (
    //
    <Box
      sx={{
        position: "relative",
        overflow: 'hidden',
        width: "100vw",
        height: "100vh"
      }}
    >
      <Box
        ref={my4dMap}
        id="map"
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        
      </Box>
      <Box
          sx={{
            position: "fixed",
            bottom: 5,
            // top: {xs: 50, md: 'none'},
            right: 10,
            height: 250,
            width: 300,
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
                  <TurnSlightLeftIcon fontSize="inherit" />
                </IconButton>
                <IconButton
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
                  <TurnSlightRightIcon fontSize="inherit" />
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
                  onClick={() => setTilt(tilt + 100)}
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
                  onClick={() => setTilt(tilt - 100)}
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
                    <ThreeDRotationIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
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
                    <ExploreIcon fontSize="inherit" sx={{ color: "#e01a33" }} />
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
                    onClick={handleSetZoomIn}
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
                    // onClick={handleSetZoomOut}
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
    </Box>
  );
}

export default Map;
