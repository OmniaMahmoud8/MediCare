import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-7xl font-bold text-[#5E2325]">404</p>

      <h1 className="mt-4 text-3xl font-bold text-[#284351]">Page Not Found</h1>

      <p className="mt-2 text-[#284351]/70">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/doctors"
        className="mt-6 rounded-lg bg-[#5E2325] px-6 py-3 font-medium text-white transition hover:bg-[#E74F44]"
      >
        Back to Doctors
      </Link>
    </section>
  );
}

export default NotFoundPage;
