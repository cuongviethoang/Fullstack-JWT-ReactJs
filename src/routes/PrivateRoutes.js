import { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PrivateRoutes = (props) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const content = user && user.isAuthenticated ? <>{props.children}</> : null;

    useEffect(() => {
        if (!content) {
            toast.info("You need to log in to use this function");
            navigate("/login");
        }
    }, [content]);

    return content;
};

export default PrivateRoutes;
