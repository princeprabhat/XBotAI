import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InputMessage from "../components/InputMessage";
import MessageCard from "../components/MessageCard";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [chatData, setChatData] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat-data"));
    setChatData(data);
  }, []);
  console.log(chatData);
  return (
    <Box display={"flex"} height={"100vh"}>
      <Sidebar isOpen={isSideBarOpen} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        overflow={"hidden"}
        width={"100%"}
      >
        <Navbar
          isCustomNavbar
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
        <Typography
          fontFamily={"Ubuntu"}
          fontSize={"1.75rem"}
          fontWeight={"400"}
          letterSpacing={"0rem"}
          color={"rgba(0, 0, 0, 1)"}
          textAlign={"center"}
          my={"1rem"}
        >
          Conversation History
        </Typography>
        <Box
          overflow={"hidden"}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {chatData &&
            chatData.map((el, idx) => {
              return (
                <Box
                  key={el.chatId}
                  display={"flex"}
                  flexDirection={"column"}
                  flex={"1"}
                  sx={{
                    background: "rgba(215, 199, 244, 1)",
                    // py: "1rem",
                    m: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  <MessageCard data={el} isHistoryCard />
                  <MessageCard data={el} isAnswerCard isHistoryCard />
                </Box>
              );
            })}
        </Box>
        <InputMessage handleAsk={handleNavigate} />
      </Box>
    </Box>
  );
};

export default History;
