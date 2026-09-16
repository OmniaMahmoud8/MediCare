import { Link } from "react-router";

function DoctorCard({ doctor }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#5E2325]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-[#EBE3D1]">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-[#5E2325] shadow-sm">
          ★ {doctor.rating}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#5E2325]">{doctor.name}</h2>

          <p className="mt-1 text-sm font-medium text-[#E74F44]">
            {doctor.specialty}
          </p>
        </div>

        <div className="space-y-2 text-sm text-[#284351]">
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {doctor.experience} years
          </p>

          <p>
            <span className="font-semibold">Location:</span> {doctor.location}
          </p>

          <p className="line-clamp-2 leading-6 text-[#284351]/75">
            {doctor.description}
          </p>
        </div>

        <Link
          to={`/doctors/${doctor.id}`}
          className="mt-5 block w-full rounded-xl bg-[#5E2325] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#E74F44]"
        >
          View Doctor
        </Link>
      </div>
    </article>
  );
}

export default DoctorCard;
