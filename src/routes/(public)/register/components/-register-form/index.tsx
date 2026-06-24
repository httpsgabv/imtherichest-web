import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/form-field";
import { authClient } from "@/lib/auth-client";
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
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterSchema) => {
    const { error } = await authClient.signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
      username: data.username,
    } as Parameters<typeof authClient.signUp.email>[0]);

    if (error) {
      if (error.status === 409) {
        setError("email", { message: error.message ?? "Email already in use" });
      } else {
        setError("root", { message: error.message ?? "Registration failed" });
      }
      return;
    }

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
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormField
              label="Password"
              value={field.value}
              onChange={field.onChange}
              type="password"
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FormField
              label="Confirm password"
              value={field.value}
              onChange={field.onChange}
              type="password"
              error={errors.confirmPassword?.message}
            />
          )}
        />
        {errors.root ? <p className="text-xs text-destructive">{errors.root.message}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Creating account…" : "Create account"}
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
