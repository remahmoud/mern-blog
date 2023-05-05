import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { ReactNode, FC } from "react";

type CustomLinkType = {
    to: string;
    children: ReactNode;
    className: string;
};

const Navbar = () => {
    const user = useAppSelector((state) => state.auth.user);
    return (
        <nav className="py-4 bg-white mb-4 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-16 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-indigo-600">
                    <Link to="/">Blog</Link>
                </h2>
                <ul className="flex items-center gap-4">
                    {user ? (
                        <>
                            <li>
                                <CustomLink
                                    className="bg-indigo-600 text-white px-4 py-1 rounded-md"
                                    to="/post/create"
                                >
                                    create post
                                </CustomLink>
                            </li>
                            <li>
                                <CustomLink
                                    className="capitalize font-medium text-gray-900 hover:text-indigo-600"
                                    to="/dashboard"
                                >
                                    Dashboard
                                </CustomLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <CustomLink
                                    to="/login"
                                    className="text-lg font-medium text-indigo-600"
                                >
                                    Login
                                </CustomLink>
                            </li>
                            <li>
                                <CustomLink
                                    to="/register"
                                    className="bg-indigo-600 text-white px-4 py-1 rounded-md"
                                >
                                    Register
                                </CustomLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

const CustomLink: FC<CustomLinkType> = ({ to, children, className }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                (isActive ? "hidden " : "block ") + className
            }
        >
            {children}
        </NavLink>
    );
};

export default Navbar;
