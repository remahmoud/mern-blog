import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchPostById } from "../app/contentApi";
import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
    const { postId } = useParams();
    const post = useAppSelector((state) => state.content.post);
    // fetch posts
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (postId) {
            dispatch(fetchPostById(postId));
        }
    }, []);
    if (!post) return <div>no data</div>;
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col p-4 bg-white rounded-md shadow">
                <h2 className="text-3xl font-semibold text-indigo-600 capitalize mb-1">
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                </h2>
                <div className="text-xs capitalize font-medium text-gray-500 mb-2">
                    author: {post.author.first_name} {post.author.last_name}
                </div>
                <p className="text-gray-600">{post.content}</p>
            </div>
        </div>
    );
};

export default PostDetail;
