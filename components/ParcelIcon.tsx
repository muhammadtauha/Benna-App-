export function ParcelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="32" cy="58" rx="22" ry="4" fill="#000" opacity="0.08" />
      <polygon points="32,6 57,18.5 32,31 7,18.5" fill="#E9B87C" />
      <polygon points="7,18.5 32,31 32,57 7,44.5" fill="#C98B4E" />
      <polygon points="32,31 57,18.5 57,44.5 32,57" fill="#A96E37" />
      <polygon points="15.6,14.8 23,11 48.4,23.7 41,27.5" fill="#3A3794" />
      <polygon points="41,27.5 48.4,23.7 48.4,49.7 41,53.5" fill="#25235F" />
      <polygon points="11,30 22,35.5 22,42.5 11,37" fill="#FFFFFF" opacity="0.9" />
      <polygon points="13,33.2 20,36.7 20,37.9 13,34.4" fill="#C98B4E" opacity="0.7" />
      <polygon points="13,35.8 18,38.3 18,39.5 13,37" fill="#C98B4E" opacity="0.7" />
      <polyline
        points="7,18.5 32,31 57,18.5"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
    </svg>
  );
}
