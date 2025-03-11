import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InputMessage from "../components/InputMessage";
import MessageCard from "../components/MessageCard";
import { useNavigate } from "react-router-dom";
const RATING = [0, 1, 2, 3, 4, 5];
const History = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterRating, setFilterRating] = useState(null);

  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    if (filterRating < 0 || filterRating > 5) {
      setFilteredData(chatData);
      return;
    }
    setFilteredData(chatData.filter((item, id) => item.rating == filterRating));
  }, [filterRating]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("chat-data")) || [];
    setChatData(data);
    setFilteredData(data);
  }, []);

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
          {chatData.length > 0 && (
            <Box>
              <select
                name="rating-dropdown"
                id="rating-dropdown"
                style={{ minWidth: "10rem", marginLeft: "1rem" }}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="" key={Date.now()}>
                  Filter
                </option>
                {RATING.map((el, idx) => {
                  return (
                    <option key={idx} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </Box>
          )}
          {filteredData &&
            filteredData.map((el, idx) => {
              return (
                <Box
                  key={el.chatId + String(Date.now())}
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
        <InputMessage handleAsk={handleNavigate} isHistoryInput />
      </Box>
    </Box>
  );
};

export default History;
