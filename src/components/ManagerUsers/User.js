import { useState } from "react";
import "./User.scss";
import { useEffect } from "react";
import { freshAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
const User = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        freshUsers();
    }, [currentPage]);

    const freshUsers = async () => {
        let response = await freshAllUser(currentPage, currentLimit);

        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
            console.log(response.data.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
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
                                <th scope="col">Action</th>
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
                                            <td>
                                                <button className="btn btn-warning mr-3">
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td>Not found users</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 0 && (
                    <div className="user-footer">
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
