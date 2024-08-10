import "../styles/NavigationBar.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import "../styles/styles.css"; 

function removeTokenFromLocalStorage() {
    localStorage.removeItem('token');
    window.location.reload();
}

export default function WithSubnavigation() {
    const token = localStorage.getItem('token');
    return (
        <DesktopNav hasToken={!!token} />
    );
}

const DesktopNav = ({ hasToken }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderNavigation = () => {
        const appBarStyle = {
            backgroundColor: '#333', 
            color: 'white' 
        };

        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className="top-text" variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            {hasToken ? 'Режим администратора' : 'Бухгалтерия Жуковых'}
                        </Typography>
                        <Button
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            className="gradient-text"
                            variant="outlined"
                            color="secondary"
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
                                        <Link to="/home" className="linkRR">
                                            Редактирование
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/" className="linkRR">
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
                    </Toolbar>
                </AppBar>
            </Box>
        );
    };

    return renderNavigation();
};

const NAV_ITEMS = [
    {
        label: "Калькулятор",
        href: "/"
    },
    {
        label: "Вход",
        href: "/login"
    },
    {
        label: "Регистрация",
        href: "/signUp"
    }
];