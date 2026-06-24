import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/form-field";
import { signInUser } from "@/services/auth-service";
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
    defaultValues: { username: "" },
  });

  const onSubmit = (data: LoginSchema) => {
    const user = signInUser(data.username);
    if (!user) {
      setError("username", { message: "No contender with that username. Try registering." });
      return;
    }
    onLogin();
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
              placeholder="arthur-sterling"
              error={errors.username?.message}
            />
          )}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          Sign in
        </button>
      </form>
      <p className="mt-6 text-xs text-zinc-500">
        No account yet?{" "}
        <Link to="/register" className="text-gold hover:text-gold-light">
          Register
        </Link>
      </p>
      <p className="mt-4 text-[11px] text-zinc-600 text-center">
        Demo tip: try signing in as <span className="text-gold">arthur-sterling</span> to inhabit
        the top contender.
      </p>
    </>
  );
}
