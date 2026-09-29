"use client";

type FormData = { email: string; password: string; };
import { authClient, signIn } from "@/lib/auth-client";
import { logIn, SignInWithGoogle} from "@/server/user";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


const signInPage =  () => {
  const { register, handleSubmit , formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
const router = useRouter();



 const submmit = async (data: FormData) => {
  logIn(data.email, data.password).then((user) => {
    console.log("User signed in:", user);
    setSuccess("User signed in successfully!");
    setError(null); // Clear any previous errors
    router.push("/dashboard");
  }).catch((error) => {
    console.error("Error signing in:", error);
    setError(error.message);
    setSuccess(null); // Clear any previous success messages
    setLoading(false);
  }  )


 }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="flex flex-col gap-4 w-96"
        onSubmit={handleSubmit(submmit)}
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          {...register("email", { required: "Email is required"  } )}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          {...register("password" , { required: "Password is required" })}
        />
          <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In   "}
        </button>
        <button
          type="button"
          className={`bg-red-500 text-white p-2 rounded cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => signIn.social({
            provider: "google",
          
          })}
        >
          Sign In with Google
        </button>
           
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {errors.email || errors.password ? (
        <p className="text-red-500">Email and Password are required</p>
      ) : null}
      
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default signInPage;
