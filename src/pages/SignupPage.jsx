import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast, Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slices/authSlice";
import userSchema from "../constant/validation";

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
  resolver: yupResolver(userSchema), 
});

  const onSubmit = (data) => {
    const allUsers = JSON.parse(localStorage.getItem("registerUser")) || [];

    if (allUsers.some((user) => user.email === data.email)) {
      toast.warn("User already registered with this email!", {
        transition: Bounce,
      });
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    allUsers.push(newUser);
    localStorage.setItem("registerUser", JSON.stringify(allUsers));

    dispatch(
      signup({
        name: data.name,
        email: data.email,
      })
    );

    toast.success("Registered Successfully!", {
      transition: Bounce,
      position: "top-center",
      autoClose: 2000,
    });

    navigate("/");
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center px-4">
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => navigate("/login")}
          className="font-semibold text-gray-500 hover:text-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="font-semibold text-blue-600 border-b-2 border-blue-600"
        >
          Signup
        </button>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome To Ecommerce 👋
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            placeholder="Enter your name"
            className="border p-2 rounded"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <small className="text-red-500">{errors.name.message}</small>
          )}

          <input
            placeholder="Enter your email"
            className="border p-2 rounded"
            {...register("email", { required: "Email required" })}
          />
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}

          <input
            type="password"
            placeholder="Enter your password"
            className="border p-2 rounded"
            {...register("password", { required: "Password required" })}
          />
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}

          <button className="mt-4 bg-indigo-600 border border-indigo-600 text-white py-2 rounded-md hover:bg-white hover:text-indigo-600 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
