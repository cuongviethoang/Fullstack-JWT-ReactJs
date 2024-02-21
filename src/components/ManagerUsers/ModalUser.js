import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import {
    getGroups,
    createNewUser,
    updateCurrentUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

function ModalUser(props) {
    const [userGroups, setUserGroups] = useState([]);

    const { action, datamodaluser } = props;

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    };

    const defaultUserData = {
        email: "",
        phone: "",
        username: "",
        password: "",
        address: "",
        sex: "",
        group: "",
    };
    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    useEffect(() => {
        fetchGetGroups();
    }, []);

    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({
                ...datamodaluser,
                sex: datamodaluser.sex,
                group: datamodaluser.Group ? datamodaluser.Group.id : "",
            });
        }
    }, [datamodaluser]);

    useEffect(() => {
        if (action === "CREATE") {
            if (userGroups && userGroups.length > 0) {
                setUserData({
                    ...userData,
                    group: userGroups[0].id,
                    sex: "Male",
                });
            }
        }
    }, [action]);

    // call api get all group (dev , customer, leader)
    const fetchGetGroups = async () => {
        let res = await getGroups();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id, sex: "Male" });
            }
        } else {
            toast.error(res.data.EM);
        }
    };

    // close modal create-edit
    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    };

    // replace value input
    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValidInputs = () => {
        if (action === "UPDATE") return true;

        setValidInputs(validInputsDefault);
        let arr = ["email", "phone", "password", "group"];
        let check = true;

        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };

    // confirm create new user
    const handleConfirmUser = async () => {
        let check = checkValidInputs();

        if (check === true) {
            let res =
                action === "CREATE"
                    ? await createNewUser({
                          ...userData,
                          groupId: userData.group,
                      })
                    : await updateCurrentUser({
                          ...userData,
                          groupId: userData.group,
                      });
            if (res && res.data && res.data.EC === 0) {
                setUserData({
                    ...defaultUserData,
                    group:
                        userGroups && userGroups.length > 0
                            ? userGroups[0].id
                            : "",
                    sex: "Male",
                });
                props.onHide();
                toast.info(res.data.EM);
            } else if (res.data && res.data.EC !== 0) {
                toast.error(res.data.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.data.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    return (
        <>
            <Modal
                {...props}
                show={props.show}
                size="lg"
                className="modal-user"
                onHide={() => handleCloseModalUser()}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>
                            {props.action === "CREATE"
                                ? "Create new user"
                                : "Edit a user"}
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address (<span className="red">*</span>)
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={
                                    validInputs.email
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="text"
                                placeholder="Email address"
                                id="email"
                                value={userData.email}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "email")
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="phone" className="form-label">
                                Phone number (<span className="red">*</span>)
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={
                                    validInputs.phone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="text"
                                placeholder="Phone number"
                                id="phone"
                                value={userData.phone}
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "phone")
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter username ..."
                                id="username"
                                value={userData.username}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "username"
                                    )
                                }
                            />
                        </div>
                        {action === "CREATE" && (
                            <div className="col-12 col-sm-6 form-group">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password (<span className="red">*</span>)
                                </label>
                                <input
                                    className={
                                        validInputs.password
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    type="text"
                                    placeholder="Enter password"
                                    id="password"
                                    value={userData.password}
                                    onChange={(e) =>
                                        handleOnChangeInput(
                                            e.target.value,
                                            "password"
                                        )
                                    }
                                />
                            </div>
                        )}
                        <div className="col-12 col-sm-12 form-group">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email address"
                                id="address"
                                value={userData.address}
                                onChange={(e) =>
                                    handleOnChangeInput(
                                        e.target.value,
                                        "address"
                                    )
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="sex" className="form-label">
                                Sex
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "sex")
                                }
                                value={userData.sex}
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="group" className="form-label">
                                Group(<span className="red">*</span>)
                            </label>
                            <select
                                className={
                                    validInputs.group
                                        ? "form-select"
                                        : "form-select is-invalid"
                                }
                                aria-label="Default select example"
                                onChange={(e) =>
                                    handleOnChangeInput(e.target.value, "group")
                                }
                                value={userData.group}
                            >
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onHide={() => handleCloseModalUser}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleConfirmUser()}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;
