import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import useAppStore from "../stores/useAppStore";

function ProfilePage() {
  const currentPatient = useAppStore((state) => state.currentPatient);
  const setCurrentPatient = useAppStore((state) => state.setCurrentPatient);
  const updateCurrentPatient = useAppStore(
    (state) => state.updateCurrentPatient,
  );

  const [feedback, setFeedback] = useState("");

  // useRef — Uncontrolled Input

  const nameInputRef = useRef(null);

  // React Hook Form

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: currentPatient?.name || "",
      email: currentPatient?.email || "",
      phone: currentPatient?.phone || "",
    },
  });

  const nameField = register("name", {
    required: "Full name is required.",
    minLength: {
      value: 3,
      message: "Full name must be at least 3 characters.",
    },
  });

  // Create / Update Profile

  const handleProfileSubmit = (formData) => {
    const patientData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    if (currentPatient) {
      updateCurrentPatient(patientData);
    } else {
      setCurrentPatient(patientData);
    }

    setFeedback(
      currentPatient
        ? "Profile updated successfully."
        : "Profile created successfully.",
    );
  };

  // useRef Action

  const handleFocusName = () => {
    nameInputRef.current?.focus();
  };

  return (
    <section>
      {/* Page Header */}

      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#E74F44]">
          {currentPatient ? "Personal Information" : "Get Started"}
        </p>

        <h1 className="text-3xl font-bold text-[#5E2325] sm:text-4xl">
          {currentPatient ? "My Profile" : "Create Your Profile"}
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-[#284351]/75">
          {currentPatient
            ? "Manage your personal information used for your medical appointments."
            : "Create your profile before booking an appointment."}
        </p>
      </div>

      {/* Feedback */}

      {feedback && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {feedback}
        </div>
      )}

      {/*   Profile Card */}

      <Card className="max-w-3xl border-[#5E2325]/10 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-[#5E2325]">
            {currentPatient ? "Patient Information" : "Create Your Profile"}
          </CardTitle>

          <p className="text-sm text-[#284351]/65">
            {currentPatient
              ? "Keep your information up to date for your appointments."
              : "Enter your information so we can connect your appointments to your profile."}
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(handleProfileSubmit)}
            className="space-y-6"
          >
            {/* Full Name*/}

            <div>
              <Label htmlFor="profile-name">Full Name</Label>

              <Input
                id="profile-name"
                type="text"
                placeholder="Enter your full name"
                className="mt-2"
                {...nameField}
                ref={(element) => {
                  nameField.ref(element);
                  nameInputRef.current = element;
                }}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-[#E74F44]">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email*/}

            <div>
              <Label htmlFor="profile-email">Email</Label>

              <Input
                id="profile-email"
                type="email"
                placeholder="Enter your email"
                className="mt-2"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-[#E74F44]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}

            <div>
              <Label htmlFor="profile-phone">Phone</Label>

              <Input
                id="profile-phone"
                type="tel"
                placeholder="Enter your phone number"
                className="mt-2"
                {...register("phone", {
                  required: "Phone number is required.",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Phone number must contain 10 to 15 digits.",
                  },
                })}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-[#E74F44]">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Actions */}

            <div className="flex flex-col gap-3 border-t border-[#284351]/10 pt-5 sm:flex-row">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#5E2325] text-white hover:bg-[#E74F44]"
              >
                {isSubmitting
                  ? "Saving..."
                  : currentPatient
                    ? "Save Changes"
                    : "Create Profile"}
              </Button>

              <Button
                type="button"
                onClick={handleFocusName}
                className="bg-[#284351] text-white hover:bg-[#5E2325]"
              >
                Focus Name
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default ProfilePage;
