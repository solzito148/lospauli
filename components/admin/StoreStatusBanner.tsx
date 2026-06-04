import { isGitHubStoreConfigured } from "@/lib/github-store";

export function StoreStatusBanner() {
  const configured = isGitHubStoreConfigured();

  if (configured) {
    return null;
  }

  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      GitHub no está configurado en producción. En tu computadora los cambios se guardan
      localmente. Para que funcione en Vercel, configurá{" "}
      <code className="rounded bg-amber-100 px-1">GITHUB_TOKEN</code>,{" "}
      <code className="rounded bg-amber-100 px-1">GITHUB_OWNER</code> y{" "}
      <code className="rounded bg-amber-100 px-1">GITHUB_REPO</code>.
    </div>
  );
}
