import React from "react";
import { Box, Skeleton } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header";
import CarouselItem from "./CategoryItem";
import { useState } from "react";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const Category = ({ id, items, selectedId, onSelectionChange }) => {
	console.log("🚀 ~ Category ~ selectedId:", selectedId);

	const handleCheckboxChange = (itemId) => {
		onSelectionChange(id, itemId);
	};

	return (
		<Box marginBottom="2rem">
			<Box display="flex" alignItems="start" marginBottom="0.5rem">
				<Header title={id} />
			</Box>
			<Box>
				<Carousel responsive={responsive}>
					{items.map((item) => (
						<CarouselItem
							key={item.id}
							item={item}
							isSelected={selectedId === item.id}
							onCheckboxChange={handleCheckboxChange}
						/>
					))}
				</Carousel>
			</Box>
		</Box>
	);
};

export default Category;

{
	/* <CarouselItem image={"/assets/collage.png"} title={"Collage"}/>
                    <CarouselItem image={"/assets/hazard.png"} title={"Hazard"}/>
                    <CarouselItem image={"/assets/oni_red.png"} title={"Oni Red"}/>
                    <CarouselItem image={"/assets/thedryeye.png"} title={"The Dry Eye"}/>
                    <CarouselItem image={"/assets/whoops.png"} title={"Whoops"}/> */
}
