import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { getGroups } from "../../services/userService";
import { toast } from "react-toastify";

function ModalUser(props) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [sex, setSex] = useState("");
    const [group, setGroup] = useState("");
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        fetchGetGroups();
    }, []);

    const fetchGetGroups = async () => {
        let res = await getGroups();

        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
        } else {
            toast.error(res.data.EM);
        }
    };
    return (
        <>
            <Modal {...props} show={true} size="lg" className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>{props.title}</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address (<span className="red">*</span>)
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email address"
                                id="email"
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email" className="form-label">
                                Phone number (<span className="red">*</span>)
                            </label>
                            <input
                                className={"form-control"}
                                type="text"
                                placeholder="Email address"
                                id="email"
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email" className="form-label">
                                Username
                            </label>
                            <input
                                className={"form-control"}
                                type="text"
                                placeholder="Email address"
                                id="email"
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email" className="form-label">
                                Password (<span className="red">*</span>)
                            </label>
                            <input
                                className={"form-control"}
                                type="text"
                                placeholder="Email address"
                                id="email"
                            />
                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label htmlFor="email" className="form-label">
                                Address
                            </label>
                            <input
                                className={"form-control"}
                                type="text"
                                placeholder="Email address"
                                id="email"
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email" className="form-label">
                                Sex
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label htmlFor="email" className="form-label">
                                Group(<span className="red">*</span>)
                            </label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
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
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;
