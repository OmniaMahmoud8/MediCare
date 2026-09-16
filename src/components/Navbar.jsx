import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="border-b border-[#5E2325]/20 bg-white shadow-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/doctors"
          className="text-xl font-bold tracking-tight text-[#5E2325]"
        >
          MediCare
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#5E2325] text-white"
                  : "text-[#284351] hover:bg-[#EBE3D1]"
              }`
            }
          >
            Doctors
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#5E2325] text-white"
                  : "text-[#284351] hover:bg-[#EBE3D1]"
              }`
            }
          >
            My Appointments
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#5E2325] text-white"
                  : "text-[#284351] hover:bg-[#EBE3D1]"
              }`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
