export default function Login() {
return ( <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] px-6">

  <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

    <h1 className="mb-2 text-3xl font-bold text-[#111827]">
      Welcome Back
    </h1>

    <p className="mb-8 text-gray-500">
      Login to continue learning.
    </p>

    <form className="space-y-5">

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2563EB]"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#2563EB]"
        />
      </div>

      <button
        className="w-full rounded-xl bg-[#2563EB] py-3 font-semibold text-white"
      >
        Login
      </button>

    </form>
  </div>

</div>

);
}
