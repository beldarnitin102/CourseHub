export default function TrustedCompanies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Infosys",
    "TCS",
    "Wipro",
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
          Trusted by learners preparing for careers at
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">

          {companies.map((company) => (
            <div
              key={company}
              className="text-2xl font-bold text-gray-400 transition duration-300 hover:text-[#2563EB]"
            >
              {company}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}