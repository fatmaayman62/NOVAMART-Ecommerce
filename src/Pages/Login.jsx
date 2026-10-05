import React from "react";
import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInUser } from "../Services/AuthService";
import useTokenStore from "../Store/authTokenStore";
import toast from "react-hot-toast";

const schema = zod.object({
  email: zod
    .string()
    .min(1, "Is Required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),
  password: zod
    .string()
    .min(1, "Is Required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain uppercase, lowercase, number, and special character",
    ),
});

function Login() {
  const setToken = useTokenStore((state) => state?.setToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function signIn(values) {
    const res = await SignInUser(values);
    if (res.message === "success") {
      toast.success("Logged Successfully");
      setToken(res.token);
      navigate("/");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit(signIn)}
        className="flex w-full max-w-md flex-col gap-5 bg-white shadow-xl border border-blue-50 rounded-3xl p-6 sm:p-8"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-black text-blue-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Sign in to your NovaMart account
          </p>
        </div>

        {/* Email Field */}
        <div className="w-full">
          <Input
            label="Email"
            type="email"
            variant="bordered"
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email && touchedFields.email)}
            {...register("email")}
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <Input
            label="Password"
            type="password"
            variant="bordered"
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password && touchedFields.password)}
            {...register("password")}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          color="primary"
          className="w-full font-bold text-base py-6 bg-blue-600 hover:bg-blue-700 shadow-md mt-2"
        >
          Login
        </Button>

        {/* Don't have an account prompt */}
        <p className="text-center text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
