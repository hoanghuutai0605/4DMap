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


function Zoom(props) {
    

  // truyen zoom xuong de set props
    let handleMapZoom = props.handleMapZoom;
    const zoom = props.zoom;
const handleSetZoom = (isZoom) => {
  
  console.log("Zoom", zoom);
  let newZoom = zoom;
  console.log("NewZoom", newZoom);
  if (isZoom) {
    newZoom = newZoom + 1;
    console.log("object ++");
  } else {
    newZoom -= 1;
    console.log("object --");
  }
  handleMapZoom(newZoom);
  };

    return (
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
    );
}

export default Zoom;