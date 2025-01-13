import { LinkList } from "@/components/links/link-list";
import { SimpleLinkForm } from "@/components/links/simple-link-form";
import { getBaseUrl } from "@/services/config";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function Home() {
  const baseUrl = await getBaseUrl();
  return (
    <main className="flex flex-col w-full max-w-7xl mx-auto px-4 items-center py-24">
      <section className="flex flex-col gap-4 items-center">
        <h1 className="font-extrabold text-4xl">CEPAK</h1>
        <p className="font-semibold text-2xl text-foreground/60">
          Pemangkas url menjadi lebih cepak dan shareable
        </p>
      </section>
      <SimpleLinkForm />
      <Suspense fallback={<Loader2 className="animate-spin mt-8" />}>
        <LinkList baseUrl={baseUrl} />
      </Suspense>
    </main>
  );
}
