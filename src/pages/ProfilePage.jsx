import { useState } from "react";
import useAppStore from "../stores/useAppStore";

function ProfilePage() {
  const currentPatient = useAppStore((state) => state.currentPatient);
  const setCurrentPatient = useAppStore((state) => state.setCurrentPatient);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: currentPatient?.name || "",
    email: currentPatient?.email || "",
    phone: currentPatient?.phone || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setCurrentPatient(formData);
    setIsEditing(false);
  };

  if (!currentPatient) {
    return (
      <section className="min-h-[70vh] bg-[#EBE3D0] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-center">
          <div className="w-full rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] p-8 shadow-sm animate-[fadeInUp_0.6s_ease-out] sm:p-10">
            {/* Header */}

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#5E2325] text-2xl font-bold text-[#EBE3D1]">
                +
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#E74F44]">
                Patient Profile
              </p>

              <h1 className="mt-2 text-2xl font-bold text-[#5E2325] sm:text-3xl">
                Create Your Profile
              </h1>

              <p className="mt-3 leading-7 text-[#284351]/70">
                Please enter your personal information before booking an
                appointment.
              </p>
            </div>

            {/* Create Profile Form */}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#284351]"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition placeholder:text-[#284351]/45 focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#284351]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition placeholder:text-[#284351]/45 focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[#284351]"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition placeholder:text-[#284351]/45 focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#5E2325] px-6 py-3 text-sm font-semibold text-[#EBE3D1] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:shadow-md"
              >
                Create Profile
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-[#EBE3D0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#E74F44]">
            Personal Information
          </p>

          <h1 className="text-3xl font-bold text-[#5E2325] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-[#284351]/70">
            Manage your personal information and keep your healthcare profile
            up to date.
          </p>
        </div>

        {/* Profile Card */}

        <div className="overflow-hidden rounded-2xl border border-[#5E2325]/10 bg-[#EBE3D1] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg animate-[fadeInUp_0.8s_ease-out]">
          {/* Profile Header */}

          <div className="bg-[#5E2325] px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#EBE3D1] text-3xl font-bold text-[#5E2325] shadow-md">
                {formData.name.charAt(0).toUpperCase()}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-[#EBE3D1]">
                  {formData.name || "Patient"}
                </h2>

                <p className="mt-1 text-sm text-[#EBE3D1]/70">
                  MediCare Patient
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}

          <div className="p-6 sm:p-8">
            {!isEditing ? (
              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#284351]/10 bg-[#EBE3D0] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#E74F44]">
                      Full Name
                    </p>

                    <p className="mt-2 font-semibold text-[#284351]">
                      {formData.name || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#284351]/10 bg-[#EBE3D0] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#E74F44]">
                      Email
                    </p>

                    <p className="mt-2 break-all font-semibold text-[#284351]">
                      {formData.email || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#284351]/10 bg-[#EBE3D0] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#E74F44]">
                      Phone
                    </p>

                    <p className="mt-2 font-semibold text-[#284351]">
                      {formData.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#284351]/10 bg-[#EBE3D0] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#E74F44]/30">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#E74F44]">
                      Account
                    </p>

                    <p className="mt-2 font-semibold text-[#284351]">
                      Active Patient
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl bg-[#5E2325] px-6 py-3 text-sm font-semibold text-[#EBE3D1] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:shadow-md"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#284351]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#284351]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#284351]"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-4 py-3 text-sm text-[#284351] outline-none transition focus:border-[#5E2325] focus:ring-2 focus:ring-[#5E2325]/10"
                  />
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-[#284351]/20 bg-[#EBE3D0] px-6 py-3 text-sm font-semibold text-[#284351] transition duration-300 hover:-translate-y-1 hover:border-[#5E2325]/30 hover:bg-[#EBE3D1]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#5E2325] px-6 py-3 text-sm font-semibold text-[#EBE3D1] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44] hover:shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Information */}

        <div className="mt-6 rounded-2xl bg-[#284351] p-6 shadow-sm transition duration-300 hover:shadow-md animate-[fadeInUp_1s_ease-out]">
          <h2 className="text-lg font-bold text-[#EBE3D1]">
            Your Healthcare Profile
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#EBE3D1]/75">
            Keep your contact information updated so your appointment details
            and healthcare communication remain organized.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;