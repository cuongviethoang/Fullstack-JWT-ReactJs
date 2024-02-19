import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PrivateRoutes = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            toast.info("Vui lòng đăng nhập tài khoản");
            navigate("/login");
        }
    }, []);
    return <>{props.children}</>;
};

export default PrivateRoutes;
