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

function Panel(props) {
  // props options ra, khởi tạo lại map
  //  const options = props.options;
  //  console.log("options panel", options.target);
  const [alignment, setAlignment] = useState(null);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
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
          <ToggleButton  value="location" key="location">
            <NearMeIcon />
          </ToggleButton>
          <ToggleButton value="length" key="length">
            <StraightenIcon />
          </ToggleButton>
          <ToggleButton value="area" key="area">
            <Crop54Icon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {/* {isMarker ? (
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
    </Box>
  );
}

export default Panel;
