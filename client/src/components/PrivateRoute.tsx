import { FC } from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element;
};

const PrivateRoute: FC<Props> = ({ children }) => {
    const token = useAppSelector((state) => state.auth.token);
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
