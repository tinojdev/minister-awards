import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Checkbox,
  useTheme,
  Modal,
  IconButton,
} from "@mui/material";
import Checkedbox from "./Checkedbox";
import Uncheckedbox from "./Uncheckedbox";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material";

const CarouselItem = ({ nomination, isSelected, order, onCheckboxChange }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  console.log(nomination);

  const handleChange = () => {
    onCheckboxChange(nomination.id);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mediaSrc = `${import.meta.env.VITE_BASE_MEDIA_URL}${
    nomination.image || nomination.video
  }`;
  console.log("🚀 ~ CarouselItem ~  mediaSrc:", mediaSrc);

  return (
    <Box display="flex" height="90px">
      <Card
        sx={{
          width: "99.9%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          borderRadius: "2",
          backgroundColor: theme.palette.primary[50],
        }}
      >
        <CardMedia
          component={nomination.image ? "img" : "video"}
          sx={{
            height: "100%",
            width: "25%",
            objectFit: "contain",
            backgroundColor: "inherit",
          }}
          src={mediaSrc}
          autoPlay
          muted
          loop
          onClick={handleOpen}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            height: "15%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {nomination.nomination_text}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "15%",
          }}
        >
          <Checkbox
            checked={isSelected}
            onChange={handleChange}
            icon={<Uncheckedbox />}
            checkedIcon={<Checkedbox order={order} />}
          />
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="enlarged-image"
        aria-describedby="enlarged-image-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "70vw",
            maxHeight: "50vh",
            backgroundColor: "transparent",
          }}
        >
          {/* Enlarged image */}
          {mediaSrc.endsWith(".mp4") ? (
            <video
              autoPlay
              loop
              style={{
                width: "70vw",
                maxHeight: "70vh",
                objectFit: "fill",
              }}
            >
              <source src={mediaSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={mediaSrc}
              alt="Media"
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "50vh",
                maxWidth: "50vw",
                objectFit: "contain",
              }}
            />
          )}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "1%",
              right: "2%",
              boxShadow: 24,
              opacity: "100%",
              backgroundColor: alpha(theme.palette.primary[300], 0.8),
            }}
          >
            <CloseIcon sx={{ color: theme.palette.primary[1000] }} />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default CarouselItem;
