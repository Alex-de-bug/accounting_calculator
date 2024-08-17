import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, useMediaQuery, useTheme, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const removeTokenFromLocalStorage = () => {
        localStorage.removeItem('token');  // Удаление токена из локального хранилища
    };

    const hasToken = !!localStorage.getItem('token');  // Проверка наличия токена в локальном хранилище

    const NAV_ITEMS = [
        { label: 'Главная', href: '/' },
        { label: 'Вход', href: '/login' },
        { label: 'Регистрация', href: '/reg' },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginRight: isSmallScreen ? 0 : 'auto',
                            marginLeft: isSmallScreen ? 0 : 'auto',
                        }}
                    >
                        {hasToken ? 'Режим администратора' : 'ИП ЖУКОВ ВАДИМ АЛЕКСАНДРОВИЧ'}
                    </Typography>
                    {isSmallScreen ? (
                        <>
                            <Button
                                aria-controls="menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                variant="contained" color="success"
                            >
                                Меню
                            </Button>
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {hasToken ? (
                                    <>
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/edit" className="linkRR">
                                                Редактирование
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/calc" className="linkRR">
                                                Калькулятор
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleClose(); removeTokenFromLocalStorage(); }}>
                                            <Link to="/" className="linkRR">
                                                Выход
                                            </Link>
                                        </MenuItem>
                                    </>
                                ) : (
                                    NAV_ITEMS.map((navItem) => (
                                        <MenuItem key={navItem.label} onClick={handleClose}>
                                            <Link to={navItem.href} className="linkRR">
                                                {navItem.label}
                                            </Link>
                                        </MenuItem>
                                    ))
                                )}
                            </Menu>
                        </>
                    ) : (
                        hasToken ? (
                            <Box>
                                <Button key="Редактирование" color="inherit" component={Link} to="/edit">
                                    Редактирование
                                </Button>
                                <Button key="Калькулятор" color="inherit" component={Link} to="/calc">
                                    Калькулятор
                                </Button>
                                <Button onClick={() => { handleClose(); removeTokenFromLocalStorage(); }} key="Выход" color="inherit" component={Link} to="/">
                                    Выход
                                </Button>
                            </Box>
                        ) : (
                            NAV_ITEMS.map((navItem) => (
                                <Button key={navItem.label} color="inherit" component={Link} to={navItem.href}>
                                    {navItem.label}
                                </Button>
                            ))
                        )
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
