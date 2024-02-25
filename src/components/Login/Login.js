import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import "./Login.scss";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = () => {
    const { user, loginContext } = useContext(UserContext);
    const navigate = useNavigate();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    useEffect(() => {
        if (user && user.isAuthenticated === true) {
            navigate("/");
        }
    }, []);

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

        if (response && +response.EC === 0) {
            let token = response.DT.access_token;
            let groupWithRoles = response.DT.groupWithRole;
            let email = response.DT.email;
            let username = response.DT.username;
            // success
            let data = {
                isAuthenticated: true,
                token: token,
                account: {
                    groupWithRoles,
                    email,
                    username,
                },
            };

            localStorage.setItem("jwt", token);
            loginContext(data);
            navigate("/user");
        }

        if (response && +response.EC !== 0) {
            // error
            toast.error(response.EM);
        }
    };

    const handlePressEnter = (e) => {
        if (e.keyCode === 13 && e.code === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="container ">
                <div className="row px-sm-0 px-3">
                    <div className="content-left col-12 d-none d-none col-sm-5  d-sm-flex justify-content-center align-items-center">
                        <div className="brand">Login</div>
                    </div>
                    <div className="content-right col-12 col-sm-7 d-flex flex-column gap-3 py-3">
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
                        <Link to="/" className="text-center">
                            Return to home page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
