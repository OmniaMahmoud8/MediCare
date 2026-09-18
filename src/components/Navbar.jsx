import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Services", path: "/services" },
    { name: "Appointments", path: "/appointments" },
    { name: "Profile", path: "/profile" },
    { name: "Connect Us", path: "/connect" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`${
        isHomePage
          ? "absolute left-0 right-0 top-0"
          : "sticky top-0 bg-[#5E2325]"
      } z-50`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="MediCare Logo"
              className="h-12 w-12 rounded-full object-cover"
            />

            <span className="text-xl font-bold text-[#EBE3D1]">MediCare</span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-semibold drop-shadow-sm transition ${
                    isActive
                      ? "text-white"
                      : "text-[#EBE3D1]/90 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#E74F44]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EBE3D1] text-[#5E2325] shadow-sm md:hidden"
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={`rounded-b-xl border-t py-3 md:hidden ${
              isHomePage
                ? "border-[#EBE3D1]/20 bg-[#284351]/85"
                : "border-[#EBE3D1]/15"
            }`}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#EBE3D1] text-[#5E2325]"
                        : "text-[#EBE3D1]/90 hover:bg-[#EBE3D1]/10 hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
