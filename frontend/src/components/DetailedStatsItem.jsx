import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Icon,
  useTheme,
  Modal,
  IconButton,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

const DetailedStatsItem = ({
  nomination,
  totalPoints,
  totalPointsPerNomination,
  voters,
}) => {
  console.log(" 🤓 ~ nomination:", nomination)
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const mediaSrc = `${import.meta.env.VITE_BASE_MEDIA_URL}${
    nomination.image_thumbnail || nomination.video
  }`;
  const precentage =
    Math.round((totalPointsPerNomination / totalPoints) * 100) || 0;

  const [animatedWidth, setAnimatedWidth] = useState("0%");

  useEffect(() => {
    setAnimatedWidth(`${(totalPointsPerNomination / totalPoints) * 100}%`);
  }, [totalPointsPerNomination, totalPoints]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
        }}
      >
        <Card sx={{ height: "100px", width: "100px", borderRadius: "10px" }}>
          <CardMedia
            component={nomination.image ? "img" : "video"}
            src={mediaSrc}
            autoPlay
            muted
            loop
            playsInline
            sx={{
              objectFit: "cover",
              height: "100%",
            }}
          />
        </Card>
        <Box sx={{ display: "flex", alignItems: "center", mt: "0.2rem" }}>
          <Typography
            sx={{
              mr: "0.2rem",
              fontSize: 10,
              width: "25%",
              textAlign: "center",
            }}
          >
            {precentage}%
          </Typography>
          <Box
            sx={{
              position: "relative",
              height: "7px",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                height: "7px",
                border: "solid 1.5px",
                borderRadius: "10px",
                borderColor: theme.palette.secondary[500],
                width: "100%",
                position: "absolute",
              }}
            />
            <Box
              sx={{
                height: "7px",
                borderRadius: "10px",
                background: theme.palette.secondary[500],
                position: "absolute",
                transition: "width 1.5s ease-in-out",
                width: animatedWidth,
              }}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography fontSize={10}>Näytä enemmän</Typography>
          <Icon sx={{ display: "flex", alignItems: "center" }}>
            <ExpandMoreIcon fontSize="small" />
          </Icon>
        </Box>
      </Box>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "400px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box display="flex" alignItems="center">
            <CardMedia
              component={nomination.image ? "img" : "video"}
              src={mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              sx={{
                objectFit: "cover",
                width: "100px",
                height: "100px",
                borderRadius: "10px",
              }}
            />
            <Typography sx={{ml:"1rem", fontSize: 20}}>
                Nimitetty: {nomination.nominated_voter}
            </Typography>
          </Box>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography>Äänesti ensimmäisenä:</Typography>
              {voters?.voted_first?.length > 0 &&
                voters.voted_first.map((voter, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: 0.2,
                      border: "1.5px solid black",
                      borderRadius: "8px",
                      ml: 0.5,
                    }}
                  >
                    <Typography
                      fontSize={10}
                      fontWeight="bold"
                      sx={{ margin: "0 0.3rem 0 0.3rem" }}
                    >
                      {voter}
                    </Typography>
                  </Box>
                ))}
            </Box>
            <Box display="flex" alignItems="center" mt="1rem">
              <Typography>Äänesti toisena:</Typography>
              {voters?.voted_second?.length > 0 &&
                voters.voted_second.map((voter, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: 0.2,
                      border: "1.5px solid black",
                      borderRadius: "8px",
                      ml: 0.5,
                    }}
                  >
                    <Typography
                      fontSize={10}
                      fontWeight="bold"
                      sx={{ margin: "0 0.3rem 0 0.3rem" }}
                    >
                      {voter}
                    </Typography>
                  </Box>
                ))}
            </Box>
            <Box display="flex" alignItems="center" mt="1rem">
              <Typography>Äänesti kolmantena:</Typography>
              {voters?.voted_third?.length > 0 &&
                voters.voted_third.map((voter, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: 0.2,
                      border: "1.5px solid black",
                      borderRadius: "8px",
                      ml: 0.5,
                    }}
                  >
                    <Typography
                      fontSize={10}
                      fontWeight="bold"
                      sx={{ margin: "0 0.3rem 0 0.3rem" }}
                    >
                      {voter}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default DetailedStatsItem;
