import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const Navbar = ({ setIsSideBarOpen, isSideBarOpen, isCustomNavbar }) => {
  const isMobileView = useMediaQuery("only screen and (max-width : 1199px)");

  return (
    <Box display={"flex"}>
      {isMobileView && (
        <IconButton
          disableRipple
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          <MenuIcon />
        </IconButton>
      )}
      {!isCustomNavbar && (
        <Typography
          color="rgba(151, 133, 186, 1)"
          component={"header"}
          fontFamily="Ubuntu"
          fontWeight="700"
          fontSize="1.75rem"
          lineHeight="32.17px"
          letterSpacing="0"
          p="1rem"
        >
          Bot AI
        </Typography>
      )}
    </Box>
  );
};

export default Navbar;
