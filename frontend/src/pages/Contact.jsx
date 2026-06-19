import MainLayout from "../layouts/MainLayout";

export default function Contact() {
  return (
    <MainLayout>
      <section className="bg-[#F3F4F6] py-20">

        <div className="mx-auto max-w-5xl px-6">

          <h1 className="mb-6 text-5xl font-bold text-[#111827]">
            Contact Us
          </h1>

          <p className="mb-10 text-lg text-gray-600">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div className="rounded-3xl bg-white p-8 shadow-md">

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border p-4"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border p-4"
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                className="w-full rounded-xl border p-4"
              />

              <button
                type="submit"
                className="rounded-xl bg-[#2563EB] px-8 py-4 font-semibold text-white"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>
    </MainLayout>
  );
}