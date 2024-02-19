import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = () => {
    const navigate = useNavigate();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
    const handleCreateNewAcount = () => {
        navigate("/register");
    };

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidValueLogin: false,
            });
            toast.error("Please enter your email or phone number ");
            return;
        }
        if (!password) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidPassword: false,
            });
            toast.error("Please enter your password");
            return;
        }

        let response = await loginUser(valueLogin, password);

        if (response && response.data && +response.data.EC === 0) {
            // success
            let data = {
                isAuthenticated: true,
                token: "fake token",
            };
            sessionStorage.setItem("account", JSON.stringify(data));
            navigate("/user");
            window.location.reload();
        }

        if (response && response.data && +response.data.EC !== 0) {
            // error
            toast.error(response.data.EM);
        }
    };

    const handlePressEnter = (e) => {
        if (e.keyCode === 13 && e.code === "Enter") {
            handleLogin();
        }
    };

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            navigate("/");
        }
    }, []);

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
                            className={
                                objValidInput.isValidValueLogin
                                    ? "form-control"
                                    : "form-control is-invalid"
                            }
                            type="text"
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <input
                            className={
                                objValidInput.isValidPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                            }
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handlePressEnter(e)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
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
