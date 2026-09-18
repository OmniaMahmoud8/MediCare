import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getDoctorById, getDoctorAvailability } from "../services/api";

function DoctorDetailsPage() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [error, setError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDoctorById(id);

        setDoctor(data);
      } catch {
        setError("Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setAvailabilityLoading(true);
        setAvailabilityError("");

        const data = await getDoctorAvailability(id);

        setAvailability(data);
      } catch {
        setAvailabilityError("Failed to load available appointment slots.");
      } finally {
        setAvailabilityLoading(false);
      }
    };

    fetchAvailability();
  }, [id]);

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#EBE3D0]">
        <div className="text-center animate-[fadeInUp_0.6s_ease-out]">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#5E2325]/20 border-t-[#5E2325]" />

          <p className="mt-4 font-medium text-[#284351]">
            Loading doctor details...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#EBE3D0] px-4">
        <div className="max-w-md rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] p-8 text-center shadow-sm animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-xl font-bold text-[#5E2325]">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-[#284351]/70">{error}</p>

          <Link
            to="/doctors"
            className="mt-6 inline-block rounded-xl bg-[#5E2325] px-5 py-3 text-sm font-semibold text-[#EBE3D1] transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:shadow-md"
          >
            Back to Doctors
          </Link>
        </div>
      </section>
    );
  }

  if (!doctor) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#EBE3D0]">
        <div className="text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-2xl font-bold text-[#5E2325]">
            Doctor not found
          </h1>

          <Link
            to="/doctors"
            className="mt-5 inline-block rounded-xl bg-[#5E2325] px-5 py-3 text-sm font-semibold text-[#EBE3D1] transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44]"
          >
            Back to Doctors
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-[#EBE3D0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/doctors"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#5E2325] transition hover:text-[#E74F44] animate-[fadeIn_0.5s_ease-out]"
        >
          ← Back to Doctors
        </Link>

        <div className="overflow-hidden rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] shadow-sm transition duration-300 hover:shadow-lg animate-[fadeInUp_0.7s_ease-out]">
          <div className="grid lg:grid-cols-[300px_1fr]">
            <div className="h-[280px] overflow-hidden bg-[#EBE3D0] lg:h-full">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-full w-full object-cover object-[center_35%] transition duration-700 hover:scale-105"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#E74F44]/10 px-3 py-1 text-xs font-semibold text-[#E74F44]">
                  {doctor.specialty}
                </span>

                <span className="rounded-full bg-[#EBE3D0] px-3 py-1 text-xs font-semibold text-[#284351]">
                  ★ {doctor.rating}
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-bold text-[#5E2325] sm:text-3xl">
                {doctor.name}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#284351]/75">
                {doctor.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[#EBE3D0] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#284351]/60">
                    Experience
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#284351]">
                    {doctor.experience} years
                  </p>
                </div>

                <div className="rounded-xl bg-[#EBE3D0] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#284351]/60">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#284351]">
                    {doctor.location}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EBE3D0] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#284351]/60">
                    Consultation Fee
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#284351]">
                    {doctor.consultationFee}
                  </p>
                </div>

                <div className="rounded-xl bg-[#EBE3D0] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#284351]/60">
                    Doctor ID
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#284351]">
                    #{doctor.id}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-base font-bold text-[#5E2325]">
                  Working Schedule
                </h2>

                <div className="mt-2 space-y-1.5 text-sm text-[#284351]">
                  <p>
                    <span className="font-semibold">Working Days:</span>{" "}
                    {doctor.workingDays}
                  </p>

                  <p>
                    <span className="font-semibold">Working Hours:</span>{" "}
                    {doctor.workingHours}
                  </p>
                </div>
              </div>

              {/* Doctor Availability */}

              <div className="mt-6">
                <div className="mb-3">
                  <h2 className="text-base font-bold text-[#5E2325]">
                    Available Appointment Slots
                  </h2>

                  <p className="mt-1 text-xs text-[#284351]/65">
                    Choose an available time for your appointment.
                  </p>
                </div>

                {availabilityLoading && (
                  <div className="rounded-xl bg-[#EBE3D0] p-4 text-center animate-[fadeIn_0.4s_ease-out]">
                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-4 border-[#5E2325]/20 border-t-[#5E2325]" />

                    <p className="mt-2 text-xs font-medium text-[#284351]">
                      Loading available slots...
                    </p>
                  </div>
                )}

                {!availabilityLoading && availabilityError && (
                  <div className="rounded-xl bg-[#E74F44]/10 p-4">
                    <p className="text-sm font-medium text-[#E74F44]">
                      {availabilityError}
                    </p>
                  </div>
                )}

                {!availabilityLoading &&
                  !availabilityError &&
                  availability.length === 0 && (
                    <div className="rounded-xl bg-[#EBE3D0] p-4 text-center">
                      <p className="text-sm font-medium text-[#284351]/70">
                        No appointment slots are currently available.
                      </p>
                    </div>
                  )}

                {!availabilityLoading &&
                  !availabilityError &&
                  availability.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {availability.map((slot) => (
                        <div
                          key={slot.id}
                          className="rounded-xl border border-[#5E2325]/10 bg-[#EBE3D0] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30 hover:shadow-sm"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#284351]/60">
                            Available Time
                          </p>

                          <p className="mt-1 text-base font-bold text-[#5E2325]">
                            {slot.availableSlots}
                          </p>

                          <p className="mt-1 text-xs text-[#284351]/70">
                            Consultation Fee:{" "}
                            <span className="font-semibold text-[#284351]">
                              {slot.consultationFee}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              <Link
                to={`/book-appointment?doctorId=${doctor.id}`}
                className="mt-6 block w-full rounded-xl bg-[#5E2325] px-5 py-3 text-center text-sm font-semibold text-[#EBE3D1] transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:shadow-md"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorDetailsPage;
