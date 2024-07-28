import React from 'react'
import { Box, Skeleton, Card, CardMedia, CardContent, CardActions, Typography, Button, Checkbox, useTheme } from "@mui/material"

const CarouselItem = ({ item, isSelected, onCheckboxChange }) => {
    const theme = useTheme()
    const handleChange = () => {
        onCheckboxChange(item.id);
    };
    return (
        <Box
            display="flex"
            width="300px"
            height="300px"
        >
            <Card sx={{ width: "100%", height: "99.5%" }}>
                <CardMedia
                    component="img"
                    sx={{ height: "70%", width: "100%", objectFit: "contain", backgroundColor: theme.palette.primary[50] }}
                    image={item.image}
                />
                <CardContent sx={{ flexGrow: 1, height: "15%" }}>
                    <Typography gutterBottom variant="h4" component="div">
                        {item.name}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15%" }}>
                    <Checkbox checked={isSelected}
                        onChange={handleChange} />
                </CardActions>
            </Card>
        </Box>
    )
}

export default CarouselItem