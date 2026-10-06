"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { QR_URL, RATING } from "@/lib/config";
import { dictionary, type Lang } from "@/lib/i18n";
import { ParcelIcon } from "./ParcelIcon";
import { RiyadhMap } from "./RiyadhMap";
import { StoreBadges } from "./StoreBadges";

export function BennaTrackingHero({ initialLang = "en" }: { initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = dictionary[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const locale = lang === "ar" ? "ar-SA" : "en-US";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url);
  }, [lang, dir]);

  const ratingValue = useMemo(
    () =>
      new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
        RATING.value,
      ),
    [locale],
  );
  const ratingCount = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }).format(RATING.count),
    [locale],
  );

  return (
    <section
      dir={dir}
      lang={lang}
      className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-xl"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative flex flex-col items-center px-6 pb-8 pt-14 text-center sm:px-10 lg:py-14">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            aria-label={t.toggleAria}
            lang={lang === "en" ? "ar" : "en"}
            className="absolute end-4 top-4 rounded-full border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-benna"
          >
            {t.toggle}
          </button>

          <h1 className="max-w-md text-4xl font-extrabold tracking-tight text-balance text-neutral-900 sm:text-5xl sm:leading-[1.05]">
            {t.headline}
          </h1>
          <p className="mt-5 max-w-md text-base text-neutral-500 sm:text-lg">{t.subheadline}</p>

          <div className="mt-8 flex w-full max-w-sm items-center gap-4 rounded-2xl border border-neutral-100 bg-white p-4 text-start shadow-sm">
            <div className="shrink-0 rounded-xl border border-neutral-100 bg-white p-2 shadow-sm">
              <QRCodeSVG
                value={QR_URL}
                size={112}
                level="H"
                marginSize={0}
                fgColor="#111827"
                role="img"
                aria-label={t.qrAlt}
                title={t.qrAlt}
                imageSettings={{
                  src: "/benna-app-icon.png",
                  height: 26,
                  width: 26,
                  excavate: true,
                }}
              />
            </div>
            <p className="text-base font-semibold text-neutral-800 sm:text-lg">{t.scan}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/benna-app-icon.png"
                alt={t.iconAlt}
                width={48}
                height={48}
                className="size-12 rounded-xl shadow-sm ring-1 ring-black/5"
              />
              <div className="text-start">
                <div className="flex items-center gap-1.5" role="img" aria-label={t.ratingAria(ratingValue)}>
                  <span className="flex text-benna-500" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className="size-3.5 fill-current">
                        <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.9l-5.25 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                      </svg>
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-neutral-800" aria-hidden="true">
                    {ratingValue}
                  </span>
                </div>
                <p className="text-xs text-neutral-500">{t.ratings(ratingCount)}</p>
              </div>
            </div>
            <StoreBadges t={t} />
          </div>
        </div>

        <MapPanel t={t} lang={lang} />
      </div>
    </section>
  );
}

function MapPanel({ t, lang }: { t: (typeof dictionary)[Lang]; lang: Lang }) {
  return (
    <div className="relative h-80 overflow-hidden border-t border-neutral-100 sm:h-96 lg:h-auto lg:min-h-[560px] lg:border-t-0 lg:border-s">
      <RiyadhMap lang={lang} label={t.mapAria} />

      <div className="absolute bottom-4 end-4 flex items-center gap-3 rounded-2xl sm:bottom-auto sm:end-auto sm:start-4 sm:top-4 bg-white/95 p-2.5 pe-4 shadow-lg ring-1 ring-black/5 backdrop-blur">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
        </span>
        <div className="text-start leading-tight">
          <p className="text-[11px] font-medium text-neutral-500">{t.orderLabel}</p>
          <p className="text-sm font-semibold text-neutral-900">{t.status}</p>
          <p className="text-xs text-neutral-500">{t.eta}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
        <span className="absolute left-0 top-0 size-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-benna-500/30" />
        <span className="absolute left-0 top-0 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-benna-500/15" />
        <span className="absolute left-0 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3.5px] border-neutral-900 bg-white" />
        <div className="absolute bottom-2 left-0 -translate-x-1/2">
          <div className="flex animate-float flex-col items-center">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-black/5 sm:size-24">
              <ParcelIcon className="size-14 sm:size-16" />
            </div>
            <span className="h-7 w-0.5 rounded-full bg-neutral-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
