import { useForm, SubmitHandler } from "react-hook-form";
import { CreatePostType } from "../types";
import { createNewPost } from "../app/contentApi";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm<CreatePostType>();

    // login handler event
    const onSubmit: SubmitHandler<CreatePostType> = async (data) => {
        dispatch(createNewPost(data))
            .unwrap()
            .then((res) => navigate(`/post/${res._id}`));
    };
    return (
        <div className="bg-white rounded-md shadow mb-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 flex flex-col gap-6"
            >
                <div>
                    <label htmlFor="Title" className="form__label">
                        Title
                    </label>
                    <input
                        id="Title"
                        type="text"
                        className="form__input"
                        {...register("title", { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="Summary" className="form__label">
                        Summary
                    </label>
                    <input
                        id="Summary"
                        type="text"
                        className="form__input"
                        {...register("summary", { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="Category" className="form__label">
                        Category
                    </label>
                    <input
                        id="Category"
                        type="text"
                        className="form__input"
                        {...register("category", { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="Content" className="form__label">
                        Content
                    </label>
                    <textarea
                        id="Content"
                        rows={12}
                        className="form__input"
                        {...register("content", { required: true })}
                    />
                </div>
                <div className="flex">
                    <button
                        type="submit"
                        className="px-8 py-2 bg-indigo-600 text-white mx-auto rounded-md"
                    >
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPost;
