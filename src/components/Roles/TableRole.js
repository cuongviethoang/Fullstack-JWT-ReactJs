import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
} from "react";
import ReactPaginate from "react-paginate";
import { freshAllRoles, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getAllRoles();
    }, [currentPage]);

    const getAllRoles = async () => {
        let response = await freshAllRoles(currentPage, currentLimit);
        if (response && +response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListRoles(response.DT.roles);
        } else {
            toast.error(response?.EM);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleEditRole = (role) => {
        props.onEditClick(role);
    };

    const handleDeleteRole = async (role) => {
        let response = await deleteRole(role);
        if (response && +response.EC === 0) {
            toast.success(response?.EM);
            await getAllRoles();
        } else {
            toast.error(response?.EM);
        }
    };

    useImperativeHandle(ref, () => ({
        fetchListRolesAgain() {
            getAllRoles();
        },
    }));

    return (
        <>
            <div className="overflow-auto">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Url</th>
                            <th scope="col">Desc</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {listRoles && listRoles.length > 0 ? (
                            <>
                                {listRoles.map((item, index) => (
                                    <tr key={`row-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>

                                        <td className="d-flex justify-content-center ">
                                            <button
                                                className="btn btn-warning me-3"
                                                onClick={() =>
                                                    handleEditRole(item)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDeleteRole(item)
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
                                    <td colSpan={4} className="text-center">
                                        Not found roles
                                    </td>
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
        </>
    );
});

export default TableRole;
