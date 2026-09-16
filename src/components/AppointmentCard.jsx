import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

function AppointmentCard({ appointment, onEdit, onDelete, isDeleting }) {
  return (
    <Card className="overflow-hidden border-[#5E2325]/10 bg-white shadow-sm transition hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-5">
          {/* Doctor Information */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-medium text-[#E74F44]">
                {appointment.specialty}
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#5E2325]">
                {appointment.doctorName}
              </h2>
            </div>

            <span className="w-fit rounded-full bg-[#EBE3D1] px-3 py-1 text-sm font-semibold text-[#284351]">
              {appointment.status}
            </span>
          </div>

          {/* Appointment Information */}
          <div className="grid gap-4 rounded-xl bg-[#EBE3D0]/40 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                Patient
              </p>

              <p className="mt-1 font-medium text-[#284351]">
                {appointment.patientName}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                Phone
              </p>

              <p className="mt-1 font-medium text-[#284351]">
                {appointment.phone}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                Date
              </p>

              <p className="mt-1 font-medium text-[#284351]">
                {appointment.date}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#284351]/50">
                Time
              </p>

              <p className="mt-1 font-medium text-[#284351]">
                {appointment.time}
              </p>
            </div>
          </div>

          {/* Note */}
          {appointment.note && (
            <div>
              <p className="text-sm font-semibold text-[#284351]">Note</p>

              <p className="mt-1 text-sm leading-6 text-[#284351]/70">
                {appointment.note}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-[#284351]/10 pt-5 sm:flex-row">
            <Button
              type="button"
              onClick={() => onEdit(appointment)}
              className="flex-1 bg-[#284351] text-white hover:bg-[#5E2325]"
            >
              Edit / Reschedule
            </Button>

            <Button
              type="button"
              onClick={() => onDelete(appointment)}
              disabled={isDeleting}
              className="flex-1 bg-[#E74F44] text-white hover:bg-[#5E2325]"
            >
              {isDeleting ? "Deleting..." : "Cancel Appointment"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AppointmentCard;
