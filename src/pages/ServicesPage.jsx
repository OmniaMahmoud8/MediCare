import { Link } from "react-router";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

function ServicesPage() {
  const services = [
    {
      number: "01",
      icon: Stethoscope,
      title: "Find Doctors",
      description:
        "Browse doctors by specialty, review their experience, location, rating, and other important information.",
    },
    {
      number: "02",
      icon: CalendarCheck,
      title: "Book Appointments",
      description:
        "Choose a suitable date and time and send your appointment request through a simple booking flow.",
    },
    {
      number: "03",
      icon: ClipboardList,
      title: "Manage Appointments",
      description:
        "Keep your appointments organized and easily review, update, or remove your bookings.",
    },
    {
      number: "04",
      icon: UserRound,
      title: "Patient Profile",
      description:
        "Create and manage your personal profile so your information is ready whenever you need to book.",
    },
    {
      number: "05",
      icon: ShieldCheck,
      title: "Organized Experience",
      description:
        "Everything is designed to keep your healthcare journey simple, clear, and easy to navigate.",
    },
  ];

  return (
    <div className="bg-[#EBE3D0]">
      {/* Header */}
      <section className="border-b border-[#5E2325]/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-[fadeInUp_0.7s_ease-out]">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#E74F44]">
              What We Offer
            </span>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-[#5E2325] sm:text-4xl">
              Simple tools for a better healthcare experience.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#284351]/70">
              From discovering the right doctor to managing your appointments,
              MediCare keeps everything organized in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="animate-[fadeInUp_0.8s_ease-out] rounded-xl border border-[#5E2325]/10 bg-[#EBE3D1] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30 hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5E2325] text-[#EBE3D1] transition duration-300 hover:bg-[#E74F44]">
                      <Icon size={20} />
                    </div>

                    <span className="text-xs font-bold text-[#E74F44]/70">
                      {service.number}
                    </span>
                  </div>

                  <h2 className="mt-5 text-lg font-bold text-[#5E2325]">
                    {service.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#284351]/65">
                    {service.description}
                  </p>

                  <Link
                    to="/doctors"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#5E2325] transition hover:text-[#E74F44]"
                  >
                    Explore
                    <ArrowRight size={15} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#5E2325]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-5 animate-[fadeInUp_0.8s_ease-out] md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E74F44]">
                Your next appointment
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#EBE3D1]">
                Find your doctor and get started.
              </h2>
            </div>

            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 rounded-lg bg-[#EBE3D1] px-5 py-3 text-sm font-bold text-[#5E2325] transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:text-[#EBE3D1]"
            >
              Explore Doctors
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
