import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchPosts } from "../app/contentApi";
import { Link } from "react-router-dom";
import { fetchUserData } from "../app/authApi";

const Home = () => {
    const posts = useAppSelector((state) => state.content.posts);
    // fetch posts
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUserData());
    }, []);
    if (!posts || posts.length === 0) return <div>no data</div>;
    return (
        <div className="flex flex-col gap-4">
            {posts.map((post) => (
                <div
                    key={post._id}
                    className="flex flex-col p-4 bg-white rounded-md shadow"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600 capitalize mb-1">
                        <Link to={`/post/${post._id}`}>{post.title}</Link>
                    </h2>
                    <div className="text-xs capitalize font-medium text-gray-500 mb-2">
                        author: {post.author.first_name} {post.author.last_name}
                    </div>
                    <p className="text-gray-600">{post.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
