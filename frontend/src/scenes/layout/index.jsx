import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100vh">
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box 
                flexGrow={1} 
                overflow="auto"
                display="flex" 
                flexDirection="column"
                width="100%"
            >
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Box flexGrow={1}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;