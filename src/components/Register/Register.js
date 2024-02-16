import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
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
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                id="password"
                                className="form-control"
                                type="password"
                                placeholder="Password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="re-password" className="form-label">
                                Re-enter password
                            </label>
                            <input
                                id="re-password"
                                className="form-control"
                                type="password"
                                placeholder="Password"
                            />
                        </div>

                        <button className="btn btn-primary">Sign up</button>

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
