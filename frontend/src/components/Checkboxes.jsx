import { useTheme, Box, Typography } from "@mui/material";

function BaseCheckbox({ children }) {
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

export function UncheckedBox() {
  return <BaseCheckbox />;
}

export function TextCheckBox({ text }) {
  const theme = useTheme();

  return (
    <BaseCheckbox>
      <Typography
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary[600],
          fontSize: "20px",
        }}
      >
        {text}
      </Typography>
    </BaseCheckbox>
  );
}
