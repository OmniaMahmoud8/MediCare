import { Link } from "react-router";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

function HomePage() {
  const services = [
    {
      icon: Stethoscope,
      title: "Find Doctors",
      description:
        "Browse doctors by specialty, experience, location, and rating.",
    },
    {
      icon: CalendarCheck,
      title: "Book Appointments",
      description:
        "Choose a suitable date and time and send your appointment request easily.",
    },
    {
      icon: ShieldCheck,
      title: "Organized Care",
      description:
        "Keep your healthcare information and appointments organized in one place.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}home.jpg`}
          alt="MediCare doctors"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-6xl flex-col justify-between px-4 pb-10 pt-28 sm:px-6 lg:px-8">
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#E74F44] drop-shadow-md">
              Better care. Better life.
            </p>

            <h1 className="max-w-5xl text-4xl font-bold leading-tight text-[#EBE3D1] drop-shadow-lg sm:text-5xl lg:text-6xl">
              Find the right doctor for your healthcare needs.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#EBE3D1] drop-shadow-md sm:text-lg">
              Discover trusted doctors, explore specialties, and manage your
              appointments easily with MediCare.
            </p>
          </div>

          <div className="flex justify-end animate-[fadeInUp_1s_ease-out]">
            <div className="flex flex-wrap justify-end gap-3">
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 rounded-lg bg-[#5E2325] px-5 py-3 text-sm font-semibold text-[#EBE3D1] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:shadow-lg"
              >
                Find a Doctor
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-[#EBE3D1]/80 bg-[#284351]/25 px-5 py-3 text-sm font-semibold text-[#EBE3D1] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#EBE3D1] hover:text-[#284351]"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Home Content */}
      <div className="bg-[#EBE3D0]">
        {/* Stats */}
        <section className="border-b border-[#5E2325]/10 bg-[#EBE3D1]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
            <div className="animate-[fadeIn_0.6s_ease-out] border-r border-[#5E2325]/10 px-4 py-6 text-center transition duration-300 hover:bg-[#E74F44]/10">
              <Users className="mx-auto mb-2 text-[#E74F44]" size={21} />
              <p className="text-xl font-bold text-[#5E2325]">100+</p>
              <p className="text-xs text-[#284351]/65">Doctors</p>
            </div>

            <div className="animate-[fadeIn_0.8s_ease-out] border-b border-[#5E2325]/10 px-4 py-6 text-center transition duration-300 hover:bg-[#E74F44]/10 sm:border-b-0 sm:border-r">
              <Stethoscope className="mx-auto mb-2 text-[#E74F44]" size={21} />
              <p className="text-xl font-bold text-[#5E2325]">12+</p>
              <p className="text-xs text-[#284351]/65">Specialties</p>
            </div>

            <div className="animate-[fadeIn_1s_ease-out] border-r border-[#5E2325]/10 px-4 py-6 text-center transition duration-300 hover:bg-[#E74F44]/10">
              <CalendarCheck
                className="mx-auto mb-2 text-[#E74F44]"
                size={21}
              />
              <p className="text-xl font-bold text-[#5E2325]">500+</p>
              <p className="text-xs text-[#284351]/65">Appointments</p>
            </div>

            <div className="animate-[fadeIn_1.2s_ease-out] px-4 py-6 text-center transition duration-300 hover:bg-[#E74F44]/10">
              <ShieldCheck className="mx-auto mb-2 text-[#E74F44]" size={21} />
              <p className="text-xl font-bold text-[#5E2325]">24/7</p>
              <p className="text-xs text-[#284351]/65">Support</p>
            </div>
          </div>
        </section>

        {/* Why MediCare */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-2xl text-center animate-[fadeInUp_0.7s_ease-out]">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#E74F44]">
                Why MediCare
              </p>

              <h2 className="text-3xl font-bold text-[#5E2325]">
                Healthcare made simple
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#284351]/70">
                Everything you need to find professional care and manage your
                appointments in one place.
              </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="animate-[fadeInUp_0.8s_ease-out] rounded-xl border border-[#5E2325]/10 bg-[#EBE3D1] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30 hover:shadow-md">
                <CheckCircle2 className="text-[#E74F44]" size={23} />

                <h3 className="mt-3 text-base font-bold text-[#5E2325]">
                  Trusted Doctors
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#284351]/70">
                  Browse doctor profiles, specialties, experience, ratings, and
                  consultation information.
                </p>
              </div>

              <div className="animate-[fadeInUp_1s_ease-out] rounded-xl border border-[#5E2325]/10 bg-[#EBE3D1] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30 hover:shadow-md">
                <Clock3 className="text-[#E74F44]" size={23} />

                <h3 className="mt-3 text-base font-bold text-[#5E2325]">
                  Easy Scheduling
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#284351]/70">
                  Check available dates and times and manage your appointments
                  easily.
                </p>
              </div>

              <div className="animate-[fadeInUp_1.2s_ease-out] rounded-xl border border-[#5E2325]/10 bg-[#EBE3D1] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30 hover:shadow-md">
                <ShieldCheck className="text-[#E74F44]" size={23} />

                <h3 className="mt-3 text-base font-bold text-[#5E2325]">
                  Organized Care
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#284351]/70">
                  Keep your patient information and appointments organized in
                  one simple experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="border-t border-[#5E2325]/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end animate-[fadeInUp_0.7s_ease-out]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E74F44]">
                  Our Services
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#5E2325]">
                  Everything you need
                </h2>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E2325] transition hover:text-[#E74F44]"
              >
                View all services
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="animate-[fadeInUp_0.9s_ease-out] rounded-xl border border-[#5E2325]/10 bg-[#EBE3D1] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5E2325] text-[#EBE3D1] transition duration-300 hover:bg-[#E74F44]">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-[#5E2325]">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#284351]/70">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Connect Us */}
        <section className="border-t border-[#5E2325]/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="rounded-2xl bg-[#284351] px-6 py-9 shadow-md transition duration-300 hover:shadow-lg sm:px-10 animate-[fadeInUp_0.8s_ease-out]">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#E74F44]">
                    Connect With Us
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#EBE3D1]">
                    Have a question? We are here to help.
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#EBE3D1]/70">
                    Need help with an appointment or want to know more about
                    MediCare? Get in touch with us.
                  </p>
                </div>

                <Link
                  to="/connect"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#5E2325] px-5 py-3 text-sm font-semibold text-[#EBE3D1] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:shadow-md"
                >
                  Connect Us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
