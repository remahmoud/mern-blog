import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { deletePost, fetchPostsByAuthor } from "../app/contentApi";
import { fetchUserData } from "../app/authApi";

const Dashboard = () => {
    const posts = useAppSelector((state) => state.content.posts);
    const user = useAppSelector((state) => state.auth.user);
    // fetch posts
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPostsByAuthor());
        dispatch(fetchUserData());
    }, []);
    if (!posts || posts.length === 0) return <div>no data</div>;
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Likes
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr
                            key={post._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {post.title}
                            </th>
                            <td className="px-6 py-4">{post.category}</td>
                            <td className="px-6 py-4">{post.likes.length}</td>
                            {user && user._id === post.author._id && (
                                <td className="flex gap-2 px-6 py-4">
                                    <button
                                        onClick={() =>
                                            dispatch(deletePost(post._id))
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button>Update</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
