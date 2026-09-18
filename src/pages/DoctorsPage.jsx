import { useEffect, useMemo, useState } from "react";
import { getDoctors } from "../services/api";
import DoctorCard from "../components/DoctorCard";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDoctors();

        setDoctors(data);
      } catch {
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specialties = useMemo(() => {
    const uniqueSpecialties = doctors.map((doctor) => doctor.specialty);

    return ["All", ...new Set(uniqueSpecialties)];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchTerm, selectedSpecialty]);

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#EBE3D0] px-4">
        <div className="text-center animate-[fadeInUp_0.6s_ease-out]">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#5E2325]/20 border-t-[#5E2325]" />

          <p className="mt-4 font-medium text-[#284351]">Loading doctors...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#EBE3D0] px-4">
        <div className="max-w-md rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md animate-[fadeInUp_0.6s_ease-out]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E74F44]/10 text-2xl font-bold text-[#E74F44]">
            !
          </div>

          <h1 className="mt-4 text-xl font-bold text-[#5E2325]">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#284351]/70">{error}</p>
        </div>
      </section>
    );
  }

  if (doctors.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#EBE3D0] px-4">
        <div className="max-w-md rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-xl font-bold text-[#5E2325]">
            No doctors available
          </h1>

          <p className="mt-2 text-sm text-[#284351]/70">
            There are currently no doctors available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-[#EBE3D0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#E74F44]">
            Medical Specialists
          </p>

          <h1 className="text-3xl font-bold text-[#5E2325] sm:text-4xl">
            Find Your Doctor
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-[#284351]/75">
            Find the right specialist for your healthcare needs and book your
            appointment with ease.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md animate-[fadeInUp_0.8s_ease-out]">
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            <div>
              <label
                htmlFor="doctor-search"
                className="mb-2 block text-sm font-semibold text-[#284351]"
              >
                Search Doctors
              </label>

              <input
                id="doctor-search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by doctor name or specialty..."
                className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition placeholder:text-[#284351]/45 focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
              />
            </div>

            <div>
              <label
                htmlFor="specialty-filter"
                className="mb-2 block text-sm font-semibold text-[#284351]"
              >
                Specialty
              </label>

              <select
                id="specialty-filter"
                value={selectedSpecialty}
                onChange={(event) => setSelectedSpecialty(event.target.value)}
                className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-5 flex items-center justify-between animate-[fadeInUp_1s_ease-out]">
          <div>
            <h2 className="text-xl font-bold text-[#284351]">
              Available Doctors
            </h2>

            <p className="mt-1 text-sm text-[#284351]/60">
              {filteredDoctors.length}{" "}
              {filteredDoctors.length === 1 ? "doctor" : "doctors"} found
            </p>
          </div>
        </div>

        {/* Doctors */}
        {filteredDoctors.length === 0 ? (
          <div className="rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] px-6 py-12 text-center shadow-sm animate-[fadeInUp_0.6s_ease-out]">
            <h2 className="text-xl font-bold text-[#5E2325]">
              No matching doctors
            </h2>

            <p className="mt-2 text-[#284351]/70">
              Try another doctor name or choose a different specialty.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="animate-[fadeInUp_0.6s_ease-out]">
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DoctorsPage;
