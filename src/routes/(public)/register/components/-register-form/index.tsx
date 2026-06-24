import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/form-field";
import { registerUser } from "@/services/auth-service";
import { useAppStore } from "@/store/app-store";
import { registerSchema, type RegisterSchema } from "../../-schemas/register-schema";

interface RegisterFormProps {
  onRegister: () => void;
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", displayName: "", email: "" },
  });

  const onSubmit = (data: RegisterSchema) => {
    const taken = Object.values(useAppStore.getState().users).some(
      (u) => u.username === data.username.toLowerCase(),
    );
    if (taken) {
      setError("username", { message: "That username is already taken." });
      return;
    }
    registerUser(data);
    onRegister();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full space-y-4">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FormField
              label="Username"
              value={field.value}
              onChange={field.onChange}
              placeholder="your-name"
              error={errors.username?.message}
            />
          )}
        />
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <FormField
              label="Display name"
              value={field.value}
              onChange={field.onChange}
              placeholder="Your Name"
              error={errors.displayName?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormField
              label="Email"
              value={field.value}
              onChange={field.onChange}
              placeholder="you@example.com"
              type="email"
              error={errors.email?.message}
            />
          )}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          Create account
        </button>
      </form>
      <p className="mt-6 text-xs text-zinc-500">
        Already have one?{" "}
        <Link to="/login" className="text-gold hover:text-gold-light">
          Sign in
        </Link>
      </p>
    </>
  );
}
