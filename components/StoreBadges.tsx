import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

const badgeLink =
  "inline-flex rounded-[10px] transition-all hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-benna focus-visible:ring-offset-2";

export function StoreBadges({ t }: { t: Dictionary }) {
  return (
    <div className="flex items-center gap-3">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.appStoreAria}
        className={badgeLink}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/badges/app-store-en.svg"
          alt=""
          width={135}
          height={40}
          className="h-10 w-auto sm:h-11"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.playAria}
        className={badgeLink}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/badges/google-play-en.svg"
          alt=""
          width={180}
          height={53}
          className="h-10 w-auto sm:h-11"
        />
      </a>
    </div>
  );
}
