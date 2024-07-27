import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import { useGetNominationsQuery } from "@/state/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header";
import Test from "@/components/Test";

const Home = () => {
	const { data, error, isLoading } = useGetNominationsQuery();
    const theme = useTheme();

	if (isLoading) {
		return <Box></Box>;
	} else {
		return (
			<Box padding="2rem" sx={{ backgroundColor: theme.palette.primary[0] }}>
                <Box maxWidth={1000} margin="0 auto">
    				<Test  />
    				<Test  />
    				<Test  />
                </Box>
			</Box>
		);
	}
};

export default Home;
