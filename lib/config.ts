export const APP_STORE_URL =
  "https://apps.apple.com/sa/app/benna-%D8%A8%D9%86%D8%A7%D8%A1/id6763252606";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=benna.ksa.com.app";
export const WEB_APP_URL = "https://app.benna.com.sa";
export const APP_STORE_ID = "6763252606";

/**
 * URL encoded in the QR code. Point NEXT_PUBLIC_QR_URL at `<your-domain>/get`
 * to use the device-aware redirect (iOS → App Store, Android → Google Play).
 */
export const QR_URL = process.env.NEXT_PUBLIC_QR_URL || APP_STORE_URL;

/** Store rating shown in the trust footer. Keep in sync with the live listing. */
export const RATING = {
  value: Number(process.env.NEXT_PUBLIC_RATING_VALUE ?? 4.8),
  count: Number(process.env.NEXT_PUBLIC_RATING_COUNT ?? 1200),
};
