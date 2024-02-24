import React from "react";
import { useState, useEffect } from "react";
import { getGroups } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

import { freshAllRoles, fetchRolesByGroup } from "../../services/roleService";

import "./GroupRole.scss";

function GroupRole() {
    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);

    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => {
        fetchGetGroups();
        getAllRoles();
    }, []);

    const fetchGetGroups = async () => {
        let res = await getGroups();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
        } else {
            toast.error(res?.EM);
        }
    };

    const getAllRoles = async () => {
        let response = await freshAllRoles();
        if (response && +response.EC === 0) {
            setListRoles(response.DT);
        } else {
            toast.error(response?.EM);
        }
    };

    const handleOnChangGroup = async (value) => {
        if (value) {
            setSelectGroup(value);
            let response = await fetchRolesByGroup(value);
            if (response && +response.EC === 0) {
                let result = buildDataRolesByGroup(
                    response.DT.Roles,
                    listRoles
                );
                setAssignRolesByGroup(result);
            } else {
                toast.error(response?.EM);
            }
        }
    };

    // setup các mảng trả về nếu role của group trùng trong tất cả role thì input sẽ được tích vào
    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map((role) => {
                let object = {};
                object.url = role.url;
                object.id = role.id;
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(
                        (item) => item.url === object.url
                    );
                }
                result.push(object);
            });
        }
        return result;
    };

    // thay đổi dữ liệu trong input check
    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _.findIndex(
            _assignRolesByGroup,
            (item) => +item.id === +value
        );
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned =
                !_assignRolesByGroup[foundIndex].isAssigned;
            setAssignRolesByGroup(_assignRolesByGroup);
        }
    };

    return (
        <div className="group-role-container">
            <div className="container">
                <div className="mt-3">
                    <h4>Group Role</h4>

                    <div className="assign-group-role">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="group" className="form-label">
                                Select Group:(<span className="red">*</span>)
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) =>
                                    handleOnChangGroup(e.target.value)
                                }
                            >
                                <option value="">
                                    Please select your group
                                </option>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option
                                                key={`group-${index}`}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <hr />
                        {selectGroup && (
                            <div className="roles">
                                <h4>Assign Roles:</h4>
                                {assignRolesByGroup &&
                                    assignRolesByGroup.length > 0 &&
                                    assignRolesByGroup.map((item, index) => (
                                        <div
                                            className="form-check"
                                            key={`role-${index}`}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={item.id}
                                                id={`role-${index}`}
                                                checked={item.isAssigned}
                                                onChange={(e) =>
                                                    handleSelectRole(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`role-${index}`}
                                            >
                                                {item.url}
                                            </label>
                                        </div>
                                    ))}
                                <div className="mt-3">
                                    <button className="btn btn-warning">
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupRole;
