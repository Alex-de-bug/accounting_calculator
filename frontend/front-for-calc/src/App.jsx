import { BrowserRouter } from "react-router-dom";
import Router from "./Router.jsx";
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme.js';
import CssBaseline from '@mui/material/CssBaseline';



export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}
