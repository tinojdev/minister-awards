import React from "react";
import {
	Box,
	Skeleton,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	Button,
	Checkbox,
	useTheme,
} from "@mui/material";

const CarouselItem = ({ nomination, isSelected, onCheckboxChange }) => {
	const theme = useTheme();
	const handleChange = () => {
		onCheckboxChange(nomination.id);
	};
	console.log(nomination.image);
	const nominationImgSrc = `${import.meta.env.VITE_BASE_MEDIA_URL}${nomination.image}`;

	return (
		<Box display="flex" width="300px" height="300px">
			<Card sx={{ width: "100%", height: "99.5%" }}>
				<CardMedia
					component="img"
					sx={{ height: "70%", width: "100%", objectFit: "contain", backgroundColor: theme.palette.primary[50] }}
					image={nominationImgSrc}
				/>
				<CardContent sx={{ flexGrow: 1, height: "15%" }}>
					<Typography gutterBottom variant="h4" component="div">
						{nomination.name}
					</Typography>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15%" }}>
					<Checkbox checked={isSelected} onChange={handleChange} />
				</CardActions>
			</Card>
		</Box>
	);
};

export default CarouselItem;
