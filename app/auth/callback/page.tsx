"use client";

import { useEffect, useState } from "react";

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "redirecting" | "fallback">(
    "loading"
  );

  useEffect(() => {
    // Get the full URL including hash fragment
    const hash = window.location.hash;
    const search = window.location.search;

    // Supabase puts tokens in hash fragment: #access_token=...&refresh_token=...
    // Or sometimes in query params for certain flows
    const params = hash ? hash.substring(1) : search.substring(1);

    if (!params) {
      setStatus("fallback");
      return;
    }

    // Construct the deep link URL for the iOS app
    const appUrl = `kairos://auth/callback?${params}`;

    setStatus("redirecting");

    // Try to open the app
    window.location.href = appUrl;

    // If we're still here after a delay, show fallback UI
    const timeout = setTimeout(() => {
      setStatus("fallback");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="text-center p-8 max-w-md">
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-2 border-neutral-700 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-400">Processing authentication...</p>
          </>
        )}

        {status === "redirecting" && (
          <>
            <div className="w-12 h-12 border-2 border-neutral-700 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg mb-2">Opening Kairos...</p>
            <p className="text-neutral-400 text-sm">
              You should be redirected to the app automatically.
            </p>
          </>
        )}

        {status === "fallback" && (
          <>
            <h1 className="text-white text-xl mb-4">Authentication Complete</h1>
            <p className="text-neutral-400 mb-6">
              If Kairos didn&apos;t open automatically, tap the button below.
            </p>
            <button
              onClick={() => {
                const hash = window.location.hash;
                const search = window.location.search;
                const params = hash ? hash.substring(1) : search.substring(1);
                window.location.href = `kairos://auth/callback?${params}`;
              }}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              Open Kairos
            </button>
            <p className="text-neutral-500 text-sm mt-6">
              Don&apos;t have the app?{" "}
              <a href="https://apps.apple.com" className="text-blue-400 hover:underline">
                Download from App Store
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
