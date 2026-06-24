import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Settings as SettingsIcon, Download, Trash2 } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { useAppStore, selectCurrentUser } from "@/store/app-store";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — ImTheRichest" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const currentUser = useAppStore(selectCurrentUser);
  const setUser = useAppStore((s) => s.setUser);
  const privacy = useAppStore((s) => s.privacy);
  const setPrivacy = useAppStore((s) => s.setPrivacy);
  const notifications = useAppStore((s) => s.notifications);
  const setNotifications = useAppStore((s) => s.setNotifications);
  const signOut = useAppStore((s) => s.signOut);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(currentUser?.displayName ?? "");
  const [bio, setBio] = useState(currentUser?.bio ?? "");
  const [country, setCountry] = useState(currentUser?.country ?? "");

  if (!currentUser) return null;

  const saveProfile = () => {
    setUser(currentUser.id, { displayName, bio, country });
    toast.success("Profile updated");
  };

  const exportData = () => {
    const state = useAppStore.getState();
    const payload = {
      exportedAt: new Date().toISOString(),
      profile: state.users[currentUser.id],
      payments: state.payments.filter((p) => p.userId === currentUser.id),
      privacy: state.privacy,
      notifications: state.notifications,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `imtherichest-${currentUser.username}-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Your data has been exported");
  };

  const deleteAccount = () => {
    signOut();
    toast.success("Account deleted");
    navigate({ to: "/" });
  };

  const [cookiePreference, setCookiePreference] = useState<"accepted" | "denied" | "unset">("unset");

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted" || stored === "denied") {
      setCookiePreference(stored);
    }
  }, []);

  const updateCookiePreference = (value: "accepted" | "denied") => {
    localStorage.setItem("cookie-consent", value);
    setCookiePreference(value);
    toast.success(value === "accepted" ? "Non-essential cookies accepted" : "Non-essential cookies denied");
  };

  const resetCookiePreference = () => {
    localStorage.removeItem("cookie-consent");
    setCookiePreference("unset");
    toast.success("Cookie preference reset");
  };

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-7 w-7 text-gold" strokeWidth={1.5} />
          <h1 className="text-3xl font-medium text-zinc-100">Settings</h1>
        </div>
        <Tabs defaultValue="profile" className="mt-8">
          <TabsList className="rounded-none bg-zinc-900">
            <TabsTrigger value="profile" className="rounded-none">Profile</TabsTrigger>
            <TabsTrigger value="account" className="rounded-none">Account</TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-none">Privacy</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-none">Notifications</TabsTrigger>
            <TabsTrigger value="cookies" className="rounded-none">Cookies</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 space-y-4">
            <SettingsCard>
              <FieldLabel>Display name</FieldLabel>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={60} className="mt-2 bg-zinc-950 border-zinc-800 rounded-none" />
            </SettingsCard>
            <SettingsCard>
              <FieldLabel>Bio</FieldLabel>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={280} className="mt-2 bg-zinc-950 border-zinc-800 rounded-none" />
            </SettingsCard>
            <SettingsCard>
              <FieldLabel>Country</FieldLabel>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} maxLength={40} className="mt-2 bg-zinc-950 border-zinc-800 rounded-none" />
            </SettingsCard>
            <button onClick={saveProfile} className="bg-gold px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-gold-light">
              Save profile
            </button>
          </TabsContent>

          <TabsContent value="account" className="mt-6 space-y-4">
            <SettingsCard>
              <FieldLabel>Username</FieldLabel>
              <p className="mt-2 text-sm text-zinc-400">@{currentUser.username} <span className="ml-2 text-xs text-zinc-600">(cannot be changed in demo)</span></p>
            </SettingsCard>
            <SettingsCard>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="you@example.com" className="mt-2 bg-zinc-950 border-zinc-800 rounded-none" />
            </SettingsCard>
            <SettingsCard>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" placeholder="••••••••" className="mt-2 bg-zinc-950 border-zinc-800 rounded-none" />
            </SettingsCard>
            <ToggleRow label="Two-factor authentication" hint="Demo only — toggle is not enforced." />
            <ToggleRow label="Email verified" hint="Verified at sign-up in demo." defaultChecked />

            <div className="mt-8 bg-zinc-900 ring-1 ring-white/5 p-6">
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
                Permanently delete your account, profile and payment history. This action cannot be undone.
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
                      This will permanently remove your profile, payment history and preferences. You will be signed out immediately. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-none border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-900">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deleteAccount}
                      className="rounded-none bg-red-700 text-zinc-50 hover:bg-red-600"
                    >
                      Delete account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6 space-y-4">
            <ToggleRow label="Public profile visibility" defaultChecked={privacy.publicProfile} onChange={(v) => setPrivacy({ publicProfile: v })} />
            <ToggleRow label="Show total paid" defaultChecked={privacy.showTotalPaid} onChange={(v) => setPrivacy({ showTotalPaid: v })} />
            <ToggleRow label="Show achievements" defaultChecked={privacy.showAchievements} onChange={(v) => setPrivacy({ showAchievements: v })} />
            <ToggleRow label="Show activity history" defaultChecked={privacy.showActivity} onChange={(v) => setPrivacy({ showActivity: v })} />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-4">
            <ToggleRow label="Achievement notifications" defaultChecked={notifications.achievementAlerts} onChange={(v) => setNotifications({ achievementAlerts: v })} />
            <ToggleRow label="Rank change alerts" defaultChecked={notifications.rankAlerts} onChange={(v) => setNotifications({ rankAlerts: v })} />
            <ToggleRow label="Payment confirmations" defaultChecked={notifications.paymentConfirmations} onChange={(v) => setNotifications({ paymentConfirmations: v })} />
            <ToggleRow label="Marketing emails" defaultChecked={notifications.marketingEmails} onChange={(v) => setNotifications({ marketingEmails: v })} />
          </TabsContent>

          <TabsContent value="cookies" className="mt-6 space-y-4">
            <div className="bg-zinc-900 ring-1 ring-white/5 p-6">
              <FieldLabel>Cookie preferences</FieldLabel>
              <p className="mt-2 text-sm text-zinc-400">
                Essential cookies keep you signed in and secure the platform — they are always on. You can choose whether to allow non-essential cookies used to understand how the platform is used.
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-zinc-500">
                Current status:{" "}
                <span className="text-zinc-300">
                  {cookiePreference === "accepted"
                    ? "Accepted"
                    : cookiePreference === "denied"
                      ? "Denied"
                      : "Not set"}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => updateCookiePreference("accepted")}
                  disabled={cookiePreference === "accepted"}
                  className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-950 hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Accept cookies
                </button>
                <button
                  onClick={() => updateCookiePreference("denied")}
                  disabled={cookiePreference === "denied"}
                  className="border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-200 hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Deny cookies
                </button>
                <button
                  onClick={resetCookiePreference}
                  disabled={cookiePreference === "unset"}
                  className="border border-zinc-800 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                Read our{" "}
                <a href="/cookies" className="text-zinc-300 underline hover:text-gold">
                  cookie policy
                </a>{" "}
                for details on what we store and why.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <SiteFooter />
    </div>
  );
}

const SettingsCard = ({ children }: { children: ReactNode }) => (
  <div className="bg-zinc-900 ring-1 ring-white/5 p-6">{children}</div>
);

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <label className="text-xs uppercase tracking-widest text-zinc-500">{children}</label>
);

interface ToggleRowProps {
  label: string;
  hint?: string;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
}

const ToggleRow = ({ label, hint, defaultChecked, onChange }: ToggleRowProps) => {
  const [checked, setChecked] = useState<boolean>(!!defaultChecked);
  return (
    <div className="flex items-center justify-between bg-zinc-900 ring-1 ring-white/5 p-6">
      <div>
        <p className="text-sm text-zinc-100">{label}</p>
        {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={(v) => {
          setChecked(v);
          onChange?.(v);
        }}
      />
    </div>
  );
};