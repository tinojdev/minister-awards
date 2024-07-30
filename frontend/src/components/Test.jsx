import React from 'react'
import { Box, Skeleton } from "@mui/material"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Header from '@/components/Header';
import CarouselItem from './CarouselItem';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Test = ({ title }) => {
    return (
        <Box marginBottom="2rem" >
            <Box display="flex" alignItems="start" marginBottom="0.5rem">
                <Skeleton variant="text" width={250} sx={{ fontSize: '3rem' }} />
            </Box>
            <Box>
                <Carousel responsive={responsive}>
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                </Carousel>
            </Box>
        </Box>
    )
}

export default Test
