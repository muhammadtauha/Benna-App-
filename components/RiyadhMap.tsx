"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

const W = 800;
const H = 600;
const CX = W / 2;
const CY = H / 2;
const EXTENT = 1100;
const MIN_VISIBLE_WIDTH = 560;

const range = (from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

const minorX = range(CX - EXTENT, CX + EXTENT, 70);
const minorY = range(CY - EXTENT, CY + EXTENT, 60);
const localX = minorX.map((x) => x + 35);
const localY = minorY.map((y) => y + 30);

const parks = [
  { x: 545, y: 130, w: 60, h: 45 },
  { x: 125, y: 190, w: 55, h: 50 },
  { x: 615, y: 430, w: 85, h: 40 },
  { x: 265, y: 545, w: 50, h: 45 },
  { x: 405, y: 10, w: 55, h: 40 },
  { x: 685, y: -110, w: 70, h: 50 },
  { x: 195, y: -175, w: 50, h: 60 },
  { x: 545, y: 670, w: 60, h: 45 },
  { x: 55, y: 730, w: 80, h: 40 },
  { x: 755, y: 250, w: 50, h: 45 },
];

type Label = { en: string; ar: string; x: number; y: number; rotate?: number };

const districts: Label[] = [
  { en: "AL OLAYA", ar: "العليا", x: 400, y: 338 },
  { en: "AL SULIMANIYAH", ar: "السليمانية", x: 190, y: 150 },
  { en: "AL WURUD", ar: "الورود", x: 610, y: 105 },
  { en: "AL MUROOJ", ar: "المروج", x: 640, y: 255 },
  { en: "AL RAHMANIYAH", ar: "الرحمانية", x: 170, y: 405 },
  { en: "AL MUHAMMADIYAH", ar: "المحمدية", x: 590, y: 520 },
  { en: "AL NAKHEEL", ar: "النخيل", x: 170, y: -40 },
  { en: "AL MASIF", ar: "المصيف", x: 600, y: -110 },
  { en: "AL MURSALAT", ar: "المرسلات", x: 400, y: -230 },
  { en: "AL WIZARAT", ar: "الوزارات", x: 230, y: 690 },
  { en: "AL MALAZ", ar: "الملز", x: 640, y: 700 },
  { en: "AL MATHAR", ar: "المعذر", x: -60, y: 560 },
  { en: "AL MUTAMARAT", ar: "المؤتمرات", x: 860, y: 380 },
];

const roads: Label[] = [
  { en: "King Fahd Rd", ar: "طريق الملك فهد", x: 320, y: 180, rotate: -90 },
  { en: "Olaya St", ar: "شارع العليا", x: 500, y: 420, rotate: -90 },
  { en: "King Abdullah Rd", ar: "طريق الملك عبدالله", x: 640, y: 82 },
  { en: "Makkah Al Mukarramah Rd", ar: "طريق مكة المكرمة", x: 180, y: 508 },
  { en: "Al Urubah Rd", ar: "طريق العروبة", x: 640, y: 412 },
  { en: "Takhassusi St", ar: "شارع التخصصي", x: 110, y: 300, rotate: -90 },
  { en: "King Fahd Rd", ar: "طريق الملك فهد", x: 320, y: 640, rotate: -90 },
  { en: "Olaya St", ar: "شارع العليا", x: 500, y: -60, rotate: -90 },
  { en: "Prince Sultan Rd", ar: "طريق الأمير سلطان", x: 420, y: 772 },
  { en: "Northern Ring Rd", ar: "الطريق الدائري الشمالي", x: 760, y: 52, rotate: 9 },
];

const majorRoads = [
  `M330 ${CY - EXTENT} V${CY + EXTENT}`,
  `M490 ${CY - EXTENT} V${CY + EXTENT}`,
  `M${CX - EXTENT} 90 H${CX + EXTENT}`,
  `M${CX - EXTENT} 520 H${CX + EXTENT}`,
  `M${CX - EXTENT} 420 H${CX + EXTENT}`,
  `M120 ${CY - EXTENT} V${CY + EXTENT}`,
  `M${CX - EXTENT} 780 H${CX + EXTENT}`,
  `M${CX - EXTENT} -150 H${CX + EXTENT}`,
];

const ROUTE = "M-700 480 H190 Q205 480 205 465 V300 H400";

function useViewBox() {
  const ref = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: W, h: H });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const k = Math.max(1, MIN_VISIBLE_WIDTH / width);
      setBox({ w: width * k, h: height * k });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, viewBox: `${CX - box.w / 2} ${CY - box.h / 2} ${box.w} ${box.h}` };
}

