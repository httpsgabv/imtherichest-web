import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/form-field";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginSchema } from "../../-schemas/login-schema";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.status === 401 || error.status === 403) {
        setError("root", { message: "Invalid email or password" });
      } else {
        setError("root", { message: error.message ?? "Sign in failed" });
      }
      return;
    }

    onLogin();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full space-y-4">
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
        {errors.root ? <p className="text-xs text-destructive">{errors.root.message}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-xs text-zinc-500">
        No account yet?{" "}
        <Link to="/register" className="text-gold hover:text-gold-light">
          Register
        </Link>
      </p>
    </>
  );
}
