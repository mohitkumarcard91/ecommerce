import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { login } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { loadUserData } from "../redux/slices/productSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const allUsers = JSON.parse(localStorage.getItem("registerUser")) || [];

    if (allUsers.length === 0) {
      toast.warn("No registered users found!", { transition: Bounce });
      return;
    }

    const existingUser = allUsers.find((user) => user.email === data.email);

    if (!existingUser) {
      toast.warn("Email not registered!", { transition: Bounce });
      return;
    }

    if (existingUser.password !== data.password) {
      toast.warn("Incorrect password!", { transition: Bounce });
      return;
    }

    dispatch(
      login({
        email: existingUser.email,
      })
    );
    dispatch(loadUserData(existingUser.email));

    toast.success("Login successful!", { transition: Bounce });
    navigate("/");
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center  px-4">
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => navigate("/login")}
          className="font-semibold text-blue-600 border-b-2 border-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="font-semibold text-gray-500 hover:text-blue-600"
        >
          Signup
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back 👋</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 border border-indigo-600 text-white py-2 rounded-md hover:bg-white hover:text-indigo-600 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          New user?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
