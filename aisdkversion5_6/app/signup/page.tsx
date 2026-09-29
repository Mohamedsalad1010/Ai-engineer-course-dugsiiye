"use client";

type FormData = { email: string; password: string; };
import {Signup} from "@/server/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { required } from "zod/v4/mini";

const signUpPage = () => {
  const { register, handleSubmit , formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    Signup(data.email, data.password, "md")
      .then((user) => {
        console.log("User signed up:", user);
        setSuccess("User signed up successfully!");
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        setError(error.message);
        setSuccess(null); // Clear any previous success messages
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="flex flex-col gap-4 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          {...register("email", { required: 'Email is required'  } )}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          {...register("password" , { required: 'Password is required' })}
        />
        {/* <input type="text" placeholder="Name" className="border p-2 rounded" /> */}
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {errors.email && <p className="text-red-500">Email is required</p>}
      {errors.password && <p className="text-red-500">Password is required</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default signUpPage;
