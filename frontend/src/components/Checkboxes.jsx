import { useTheme, Box, Typography, CircularProgress } from "@mui/material";

function BaseCheckbox({ children, disabled }) {
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
        borderColor: disabled ? "grey" : theme.palette.secondary.dark,
        color: disabled ? "grey" : "inherit",
        borderRadius: "6px",
      }}
    >
      {children ?? children}
    </Box>
  );
}

export function UncheckedBox({ disabled }) {
  return <BaseCheckbox disabled={disabled} />;
}

export function TextCheckBox({ text, disabled }) {
  const theme = useTheme();

  return (
    <BaseCheckbox disabled={disabled}>
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
