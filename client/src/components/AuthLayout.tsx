import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Navbar from "./Navbar";

const AuthLayout = () => {
    const token = useAppSelector((state) => state.auth.token);

    return token ? (
        <Navigate to="/" />
    ) : (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default AuthLayout;
