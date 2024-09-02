import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser, signupSelector, clearState } from '../store/slices/SignUpSlice';
import Navbar from '../components/Navbar';
import {Button, Typography, Container, Box, Snackbar, Alert, TextField} from '@mui/material';
import "../styles/styles.css"; 

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(signupSelector);
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        key: '',
    });
    const [openError, setOpenError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
        } catch (error) {
            console.log('Error submitting form: ' + error.message);
        }
    };

    const onSubmit = (data) => {
        dispatch(signupUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

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
            navigate('/login');
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
                        Регистрация
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Логин"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            color="secondary"
                        />
                        <TextField
                            label="Пароль"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            color="secondary"
                            InputProps={{
                                endAdornment: (
                                <Button type="button" color="secondary" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                                ),
                            }}
                            />
                        <TextField
                            label="Код регистрации"
                            type= "text"
                            name= "key"
                            value={formData.key}
                            onChange={handleChange}
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
                            {isFetching ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>
                    </form>
                    <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
                        <Alert severity="error" >
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </div>
    );
}

export default Signup;

