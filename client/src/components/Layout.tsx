import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: FC = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-16">
                <div className="mb-4">
                    <main className="w-full">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;
