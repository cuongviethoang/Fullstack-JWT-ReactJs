import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleCreateNewAcount = () => {
        navigate("/register");
    };
    return (
        <div className="login-container">
            <div className="container ">
                <div className="row px-sm-0 px-3">
                    <div className="content-left col-12 d-none d-none col-sm-7 d-sm-block">
                        <div className="brand">Login</div>
                        <div className="detail">
                            Learning everything Learning everything Learning
                            everything Learning everything
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none brand">Login</div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Email address or phone number"
                        />
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                        />
                        <button className="btn btn-primary">Login</button>
                        <span className="text-center">
                            <a className="forgot-password" href="#">
                                Forgot your password
                            </a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={handleCreateNewAcount}
                            >
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
