import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import "./style.css";


function Tilt(props) {
  
  const handleMapTilt = props.handleMapTilt;
  const tilt = props.tilt;
const handleSetTilt = (increase) => {
  let newTilt = tilt;
    increase ? (newTilt += 5) : (newTilt -= 5);
    handleMapTilt(newTilt);
  };
    return (
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
    );
}

export default Tilt;