import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterType } from "../types";
import { useAppDispatch } from "../app/hooks";
import { registerNewUser } from "../app/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const [message, setMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<RegisterType>();

    // register handler event
    const onSubmit: SubmitHandler<RegisterType> = async (data) => {
        dispatch(registerNewUser(data))
            .unwrap()
            .then(() => navigate("/login"))
            .catch((err: any) => setMessage(err.message));
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
                    <label htmlFor="FirstName" className="form__label">
                        First Name
                    </label>
                    <input
                        className="form__input"
                        type="text"
                        id="FirstName"
                        placeholder="john"
                        {...register("first_name", {
                            required: true,
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="LastName" className="form__label">
                        Last Name
                    </label>
                    <input
                        className="form__input"
                        type="text"
                        id="LastName"
                        placeholder="doe"
                        {...register("last_name", {
                            required: true,
                        })}
                    />
                </div>
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
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 text-whtie py-1.5 rounded-md text-white text-lg font-medium"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
