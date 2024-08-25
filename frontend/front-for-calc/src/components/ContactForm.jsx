import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить обработчик отправки формы
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: 'MyFont',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        Обратная связь
      </Typography>
      
      <TextField
        color='secondary'
        fontFamily="MyFont"
        label="Имя"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        color='secondary'
        label="Почта"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        color='secondary'
        label="Сообщение"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button fontFamily="MyFont" type="submit" variant="outlined" color="black" fullWidth sx={{ mt: 2 }}>
            отправить
      </Button>
    </Box>
  );
}

export default ContactForm;
