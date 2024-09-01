import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { sendFeedback, feedbackSelector, clearState } from '../store/slices/FeedbackSlice.jsx';

function ContactForm() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, errorMessage } = useSelector(feedbackSelector);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendFeedback({ name, email, message }));
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }

    if (isError) {
      setOpenError(true);
    }

    return () => {
      dispatch(clearState());
    };
  }, [isSuccess, isError, dispatch]);

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
        color="secondary"
        label="Имя"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        color="secondary"
        label="Почта"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        color="secondary"
        label="Сообщение"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" variant="outlined" color="black" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
        {isLoading ? 'Отправка...' : 'Отправить'}
      </Button>

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Сообщение отправлено!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          Ошибка отправки!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactForm;
