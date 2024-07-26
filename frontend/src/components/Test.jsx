import React from 'react'
import { Box, Skeleton } from "@mui/material"
import { useGetNominationsQuery } from '@/state/api';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from '@/components/Header';

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

const Test = ({title}) => {
    return (
        <Box >
            <Box display="flex" alignItems="start">
                <Header title={title} />
            </Box>
            <Carousel responsive={responsive} >
                <Box width={300} height={500}>
                    <Skeleton width="100%" height="100%" />
                </Box>
                <Box>
                    <Skeleton width={300} height={500} />
                </Box>
                <Box>
                    <Skeleton width={300} height={500} />
                </Box>
                <Box>
                    <Skeleton width={300} height={500} />
                </Box>
                <Box>
                    <Skeleton width={300} height={500} />
                </Box>
                <Box>
                    <Skeleton width={300} height={500} />
                </Box>
            </Carousel>
        </Box>
    )
}

export default Test
