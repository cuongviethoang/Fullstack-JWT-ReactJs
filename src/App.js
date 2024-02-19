import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/Navigation/Nav";
import "./App.scss";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);
    return (
        <>
            <Router>
                <div className="app-header">
                    <Nav />
                </div>
                <div className="app-container">
                    <AppRoutes />
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
        </>
    );
}

export default App;
