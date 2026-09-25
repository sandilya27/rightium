/**
 * Rightium branding inside the Payload admin: the login-screen logo
 * and the small nav icon. Same mark as the site header.
 */

function Mark({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 26 26" width={size} height={size} aria-hidden>
      <defs>
        <linearGradient id="rightium-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#170b63" />
          <stop offset="1" stopColor="#3a1fd6" />
        </linearGradient>
      </defs>
      <rect width="26" height="26" rx="8" fill="url(#rightium-mark)" />
      <circle cx="12" cy="12" r="5.4" fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle cx="19.5" cy="6.5" r="3.4" fill="#8a7bff" />
    </svg>
  );
}

export function AdminLogo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <Mark size={40} />
      <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.035em" }}>Rightium</span>
    </span>
  );
}

export function AdminIcon() {
  return <Mark size={26} />;
}
