import React from "react";
import { Box, Icon, Typography, useTheme, useMediaQuery } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { keyframes } from "@mui/system";

const Pedestal = ({ top3, isSidebarOpen }) => {
  const theme = useTheme();
  const isXsmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery("(min-width: 900px)");

  let slideUp = keyframes`
  0% {
    transform: translateY(41.5%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
  let slideUp2 = keyframes`
  0% {
    transform: translateY(30%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
  let slideUp3 = keyframes`
  0% {
    transform: translateY(36%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
  let slideUp4 = keyframes`
  0% {
    transform: translateY(24%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
  let slideUp5 = keyframes`
  0% {
    transform: translateY(40%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
  let slideUp6 = keyframes`
  0% {
    transform: translateY(36%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

  if (isXsmallScreen || (isSidebarOpen && !isLargeScreen)) {
    slideUp = keyframes`
    0% {
      transform: translateY(24.5%);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
    slideUp2 = keyframes`
    0% {
      transform: translateY(30%);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
    slideUp3 = keyframes`
    0% {
      transform: translateY(24.5%);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
    slideUp4 = keyframes`
    0% {
      transform: translateY(24%);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
    slideUp5 = keyframes`
    0% {
      transform: translateY(37.5%);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
    slideUp6 = keyframes`
    0% {
      transform: translateY(36%);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;
  }

  if (isXsmallScreen || (isSidebarOpen && !isLargeScreen)) {
    return (
      <Box
        display="flex"
        height="200px"
        maxWidth="800px"
        margin="0 auto 2rem auto"
      >
        {/* Second Place */}
        <Box
          width="33.33%"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="end"
        >
          <Box
            width="100%"
            height="100px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            sx={{
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: `20px solid ${theme.palette.secondary[500]}`,
              animation: `${slideUp} 0.8s ease-out`,
            }}
          >
            <Typography
              mt="1rem"
              padding="4px"
              fontWeight="bold"
              position="absolute"
              top="15%"
              fontSize="25px"
            >
              {top3[1].first_name}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="30px"
              width="30px"
              sx={{
                backgroundColor: "silver",
                borderRadius: "10px",
                position: "absolute",
                top: "65px",
              }}
            >
              <Icon>
                <EmojiEventsIcon />
              </Icon>
            </Box>
          </Box>
          <Box
            width="100%"
            sx={{
              height: "80px",
              background: `linear-gradient(to bottom, ${theme.palette.secondary[600]} 0%, ${theme.palette.secondary[400]} 55%, ${theme.palette.primary[0]} 100%)`,
              animation: `${slideUp2} 0.8s ease-out`,
            }}
          >
            <Typography
              mt="1rem"
              padding="4px"
              fontSize="12px"
              fontWeight="bold"
              color="white"
            >
              Kokonaispisteet: {top3[1].total_points}
            </Typography>
          </Box>
        </Box>
        {/* First Place */}
        <Box
          width="33.33%"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="end"
        >
          <Box
            width="100%"
            height="100px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            sx={{
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: `20px solid ${theme.palette.secondary[500]}`,
              animation: `${slideUp3} 0.8s ease-out`,
            }}
          >
            <Typography
              mt="1rem"
              padding="4px"
              position="absolute"
              fontSize="35px"
              fontWeight="bold"
            >
              {top3[0].first_name}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="30px"
              height="30px"
              sx={{
                backgroundColor: "#C5A358",
                borderRadius: "10px",
                position: "absolute",
                top: "65px",
              }}
            >
              <Icon>
                <EmojiEventsIcon />
              </Icon>
            </Box>
          </Box>
          <Box
            width="100%"
            sx={{
              height: "100px",
              background: `linear-gradient(to bottom, ${theme.palette.secondary[600]} 0%, ${theme.palette.secondary[400]} 55%, ${theme.palette.primary[0]} 100%)`,
              animation: `${slideUp4} 0.8s ease-out`,
            }}
          >
            <Typography
              mt="1rem"
              padding="4px"
              fontSize="12px"
              fontWeight="bold"
              color="white"
            >
              Kokonaispisteet: {top3[0].total_points}
            </Typography>
          </Box>
        </Box>
        {/* Third Place */}
        <Box
          width="33.33%"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="end"
        >
          <Box
            width="100%"
            height="70px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            sx={{
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: `20px solid ${theme.palette.secondary[500]}`,
              animation: `${slideUp5} 0.8s ease-out`,
            }}
          >
            <Typography position="absolute" fontSize="20px" fontWeight="bold">
              {top3[2].first_name}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="30px"
              height="30px"
              sx={{
                backgroundColor: "#A97142",
                borderRadius: "10px",
                position: "absolute",
                top: "33px",
              }}
            >
              <Icon>
                <EmojiEventsIcon />
              </Icon>
            </Box>
          </Box>
          <Box
            width="100%"
            height="100px"
            sx={{
              height: "70px",
              background: `linear-gradient(to bottom, ${theme.palette.secondary[600]} 0%, ${theme.palette.secondary[400]} 55%, ${theme.palette.primary[0]} 100%)`,
              animation: `${slideUp6} 0.8s ease-out`,
            }}
          >
            <Typography
              mt="1rem"
              padding="4px"
              fontSize="12px"
              fontWeight="bold"
              color="white"
            >
              Kokonaispisteet: {top3[2].total_points}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      display="flex"
      height="270px"
      maxWidth="800px"
      margin="0 auto 2rem auto"
    >
      {/* Second Place */}
      <Box
        width="33.33%"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="end"
      >
        <Box
          width="100%"
          height="90px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="relative"
          sx={{
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: `30px solid ${theme.palette.secondary[500]}`,
            animation: `${slideUp} 0.8s ease-out`,
          }}
        >
          <Typography fontWeight="bold" fontSize="30px">
            {top3[1].first_name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="30px"
            width="30px"
            sx={{
              backgroundColor: "silver",
              borderRadius: "10px",
              position: "absolute",
              top: "50px",
            }}
          >
            <Icon>
              <EmojiEventsIcon />
            </Icon>
          </Box>
        </Box>
        <Box
          width="100%"
          sx={{
            height: "120px",
            background: `linear-gradient(to bottom, ${theme.palette.secondary[600]} 0%, ${theme.palette.secondary[400]} 55%, ${theme.palette.primary[0]} 100%)`,
            animation: `${slideUp2} 0.8s ease-out`,
          }}
        >
          <Typography mt="1rem" fontWeight="bold" color="white">
            Kokonaispisteet: {top3[1].total_points}
          </Typography>
        </Box>
      </Box>
      {/* First Place */}
      <Box
        width="33.33%"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="end"
      >
        <Box
          width="100%"
          height="100px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="relative"
          sx={{
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: `30px solid ${theme.palette.secondary[500]}`,
            animation: `${slideUp3} 0.8s ease-out`,
          }}
        >
          <Typography mb="1rem" fontWeight="bold" fontSize="40px">
            {top3[0].first_name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="30px"
            height="30px"
            sx={{
              backgroundColor: "#C5A358",
              borderRadius: "10px",
              position: "absolute",
              top: "60px",
            }}
          >
            <Icon>
              <EmojiEventsIcon />
            </Icon>
          </Box>
        </Box>
        <Box
          width="100%"
          sx={{
            height: "150px",
            background: `linear-gradient(to bottom, ${theme.palette.secondary[600]} 0%, ${theme.palette.secondary[400]} 55%, ${theme.palette.primary[0]} 100%)`,
            animation: `${slideUp4} 0.8s ease-out`,
          }}
        >
          <Typography mt="1rem" fontWeight="bold" color="white">
            Kokonaispisteet: {top3[0].total_points}
          </Typography>
        </Box>
      </Box>
      {/* Third Place */}
      <Box
        width="33.33%"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="end"
      >
        <Box
          width="100%"
          height="90px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="relative"
          sx={{
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: `30px solid ${theme.palette.secondary[500]}`,
            animation: `${slideUp5} 0.8s ease-out`,
          }}
        >
          <Typography mt="0.5rem" fontWeight="bold" fontSize="25px">
            {top3[2].first_name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="30px"
            height="30px"
            sx={{
              backgroundColor: "#A97142",
              borderRadius: "10px",
              position: "absolute",
              top: "50px",
            }}
          >
            <Icon>
              <EmojiEventsIcon />
            </Icon>
          </Box>
        </Box>
        <Box
          width="100%"
          height="100px"
          sx={{
            height: "100px",
            background: `linear-gradient(to bottom, ${theme.palette.secondary[600]} 0%, ${theme.palette.secondary[400]} 55%, ${theme.palette.primary[0]} 100%)`,
            animation: `${slideUp6} 0.8s ease-out`,
          }}
        >
          <Typography mt="1rem" fontWeight="bold" color="white">
            Kokonaispisteet: {top3[2].total_points}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Pedestal;
