import { useParams } from "react-router";

function DoctorDetailsPage() {
  const { id } = useParams();

  return (
    <section>
      <h1 className="text-3xl font-bold text-[#5E2325]">Doctor Details</h1>

      <p className="mt-2 text-[#284351]">Doctor ID: {id}</p>
    </section>
  );
}

export default DoctorDetailsPage;
