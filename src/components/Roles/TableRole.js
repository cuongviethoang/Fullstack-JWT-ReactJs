import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
} from "react";
import { freshAllRoles, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = async () => {
        let response = await freshAllRoles();
        if (response && +response.EC === 0) {
            setListRoles(response.DT);
        } else {
            toast.error(response?.EM);
        }
    };

    const handleDeleteRole = async (role) => {
        let response = await deleteRole(role);
        console.log("Vao day");
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
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Url</th>
                        <th scope="col">Desc</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((item, index) => (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>

                                    <td>
                                        <button className="btn btn-warning me-3">
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
    );
});

export default TableRole;
