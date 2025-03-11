import { Box, Grid, Rating, Typography } from "@mui/material";

import React from "react";

const CreateCard = ({ question, responseHint }) => {
  return (
    <Box
      bgcolor={"rgba(255, 255, 255, 1)"}
      p={2}
      borderRadius={"5px"}
      sx={{ cursor: "pointer" }}
    >
      <Typography
        fontFamily={"Ubuntu"}
        fontWeight={"700"}
        fontSize={"1.25rem"}
        color={"rgba(0, 0, 0, 1)"}
        letterSpacing={"0"}
        mb={1}
      >
        {question}
      </Typography>
      <Typography
        fontFamily={"Open Sans"}
        fontWeight={"400"}
        fontSize={"1rem"}
        color={"rgba(0, 0, 0, 0.5)"}
        letterSpacing={"0"}
        mb={2}
      >
        {responseHint}
      </Typography>
    </Box>
  );
};

const DefaultCard = () => {
  return (
    <Grid container spacing={2} rowGap={2} p={2} justifyContent={"center"}>
      <Grid item sm={12} lg={6}>
        <CreateCard
          question={"Hi, what is the weather"}
          responseHint={"Get immediate AI generated response"}
        />
      </Grid>

      <Grid item sm={12} lg={6}>
        <CreateCard
          question={"Hi, what is the weather"}
          responseHint={"Get immediate AI generated response"}
        />
      </Grid>

      <Grid item sm={12} lg={6}>
        <CreateCard
          question={"Hi, what is the weather"}
          responseHint={"Get immediate AI generated response"}
        />
      </Grid>

      <Grid item sm={12} lg={6}>
        <CreateCard
          question={"Hi, what is the weather"}
          responseHint={"Get immediate AI generated response"}
        />
      </Grid>
    </Grid>
  );
};

export default DefaultCard;
