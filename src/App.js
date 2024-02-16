import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "./components/NotFound/Notfound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
function App() {
    return (
        <Router>
            <div className="app-container">
                {/* <Nav /> */}
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>

                    <Route path="/about">About</Route>
                    <Route path="/news">News</Route>
                    <Route path="/contact">Contact</Route>
                    <Route path="/">Home</Route>
                    <Route path="/*" element={<Notfound />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
