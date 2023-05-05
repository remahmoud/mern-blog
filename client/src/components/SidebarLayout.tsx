import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const SidebarLayout: FC = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-16">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <main className="w-full lg:w-[66%]">
                        <Outlet />
                    </main>
                    <aside className="w-full lg:w-[34%]">hello</aside>
                </div>
            </div>
        </>
    );
};

export default SidebarLayout;
