import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentCard from "../components/AppointmentCard";
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
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

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // GET Appointments

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAppointments();

      setAppointments(data);
    } catch {
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getAppointments();

        setAppointments(data);
      } catch {
        setError("Failed to load appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Edit Appointment

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);

    reset({
      date: appointment.date,
      time: appointment.time,
      note: appointment.note || "",
    });

    setFeedback("");
    setError("");
  };

  // PUT — Update / Reschedule

  const handleUpdate = async (formData) => {
    if (!editingAppointment) {
      return;
    }

    try {
      setFeedback("");
      setError("");

      const updatedAppointment = {
        ...editingAppointment,
        date: formData.date,
        time: formData.time,
        note: formData.note.trim(),
      };

      const data = await updateAppointment(
        editingAppointment.id,
        updatedAppointment,
      );

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          String(appointment.id) === String(editingAppointment.id)
            ? data
            : appointment,
        ),
      );

      setEditingAppointment(null);
      reset();

      setFeedback("Appointment updated successfully.");
    } catch {
      setError("Failed to update appointment. Please try again.");
    }
  };

  // DELETE — Cancel Appointment

  const handleDelete = async (appointment) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel the appointment with ${appointment.doctorName}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setFeedback("");
      setError("");
      setDeletingId(appointment.id);

      await deleteAppointment(appointment.id);

      setAppointments((currentAppointments) =>
        currentAppointments.filter(
          (item) => String(item.id) !== String(appointment.id),
        ),
      );

      setFeedback("Appointment cancelled successfully.");
    } catch {
      setError("Failed to cancel appointment. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Loading State

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#5E2325]/20 border-t-[#5E2325]" />

          <p className="mt-4 font-medium text-[#284351]">
            Loading appointments...
          </p>
        </div>
      </section>
    );
  }

  // Error State

  if (error && appointments.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E74F44]/10 text-2xl font-bold text-[#E74F44]">
            !
          </div>

          <h1 className="mt-4 text-xl font-bold text-[#5E2325]">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#284351]/70">{error}</p>

          <Button
            type="button"
            onClick={fetchAppointments}
            className="mt-5 bg-[#5E2325] text-white hover:bg-[#E74F44]"
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      {/* Page Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#E74F44]">
          Appointment Management
        </p>

        <h1 className="text-3xl font-bold text-[#5E2325] sm:text-4xl">
          My Appointments
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-[#284351]/75">
          View, reschedule, or cancel your medical appointments.
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {feedback}
        </div>
      )}

      {error && appointments.length > 0 && (
        <div className="mb-6 rounded-xl border border-[#E74F44]/20 bg-[#E74F44]/10 px-4 py-3 text-sm font-medium text-[#E74F44]">
          {error}
        </div>
      )}

      {/* Edit Form */}
      {editingAppointment && (
        <Card className="mb-8 border-[#5E2325]/10 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-[#5E2325]">
              Edit Appointment
            </CardTitle>

            <p className="text-sm text-[#284351]/65">
              Reschedule your appointment with{" "}
              <span className="font-semibold">
                {editingAppointment.doctorName}
              </span>
              .
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="edit-date">Date</Label>

                  <Input
                    id="edit-date"
                    type="date"
                    className="mt-2"
                    {...register("date", {
                      required: "Date is required.",
                    })}
                  />

                  {errors.date && (
                    <p className="mt-1 text-sm text-[#E74F44]">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="edit-time">Time</Label>

                  <Input
                    id="edit-time"
                    type="text"
                    placeholder="Example: 10:00 AM"
                    className="mt-2"
                    {...register("time", {
                      required: "Time is required.",
                    })}
                  />

                  {errors.time && (
                    <p className="mt-1 text-sm text-[#E74F44]">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="edit-note">Note</Label>

                <Textarea
                  id="edit-note"
                  placeholder="Add an optional note..."
                  className="mt-2"
                  {...register("note", {
                    maxLength: {
                      value: 300,
                      message: "Note cannot exceed 300 characters.",
                    },
                  })}
                />

                {errors.note && (
                  <p className="mt-1 text-sm text-[#E74F44]">
                    {errors.note.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#5E2325] text-white hover:bg-[#E74F44]"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    setEditingAppointment(null);
                    reset();
                  }}
                  className="bg-[#284351] text-white hover:bg-[#5E2325]"
                >
                  Cancel Edit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {appointments.length === 0 ? (
        <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBE3D1] text-2xl">
            📅
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#5E2325]">
            No appointments yet
          </h2>

          <p className="mt-2 text-[#284351]/70">
            You do not have any appointments at the moment.
          </p>
        </div>
      ) : (
        <>
          {/* Appointment Count */}
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#284351]">Appointments</h2>

            <p className="mt-1 text-sm text-[#284351]/60">
              {appointments.length}{" "}
              {appointments.length === 1 ? "appointment" : "appointments"} found
            </p>
          </div>

          {/* Appointment Cards */}
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deletingId === appointment.id}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default AppointmentsPage;
