import React, { useEffect } from "react";
import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid"; // dùng dể tạo ra id ngẫu nhiên

import "./Roles.scss";

function Roles() {
    const [listChilds, setListChilds] = useState({
        child1: {
            url: "",
            description: "",
        },
    });

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);

        _listChilds[key][name] = value;
        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = {
            url: "",
            description: "",
        };
        setListChilds(_listChilds);
    };

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className=" mt-3">
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
                                                className="form-control"
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
                            <button className="btn btn-warning mt-3">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roles;