export function RiyadhMap({ lang, label }: { lang: Lang; label: string }) {
  const { ref, viewBox } = useViewBox();
  const font = lang === "ar" ? "var(--font-arabic), sans-serif" : "var(--font-inter), sans-serif";

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={label}
    >
      <rect x={CX - EXTENT} y={CY - EXTENT} width={EXTENT * 2} height={EXTENT * 2} fill="#F3F4F6" />
      <g transform={`rotate(-12 ${CX} ${CY})`}>
        <g stroke="#FFFFFF" strokeWidth="2.5">
          {localX.map((x) => (
            <line key={`lx${x}`} x1={x} y1={CY - EXTENT} x2={x} y2={CY + EXTENT} />
          ))}
          {localY.map((y) => (
            <line key={`ly${y}`} x1={CX - EXTENT} y1={y} x2={CX + EXTENT} y2={y} />
          ))}
        </g>
        <g stroke="#FFFFFF" strokeWidth="6">
          {minorX.map((x) => (
            <line key={`mx${x}`} x1={x} y1={CY - EXTENT} x2={x} y2={CY + EXTENT} />
          ))}
          {minorY.map((y) => (
            <line key={`my${y}`} x1={CX - EXTENT} y1={y} x2={CX + EXTENT} y2={y} />
          ))}
        </g>
        {parks.map((p) => (
          <rect key={`${p.x}-${p.y}`} {...p} rx="4" fill="#D7EFD9" />
        ))}
        <g fill="none" strokeLinecap="round">
          {majorRoads.map((d) => (
            <path key={`o${d}`} d={d} stroke="#E3E6EB" strokeWidth="18" />
          ))}
          {majorRoads.map((d) => (
            <path key={`i${d}`} d={d} stroke="#FFFFFF" strokeWidth="14" />
          ))}
          <path
            d="M-700 60 C 0 -40, 200 40, 520 -20 S 1100 100, 1500 160"
            stroke="#FDE7B0"
            strokeWidth="14"
          />
        </g>
        <g
          fill="#9CA3AF"
          fontFamily={font}
          fontSize="12"
          fontWeight="500"
          textAnchor="middle"
          style={{ paintOrder: "stroke" }}
          stroke="#F3F4F6"
          strokeWidth="3"
        >
          {roads.map((r) => (
            <text
              key={r.en}
              x={r.x}
              y={r.y}
              transform={r.rotate ? `rotate(${r.rotate} ${r.x} ${r.y})` : undefined}
            >
              {r[lang]}
            </text>
          ))}
        </g>
        <g
          fill="#A1A7B0"
          fontFamily={font}
          fontSize={lang === "ar" ? 15 : 13}
          fontWeight="600"
          letterSpacing={lang === "ar" ? 0 : 1.5}
          textAnchor="middle"
          style={{ paintOrder: "stroke" }}
          stroke="#F3F4F6"
          strokeWidth="4"
        >
          {districts.map((d) => (
            <text key={d.en} x={d.x} y={d.y}>
              {d[lang]}
            </text>
          ))}
        </g>
        <path
          d={ROUTE}
          fill="none"
          stroke="#111827"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={ROUTE}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="6 22"
          strokeLinecap="round"
          className="animate-route"
        />
      </g>
    </svg>
  );
}
