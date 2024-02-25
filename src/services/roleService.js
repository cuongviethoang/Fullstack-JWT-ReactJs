import axios from "../setup/axios";

const createRoles = (data) => {
    return axios.post("/api/v1/role/create", [...data]);
};

const freshAllRoles = (page, limit) => {
    return axios.get(`/api/v1/role/read`, {
        params: {
            page,
            limit,
        },
    });
};

const updateRole = (data) => {
    return axios.put(`/api/v1/role/update`, {
        data,
    });
};

const deleteRole = (role) => {
    return axios.delete(`/api/v1/role/delete`, {
        data: {
            id: role.id,
        },
    });
};

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`);
};

const assignRolesToGroup = (data) => {
    return axios.post(`/api/v1/role/assign-to-group/${data.groupId}`, {
        data,
    });
};

export {
    createRoles,
    freshAllRoles,
    updateRole,
    deleteRole,
    fetchRolesByGroup,
    assignRolesToGroup,
};
