import axios from "../setup/axios";

const createRoles = (data) => {
    return axios.post("/api/v1/role/create", [...data]);
};

const freshAllRoles = () => {
    return axios.get(`/api/v1/role/read`);
};

const deleteRole = (role) => {
    return axios.delete(`/api/v1/role/delete`, {
        data: {
            id: role.id,
        },
    });
};

export { createRoles, freshAllRoles, deleteRole };
