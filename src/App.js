import { BrowserRouter as Router } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rings } from "react-loader-spinner";

import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const { user } = useContext(UserContext);
    return (
        <>
            <Router>
                {user && user.isLoading ? (
                    <div className="loading-container">
                        <Rings
                            height="80"
                            width="80"
                            radius="9"
                            color="#1877f2"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />
                        <div>Loading data...</div>
                    </div>
                ) : (
                    <>
                        <div className="app-header">
                            <NavHeader />
                        </div>
                        <div className="app-container">
                            <AppRoutes />
                        </div>
                    </>
                )}

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
