import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import {
  createAppointment,
  getDoctorAvailability,
  getDoctorById,
} from "../services/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import useAppStore from "../stores/useAppStore";

function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  // Current Patient — Zustand

  const currentPatient = useAppStore((state) => state.currentPatient);

  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [doctorLoading, setDoctorLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [doctorError, setDoctorError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      date: "",
      time: "",
      note: "",
    },
  });

  // Get Doctor

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) {
        setDoctorError("No doctor was selected.");
        setDoctorLoading(false);
        return;
      }

      try {
        setDoctorLoading(true);
        setDoctorError("");

        const data = await getDoctorById(doctorId);

        setDoctor(data);
      } catch {
        setDoctorError("Failed to load doctor information.");
      } finally {
        setDoctorLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  // Get Doctor Availability

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!doctorId) {
        setAvailabilityLoading(false);
        return;
      }

      try {
        setAvailabilityLoading(true);
        setAvailabilityError("");

        const data = await getDoctorAvailability(doctorId);

        setAvailability(data);
      } catch {
        setAvailabilityError("Failed to load available appointment times.");
      } finally {
        setAvailabilityLoading(false);
      }
    };

    fetchAvailability();
  }, [doctorId]);

  // Submit Appointment

  const onSubmit = async (formData) => {
    if (!currentPatient) {
      setBookingError(
        "Please create your profile before booking an appointment.",
      );

      return;
    }

    try {
      setBookingError("");
      setBookingSuccess(false);

      const appointmentData = {
        patientName: currentPatient.name,
        email: currentPatient.email,
        phone: currentPatient.phone,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: formData.date,
        time: formData.time,
        note: formData.note.trim(),
        status: "Pending",
      };

      await createAppointment(appointmentData);

      setBookingSuccess(true);

      reset();
    } catch {
      setBookingError("We couldn't book your appointment. Please try again.");
    }
  };

  // Loading

  if (doctorLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#5E2325]/20 border-t-[#5E2325]" />

          <p className="mt-4 font-medium text-[#284351]">
            Loading doctor information...
          </p>
        </div>
      </section>
    );
  }

  // Doctor Error

  if (doctorError || !doctor) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E74F44]/10 text-xl font-bold text-[#E74F44]">
              !
            </div>

            <h1 className="mt-4 text-xl font-bold text-[#5E2325]">
              Unable to Continue
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#284351]/70">
              {doctorError || "Doctor information is not available."}
            </p>

            <Link
              to="/doctors"
              className="mt-6 inline-block rounded-xl bg-[#5E2325] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E74F44]"
            >
              Back to Doctors
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  // No Current Patient

  if (!currentPatient) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBE3D1] text-2xl">
              👤
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#5E2325]">
              Create Your Profile First
            </h1>

            <p className="mt-3 leading-7 text-[#284351]/70">
              Please create your profile before booking an appointment. Your
              profile information will be used for your appointment.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/profile"
                className="rounded-xl bg-[#5E2325] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E74F44]"
              >
                Create Profile
              </Link>

              <Link
                to={`/doctors/${doctor.id}`}
                className="rounded-xl border border-[#5E2325]/20 px-5 py-3 text-sm font-semibold text-[#5E2325] transition hover:bg-[#EBE3D1]"
              >
                Back to Doctor
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  // Success

  if (bookingSuccess) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              ✓
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#5E2325]">
              Appointment Booked Successfully
            </h1>

            <p className="mt-3 leading-7 text-[#284351]/70">
              Your appointment with{" "}
              <span className="font-semibold text-[#284351]">
                {doctor.name}
              </span>{" "}
              has been submitted successfully.
            </p>

            <p className="mt-2 text-sm text-[#284351]/60">
              Your appointment is currently pending confirmation.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/appointments"
                className="rounded-xl bg-[#5E2325] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E74F44]"
              >
                View My Appointments
              </Link>

              <Link
                to="/doctors"
                className="rounded-xl border border-[#5E2325]/20 px-5 py-3 text-sm font-semibold text-[#5E2325] transition hover:bg-[#EBE3D1]"
              >
                Find Another Doctor
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }
  // Booking Page

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8">
        <Link
          to={`/doctors/${doctor.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5E2325] transition hover:text-[#E74F44]"
        >
          ← Back to Doctor
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#E74F44]">
          Appointment Booking
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#5E2325] sm:text-4xl">
          Book Your Appointment
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-[#284351]/70">
          Complete the form below to request an appointment with your selected
          doctor.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/*Doctor Information*/}

        <Card className="h-fit overflow-hidden">
          <div className="bg-[#EBE3D1]">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-64 w-full object-cover"
            />
          </div>

          <CardContent className="p-6">
            <p className="text-sm font-semibold text-[#E74F44]">
              {doctor.specialty}
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#5E2325]">
              {doctor.name}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#284351]/70">
              {doctor.location}
            </p>

            <div className="mt-5 border-t border-[#284351]/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                Consultation Fee
              </p>

              <p className="mt-1 font-bold text-[#284351]">
                {doctor.consultationFee}
              </p>
            </div>
          </CardContent>
        </Card>

        {/*Booking Form*/}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-[#5E2325]">
              Patient Information
            </CardTitle>

            <p className="text-sm text-[#284351]/65">
              Booking as{" "}
              <span className="font-semibold">{currentPatient.name}</span>
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              {/* Current Patient Information */}

              <div className="rounded-xl bg-[#EBE3D0]/50 p-4">
                <p className="text-sm font-semibold text-[#284351]">
                  Patient Details
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                      Name
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#284351]">
                      {currentPatient.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-[#284351]">
                      {currentPatient.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#284351]">
                      {currentPatient.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date + Time */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-[#284351]"
                  >
                    Appointment Date
                  </Label>

                  <Input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date", {
                      required: "Appointment date is required.",
                    })}
                    className={errors.date ? "border-[#E74F44]" : ""}
                  />

                  {errors.date && (
                    <p className="mt-2 text-xs font-medium text-[#E74F44]">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="time"
                    className="mb-2 block text-sm font-semibold text-[#284351]"
                  >
                    Appointment Time
                  </Label>

                  <select
                    id="time"
                    {...register("time", {
                      required: "Appointment time is required.",
                    })}
                    disabled={availabilityLoading || availability.length === 0}
                    className={`h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none ${
                      errors.time ? "border-[#E74F44]" : "border-input"
                    }`}
                  >
                    <option value="">
                      {availabilityLoading
                        ? "Loading available times..."
                        : availability.length === 0
                          ? "No available times"
                          : "Select a time"}
                    </option>

                    {availability.map((slot) => (
                      <option key={slot.id} value={slot.availableSlots}>
                        {slot.availableSlots}
                      </option>
                    ))}
                  </select>

                  {availabilityError && (
                    <p className="mt-2 text-xs font-medium text-[#E74F44]">
                      {availabilityError}
                    </p>
                  )}

                  {errors.time && (
                    <p className="mt-2 text-xs font-medium text-[#E74F44]">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Note */}

              <div>
                <Label
                  htmlFor="note"
                  className="mb-2 block text-sm font-semibold text-[#284351]"
                >
                  Note
                  <span className="ml-1 font-normal text-[#284351]/50">
                    (Optional)
                  </span>
                </Label>

                <Textarea
                  id="note"
                  rows={4}
                  placeholder="Add any notes or symptoms you want the doctor to know..."
                  {...register("note", {
                    maxLength: {
                      value: 300,
                      message: "Note cannot exceed 300 characters.",
                    },
                  })}
                  className={errors.note ? "border-[#E74F44]" : ""}
                />

                {errors.note && (
                  <p className="mt-2 text-xs font-medium text-[#E74F44]">
                    {errors.note.message}
                  </p>
                )}
              </div>

              {/* API Error */}

              {bookingError && (
                <div className="rounded-xl border border-[#E74F44]/20 bg-[#E74F44]/10 p-4">
                  <p className="text-sm font-medium text-[#E74F44]">
                    {bookingError}
                  </p>
                </div>
              )}

              {/* Submit */}

              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  availabilityLoading ||
                  availability.length === 0
                }
                className="w-full bg-[#5E2325] py-5 text-white hover:bg-[#E74F44]"
              >
                {isSubmitting ? "Booking Appointment..." : "Book Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default BookAppointmentPage;
