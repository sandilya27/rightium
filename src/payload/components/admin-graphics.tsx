/**
 * Rightium branding inside the Payload admin: the login-screen logo and
 * the small nav icon. Same mark as the site header — the name in a
 * serif with a teal square where the full stop would go.
 */

const serif = "Georgia, 'Times New Roman', serif";

function Dot({ size }: { size: number }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        backgroundColor: "#00a8b6",
        display: "inline-block",
        transform: "translateY(-1px)",
      }}
    />
  );
}

export function AdminLogo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
      <span
        style={{
          fontFamily: serif,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        Rightium
      </span>
      <Dot size={9} />
    </span>
  );
}

export function AdminIcon() {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
      <span style={{ fontFamily: serif, fontSize: 24, lineHeight: 1 }}>R</span>
      <Dot size={6} />
    </span>
  );
}
