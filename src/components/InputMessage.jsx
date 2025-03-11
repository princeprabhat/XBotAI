import { Box, Button, TextField } from "@mui/material";
import React from "react";
const style = {
  bgcolor: "rgba(215, 199, 244, 1)",
  color: "rgba(0, 0, 0, 1)",
  fontFamily: "Ubuntu",
  fontWeight: "400",
  fontSize: "1.25rem",
  outline: "none",
  padding: "0.2rem 1rem",
  textTransform: "none",
  "&:hover": {
    bgcolor: "rgba(215, 199, 244, 0.9)",
  },
};
const InputMessage = ({
  handleSave,
  handleAsk,
  inputMessage,
  setInputMessage,
}) => {
  return (
    <form onSubmit={handleAsk}>
      <Box display={"flex"} p={2} gap={3} alignItems={"center"}>
        <TextField
          id="outlined-basic"
          size="small"
          placeholder="Message Bot AI…"
          focused={false}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.45)",
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 1)",
            flex: "1",
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          variant="contained"
          sx={style}
          disableRipple
          disableFocusRipple
          disableElevation
          // onClick={handleAsk}
          type="submit"
        >
          Ask
        </Button>
        <Button
          variant="contained"
          sx={style}
          disableRipple
          disableFocusRipple
          disableElevation
          onClick={handleSave}
          type="button"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default InputMessage;
