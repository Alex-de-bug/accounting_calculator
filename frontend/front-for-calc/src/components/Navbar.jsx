import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  useMediaQuery,
  Box,
  Dialog,
  DialogContent,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
  };

  const hasToken = !!localStorage.getItem("token");

  const NAV_ITEMS = [
    { label: "Главная", href: "/" },
    { label: "Вход", href: "/login" },
    { label: "Регистрация", href: "/reg" },
  ];

  return (
    <Box sx={{ flexGrow: 1, mb: "30px" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isScrolled ? "#eff0e9" : "rgba(255, 255, 255, 0.3)", // добавлено rgba для прозрачности
          boxShadow: "none",
          borderBottom: "1.5px solid black",
          left: 0,
          right: 0,
          margin: "auto",
          overflow: "hidden",
          transition: "background-color 0.3s ease",
          backdropFilter: "blur(0.01px)", // добавлено свойство blur
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              width: "100%",
              color: isScrolled ? "black" : "black",
              fontFamily: '"Brush Script MT"',
              fontSize: isSmallScreen ? 19 : 28,
            }}
          >
            {hasToken ? "Режим администратора" : "Zhukov Finance"}
          </Typography>
          {isSmallScreen ? (
            <>
              <Button
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                variant="outlined"
                color="black"
                sx={{
                  fontSize: 12,
                  marginLeft: "auto",
                }}
              >
                <MenuIcon />
              </Button>

              <Dialog
                fullScreen
                open={menuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { backgroundColor: "#eff0e9", padding: "20px" },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleMenuClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <DialogContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  {hasToken ? (
                    <>
                      <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                          fontFamily: '"Dancing Script", cursive',
                          fontSize: "24px",
                          color: "#333",
                          padding: "16px 24px",
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        <Link
                          to="/edit"
                          className="linkRR"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Редактирование
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                          fontFamily: '"Dancing Script", cursive',
                          fontSize: "24px",
                          color: "#333",
                          padding: "16px 24px",
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        <Link
                          to="/calc"
                          className="linkRR"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Калькулятор
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          removeTokenFromLocalStorage();
                        }}
                        sx={{
                          fontFamily: '"Dancing Script", cursive',
                          fontSize: "24px",
                          color: "#333",
                          padding: "16px 24px",
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        <Link
                          to="/"
                          className="linkRR"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Выход
                        </Link>
                      </MenuItem>
                    </>
                  ) : (
                    NAV_ITEMS.map((navItem) => (
                      <MenuItem
                        key={navItem.label}
                        onClick={handleMenuClose}
                        sx={{
                          fontFamily: '"Dancing Script", cursive',
                          fontSize: "24px",
                          color: "#333",
                          padding: "16px 24px",
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        <Link
                          to={navItem.href}
                          className="linkRR"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {navItem.label}
                        </Link>
                      </MenuItem>
                    ))
                  )}
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div style={{ marginLeft: "auto" }}>
              {hasToken ? (
                <Box
                  sx={{
                    display: "flex", // Включаем Flexbox
                    flexDirection: "row", // Горизонтальное направление
                    gap: "10px", // Расстояние между кнопками, можно изменить по необходимости
                  }}
                >
                  <Button
                    key="Редактирование"
                    color="inherit"
                    component={Link}
                    to="/edit"
                  >
                    Редактирование
                  </Button>
                  <Button
                    key="Калькулятор"
                    color="inherit"
                    component={Link}
                    to="/calc"
                  >
                    Калькулятор
                  </Button>
                  <Button
                    onClick={() => {
                      handleMenuClose();
                      removeTokenFromLocalStorage();
                    }}
                    key="Выход"
                    color="inherit"
                    component={Link}
                    to="/"
                  >
                    Выход
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex", // Включаем Flexbox
                    flexDirection: "row", // Горизонтальное направление
                    gap: "10px", // Расстояние между кнопками
                  }}
                >
                  {NAV_ITEMS.map((navItem) => (
                    <Button
                      key={navItem.label}
                      color="inherit"
                      component={Link}
                      to={navItem.href}
                    >
                      {navItem.label}
                    </Button>
                  ))}
                </Box>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
