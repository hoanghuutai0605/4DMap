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

function Footer(props) {
    return (
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
    );
}

export default Footer;