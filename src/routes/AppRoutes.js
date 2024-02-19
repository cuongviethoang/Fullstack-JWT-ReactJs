import { Routes, Route } from "react-router-dom";
import Notfound from "../components/NotFound/Notfound";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManagerUsers/User";
import Project from "../components/Project/Project";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/">Home</Route>
                <Route
                    path="/user"
                    element={<PrivateRoutes>{<User />}</PrivateRoutes>}
                />
                <Route
                    path="/project"
                    element={<PrivateRoutes>{<Project />}</PrivateRoutes>}
                />
                <Route path="/*" element={<Notfound />}></Route>
            </Routes>
        </>
    );
};

export default AppRoutes;