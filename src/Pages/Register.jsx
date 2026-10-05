import React from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../Services/AuthService";
import toast from "react-hot-toast";
import useTokenStore from "../Store/authTokenStore";

const schema = zod
  .object({
    name: zod
      .string()
      .min(1, "Is Required")
      .min(2, "min length 2")
      .max(10, "max length 10"),
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
    rePassword: zod.string().min(1, "Is Required"),
    dateOfBirth: zod.coerce.date().refine((value) => {
      const age = value.getFullYear();
      const now = new Date().getFullYear();
      return now - age > 18;
    }, "Must be older than 18"),
    gender: zod.string().min(1, "Is Required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

function Register() {
  const setToken = useTokenStore((state) => state?.setToken);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function signUp(values) {
    const res = await SignUpUser(values);
    if (res.message === "success") {
      toast.success("Your Created Account Successfully");
      setToken(res.token);
      navigate("/");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit(signUp)}
        className="flex w-full max-w-md flex-col gap-5 bg-white shadow-xl border border-blue-50 rounded-3xl p-6 sm:p-8"
      >
        <div className="text-center mb-2">
          <h2 className="text-2xl font-black text-blue-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Join NovaMart today
          </p>
        </div>

        {/* Name Field */}
        <div className="w-full">
          <Input
            label="Name"
            type="text"
            variant="bordered"
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name && touchedFields.name)}
            {...register("name")}
          />
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

        {/* Re-Password Field */}
        <div className="w-full">
          <Input
            label="Confirm Password"
            type="password"
            variant="bordered"
            errorMessage={errors.rePassword?.message}
            isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)}
            {...register("rePassword")}
          />
        </div>

        {/* Date of Birth & Gender Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <Input
              label="Date of Birth"
              type="date"
              variant="bordered"
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={Boolean(
                errors.dateOfBirth && touchedFields.dateOfBirth,
              )}
              {...register("dateOfBirth")}
            />
          </div>

          <div className="w-full">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  label="Gender"
                  variant="bordered"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    field.onChange(Array.from(keys)[0] || "");
                  }}
                  isInvalid={Boolean(errors.gender && touchedFields.gender)}
                  errorMessage={errors.gender?.message}
                >
                  <SelectItem key="male">Male</SelectItem>
                  <SelectItem key="female">Female</SelectItem>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          color="primary"
          className="w-full font-bold text-base py-6 bg-blue-600 hover:bg-blue-700 shadow-md mt-2"
        >
          Register
        </Button>
        {/* Already have an account prompt */}
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
