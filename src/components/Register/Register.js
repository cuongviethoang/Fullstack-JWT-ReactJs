import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context/userContext";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";
const Register = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [hiddenPassword, setHiddenPassword] = useState(false);

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    useEffect(() => {
        if (user && user.isAuthenticated) {
            navigate("/");
        }
    }, []);

    const handleLogin = () => {
        navigate("/login");
    };

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        if (!email) {
            toast.error("Email is required");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Your password is not the same");
            setObjCheckInput({
                ...defaultValidInput,
                isValidConfirmPassword: false,
            });
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();

        if (check) {
            let response = await registerNewUser(
                email,
                phone,
                username,
                password
            );

            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate("/login");
            } else {
                toast.error(serverData.EM);
            }
        }
    };

    return (
        <div className="register-container">
            <div className="container ">
                <div className="row px-sm-0 px-3">
                    <div className="content-left col-12 d-none d-none col-sm-5 d-sm-flex justify-content-center align-items-center">
                        <div className="brand">Register</div>
                    </div>
                    <div className="content-right col-12 col-sm-7 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none brand">Login</div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                className={
                                    objCheckInput.isValidEmail
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
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
                                className={
                                    objCheckInput.isValidPhone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
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
                                className={
                                    objCheckInput.isValidPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type={hiddenPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <i
                                className={
                                    hiddenPassword
                                        ? "fa fa-eye icon-eye"
                                        : "fa fa-eye-slash icon-eye"
                                }
                                onClick={() =>
                                    setHiddenPassword(!hiddenPassword)
                                }
                            ></i>
                        </div>

                        <div className="form-group">
                            <label htmlFor="re-password" className="form-label">
                                Re-enter password
                            </label>
                            <input
                                id="re-password"
                                className={
                                    objCheckInput.isValidConfirmPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
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
                        <Link to="/" className="text-center">
                            Return to homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
