"use client";

import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";

export default function Login() {

  const { register, success, loading, error } = useAuthStore();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string
    }

    const { full_name, email, password } = data;

    if (register && full_name && email && password) {
      const response = await register(full_name, email, password);
      console.log('response: ', response);
    }

    event.target.reset();
  }

  return (
    <div className="flex justify-center items-center mt-20 bg-white">
      <div className="border w-full max-w-[410px] sm:p-8 py-8 px-4 rounded-3xl border-sky-900 mx-2">
        <h1 className="text-2xl text-center font-bold mb-4 text-sky-900">Register</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            autoFocus
            className="border rounded-3xl my-2 w-full p-2 px-4 outline-sky-900"
            placeholder="Full Name"
          />
          <br />
          <input
            type="email"
            name="email"
            className="border rounded-3xl my-2 w-full p-2 px-4 outline-sky-900"
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="password"
            className="border rounded-3xl my-2 w-full p-2 px-4 outline-sky-900"
            placeholder="Password"
          />
          <br />
          <button
            className="border rounded-3xl my-2 w-full p-2 px-4 bg-sky-900 font-bold text-white hover:bg-white hover:text-sky-900 hover:border-sky-900 transition ease-in-out delay-550"
          >
            {loading ? "Register..." : "Register"}
          </button>
        </form>
        <div className="flex justify-end text-sm">
          <Link href="/login" className="underline text-blue-600">
            Already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}