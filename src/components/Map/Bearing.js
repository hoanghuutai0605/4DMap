import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import { Box, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import "./style.css";



function Bearing(props) {
  const handleMapBearing = props.handleMapBearing;
const [bearing, setBearing] = useState(0)

  const handleSetBearing = (turn) => {
    if (turn) {
      setBearing(bearing + 15);
      // setBearing(rotate + 15);
    } else {
      setBearing(bearing - 15);
      // setBearing(bearing - 15);
      // setRotate(rotate - 15);
    }
    handleMapBearing(bearing);

    // cameraRef.current.setBearing(turn ? bearing + 15 : bearing - 15);
    // my4dMap.current.moveCamera(cameraRef.current, AnimationOptions);
  };

    return (
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
    );
}

export default Bearing;