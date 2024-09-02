import React from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; 

const CustomRightArrow = ({ onClick }) => {
    return (
        <Box
            style={{
                position: 'absolute',
                right: 0, 
                top: 0,
                width: '100px', 
                height: '100%', 
                background: 'linear-gradient(to left, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%)', 
            }}
        >
            <IconButton
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    right: '5px', 
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '4px', 
                    minWidth: '24px', 
                    minHeight: '24px', 
                    backgroundColor: 'transparent', 
                    zIndex: 10, 
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                        color: 'primary.main', 
                    },
                }}
            >
                <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> 
            </IconButton>
        </Box>
    );
};

export default CustomRightArrow;
