import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookie-consent", "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-2xl">
      <p className="text-sm leading-relaxed text-zinc-400">
        We use cookies to keep you signed in, secure the platform, and understand how it's used. Please choose whether to accept or deny non-essential cookies. Read our{" "}
        <Link to="/cookies" className="text-zinc-200 underline transition-colors hover:text-gold">
          cookie policy
        </Link>
        ,{" "}
        <Link to="/terms" className="text-zinc-200 underline transition-colors hover:text-gold">
          terms
        </Link>
        , and{" "}
        <Link to="/privacy" className="text-zinc-200 underline transition-colors hover:text-gold">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleDeny}
          className="rounded-md border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900"
        >
          Deny
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gold/90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
