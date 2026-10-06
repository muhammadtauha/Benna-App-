import { BennaTrackingHero } from "@/components/BennaTrackingHero";
import { isLang } from "@/lib/i18n";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;

  return (
    <main className="flex min-h-dvh items-stretch p-3 sm:p-4">
      <BennaTrackingHero initialLang={isLang(lang) ? lang : "en"} />
    </main>
  );
}
