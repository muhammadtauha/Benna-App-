import { BennaTrackingHero } from "@/components/BennaTrackingHero";
import { isLang } from "@/lib/i18n";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center px-4 py-8 sm:px-6 lg:py-16">
      <BennaTrackingHero initialLang={isLang(lang) ? lang : "en"} />
    </main>
  );
}
