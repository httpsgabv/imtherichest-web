import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import { privacySettingsQueryOptions, type PrivacySettings } from "@/lib/api/users";
import { ToggleRow } from "../-settings-ui";

export function PrivacyTab() {
  const queryClient = useQueryClient();
  const { data } = useQuery(privacySettingsQueryOptions);
  const [settings, setSettings] = useState<PrivacySettings | null>(null);

  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (patch: Partial<PrivacySettings>) =>
      apiFetch<PrivacySettings>("/api/v1/users/me/settings/privacy", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }),
    onSuccess: (updated) => {
      setSettings(updated);
      queryClient.setQueryData(privacySettingsQueryOptions.queryKey, updated);
    },
  });

  if (!settings) return null;

  const toggle = (key: keyof PrivacySettings) => (v: boolean) => {
    setSettings((s) => (s ? { ...s, [key]: v } : s));
    mutation.mutate({ [key]: v });
  };

  return (
    <>
      <ToggleRow
        label="Public profile visibility"
        checked={settings.publicProfile}
        onCheckedChange={toggle("publicProfile")}
      />
      <ToggleRow
        label="Show total paid"
        checked={settings.showTotalPaid}
        onCheckedChange={toggle("showTotalPaid")}
      />
      <ToggleRow
        label="Show achievements"
        checked={settings.showAchievements}
        onCheckedChange={toggle("showAchievements")}
      />
      <ToggleRow
        label="Show activity history"
        checked={settings.showActivity}
        onCheckedChange={toggle("showActivity")}
      />
    </>
  );
}
