import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactSchema } from "../-schemas/contact-schema";
import { FormField } from "@/components/form-field";

interface ContactFormProps {
  onSubmitted: () => void;
}

export function ContactForm({ onSubmitted }: ContactFormProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (_data: ContactSchema) => {
    toast.success("Message sent. We'll get back to you soon.");
    reset();
    onSubmitted();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FormField
            label="Name"
            value={field.value}
            onChange={field.onChange}
            placeholder="Your name"
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormField
            label="Email"
            type="email"
            value={field.value}
            onChange={field.onChange}
            placeholder="you@example.com"
            error={errors.email?.message}
          />
        )}
      />
      <div>
        <label className="text-xs uppercase tracking-widest text-zinc-500">Message</label>
        <textarea
          {...register("message")}
          rows={5}
          className="mt-2 w-full resize-none rounded-none border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none ring-gold placeholder:text-zinc-600 focus:ring-1"
          placeholder="How can we help?"
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        ) : null}
      </div>
      <button
        type="submit"
        className="bg-gold px-6 py-2.5 text-sm font-semibold text-zinc-950 ring-1 ring-gold transition-colors hover:bg-gold-light"
      >
        Send Message
      </button>
    </form>
  );
}
