import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileTab } from "./components/-profile-tab";
import { AccountTab } from "./components/-account-tab";
import { PrivacyTab } from "./components/-privacy-tab";
import { NotificationsTab } from "./components/-notifications-tab";
import { CookiesTab } from "./components/-cookies-tab";

export const Route = createFileRoute("/_authenticated/settings/")({
  head: () => ({ meta: [{ title: "Settings — ImTheRichest" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
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
            <TabsTrigger value="profile" className="rounded-none">
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-none">
              Account
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-none">
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-none">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="cookies" className="rounded-none">
              Cookies
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6 space-y-4">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="account" className="mt-6 space-y-4">
            <AccountTab onDeleteSuccess={() => navigate({ to: "/" })} />
          </TabsContent>
          <TabsContent value="privacy" className="mt-6 space-y-4">
            <PrivacyTab />
          </TabsContent>
          <TabsContent value="notifications" className="mt-6 space-y-4">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="cookies" className="mt-6 space-y-4">
            <CookiesTab />
          </TabsContent>
        </Tabs>
      </div>
      <SiteFooter />
    </div>
  );
}
