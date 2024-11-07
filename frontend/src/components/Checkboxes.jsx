import { Box, Typography, CircularProgress, useTheme } from "@mui/material";

function CheckboxBase({ children }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: "2px solid",
        width: "35px",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.palette.secondary.dark,
        borderRadius: "6px",
      }}
    >
      {children ?? children}
    </Box>
  );
}

export function LoadingCheckbox() {
  return (
    <CheckboxBase>
      <CircularProgress size={16} />
    </CheckboxBase>
  );
}

export function Uncheckedbox() {
  return <CheckboxBase />;
}

export function TextCheckbox({ text }) {
  const theme = useTheme();

  return (
    <CheckboxBase>
      <Typography
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary[600],
          fontSize: "20px",
        }}
      >
        {text}
      </Typography>
    </CheckboxBase>
  );
}
