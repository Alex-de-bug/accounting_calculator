import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/MyButtons.css'; 

function MyButtons() {
  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: 'MyFont',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        Наши сервисы
      </Typography>
      <br />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap={4}
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Button
          component={Link}
          to="/calc"
          variant="contained"
          className="button-calc" 
          sx={{
            fontFamily: 'MyFont',
            fontSize: 19,
            p: 4,
            color: '#fff',
          }}
        >
          Калькулятор
          <br />
          Для расчёта услуг
        </Button>

        <Button
          component="a"
          href="https://t.me/BuhCraftBot"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          className="button-telegram" 
          sx={{
            fontFamily: 'MyFont',
            fontSize: 19,
            p: 4,
            color: '#fff',
          }}
        >
          Телеграмм Бот
        </Button>
      </Box>
    </Box>
  );
}

export default MyButtons;
