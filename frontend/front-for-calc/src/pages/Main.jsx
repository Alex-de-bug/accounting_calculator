import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import "../styles/Main.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Discription from "../components/Description";
import MyButtons from "../components/MyButtons";
import ContactForm from "../components/ContactForm";

function Main() {

  

  const handleScrollToQw = () => {
    const contentDiv = document.getElementById("question-form");
    if (contentDiv) {
      contentDiv.scrollIntoView({ behavior: "smooth" });
    }
  };


  const handleScrollToContent = () => {
    const contentDiv = document.getElementById("content-section");
    if (contentDiv) {
      contentDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: "6%", mb: "10%" }}>
        <Box
          sx={{
            mt: 30,
            mb: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              pb: 2,
              fontFamily: "MyFont",
              "@media (max-width: 600px)": { fontSize: "1.4rem" },
            }}
          >
            Возьмем на полное бухгалтерское сопровождение ИП и ООО.
            <br />
            Имеем большой опыт работы в разных отраслях.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            cursor: "pointer",
            animation: "bounce 2s infinite",
          }}
          onClick={handleScrollToContent}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 67, color: "#000000" }} />
        </Box>

      </Container>


      <div id="content-section" >
        <Box
          sx={{
            width: "100vw",
            backgroundColor: "#eff0e9",
            pt: "120px",
            pb: "20px",
          }}
        >
          <Discription />
          <Box textAlign="center" mt={4}>
            <Button onClick={handleScrollToQw} sx={{ fontFamily: "MyFont" }} variant="contained" color="primary" size="large">
              Связаться с нами
            </Button>
          </Box>
        </Box>
      </div>

      <MyButtons/>

      <div id="question-form">
        <ContactForm />
      </div>
          
      <Footer />
    </div>
  );
}

export default Main;
