import { Routes, Route } from "react-router-dom";
import EditConst from "./pages/EditConst.jsx"
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Calc from "./pages/Calc.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function Router() {
    return (
        <Routes>
            <Route path="/calc" element={<Calc />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<SignUp />} />
            <Route element={<PrivateRoute/>}>
                <Route path="/edit" element={<EditConst />} />
            </Route>
        </Routes>
    );
}

export default Router;
