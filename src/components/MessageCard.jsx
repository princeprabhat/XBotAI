import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "../assets/person.png";
import BotIcon from "../assets/bot.png";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const MessageCard = ({
  data,
  isAnswerCard,
  isHistoryCard,
  modifyLikesDislikes,
  modifyRating,

  setIsModalOpen,

  setSelectedId,
}) => {
  const [isLikeVisible, setIsLikeVisible] = useState(
    isHistoryCard ? true : false
  );
  // console.log(data);
  return (
    <Box
      bgcolor={"rgba(215, 199, 244, 0.14)"}
      display={"flex"}
      alignItems={"center"}
      gap={2}
      py={1}
      px={2}
      mb={2}
      boxShadow={
        isHistoryCard ? "none" : "-4px 4px 15px 0px rgba(0, 0, 0, 0.1)"
      }
      borderRadius={"20px"}
      sx={{ cursor: "pointer", userSelect: "none" }}
      onMouseOver={() => !isHistoryCard && setIsLikeVisible(true)}
      onMouseOut={() => !isHistoryCard && setIsLikeVisible(false)}
    >
      <Box
        component={"img"}
        width={"4.5rem"}
        src={isAnswerCard ? BotIcon : PersonIcon}
        alt="Person-icon"
        borderRadius={"50%"}
      />
      <Stack direction={"column"} gap={0.5}>
        <Typography
          component={"span"}
          fontFamily={"Ubuntu"}
          fontWeight={"700"}
          fontSize={"1rem"}
          letterSpacing={"0rem"}
          color={"rgba(0, 0, 0, 1)"}
        >
          {isAnswerCard ? "Soul AI" : "You"}
        </Typography>
        <Typography
          component={"p"}
          fontFamily={"Open Sans"}
          fontWeight={"400"}
          fontSize={"1rem"}
          letterSpacing={"0rem"}
          color={"rgba(0, 0, 0, 1)"}
        >
          {isAnswerCard ? data.response : data.question}
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={2}
          minHeight={"2rem"}
        >
          <Typography
            fontFamily={"Open Sans"}
            fontSize={"0.75rem"}
            fontWeight={"400"}
            letterSpacing={"0rem"}
            color={"rgba(0, 0, 0, 0.62)"}
          >
            {data.time}
          </Typography>

          {isAnswerCard && isLikeVisible && (
            <IconButton disableRipple={true}>
              <ThumbUpIcon
                sx={{
                  color: data.liked ? "black" : "gray",
                  mr: "0.5rem",
                  fontSize: "1rem",
                }}
                onClick={() => {
                  !isHistoryCard && modifyLikesDislikes(data.chatId, "like");
                }}
              />
              <ThumbDownIcon
                sx={{
                  color: data.disLike ? "black" : "gray",
                  fontSize: "1rem",
                }}
                onClick={() => {
                  !isHistoryCard && modifyLikesDislikes(data.chatId, "dislike");
                }}
              />
            </IconButton>
          )}
          {isAnswerCard && isLikeVisible && (
            <Rating
              name="half-rating"
              sx={{ color: isHistoryCard ? "black" : "" }}
              precision={0.5}
              defaultValue={data.rating}
              readOnly={isHistoryCard}
              value={data.rating}
              onChange={(event, value) => {
                modifyRating(data.chatId, value);
                setIsModalOpen(true);
                setSelectedId(data.chatId);
              }}
            />
          )}
        </Stack>
        {data.feedback && isAnswerCard && isHistoryCard && (
          <Typography
            fontFamily={"Open Sans"}
            fontSize={"1rem"}
            fontWeight={"700"}
            letterSpacing={"0rem"}
            color={"rgba(0, 0, 0, 1)"}
          >
            Feedback: <span style={{ fontWeight: "400" }}>{data.feedback}</span>
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

// const MessageCardBox = ({ data }) => {
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   });

//   return (
//     <Box
//       px={3}
//       sx={{
//         overflowY: "auto",
//         // scrollBehavior: "smooth",
//         "&::-webkit-scrollbar": { display: "none" },
//       }}
//       display={"flex"}
//       flexDirection={"column"}
//       // justifyContent={"flex-end"}
//       flex={"1"}
//     >
//       {data &&
//         data.map((el, idx) => {
//           return (
//             <MessageCard
//               key={idx}
//               // ref={idx == data.length - 1 ? "bottomRef" : "null"}
//             />
//           );
//         })}
//       <Box ref={bottomRef} />
//     </Box>
//   );
// };

export default MessageCard;
