"use client";

import Link from "next/link";

export default function Login() {

  async function handleSubmit (event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }
    console.log({ data });
  }

  return (
    <div className="flex justify-center items-center mt-20 bg-white">
      <div className="border w-full max-w-[410px] sm:p-8 py-8 px-4 rounded-3xl border-sky-900 mx-2">
        <h1 className="text-2xl text-center font-bold mb-4 text-sky-900">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            autoFocus
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
            Login
          </button>
        </form>
        <div className="flex justify-end text-sm">
          <Link href="/register" className="underline text-blue-600">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}