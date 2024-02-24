import React, { useRef } from "react";
import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid"; // dùng dể tạo ra id ngẫu nhiên
import { toast } from "react-toastify";

import "./Roles.scss";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";

function Roles() {
    const roleRef = useRef();
    const dataChildDefault = {
        url: "",
        description: "",
        isValidUrl: true,
    };
    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault,
    });

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);

        _listChilds[key][name] = value;

        if (value.trim() && name === "url") {
            _listChilds[key]["isValidUrl"] = true;
        }
        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    };

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key, value], index) => {
            return result.push({
                url: value.url,
                description: value.description,
            });
        });
        return result;
    };

    const handleSaveRoles = async () => {
        let invalidObj = Object.entries(listChilds).find(
            ([key, value], index) => {
                return value && !value.url.trim();
            }
        );
        if (!invalidObj) {
            let data = buildDataToPersist();
            let response = await createRoles(data);
            if (response && +response.EC === 0) {
                toast.success(response.EM);
                roleRef.current.fetchListRolesAgain();
            } else {
                toast.warning(response?.EM);
            }
        } else {
            toast.error("Input url must not be empty");
            const key = invalidObj[0];
            let _listChilds = _.cloneDeep(listChilds);
            _listChilds[key]["isValidUrl"] = false;
            setListChilds(_listChilds);
        }
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="adding-role mt-3">
                    <div className="title-role">
                        <h3>Add a new role....</h3>
                    </div>
                    <div className=" role-parent">
                        {Object.entries(listChilds).map(
                            ([key, value], index) => {
                                return (
                                    <div
                                        className={`row role-child ${key}`}
                                        key={`child-${key}`}
                                    >
                                        <div className="col-5 form-group">
                                            <label>URL:</label>
                                            <input
                                                title="text"
                                                className={
                                                    value.isValidUrl
                                                        ? "form-control"
                                                        : "form-control is-invalid"
                                                }
                                                value={value.url}
                                                onChange={(e) =>
                                                    handleOnchangeInput(
                                                        "url",
                                                        e.target.value,
                                                        key
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-5 form-group">
                                            <label>Desc:</label>
                                            <input
                                                title="text"
                                                className="form-control"
                                                value={value.description}
                                                onChange={(e) =>
                                                    handleOnchangeInput(
                                                        "description",
                                                        e.target.value,
                                                        key
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-2 mt-4">
                                            <i
                                                className="fa fa-plus-circle custom-icon"
                                                onClick={() =>
                                                    handleAddNewInput()
                                                }
                                            ></i>
                                            {index >= 1 && (
                                                <i
                                                    className="fa fa-trash-o custom-icon"
                                                    onClick={() =>
                                                        handleDeleteInput(key)
                                                    }
                                                ></i>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        )}

                        <div className="">
                            <button
                                className="btn btn-warning mt-3"
                                onClick={() => handleSaveRoles()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mt-3">
                    <h4>List Roles:</h4>
                    <TableRole ref={roleRef} />
                </div>
            </div>
        </div>
    );
}

export default Roles;
