import type { Lang } from "@/lib/i18n";

const W = 800;
const H = 600;
const CX = W / 2;
const CY = H / 2;
const EXTENT = 500;

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
];

type Label = { en: string; ar: string; x: number; y: number; rotate?: number };

const districts: Label[] = [
  { en: "AL OLAYA", ar: "العليا", x: 400, y: 338 },
  { en: "AL SULIMANIYAH", ar: "السليمانية", x: 190, y: 150 },
  { en: "AL WURUD", ar: "الورود", x: 610, y: 105 },
  { en: "AL MUROOJ", ar: "المروج", x: 640, y: 255 },
  { en: "AL RAHMANIYAH", ar: "الرحمانية", x: 170, y: 405 },
  { en: "AL MUHAMMADIYAH", ar: "المحمدية", x: 590, y: 520 },
];

const roads: Label[] = [
  { en: "King Fahd Rd", ar: "طريق الملك فهد", x: 320, y: 180, rotate: -90 },
  { en: "Olaya St", ar: "شارع العليا", x: 500, y: 420, rotate: -90 },
  { en: "King Abdullah Rd", ar: "طريق الملك عبدالله", x: 640, y: 82 },
  { en: "Makkah Al Mukarramah Rd", ar: "طريق مكة المكرمة", x: 180, y: 508 },
  { en: "Al Urubah Rd", ar: "طريق العروبة", x: 640, y: 412 },
  { en: "Takhassusi St", ar: "شارع التخصصي", x: 110, y: 300, rotate: -90 },
];

const majorRoads = [
  `M330 ${CY - EXTENT} V${CY + EXTENT}`,
  `M490 ${CY - EXTENT} V${CY + EXTENT}`,
  `M${CX - EXTENT} 90 H${CX + EXTENT}`,
  `M${CX - EXTENT} 520 H${CX + EXTENT}`,
  `M${CX - EXTENT} 420 H${CX + EXTENT}`,
  `M120 ${CY - EXTENT} V${CY + EXTENT}`,
];

const ROUTE = "M-120 480 H190 Q205 480 205 465 V300 H400";

export function RiyadhMap({ lang, label }: { lang: Lang; label: string }) {
  const font = lang === "ar" ? "var(--font-arabic), sans-serif" : "var(--font-inter), sans-serif";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={label}
    >
      <rect width={W} height={H} fill="#F3F4F6" />
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
            d={`M${CX - EXTENT} -40 C 200 40, 520 -20, ${CX + EXTENT} 140`}
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
