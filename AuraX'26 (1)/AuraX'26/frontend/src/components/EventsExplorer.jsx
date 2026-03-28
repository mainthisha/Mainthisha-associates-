import { useState } from "react";
import { EVENTS } from "../data/events";
import RegistrationModal from "./RegistrationModal";
import { useApp } from "../App";

const TAG_COLORS = {
  green:  { bg: "rgba(0,255,136,0.08)",  border: "rgba(0,255,136,0.35)",  text: "#00FF88" },
  cyan:   { bg: "rgba(0,229,255,0.08)",  border: "rgba(0,229,255,0.35)",  text: "#00e5ff" },
  amber:  { bg: "rgba(255,179,0,0.08)",  border: "rgba(255,179,0,0.35)",  text: "#ffb300" },
  pink:   { bg: "rgba(255,45,120,0.08)", border: "rgba(255,45,120,0.35)", text: "#ff2d78" },
  purple: { bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.35)", text: "#a855f7" },
};

const AVAIL_LABEL = {
  available: { color: "#00FF88", label: "Available" },
  limited:   { color: "#ffb300", label: "Limited Seats" },
  full:      { color: "#ff4466", label: "Full" },
};

function RegisterButton({ accent, disabled, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", padding: "11px",
        background: hov && !disabled ? accent : "transparent",
        border: `1px solid ${accent}`,
        color: hov && !disabled ? "#050a0e" : accent,
        fontFamily: "'Orbitron', monospace", fontSize: 11,
        fontWeight: 700, letterSpacing: 2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.22s",
      }}
    >
      {disabled ? "REGISTRATION CLOSED" : "REGISTER FOR EVENT"}
    </button>
  );
}

function EventCard({ event, onRegister }) {
  const [hovered, setHovered] = useState(false);
  const { bookmarks, toggleBookmark, registeredEvents } = useApp();
  const accent = event.accentColor || "#00FF88";
  const avail = AVAIL_LABEL[event.availability] || AVAIL_LABEL.available;
  const isBookmarked = bookmarks?.includes(event.id);
  const isRegistered = registeredEvents?.includes(event.id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0a1520",
        border: `1px solid ${hovered ? "rgba(0,255,136,0.45)" : "rgba(0,255,136,0.18)"}`,
        padding: "1.2rem",
        display: "flex", flexDirection: "column",
        transition: "all 0.22s",
        transform: hovered ? "translateY(-2px)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Top accent line on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${accent},transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.22s",
      }} />

      {/* Tags row */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8, paddingRight: 28 }}>
        {event.tags.map((t, i) => {
          const c = TAG_COLORS[event.tagColors?.[i] || "green"];
          return (
            <span key={t} style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: 9,
              letterSpacing: 2, padding: "3px 8px",
              border: `1px solid ${c.border}`, background: c.bg, color: c.text,
            }}>{t}</span>
          );
        })}
      </div>

      {/* Bookmark star */}
      <button
        onClick={() => toggleBookmark(event.id)}
        style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "transparent", border: "none", cursor: "pointer",
          color: isBookmarked ? "#ffb300" : "#3a6a52", fontSize: 16,
          transition: "color 0.2s",
        }}
      >★</button>

      {/* Title */}
      <div style={{
        fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700,
        color: "#e0ffe8", marginBottom: 6,
      }}>{event.title}</div>

      {/* Description */}
      <div style={{ fontSize: 13, color: "#7ab8a0", lineHeight: 1.55, marginBottom: 12, flex: 1 }}>
        {event.description}
      </div>

      {/* Info grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
        {[["TIME", event.time], ["VENUE", event.venue], ["TEAM SIZE", event.teamSize], ["PRIZE", event.prize]].map(([label, val]) => (
          <div key={label} style={{
            background: "#080f14", border: "1px solid rgba(0,255,136,0.08)", padding: "0.45rem 0.65rem",
          }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: 9,
              color: "#3a6a52", letterSpacing: 2, marginBottom: 2,
            }}>{label}</div>
            <div style={{ fontSize: 13, color: "#e0ffe8", fontWeight: 600 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Availability */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#7ab8a0" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: avail.color, display: "inline-block" }} />
          {isRegistered ? "Registered ✓" : "Registration"}
        </div>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: avail.color }}>
          {avail.label}
        </span>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {event.skills.map(s => (
          <span key={s} style={{
            fontSize: 10, color: "#7ab8a0",
            border: "1px solid rgba(0,255,136,0.12)", padding: "2px 8px",
            fontFamily: "'Share Tech Mono', monospace",
          }}>{s}</span>
        ))}
      </div>

      {/* Register button — green if already registered */}
      {isRegistered ? (
        <div style={{
          width: "100%", padding: "11px", textAlign: "center",
          border: "1px solid #00FF88", color: "#00FF88",
          fontFamily: "'Orbitron', monospace", fontSize: 11,
          fontWeight: 700, letterSpacing: 2, background: "rgba(0,255,136,0.06)",
        }}>
          REGISTERED ✓
        </div>
      ) : (
        <RegisterButton
          accent={accent}
          disabled={event.availability === "full"}
          onClick={() => onRegister(event)}
        />
      )}
    </div>
  );
}

export default function EventsExplorer() {
  const [activeEvent, setActiveEvent] = useState(null);
  const { toggleRegister } = useApp();

  const handleSuccess = (result, event) => {
    // Mark as registered in app context too
    toggleRegister(event.id);
  };

  return (
    <section id="events" style={{ position: "relative", zIndex: 2 }}>
      {/* Section header */}
      <div style={{ textAlign: "center", padding: "3rem 1rem 2rem" }}>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
          letterSpacing: 5, color: "#00FF88",
          border: "1px solid rgba(0,255,136,0.2)", padding: "5px 18px",
          display: "inline-block", marginBottom: 12, background: "rgba(0,255,136,0.05)",
        }}>EVENTS</div>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 700,
          color: "#00FF88", letterSpacing: 2,
        }}>EXPLORE EVENTS</div>
        <div style={{ fontSize: 14, color: "#7ab8a0", marginTop: 8 }}>
          8 events across coding, design, robotics, gaming and more
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 4rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.2rem",
      }}>
        {EVENTS.map(evt => (
          <EventCard key={evt.id} event={evt} onRegister={setActiveEvent} />
        ))}
      </div>

      {/* Registration Modal */}
      {activeEvent && (
        <RegistrationModal
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
          onSuccess={(result) => {
            handleSuccess(result, activeEvent);
            setActiveEvent(null);
          }}
        />
      )}
    </section>
  );
}