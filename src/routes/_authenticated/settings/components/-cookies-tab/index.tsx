import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CookiesTab() {
  const [cookiePreference, setCookiePreference] = useState<"accepted" | "denied" | "unset">(
    "unset",
  );

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted" || stored === "denied") {
      setCookiePreference(stored);
    }
  }, []);

  const updateCookiePreference = (value: "accepted" | "denied") => {
    localStorage.setItem("cookie-consent", value);
    setCookiePreference(value);
    toast.success(
      value === "accepted" ? "Non-essential cookies accepted" : "Non-essential cookies denied",
    );
  };

  const resetCookiePreference = () => {
    localStorage.removeItem("cookie-consent");
    setCookiePreference("unset");
    toast.success("Cookie preference reset");
  };

  return (
    <div className="bg-zinc-900 ring-1 ring-white/5 p-6">
      <label className="text-xs uppercase tracking-widest text-zinc-500">Cookie preferences</label>
      <p className="mt-2 text-sm text-zinc-400">
        Essential cookies keep you signed in and secure the platform — they are always on. You can
        choose whether to allow non-essential cookies used to understand how the platform is used.
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
  );
}
