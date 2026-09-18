import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

function ConnectUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#EBE3D0]">
      {/* Header */}
      <section className="border-b border-[#5E2325]/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-[fadeInUp_0.7s_ease-out]">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#E74F44]">
              Connect With Us
            </span>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-[#5E2325] sm:text-4xl">
              Have a question? We are here to help.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#284351]/70">
              Whether you need help with an appointment or want to know more
              about MediCare, feel free to get in touch with us.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Contact Information */}
            <div className="animate-[fadeInUp_0.8s_ease-out]">
              <h2 className="text-2xl font-bold text-[#5E2325]">Let’s talk.</h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#284351]/65">
                Our team is always ready to help you with your MediCare
                experience.
              </p>

              <div className="mt-8 space-y-5">
                <ContactItem
                  icon={Mail}
                  title="Email"
                  value="support@medicare.com"
                />

                <ContactItem
                  icon={Phone}
                  title="Phone"
                  value="+20 100 000 0000"
                />

                <ContactItem icon={MapPin} title="Location" value="Egypt" />

                <ContactItem
                  icon={MessageCircle}
                  title="Support"
                  value="Available for your questions"
                />
              </div>
            </div>

            {/* Form */}
            <div className="animate-[fadeInUp_1s_ease-out] rounded-xl border border-[#5E2325]/10 bg-[#EBE3D1] p-6 shadow-sm transition duration-300 hover:shadow-md sm:p-7">
              {submitted ? (
                <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5E2325] text-[#EBE3D1]">
                    <Send size={22} />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-[#5E2325]">
                    Message Sent
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[#284351]/65">
                    Thank you for contacting MediCare. We received your message
                    successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-lg bg-[#5E2325] px-5 py-2.5 text-sm font-semibold text-[#EBE3D1] transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E74F44]">
                      Contact Form
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-[#5E2325]">
                      Send us a message
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-semibold text-[#284351]"
                      >
                        Your Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-[#5E2325]/15 bg-[#EBE3D0] px-3.5 py-2.5 text-sm text-[#284351] outline-none transition focus:border-[#E74F44] focus:ring-2 focus:ring-[#E74F44]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold text-[#284351]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-[#5E2325]/15 bg-[#EBE3D0] px-3.5 py-2.5 text-sm text-[#284351] outline-none transition focus:border-[#E74F44] focus:ring-2 focus:ring-[#E74F44]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-xs font-semibold text-[#284351]"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Write your message..."
                        className="w-full resize-none rounded-lg border border-[#5E2325]/15 bg-[#EBE3D0] px-3.5 py-2.5 text-sm text-[#284351] outline-none transition focus:border-[#E74F44] focus:ring-2 focus:ring-[#E74F44]/10"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5E2325] px-5 py-3 text-sm font-semibold text-[#EBE3D1] transition duration-300 hover:-translate-y-1 hover:bg-[#E74F44]"
                    >
                      Send Message
                      <Send size={16} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ icon: Icon, title, value }) {
  return (
    <div className="flex items-start gap-3 transition duration-300 hover:translate-x-1">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5E2325] text-[#EBE3D1] transition duration-300 hover:bg-[#E74F44]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#E74F44]">
          {title}
        </p>

        <p className="mt-1 text-sm font-medium text-[#284351]">{value}</p>
      </div>
    </div>
  );
}

export default ConnectUsPage;
