import { Link } from "react-router";
import { Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#5E2325] text-[#EBE3D1]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <Link to="/" className="text-lg font-bold">
              MediCare
            </Link>

            <p className="mt-1 text-xs text-[#EBE3D1]/65">
              Better care. Better life.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              to="/doctors"
              className="text-xs text-[#EBE3D1]/70 transition hover:text-[#EBE3D1]"
            >
              Doctors
            </Link>

            <Link
              to="/services"
              className="text-xs text-[#EBE3D1]/70 transition hover:text-[#EBE3D1]"
            >
              Services
            </Link>

            <Link
              to="/appointments"
              className="text-xs text-[#EBE3D1]/70 transition hover:text-[#EBE3D1]"
            >
              Appointments
            </Link>

            <Link
              to="/connect"
              className="text-xs text-[#EBE3D1]/70 transition hover:text-[#EBE3D1]"
            >
              Connect Us
            </Link>
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-2 text-xs text-[#EBE3D1]/70">
            <Mail size={15} className="text-[#E74F44]" />
            support@medicare.com
          </div>
        </div>

        <div className="mt-6 border-t border-[#EBE3D1]/10 pt-5 text-center">
          <p className="text-[11px] text-[#EBE3D1]/50">
            © 2026 MediCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
