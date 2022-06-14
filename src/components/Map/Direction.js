import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton } from "@mui/material";
import React from "react";
import "./style.css";


function Direction(props) {
    const handleDirectional = props.handleDirectional;
    const rotate = props.rotate;
    const handleIcon = ()=>{
      handleDirectional(0) 
    }
  
    return (
        <div>
            <IconButton
                  onClick={handleIcon}
                  sx={{
                    height: "80%",
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
        </div>
    );

  };
export default Direction;