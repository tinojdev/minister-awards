// color design tokens export

export const tokens = {
    primary: {
        // white to black
        0: "#ffffff", // white
        10: "#f9f9f9",
        50: "#f0f0f0",
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#4d4d4d",
        700: "#3d3d3d",
        800: "#2b2b2b",
        900: "#1a1a1a",
        1000: "#000000" // black
      },
      secondary: {
        // blue
        100: "#cce5f4", // Lightest
        200: "#99cbeb",
        300: "#66b1e1",
        400: "#3397d8",
        500: "#0071BC", // Base
        600: "#005b96",
        700: "#004470",
        800: "#002e4a",
        900: "#001724" // Darkest
      }
};

// mui theme settings
export const themeSettings = {
    palette: {
        primary: {
            ...tokens.primary,
            main: tokens.primary[400],
            light: tokens.primary[400],
        },
        secondary: {
            ...tokens.secondary,
            main: tokens.secondary[300],
        },
        neutral: {
            ...tokens.primary,
            main: tokens.primary[500],
        },
        background: {
            default: tokens.primary[600],
            alt: tokens.primary[500],
        },
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 40,
        },
        h2: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 32,
        },
        h3: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 24,
        },
        h4: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 20,
        },
        h5: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 16,
        },
        h6: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 14,
        },
    },
};