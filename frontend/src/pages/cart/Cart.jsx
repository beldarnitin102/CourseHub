import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function Cart() {
  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        <div className="space-y-5">

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex flex-col gap-4 md:flex-row">

              <div className="h-32 w-full rounded-xl bg-gray-200 md:w-48"></div>

              <div className="flex-1">

                <h3 className="text-xl font-bold">
                  Complete MERN Stack Development
                </h3>

                <p className="mt-2 text-gray-500">
                  By Nitin Beldar
                </p>

                <button className="mt-4 text-red-500">
                  Remove
                </button>

              </div>

              <div className="text-2xl font-bold text-[#2563EB]">
                ₹999
              </div>

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">

          <h3 className="text-xl font-bold">
            Order Summary
          </h3>

          <div className="mt-6 flex justify-between">
            <span>Total</span>
            <span className="font-bold">
              ₹999
            </span>
          </div>

          <button className="mt-6 w-full rounded-xl bg-[#2563EB] py-4 text-white">
            Checkout
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}