import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, loginSelector, clearState } from '../store/slices/LoginSlice';
import { Typography, Container, Box, TextField, Button, Snackbar, Alert, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import "../styles/styles.css"; 

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(loginSelector);
  const [openError, setOpenError] = React.useState(false);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const navigateToHome = () => {
    navigate('/edit');
  };

  useEffect(() => {
    if (isError) {
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
        dispatch(clearState());
      }, 3000);
    }

    if (isSuccess) {
      dispatch(clearState());
      navigateToHome();
    }
  }, [isError, isSuccess, dispatch, navigate]);

  return (
      <div>
        <Navbar />
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh" 
          >
            <Typography variant="h4" gutterBottom className="gradient-text">
              Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                  label="Логин"
                  name="name"
                  {...register('name', { required: true })}
                  required
                  fullWidth
                  margin="normal"
                  color="secondary"
              />
              <TextField
                  label="Пароль"
                  type="password"
                  name="password"
                  {...register('password', { required: true })}
                  required
                  fullWidth
                  margin="normal"
                  color="secondary"
              />
              <Button
                variant="outlined"
                type="submit"
                disabled={isFetching}
                className="gradient-text"
                style={{ marginTop: '16px' }} 
                color="secondary"
              >
                {isFetching ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </Box>
          <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
            <Alert severity="error" onClose={() => setOpenError(false)}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Container>
      </div>
  );
}

export default Login;

