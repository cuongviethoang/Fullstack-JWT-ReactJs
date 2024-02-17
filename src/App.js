import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "./components/NotFound/Notfound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import User from "./components/ManagerUsers/User";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import _ from "lodash";

function App() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);
    return (
        <Router>
            <div className="app-container">
                {account && !_.isEmpty(account) && account.isAuthenticated && (
                    <Nav />
                )}

                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/user" element={<User />}></Route>
                    <Route path="/about">About</Route>
                    <Route path="/news">News</Route>
                    <Route path="/contact">Contact</Route>
                    <Route path="/">Home</Route>
                    <Route path="/*" element={<Notfound />}></Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
}

export default App;
