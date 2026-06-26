import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import { notificationSettingsQueryOptions, type NotificationSettings } from "@/lib/api/users";
import { ToggleRow } from "../-settings-ui";

export function NotificationsTab() {
  const queryClient = useQueryClient();
  const { data } = useQuery(notificationSettingsQueryOptions);
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (patch: Partial<NotificationSettings>) =>
      apiFetch<NotificationSettings>("/api/v1/users/me/settings/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }),
    onSuccess: (updated) => {
      setSettings(updated);
      queryClient.setQueryData(notificationSettingsQueryOptions.queryKey, updated);
    },
  });

  if (!settings) return null;

  const toggle = (key: keyof NotificationSettings) => (v: boolean) => {
    setSettings((s) => (s ? { ...s, [key]: v } : s));
    mutation.mutate({ [key]: v });
  };

  return (
    <>
      <ToggleRow
        label="Achievement notifications"
        checked={settings.achievementAlerts}
        onCheckedChange={toggle("achievementAlerts")}
      />
      <ToggleRow
        label="Rank change alerts"
        checked={settings.rankAlerts}
        onCheckedChange={toggle("rankAlerts")}
      />
      <ToggleRow
        label="Payment confirmations"
        checked={settings.paymentConfirmations}
        onCheckedChange={toggle("paymentConfirmations")}
      />
      <ToggleRow
        label="Marketing emails"
        checked={settings.marketingEmails}
        onCheckedChange={toggle("marketingEmails")}
      />
    </>
  );
}
