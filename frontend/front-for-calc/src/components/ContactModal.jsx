import React, { useState } from "react";
import { Box, Button, Modal, Typography, Link, Snackbar } from "@mui/material";

const ContactModal = () => {
  const [open, setOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCopyEmail = () => {
    const email = "support@zhukov-finance.ru";
    navigator.clipboard.writeText(email).then(() => {
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000);
    });
  };

  return (
    <div>
      <Box
        sx={{
          pb: 20,
        }}
      >
        <Box textAlign="center" mt={4}>
          <Button
            onClick={handleOpen}
            sx={{ fontSize: 16, fontFamily: "MyFont", fontWeight: "Bold" }}
            variant="outlined"
            color="black"
            size="large"
          >
            Свяжитесь с нами
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography id="contact-modal-title" variant="h6" component="h2">
              Контактная информация
            </Typography>
            <Box id="contact-modal-description" mt={2}>
              <Button
                component={Link}
                href="tel:89101666277"
                sx={{ marginBottom: 1 }}
                variant="outlined"
                fullWidth
                color="black"
              >
                8-910-16-66-277
              </Button>
              <Button
                onClick={handleCopyEmail}
                sx={{ marginBottom: 1 }}
                variant="outlined"
                fullWidth
                color="black"
              >
                Email
              </Button>
              <Button
                component={Link}
                href="https://t.me/konsultant20"
                sx={{ marginBottom: 1 }}
                variant="outlined"
                fullWidth
                color="black"
              >
                Telegram
              </Button>
            </Box>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Закрыть
            </Button>
          </Box>
        </Modal>

        <Snackbar
          open={snackbarOpen}
          message="Email скопирован в буфер обмена"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </div>
  );
};

export default ContactModal;
