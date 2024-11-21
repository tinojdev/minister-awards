import { useState, useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { getLocalStorageState } from "@/utils/utils";
import { useTheme } from "@mui/material";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const currentScrollY = scrollContainerRef.current?.scrollTop || 0;

    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!isNonMobile && scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    if (isNonMobile) {
      setShowNavbar(true);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isNonMobile]);
  if (getLocalStorageState("personalId") === null) {
    return <Navigate to={`/invalid-authentication`} />;
  }
  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      sx={{ background: theme.palette.primary[0] }}
    >
      {/* Sidebar component */}
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth={isNonMobile ? "250px" : "70%"}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main content area */}
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        overflow="hidden"
      >

        {/* Content area that can scroll */}
        <Box ref={scrollContainerRef} flexGrow={1} overflow="auto">
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1100,
              transform: showNavbar ? "translateY(0)" : "translateY(-100%)", 
              transition: "transform 0.3s ease", 
            }}
          >
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </Box>
          <Outlet context={{ isSidebarOpen, showNavbar, scrollContainerRef }} />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
