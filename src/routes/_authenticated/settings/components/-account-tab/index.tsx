import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { apiFetch, BASE } from "@/lib/api/client";
import { sessionQueryKey, sessionQueryOptions } from "@/lib/auth/session";
import { authClient } from "@/lib/auth/client";
import { SettingsCard, FieldLabel } from "../-settings-ui";

interface Props {
  onDeleteSuccess: () => void;
}

export function AccountTab({ onDeleteSuccess }: Props) {
  const queryClient = useQueryClient();
  const { data: session } = useQuery(sessionQueryOptions);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const passwordMutation = useMutation({
    mutationFn: () =>
      apiFetch<{ success: true }>("/api/v1/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      }),
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => apiFetch<void>("/api/v1/users/me", { method: "DELETE" }),
    onSuccess: async () => {
      await authClient.signOut();
      queryClient.removeQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: sessionQueryKey });
      onDeleteSuccess();
    },
  });

  const exportData = async () => {
    try {
      const res = await fetch(`${BASE}/api/v1/users/me/export`, { credentials: "include" });
      if (!res.ok) {
        toast.error("Export failed");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `imtherichest-${session?.user?.name ?? "data"}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Your data has been exported");
    } catch {
      toast.error("Export failed");
    }
  };

  return (
    <>
      <SettingsCard>
        <FieldLabel>Username</FieldLabel>
        <p className="mt-2 text-sm text-zinc-400">@{session?.user?.name}</p>
      </SettingsCard>
      <SettingsCard>
        <FieldLabel>Email</FieldLabel>
        <p className="mt-2 text-sm text-zinc-400">{session?.user?.email}</p>
      </SettingsCard>
      <SettingsCard>
        <FieldLabel>Change password</FieldLabel>
        <div className="mt-2 space-y-2">
          <Input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-zinc-950 border-zinc-800 rounded-none"
          />
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-zinc-950 border-zinc-800 rounded-none"
          />
          <button
            onClick={() => passwordMutation.mutate()}
            disabled={passwordMutation.isPending || !currentPassword || !newPassword}
            className="mt-1 bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-950 hover:bg-gold-light disabled:opacity-50"
          >
            {passwordMutation.isPending ? "Updating…" : "Update password"}
          </button>
        </div>
      </SettingsCard>

      <div className="bg-zinc-900 ring-1 ring-white/5 p-6">
        <FieldLabel>Your data</FieldLabel>
        <p className="mt-2 text-sm text-zinc-400">
          Download a copy of your profile, payments and preferences as a JSON file.
        </p>
        <button
          onClick={exportData}
          className="mt-4 inline-flex items-center gap-2 border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-200 hover:border-gold hover:text-gold"
        >
          <Download className="h-4 w-4" />
          Export my data
        </button>
      </div>

      <div className="bg-zinc-900 ring-1 ring-red-900/40 p-6">
        <FieldLabel>Danger zone</FieldLabel>
        <p className="mt-2 text-sm text-zinc-400">
          Permanently delete your account, profile and payment history. This action cannot be
          undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="mt-4 inline-flex items-center gap-2 bg-red-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-300 ring-1 ring-red-900/60 hover:bg-red-900/50">
              <Trash2 className="h-4 w-4" />
              Delete account
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-none border-zinc-800 bg-zinc-950">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-zinc-100">Delete your account?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                This will permanently remove your profile, payment history and preferences. You will
                be signed out immediately. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-none border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-900">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="rounded-none bg-red-700 text-zinc-50 hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
