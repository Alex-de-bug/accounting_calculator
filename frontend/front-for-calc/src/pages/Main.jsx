import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  signupSelector,
  clearState,
} from "../store/slices/SignUpSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import "../styles/Main.css";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Main() {
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
            mt: 35,
            mb: 35,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            p: "0%",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              pb: 2,
              letterSpacing: 0.5,
              "@media (max-width: 600px)": { fontSize: "1.4rem" },
            }}
          >
            Уделите внимание росту своего бизнеса, а бумажную работу мы возьмём
            на себя.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              "@media (max-width: 600px)": { fontSize: "0.9rem" },
            }}
          >
            Я предлагаю вам комплексные бухгалтерские услуги, которые будут
            направленные на упрощение управления вашего бизнеса.
          </Typography>
        </Box>
        {/* Добавление анимированной стрелочки */}
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
          <KeyboardArrowDownIcon sx={{ fontSize: 48, color: "#000000" }} />
        </Box>

        {/* Окончание добавления анимированной стрелочки */}
      </Container>
      <div id="content-section">
        {/* Begin Content Section */}
        <Box
          sx={{
            width: "100vw",
            backgroundColor: "#ffffff",
            pt: "10%",
            pb: "20%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "10%",
              pb: "10%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Link to="/calc" style={{ textDecoration: "none" }}>
                  <Card
                    sx={{
                      p: "1%",
                      m: "1%",
                      backgroundColor: "#eff0e9",
                      height: "100%",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#d9e4dd",
                        transform: "scale(1.05)",
                      },
                      "&:active": {
                        transform: "scale(0.7)",
                      },
                    }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Typography variant="h5" component="div" sx={{ pb: 2 }}>
                        Калькулятор
                      </Typography>
                      <Typography variant="body2">
                        Перейти к расчёту услуг
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Link
                  to="https://news.store.rambler.ru/img/9dd07f9efa5d53d64aa28990a7e87768?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen"
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      p: "1%",
                      m: "1%",
                      backgroundColor: "#eff0e9",
                      height: "100%",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#d9e4dd",
                        transform: "scale(1.05)",
                      },
                      "&:active": {
                        transform: "scale(0.7)",
                      },
                    }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Typography variant="h5" component="div" sx={{ pb: 2 }}>
                        Телеграмм бот
                      </Typography>
                      <Typography variant="body2">
                        Воспользоваться ботом
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Link
                  to="#"
                  onClick={handleScrollToContent}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      p: "1%",
                      m: "1%",
                      backgroundColor: "#eff0e9",
                      height: "100%",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#d9e4dd",
                        transform: "scale(1.05)",
                      },
                      "&:active": {
                        transform: "scale(0.7)",
                      },
                    }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Typography variant="h5" component="div" sx={{ pb: 2 }}>
                        Вопрос
                      </Typography>
                      <Typography variant="body2">Задать вопрос</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box
            id="question-form"
            sx={{
              mt: 4,
              p: "5%",
              backgroundColor: "#eff0e9",
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" component="div" sx={{ pb: "4%" }}>
              Задайте свой вопрос
            </Typography>
            <TextField
              label="Ваше Имя"
              color="secondary"
              variant="outlined"
              sx={{ mb: "2%" }}
              fullWidth
              required
            />
            <br />
            <TextField
              label="Email"
              color="secondary"
              variant="outlined"
              sx={{ mb: "2%" }}
              fullWidth
              required
              type="email"
              inputProps={{
                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
              }}
            />
            <br />
            <TextField
              color="secondary"
              label="МЫЛ Я ЗНАЧИТ АРБУЗ И ТУТ ОН ВЗОРВАЛСЯ, СКОЛЬКО КОСТОЧЕК У МЕНЯ ВЫНУЛ ХИРУРГ ИЗ ЛБА?"
              variant="outlined"
              multiline
              rows={4}
              sx={{ mb: "3%" }}
              fullWidth
              required
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#26801d", color: "white" }}
            >
              Отправить
            </Button>
          </Box>
        </Box>
        {/* End Content Section */}
      </div>
      <Footer />
    </div>
  );
}

export default Main;
