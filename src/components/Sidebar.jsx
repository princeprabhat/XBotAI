import { Typography, Box, Stack, Button, IconButton } from "@mui/material";
import React from "react";
import NewChatIcon from "../assets/newchat.png";
import NewChatPen from "../assets/edit.png";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@uidotdev/usehooks";

const Sidebar = ({ isOpen, setMessageData = false }) => {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("only screen and (max-width : 1199px)");
  const handleNewChat = () => {
    navigate("/");
    if (setMessageData) setMessageData([]);
  };
  return (
    <Box
      bgcolor={"rgba(255, 255, 255, 1)"}
      display={
        !isMobileView ? "unset" : isMobileView && isOpen ? "unset" : "none"
      }
      // position={"relative"}
    >
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Stack
          direction={"row"}
          bgcolor={"rgba(215, 199, 244, 1)"}
          py={1}
          spacing={2}
          px={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            component={"img"}
            src={NewChatIcon}
            alt="new-chat"
            width={"20%"}
            borderRadius={"30%"}
          />
          <Typography
            fontFamily={"Ubuntu"}
            fontWeight={"400"}
            fontSize={"1.25rem"}
            letterSpacing={"0"}
            color={"rgba(0, 0, 0, 1)"}
          >
            New Chat
          </Typography>
          <Box
            component={"img"}
            src={NewChatPen}
            alt="new-chat"
            width={"10%"}
            height={"100%"}
            sx={{ cursor: "pointer" }}
            onClick={handleNewChat}
          />
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate("/history")}
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            bgcolor: "rgba(215, 199, 244, 1)",
            mx: "1rem",
            borderRadius: "15px",
            fontFamily: "Ubuntu",
            fontWeight: "700",
            fontSize: "1rem",
            letterSpacing: "0rem",
            color: "rgba(65, 65, 70, 1)",
            textTransform: "none",

            "&:hover": {
              bgcolor: "rgba(215, 199, 244, 0.9)",
            },
          }}
        >
          Past Conversations
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
