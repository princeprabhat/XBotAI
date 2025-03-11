import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Input, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "70%",
  bgcolor: "rgba(250, 247, 255, 1)",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

export default function FeedbackModal({
  isModalOpen,
  setIsModalOpen,
  handleFeedback,
  feedbackText,
  setFeedbackText,
}) {
  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={3}
          >
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <TipsAndUpdatesOutlinedIcon
                sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "2rem" }}
              />
              <Typography
                fontFamily={"Open Sans"}
                fontSize={"1.30rem"}
                fontWeight={"400"}
                letterSpacing={"0rem"}
                color={"rgba(0, 0, 0, 1)"}
              >
                Provide Additional Feedback
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseIcon
                sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "1.75rem" }}
              />
            </IconButton>
          </Stack>
          <Input
            aria-label="Feedback form"
            multiline
            minRows={5}
            fullWidth
            disableUnderline
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            sx={{
              bgcolor: "rgba(255, 255, 255, 1)",
              border: "1px solid rgba(0, 0, 0, 0.45)",

              p: "1rem",
              borderRadius: "10px",
            }}
          />
          <Button
            variant="contained"
            disableElevation
            disableFocusRipple
            disableRipple
            sx={{
              float: "right",
              textTransform: "none",
              mt: "1rem",
              bgcolor: "rgba(215, 199, 244, 1)",
              fontFamily: "Ubuntu",
              fontWeight: "400",
              fontSize: "1.25rem",
              letterSpacing: "0rem",
              color: "rgba(0,0,0,1)",
              "&:hover": {
                bgcolor: "rgba(215, 199, 244, 1)",
              },
            }}
            onClick={() => {
              handleFeedback();
              setIsModalOpen(false);
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
