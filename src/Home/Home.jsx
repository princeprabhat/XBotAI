import { Box, Typography } from "@mui/material";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import DefaultCard from "../components/DefaultCard";
import InputMessage from "../components/InputMessage";
import HomeIcon from "../assets/bot.png";
import Sidebar from "../components/Sidebar";
import MessageCard from "../components/MessageCard";
import ChatData from "../aiData/sampleData.json";
import FeedbackModal from "../components/FeedbackModal";
import { useNavigate } from "react-router-dom";

const GreetHome = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
      my={5}
    >
      <Typography
        fontFamily={"Ubuntu"}
        fontWeight={"500"}
        fontSize={"1.75rem"}
        color={"rgba(0, 0, 0, 1)"}
      >
        How Can I Help You Today?
      </Typography>

      <Box
        component={"img"}
        src={HomeIcon}
        sx={{
          width: 90,
          height: 90,
          borderRadius: 50,
        }}
      />
    </Box>
  );
};

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageData]);

  const getTime = () => {
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return time;
  };

  const handleFeedback = useCallback(() => {
    if (!feedbackText) return;

    setMessageData((prev) =>
      prev.map((el) =>
        el.chatId == selectedId ? { ...el, feedback: feedbackText } : el
      )
    );
    setFeedbackText("");
  }, [feedbackText]);

  const modifyRating = (itemId, value) => {
    setMessageData((prev) =>
      prev.map((el) => (el.chatId == itemId ? { ...el, rating: value } : el))
    );
  };

  const modifyLikesDislikes = (itemId, type) => {
    setMessageData((prev) =>
      prev.map((el) =>
        el.chatId == itemId
          ? {
              ...el,
              liked:
                type == "like" && el.liked == true
                  ? false
                  : type == "like" && el.liked == false
                  ? true
                  : false,
              disLike:
                type == "dislike" && el.disLike == true
                  ? false
                  : type == "dislike" && el.disLike == false
                  ? true
                  : false,
            }
          : el
      )
    );
  };

  const getResponse = (question) => {
    const ans = ChatData.find(
      (el) => el.question.toLowerCase() == question.toLowerCase()
    );
    return ans?.response || "Sorry, Did not understand your query!";
  };

  const handleSave = () => {
    localStorage.setItem("chat-data", JSON.stringify(messageData));
  };

  const handleAsk = (e) => {
    e.preventDefault();

    if (!inputMessage) {
      return;
    }
    const id = Math.random().toString(16).substring(2);
    // Generating question
    const cData = {
      chatId: id,
      question: inputMessage,
      response: "",
      liked: false,
      disLike: false,
      time: getTime(),
      feedback: "",
      rating: 0,
    };
    setMessageData((prev) => [...prev, cData]);
    // Getting response to add in the data
    const res = getResponse(inputMessage);

    const time = setTimeout(() => {
      setMessageData((prev) =>
        prev.map((el) => (el.chatId == id ? { ...el, response: res } : el))
      );
    }, 600);

    setInputMessage("");

    return () => clearTimeout(time);
  };
  console.log(messageData);
  return (
    <Box display={"flex"} height={"100vh"}>
      <Sidebar isOpen={isSideBarOpen} setMessageData={setMessageData} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        overflow={"hidden"}
        width={"100%"}
      >
        <Navbar
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />

        {messageData.length > 0 ? (
          <Box
            px={3}
            sx={{
              overflowY: "auto",

              "&::-webkit-scrollbar": { display: "none" },
            }}
            display={"flex"}
            flexDirection={"column"}
            flex={"1"}
          >
            {messageData &&
              messageData?.map((el, idx) => {
                return (
                  <Box key={el.chatId + String(Date.now())}>
                    {el.question && (
                      <MessageCard
                        data={el}
                        modifyLikesDislikes={modifyLikesDislikes}
                        modifyRating={modifyRating}
                        setIsModalOpen={setIsModalOpen}
                        setSelectedId={setSelectedId}
                      />
                    )}
                    {el.response && (
                      <MessageCard
                        data={el}
                        isAnswerCard
                        modifyLikesDislikes={modifyLikesDislikes}
                        modifyRating={modifyRating}
                        setIsModalOpen={setIsModalOpen}
                        setSelectedId={setSelectedId}
                      />
                    )}
                  </Box>
                );
              })}
            <Box ref={bottomRef} />
          </Box>
        ) : (
          <>
            <GreetHome />
            <DefaultCard />
          </>
        )}

        <InputMessage
          handleAsk={handleAsk}
          handleSave={handleSave}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
        />
      </Box>
      <FeedbackModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleFeedback={handleFeedback}
        feedbackText={feedbackText}
        setFeedbackText={setFeedbackText}
      />
    </Box>
  );
};

export default Home;
