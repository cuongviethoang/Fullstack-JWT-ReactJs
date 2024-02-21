import { useState, useEffect } from "react";
import "./User.scss";
import { freshAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const User = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    // modal delete
    const [dataModal, setDataModal] = useState({});

    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");

    // modal update
    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        freshUsers();
    }, [currentPage]);

    // call api paginate user
    const freshUsers = async () => {
        let response = await freshAllUser(currentPage, currentLimit);

        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    // show modal delete
    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    };

    // show modal create - edit
    const handleCreateUser = () => {
        setActionModalUser("CREATE");
        setIsShowModalUser(true);
    };

    // show modal edit - create
    const handleEditUser = (user) => {
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true);
    };

    // close modal delete
    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    };

    // close modal create - edit
    const handleCloseModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await freshUsers();
    };

    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModal);
        if (res && res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            await freshUsers();
            setIsShowModalDelete(false);
            setDataModal({});
        } else {
            toast.error(res.data.EM);
        }
    };

    const handleRefresh = async () => {
        await freshUsers();
    };

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header my-3">
                        <div className="title">
                            <h3>Manager user</h3>
                        </div>
                        <div className="action">
                            <button
                                className="btn btn-success me-3"
                                onClick={() => handleRefresh()}
                            >
                                <i class="fa fa-refresh"></i>
                                Refresh
                            </button>
                            <button
                                className="btn btn-info"
                                onClick={handleCreateUser}
                            >
                                <i class="fa fa-plus"></i>
                                Add new user
                            </button>
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
                                                <td>
                                                    {(currentPage - 1) *
                                                        currentLimit +
                                                        index +
                                                        1}
                                                </td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>
                                                    {item.Group
                                                        ? item.Group.name
                                                        : ""}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning me-3"
                                                        onClick={() =>
                                                            handleEditUser(item)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                item
                                                            )
                                                        }
                                                    >
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
                        <div className="user-footer d-flex justify-content-center">
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
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                show={isShowModalUser}
                onHide={handleCloseModalUser}
                action={actionModalUser}
                datamodaluser={dataModalUser}
            />
        </>
    );
};

export default User;
