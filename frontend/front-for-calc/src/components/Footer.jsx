import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "static",
        bottom: 0,
        width: "100%",
        backgroundColor: "#eff0e9",
        padding: "1%",
        textAlign: "center",
      }}
    >
      <Typography  variant="body2"  sx={{
            mr: 2,
            fontFamily: 'MyFont',
            color: '#000',
            fontWeight: 300,
         }}>
        Email: example@example.com
      </Typography>
      <Typography variant="body2"  sx={{
            mr: 2,
            fontFamily: 'MyFont',
            color: '#000',
            fontWeight: 300,
         }}>
        Phone: +7 123 456 78 90
      </Typography>
      <Typography variant="body2" sx={{
            mr: 2,
            fontFamily: 'MyFont',
            color: '#000',
            fontWeight: 300,
         }}>
        &copy; 2024 - 2025 All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
