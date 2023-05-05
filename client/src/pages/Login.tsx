import { useForm, SubmitHandler } from "react-hook-form";
import { LoginType } from "../types";
import { useAppDispatch } from "../app/hooks";
import { loginByEmail } from "../app/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>();

    // login handler event
    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        dispatch(loginByEmail(data))
            .unwrap()
            .then(() => navigate("/"))
            .catch((err) => setMessage(err.message));
    };
    return (
        <div className="container h-full mx-auto px-4 md:px-16 flex items-center justify-center">
            <form
                className="flex flex-col gap-6 p-6 bg-white shadow rounded-md w-[400px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-center text-4xl font-semibold text-indigo-600">
                    Blog
                </h3>
                {message && (
                    <h4 className="px-2 py-1.5 bg-red-400 text-white rounded-md">
                        {message}
                    </h4>
                )}
                <div>
                    <label htmlFor="Email" className="form__label">
                        Email
                    </label>
                    <input
                        className="form__input"
                        type="email"
                        id="Email"
                        placeholder="john.doe@company.com"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors && errors.email && (
                        <div className="text-red-500">
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div>
                    <label htmlFor="Password" className="form__label">
                        Password
                    </label>
                    <input
                        className="form__input"
                        id="Password"
                        type="password"
                        placeholder="•••••••••"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors && errors.password && (
                        <div className="text-red-500">
                            {errors.password.message}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 text-whtie py-1.5 rounded-md text-white text-lg font-medium"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
