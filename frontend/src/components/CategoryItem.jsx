import { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  useTheme,
  Modal,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { TextCheckBox, UncheckedBox } from "./Checkboxes";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const CarouselItem = ({
  nomination,
  isSelected,
  order,
  onCheckboxChange,
  index,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isXsmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const endDate = new Date(import.meta.env.VITE_END_DATE).getTime();
  const timeDifference = endDate - new Date().getTime();
  const [loading, setLoading] = useState(true);
  const handleMediaLoad = () => {
    setLoading(false);
  };
  let eventStarted = timeDifference < 0;
  eventStarted = true;

  const handleChange = () => {
    if (isLoading) return;
    onCheckboxChange(nomination.id);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mediaSrcThumbnail = `${import.meta.env.VITE_BASE_MEDIA_URL}${
    nomination.image_thumbnail || nomination.video
  }`;

  const mediaSrc = `${import.meta.env.VITE_BASE_MEDIA_URL}${
    nomination.image || nomination.video
  }`;

  return (
    <Box display="flex" height="130px">
      <Card
        sx={{
          width: "99.9%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          backgroundColor: alpha(theme.palette.primary[50], 1), // Add transparency to the background
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "visible",
          position: "relative",
          padding: "0.5rem",
        }}
      >
        <CardMedia
          component={nomination.image ? "img" : "video"}
          sx={{
            height: "100%",
            width: !isXsmallScreen ? "120px" : "100px",
            objectFit: "cover",
            borderRadius: "8px",
            transition: "transform 0.3s ease",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "scale(1.10)",
            },
          }}
          src={mediaSrcThumbnail}
          autoPlay
          muted
          loop
          playsInline
          onClick={handleOpen}
          data-tour={index === 0 ? "media-0" : undefined}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            height: "15%",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            fontWeight="bold"
            gutterBottom
            variant="h2"
            component="div"
          >
            {nomination.nomination_text}
            Test
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Nimitetty: {nomination.nominated_voter}
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
            disabled={isLoading || !eventStarted}
            checked={isSelected}
            onChange={handleChange}
            icon={<UncheckedBox eventStarted={eventStarted} />}
            checkedIcon={<TextCheckBox text={`${order}.`} />}
            data-tour={index === 0 ? "checkbox-0" : undefined}
          />
        </CardActions>
      </Card>
      <Modal
        disableAutoFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="enlarged-image"
        aria-describedby="enlarged-image-description"
        sx={{
          outline: "none",
        }}
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
          {loading && (
            <CircularProgress sx={{ color: theme.palette.secondary[400] }} />
          )}
          {mediaSrc.endsWith(".mp4") ? (
            <video
              autoPlay
              playsInline
              loop
              onLoadedData={handleMediaLoad}
              style={{
                display: loading ? "none" : "block", // Hide until loaded
                width: "100%",
                height: "auto",
                minWidth: isXsmallScreen ? "70vw" : "30vw",
                maxHeight: "70vh",
                maxWidth: "70vw",
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
              onLoad={handleMediaLoad}
              style={{
                display: loading ? "none" : "block", // Hide until loaded
                width: "100%",
                height: "auto",
                minWidth: isXsmallScreen ? "70vw" : "30vw",
                maxHeight: "70vh",
                maxWidth: "70vw",
                objectFit: "fill",
              }}
            />
          )}
          {!loading && (
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "1%",
                right: "2%",
                boxShadow: 24,
                opacity: "100%",
                backgroundColor: alpha(theme.palette.primary[300], 0.7),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary[500], 0.9),
                },
              }}
            >
              <CloseIcon sx={{ color: theme.palette.primary[1000] }} />
            </IconButton>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CarouselItem;
