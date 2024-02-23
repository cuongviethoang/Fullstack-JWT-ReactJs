import React from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useContext } from "react";
import { UserContext } from "../../Context/userContext";

const NavHeader = (props) => {
    let location = useLocation(); // Lấy ra pathname của url

    let { user } = useContext(UserContext);

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
                                    <NavLink className="nav-link" to="/contact">
                                        Contact
                                    </NavLink>
                                    <NavLink className="nav-link" to="/about">
                                        About
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Item
                                        href="#deets"
                                        className="nav-link"
                                    >
                                        Welcome {user.account.username} !
                                    </Nav.Item>
                                    <NavDropdown
                                        title="Settings"
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item href="#action/3.1">
                                            Change Password
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
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
