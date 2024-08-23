import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import EditConst from "./pages/EditConst.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Calc from "./pages/Calc.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Main from "./pages/Main.jsx";

function Router() {
    const location = useLocation();

    useEffect(() => {
        const body = document.body;

        if (location.pathname === '/') {
            body.className = 'home-page';
        } else {
            body.className = '';
        }
    }, [location]);

    return (
        <Routes>
            <Route path="/calc" element={<Calc />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<SignUp />} />
            <Route path="/" element={<Main />} />
            <Route element={<PrivateRoute/>}>
                <Route path="/edit" element={<EditConst />} />
            </Route>
        </Routes>
    );
}

export default Router;
