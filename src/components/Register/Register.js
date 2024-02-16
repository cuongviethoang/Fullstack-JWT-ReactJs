import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        // axios.get("http://localhost:8080/api/test-api").then((data) => {
        //     console.log(">> check data: ", data);
        // });
    }, []);

    const isValidInputs = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Your password is not the same");
            return false;
        }

        return true;
    };

    const handleRegister = () => {
        let check = isValidInputs();
        let userData = { email, username, phone, password };
    };

    return (
        <div className="register-container">
            <div className="container ">
                <div className="row px-sm-0 px-3">
                    <div className="content-left col-12 d-none d-none col-sm-7 d-sm-block">
                        <div className="brand">Register</div>
                        <div className="detail">
                            Learning everything Learning everything Learning
                            everything Learning everything
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none brand">Login</div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email address"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">
                                Phone number
                            </label>
                            <input
                                id="phone"
                                className="form-control"
                                type="text"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                id="username"
                                className="form-control"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                id="password"
                                className="form-control"
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="re-password" className="form-label">
                                Re-enter password
                            </label>
                            <input
                                id="re-password"
                                className="form-control"
                                type="text"
                                placeholder="Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleRegister}
                        >
                            Sign up
                        </button>

                        <hr />
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={handleLogin}
                            >
                                Already-ve an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
