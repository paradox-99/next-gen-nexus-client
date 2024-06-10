import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useModerator from "../hooks/useModerator";
import PropTypes from 'prop-types';

const ModeratorRoute = ({ children }) => {
    const { user, status } = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();
    const location = useLocation();

    if (status || isModeratorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isModerator) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

ModeratorRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default ModeratorRoute;