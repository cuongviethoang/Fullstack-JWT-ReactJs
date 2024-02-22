import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: "",
    };

    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    const logoutContext = () => {
        setUser((user) => ({
            name: "",
            auth: false,
        }));
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        console.log(response);
        if (response && response.EC === 0) {
            let token = response.DT.access_token;
            let groupWithRoles = response.DT.groupWithRole;
            let email = response.DT.email;
            let username = response.DT.username;
            // success
            let data = {
                isLoading: false,
                isAuthenticated: true,
                token: token,
                account: {
                    groupWithRoles,
                    email,
                    username,
                },
            };
            setUser(data);
        } else {
            setUser({ ...userDefault, isLoading: false });
        }
    };

    useEffect(() => {
        if (
            window.location.pathname !== "/" ||
            window.location.pathname !== "/login"
        ) {
            fetchUser();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
