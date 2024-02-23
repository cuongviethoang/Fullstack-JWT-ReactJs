// import axios from "axios";
import axios from "../setup/axios";

const registerNewUser = (email, phone, username, password) => {
    return axios.post("/api/v1/register", {
        email,
        phone,
        username,
        password,
    });
};

const loginUser = (valueLogin, password) => {
    return axios.post("/api/v1/login", {
        valueLogin,
        password,
    });
};

const logoutUser = () => {
    return axios.post("/api/v1/logout");
};

const freshAllUser = (page, limit) => {
    return axios.get(`/api/v1/user/read`, {
        params: {
            page,
            limit,
        },
    });
};

const deleteUser = (user) => {
    return axios.delete("/api/v1/user/delete", {
        data: {
            id: user.id,
        },
    });
};

const getGroups = () => {
    return axios.get("/api/v1/group/read");
};

const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", {
        ...userData,
    });
};

const updateCurrentUser = (userData) => {
    return axios.put("/api/v1/user/update", {
        ...userData,
    });
};

const getUserAccount = () => {
    return axios.get("/api/v1/account");
};

export {
    registerNewUser,
    loginUser,
    logoutUser,
    freshAllUser,
    deleteUser,
    getGroups,
    createNewUser,
    updateCurrentUser,
    getUserAccount,
};
