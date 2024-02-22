import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

const Nav = (props) => {
    let location = useLocation();
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        let session = sessionStorage.getItem("account");

        if (
            (location.pathname === "/login" ||
                location.pathname === "/Login" ||
                location.pathname === "/register") &&
            !session
        ) {
            setIsShow(false);
        } else {
            setIsShow(true);
        }
    }, []);
    return (
        <>
            {isShow === true && (
                <div className="topnav">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>
                    <NavLink to="/user">User</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            )}
        </>
    );
};

export default Nav;
