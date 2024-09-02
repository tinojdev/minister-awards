import React from 'react'
import { Box, Typography, useTheme} from "@mui/material";

const Checkedbox = ({order}) => {
  const theme = useTheme()

  return (
    <Box sx={{border: "2px solid", width: "17px", height: "17px", display: "flex", alignItems: "center", justifyContent: "center", borderColor: "#0071BC", borderRadius: "3px"}}>
      <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary[600], fontSize: '13px'}}>
        {order}
      </Typography>
    </Box>
  )
}

export default Checkedbox
