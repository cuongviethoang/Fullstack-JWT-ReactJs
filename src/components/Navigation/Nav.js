import React from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../Context/userContext";

const Nav = (props) => {
    let location = useLocation(); // Lấy ra pathname của url

    let { user } = useContext(UserContext);

    if ((user && user.isAuthenticated) || location.pathname === "/") {
        return (
            <>
                <div className="topnav">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>
                    <NavLink to="/user">User</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default Nav;
