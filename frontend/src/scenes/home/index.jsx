import React from "react";
import { Box, Skeleton } from "@mui/material";
import { useGetNominationsQuery } from "@/state/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header";
import Test from "@/components/Test";

const Home = () => {
	const { data, error, isLoading } = useGetNominationsQuery();

	if (isLoading) {
		return <Box></Box>;
	} else {
		return (
			<Box padding="2rem">
				<Test title={"Ali"} />
				<Test title={"Mali"} />
				<Test title={"Pali"} />
			</Box>
		);
	}
};

export default Home;
