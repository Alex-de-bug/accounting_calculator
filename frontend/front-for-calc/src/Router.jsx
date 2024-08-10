import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route element={<PrivateRoute/>}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default Router;
