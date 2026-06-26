import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api/client";
import { profileQueryOptions, type Profile } from "@/lib/api/users";
import { SettingsCard, FieldLabel } from "../-settings-ui";

export function ProfileTab() {
  const queryClient = useQueryClient();
  const { data: profile } = useQuery(profileQueryOptions);
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [country, setCountry] = useState(profile?.country ?? "");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? "");
      setBio(profile.bio ?? "");
      setCountry(profile.country ?? "");
    }
  }, [profile]);

  const mutation = useMutation({
    mutationFn: () =>
      apiFetch<Profile>("/api/v1/users/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, bio, country }),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileQueryOptions.queryKey });
      toast.success("Profile updated");
    },
  });

  return (
    <>
      <SettingsCard>
        <FieldLabel>Display name</FieldLabel>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={60}
          className="mt-2 bg-zinc-950 border-zinc-800 rounded-none"
        />
      </SettingsCard>
      <SettingsCard>
        <FieldLabel>Bio</FieldLabel>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={280}
          className="mt-2 bg-zinc-950 border-zinc-800 rounded-none"
        />
      </SettingsCard>
      <SettingsCard>
        <FieldLabel>Country</FieldLabel>
        <Input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          maxLength={40}
          className="mt-2 bg-zinc-950 border-zinc-800 rounded-none"
        />
      </SettingsCard>
      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className="bg-gold px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-gold-light disabled:opacity-50"
      >
        {mutation.isPending ? "Saving…" : "Save profile"}
      </button>
    </>
  );
}
