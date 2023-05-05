import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, PostDetail, Login, Register, NewPost, Dashboard } from "./pages";
import SidebarLayout from "./components/SidebarLayout";
import AuthLayout from "./components/AuthLayout";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path="/" index element={<Home />} />
                    <Route
                        path="/post/:postId"
                        index
                        element={<PostDetail />}
                    />
                    <Route
                        path="/post/create"
                        element={
                            <PrivateRoute>
                                <NewPost />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route element={<Layout />}>
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
