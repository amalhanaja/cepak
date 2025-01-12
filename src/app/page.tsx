import { SimpleLinkForm } from "@/components/links/simple-link-form";

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-7xl mx-auto px-4 items-center py-24">
      <section className="flex flex-col gap-4 items-center">
        <h1 className="font-extrabold text-4xl">CEPAK</h1>
        <p className="font-semibold text-2xl text-foreground/60">Pemangkas url menjadi lebih cepak dan shareable</p>
      </section>
      <SimpleLinkForm />
    </main>
  );
}
