export type Lang = "en" | "ar";

export const dictionary = {
  en: {
    headline: "Track all your orders in one spot",
    subheadline:
      "Get real-time tracking updates for all your building materials and orders on the Benna app.",
    scan: "Scan the QR code to start tracking",
    qrAlt: "QR code to download the Benna app",
    appStoreTop: "Download on the",
    appStoreBottom: "App Store",
    appStoreAria: "Download Benna on the App Store",
    playTop: "GET IT ON",
    playBottom: "Google Play",
    playAria: "Get Benna on Google Play",
    ratings: (n: string) => `(${n} ratings)`,
    ratingAria: (v: string) => `Rated ${v} out of 5`,
    toggle: "العربية",
    toggleAria: "Switch to Arabic",
    iconAlt: "Benna app icon",
    mapAria: "Map of Riyadh showing a live delivery route to your site",
    status: "Out for delivery",
    eta: "Arriving in 12 min",
    orderLabel: "Order #BN-20418",
  },
  ar: {
    headline: "تتبع جميع طلباتك في مكان واحد",
    subheadline:
      "احصل على تحديثات تتبع فورية لجميع مواد البناء وطلباتك عبر تطبيق بناء.",
    scan: "امسح رمز QR لبدء التتبع",
    qrAlt: "رمز QR لتحميل تطبيق بناء",
    appStoreTop: "حمّله من",
    appStoreBottom: "App Store",
    appStoreAria: "حمّل تطبيق بناء من App Store",
    playTop: "احصل عليه من",
    playBottom: "Google Play",
    playAria: "احصل على تطبيق بناء من Google Play",
    ratings: (n: string) => `(${n} تقييم)`,
    ratingAria: (v: string) => `التقييم ${v} من 5`,
    toggle: "English",
    toggleAria: "التبديل إلى الإنجليزية",
    iconAlt: "أيقونة تطبيق بناء",
    mapAria: "خريطة الرياض تعرض مسار توصيل مباشر إلى موقعك",
    status: "الطلب في الطريق",
    eta: "يصل خلال 12 دقيقة",
    orderLabel: "طلب رقم BN-20418",
  },
} as const;

export type Dictionary = (typeof dictionary)[Lang];

export function isLang(v: unknown): v is Lang {
  return v === "en" || v === "ar";
}
