import React from "react";
import "./Nav.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy ra pathname của url

    const { user, logoutContext } = useContext(UserContext);

    const handleLogoutUser = async () => {
        console.log("Logout");
        let response = await logoutUser();
        if (response && +response.EC === 0) {
            localStorage.removeItem("jwt");
            logoutContext();
            toast.info(response.DT);
            navigate("/login");
        } else {
            toast.error(response.EM);
        }
    };

    if ((user && user.isAuthenticated) || location.pathname === "/") {
        return (
            <>
                <div className="nav-header">
                    <Navbar
                        bg="dark"
                        data-bs-theme="dark"
                        expand="lg"
                        className="bg-body-tertiary"
                    >
                        <Container>
                            <Navbar.Brand href="#home">
                                React-Bootstrap
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">
                                        Home
                                    </NavLink>
                                    <NavLink className="nav-link" to="/user">
                                        User
                                    </NavLink>
                                    <NavLink className="nav-link" to="/roles">
                                        Roles
                                    </NavLink>
                                    <NavLink
                                        className="nav-link"
                                        to="/group-role"
                                    >
                                        GroupRoles
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated ? (
                                        <>
                                            <Nav.Item
                                                href="#deets"
                                                className="nav-link"
                                            >
                                                Welcome{" "}
                                                {user?.account?.username} !
                                            </Nav.Item>
                                            <NavDropdown
                                                title="Settings"
                                                id="basic-nav-dropdown"
                                            >
                                                <NavDropdown.Item>
                                                    Change Password
                                                </NavDropdown.Item>

                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span
                                                        onClick={() =>
                                                            handleLogoutUser()
                                                        }
                                                    >
                                                        Logout
                                                    </span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                    ) : (
                                        <NavLink
                                            to="/login"
                                            exact
                                            className="nav-link"
                                        >
                                            Login
                                        </NavLink>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default NavHeader;
