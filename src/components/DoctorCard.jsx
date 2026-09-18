import { Link } from "react-router";

function DoctorCard({ doctor }) {
  return (
    <article className="group mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-[#5E2325]/10 bg-[#EBE3D1] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-44 overflow-hidden bg-[#EBE3D1]">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover object-[center_35%] transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 rounded-full bg-[#EBE3D1]/95 px-2.5 py-1 text-xs font-semibold text-[#5E2325]">
          ★ {doctor.rating}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-[#5E2325]">{doctor.name}</h2>

        <p className="mt-1 text-xs font-semibold text-[#E74F44]">
          {doctor.specialty}
        </p>

        <div className="mt-3 space-y-1.5 text-xs text-[#284351]/75">
          <p>
            <span className="font-semibold text-[#284351]">Experience:</span>{" "}
            {doctor.experience} years
          </p>

          <p>
            <span className="font-semibold text-[#284351]">Location:</span>{" "}
            {doctor.location}
          </p>

          <p className="line-clamp-2 leading-5">{doctor.description}</p>
        </div>

        <Link
          to={`/doctors/${doctor.id}`}
          className="mt-4 block rounded-lg bg-[#5E2325] px-4 py-2.5 text-center text-xs font-semibold text-[#EBE3D1] transition hover:bg-[#E74F44]"
        >
          View Doctor
        </Link>
      </div>
    </article>
  );
}

export default DoctorCard;