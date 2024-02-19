import { useState } from "react";
import "./User.scss";
import { useEffect } from "react";
import { freshAllUser } from "../../services/userService";
const User = (props) => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        freshUsers();
    }, []);

    const freshUsers = async () => {
        let response = await freshAllUser();
        console.log(response);

        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT);
            console.log(response.data.DT);
        }
    };
    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table user</h3>
                    </div>
                    <div className="action">
                        <button className="btn btn-success">Refresh</button>
                        <button className="btn btn-info">Add new user</button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ? (
                                <>
                                    {listUsers.map((item, index) => (
                                        <tr key={`row-${index}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                {item.Group
                                                    ? item.Group.name
                                                    : ""}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <span>Not found users</span>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="user-footer">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    Previous
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default User;
