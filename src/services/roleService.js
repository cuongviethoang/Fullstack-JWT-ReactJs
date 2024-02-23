import axios from "../setup/axios";

const createRoles = (data) => {
    return axios.post("/api/v1/role/create", [...data]);
};

export { createRoles };
