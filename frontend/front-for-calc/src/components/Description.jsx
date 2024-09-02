import React from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CloudIcon from "@mui/icons-material/Cloud";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "../styles/Discription.css"; 

const Discription = () => {
  return (
    <Container sx={{ fontFamily: "MyFont", }}>
      <Grid container spacing={4}>
        <div className="flex-container">
          {/* Section 1 */}
          <Box item xs={12} md={6} className="background-blur flex-item s1">
            <Box display="flex" alignItems="center" mb={2} >
              <EmailIcon sx={{ mr: 2 }} />
              <Typography
                sx={{ fontFamily: "MyFont", fontWeight: "Bold" }}
                variant="h6"
              >
                Возможны разовые консультации
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "MyFont" }} variant="body1">
              Всегда на связи в рабочие часы.
            </Typography>
          </Box>

          {/* Section 2 */}
          <Box item xs={12} md={6} className="background-blur flex-item s2">
            <Box display="flex" alignItems="center" mb={2}>
              <AccountTreeIcon color="primary" sx={{ mr: 2 }} />
              <Typography
                sx={{ fontFamily: "MyFont", fontWeight: "Bold" }}
                variant="h6"
              >
                Создание базы 1С
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "MyFont" }} variant="body1">
              Организуем создание новой базы 1С или будем работать с вашей.
              Облачная 1С с удаленным доступом.
            </Typography>
          </Box>

          {/* Section 3 */}
          <Box item xs={12} md={6} className="background-blur flex-item s3">
            <Box display="flex" alignItems="center" mb={2}>
              <SupportAgentIcon color="primary" sx={{ mr: 2 }} />
              <Typography
                sx={{ fontFamily: "MyFont", fontWeight: "Bold" }}
                variant="h6"
              >
                Оптимизация и поддержка
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "MyFont" }} variant="body1">
              Поможем оптимизироваться. Возьмем на себя ответы на запросы ИФНС,
              ПФР, ФСС.
            </Typography>
          </Box>

          {/* Section 4 */}
          <Box item xs={12} md={6} className="background-blur flex-item s4">
            <Box display="flex" alignItems="center" mb={2}>
              <PaymentIcon color="primary" sx={{ mr: 2 }} />
              <Typography
                sx={{ fontFamily: "MyFont", fontWeight: "Bold" }}
                variant="h6"
              >
                Банковские вопросы
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "MyFont" }} variant="body1">
              Помощь по любым банковским вопросам (открытие/закрытие счета,
              блокировка счета, овердрафт, кредиты).
            </Typography>
          </Box>

          {/* Section 5 */}
          <Box item xs={12} md={6} className="background-blur flex-item s5">
            <Box display="flex" alignItems="center" mb={2}>
              <CloudIcon color="primary" sx={{ mr: 2 }} />
              <Typography
                sx={{ fontFamily: "MyFont", fontWeight: "Bold" }}
                variant="h6"
              >
                Автоматизация процессов
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "MyFont" }} variant="body1">
              У нас введена автоматизация процессов: ЭЦП, отчетность, ЭДО.
            </Typography>
          </Box>

          {/* Section 6 */}
          <Box item xs={12} md={6} className="background-blur flex-item s6">
            <Box display="flex" alignItems="center" mb={2}>
              <VerifiedUserIcon color="primary" sx={{ mr: 2 }} />
              <Typography
                sx={{ fontFamily: "MyFont", fontWeight: "Bold" }}
                variant="h6"
              >
                Официальные партнеры 1С
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "MyFont" }} variant="body1">
              Являемся официальными партнерами 1С с 2016 года. Гарантируем
              грамотное ведение учета, соблюдение сроков сдачи отчетности.
            </Typography>
          </Box>
        </div>

        {/* Section 7 */}
        <Grid item xs={12} className="center-text">
          <Typography sx={{borderTop: "1px solid #000", paddingTop: "8px", fontFamily: "MyFont" }} variant="h6" align="center">
            Работаем удаленно по России по договору оказания услуг.
            Готовы к нетиповым задачам.
          </Typography>
          <Typography sx={{ fontFamily: "MyFont" }} variant="body1" align="center">
            Индивидуальный подход к каждому клиенту.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Discription;
