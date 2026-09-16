import { useEffect, useState } from "react";
import { getDoctors } from "../services/api";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
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

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-[#284351]">
          Loading doctors...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-[#E74F44]">
          {error}
        </p>
      </section>
    );
  }

  if (doctors.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-[#284351]">
          No doctors found.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#5E2325]">
          Find Your Doctor
        </h1>

        <p className="mt-2 text-[#284351]">
          Browse our doctors and find the right specialist for you.
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="font-medium text-[#284351]">
          Doctors loaded successfully: {doctors.length}
        </p>
      </div>
    </section>
  );
}

export default DoctorsPage;