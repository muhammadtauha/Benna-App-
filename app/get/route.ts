import { type NextRequest, NextResponse } from "next/server";
import { APP_STORE_URL, PLAY_STORE_URL, WEB_APP_URL } from "@/lib/config";

export function GET(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const target = /iPhone|iPad|iPod/i.test(ua)
    ? APP_STORE_URL
    : /Android/i.test(ua)
      ? PLAY_STORE_URL
      : WEB_APP_URL;

  return NextResponse.redirect(target, 302);
}
