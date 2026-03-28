import { useState } from "react";
import { useRegistration } from "../hooks/useRegistration";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPhone = (v) => /^[\d\s\+\-]{7,15}$/.test(v.trim());
const isUrl   = (v) => { if (!v.trim()) return true; try { new URL(v.trim()); return true; } catch { return false; } };

const TAG_COLORS = {
  green:  { bg: "rgba(0,255,136,0.08)",  border: "rgba(0,255,136,0.35)",  text: "#00FF88" },
  cyan:   { bg: "rgba(0,229,255,0.08)",  border: "rgba(0,229,255,0.35)",  text: "#00e5ff" },
  amber:  { bg: "rgba(255,179,0,0.08)",  border: "rgba(255,179,0,0.35)",  text: "#ffb300" },
  pink:   { bg: "rgba(255,45,120,0.08)", border: "rgba(255,45,120,0.35)", text: "#ff2d78" },
  purple: { bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.35)", text: "#a855f7" },
};

const inputStyle = {
  background: "#080f14", border: "1px solid rgba(0,255,136,0.18)",
  color: "#e0ffe8", fontFamily: "'Rajdhani', sans-serif", fontSize: 15,
  padding: "9px 12px", outline: "none", width: "100%", borderRadius: 0,
};

function Input({ error, ...props }) {
  return (
    <input
      style={{ ...inputStyle, ...(error ? { borderColor: "#ff4466" } : {}) }}
      onFocus={e => e.target.style.borderColor = "#00FF88"}
      onBlur={e => e.target.style.borderColor = error ? "#ff4466" : "rgba(0,255,136,0.18)"}
      {...props}
    />
  );
}

function Select({ error, children, ...props }) {
  return (
    <select
      style={{ ...inputStyle, ...(error ? { borderColor: "#ff4466" } : {}) }}
      onFocus={e => e.target.style.borderColor = "#00FF88"}
      onBlur={e => e.target.style.borderColor = error ? "#ff4466" : "rgba(0,255,136,0.18)"}
      {...props}
    >
      {children}
    </select>
  );
}

function Field({ label, optional, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
      <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: 2, color: "#00cc66" }}>
        {label}{optional && <span style={{ color: "#3a6a52", fontSize: 9 }}> (optional)</span>}
      </label>
      {children}
      {error && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#ff4466" }}>{error}</span>}
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
      color: "#00FF88", letterSpacing: 3, padding: "10px 0 8px",
    }}>
      <div style={{ flex: 1, height: 1, background: "rgba(0,255,136,0.18)" }} />
      {label}
      <div style={{ flex: 1, height: 1, background: "rgba(0,255,136,0.18)" }} />
    </div>
  );
}

function NeonButton({ color = "#00FF88", children, onClick, fullWidth, disabled }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "12px 28px",
        background: hovered ? color : "transparent",
        border: `1px solid ${color}`,
        color: hovered ? "#050a0e" : color,
        fontFamily: "'Orbitron', monospace",
        fontSize: 12, fontWeight: 700, letterSpacing: 3,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

function ExtraFields({ fields, values, errors, onChange }) {
  return fields.map((f) => (
    <Field key={f.name} label={f.label} error={errors[f.name]}>
      {f.type === "select" ? (
        <Select value={values[f.name] || ""} error={errors[f.name]} onChange={e => onChange(f.name, e.target.value)}>
          <option value="">-- Select --</option>
          {f.options.map(o => <option key={o}>{o}</option>)}
        </Select>
      ) : (
        <Input type="text" placeholder={f.placeholder || ""} value={values[f.name] || ""}
          error={errors[f.name]} onChange={e => onChange(f.name, e.target.value)} />
      )}
    </Field>
  ));
}

function TypeSelector({ event, onSelect }) {
  const [selected, setSelected] = useState(null);
  const accent = event.accentColor || "#00FF88";

  function TypeCard({ type, icon, title, desc }) {
    const active = selected === type;
    const [hov, setHov] = useState(false);
    return (
      <div
        onClick={() => setSelected(type)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex: 1, border: `1px solid ${active ? accent : hov ? "rgba(0,255,136,0.4)" : "rgba(0,255,136,0.18)"}`,
          background: active || hov ? "#0f1f2e" : "#0a1520",
          padding: "1.4rem 1.2rem", cursor: "pointer",
          transition: "all 0.22s", position: "relative",
          boxShadow: active ? `0 0 24px ${accent}18` : "none",
        }}
      >
        {active && (
          <div style={{
            position: "absolute", top: 10, right: 10,
            width: 10, height: 10, borderRadius: "50%",
            background: accent, boxShadow: `0 0 8px ${accent}`,
          }} />
        )}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg,transparent,${accent},transparent)`,
          opacity: active ? 1 : 0, transition: "opacity 0.22s" }} />
        <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
        <div style={{
          fontFamily: "'Orbitron', monospace", fontSize: 13, fontWeight: 700,
          color: active ? accent : "#e0ffe8", marginBottom: 4, letterSpacing: 1,
        }}>{title}</div>
        <div style={{ fontSize: 12, color: active ? "#7ab8a0" : "#3a6a52", lineHeight: 1.5 }}>{desc}</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: accent,
        letterSpacing: 3, marginBottom: 16, display: "flex", alignItems: "center", gap: 10,
      }}>
        STEP 01 — SELECT REGISTRATION TYPE
        <div style={{ flex: 1, height: 1, background: "rgba(0,255,136,0.18)" }} />
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <TypeCard type="solo" icon="👤" title="INDIVIDUAL" desc="Register as a solo participant and showcase your skills." />
        <TypeCard type="team" icon="⚡" title="TEAM" desc={`Register a team of up to ${(event.maxTeamMembers || 4) + 1} members.`} />
      </div>
      <NeonButton color={accent} onClick={() => selected && onSelect(selected)} disabled={!selected}>
        PROCEED →
      </NeonButton>
    </div>
  );
}

function IndividualForm({ event, onBack, onSuccess }) {
  const { loading, error: apiError, submitIndividual } = useRegistration();
  const accent = event.accentColor || "#00FF88";
  const extraFields = event.extraFields?.solo || [];
  const row = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };

  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", college: "",
    department: "", year_of_study: "", skills: "", github: "",
  });
  const [extra, setExtra] = useState({});
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setEx = (k, v) => setExtra(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.full_name.trim())  e.full_name = "Name is required";
    if (!isEmail(form.email))    e.email = "Valid email required";
    if (!isPhone(form.phone))    e.phone = "Valid phone required";
    if (!form.college.trim())    e.college = "College name required";
    if (!form.department.trim()) e.department = "Department required";
    if (!form.year_of_study)     e.year_of_study = "Please select year";
    if (!isUrl(form.github))     e.github = "Enter a valid URL";
    extraFields.forEach(f => {
      if (f.required && !extra[f.name]?.trim()) e[f.name] = `${f.label} is required`;
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const result = await submitIndividual(event.id, { ...form, ...extra });
      onSuccess(result, "individual");
    } catch (_) {}
  };

  return (
    <div>
      <button onClick={onBack} style={{
        background: "transparent", border: "1px solid rgba(0,255,136,0.18)",
        color: "#7ab8a0", fontFamily: "'Share Tech Mono', monospace",
        fontSize: 11, letterSpacing: 2, padding: "7px 14px", cursor: "pointer", marginBottom: 16,
      }}>← BACK</button>

      <div style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: accent,
        letterSpacing: 3, marginBottom: 16, display: "flex", alignItems: "center", gap: 10,
      }}>
        STEP 02 — INDIVIDUAL REGISTRATION
        <div style={{ flex: 1, height: 1, background: "rgba(0,255,136,0.18)" }} />
      </div>

      <div style={{ border: "1px solid rgba(0,255,136,0.18)", background: "#0a1520", padding: "1.6rem" }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, color: accent, marginBottom: 4 }}>
          PARTICIPANT DETAILS
        </div>
        <div style={{ fontSize: 13, color: "#3a6a52", marginBottom: 20 }}>Fill in your details to register for {event.title}</div>

        <div style={row}>
          <Field label="FULL NAME" error={errors.full_name}>
            <Input value={form.full_name} error={errors.full_name} placeholder="Your full name" onChange={e => set("full_name", e.target.value)} />
          </Field>
          <Field label="EMAIL ADDRESS" error={errors.email}>
            <Input type="email" value={form.email} error={errors.email} placeholder="you@email.com" onChange={e => set("email", e.target.value)} />
          </Field>
        </div>
        <div style={row}>
          <Field label="PHONE NUMBER" error={errors.phone}>
            <Input value={form.phone} error={errors.phone} placeholder="+91 98765 43210" onChange={e => set("phone", e.target.value)} />
          </Field>
          <Field label="YEAR OF STUDY" error={errors.year_of_study}>
            <Select value={form.year_of_study} error={errors.year_of_study} onChange={e => set("year_of_study", e.target.value)}>
              <option value="">-- Select Year --</option>
              {["1st Year","2nd Year","3rd Year","4th Year","Postgraduate"].map(y => <option key={y}>{y}</option>)}
            </Select>
          </Field>
        </div>
        <div style={row}>
          <Field label="COLLEGE NAME" error={errors.college}>
            <Input value={form.college} error={errors.college} placeholder="Your institution" onChange={e => set("college", e.target.value)} />
          </Field>
          <Field label="DEPARTMENT" error={errors.department}>
            <Input value={form.department} error={errors.department} placeholder="e.g. Computer Science" onChange={e => set("department", e.target.value)} />
          </Field>
        </div>

        <ExtraFields fields={extraFields} values={extra} errors={errors} onChange={setEx} />

        <Field label="SKILLS" optional>
          <Input value={form.skills} placeholder="e.g. Python, React, Figma…" onChange={e => set("skills", e.target.value)} />
        </Field>
        <Field label="GITHUB / PORTFOLIO" optional error={errors.github}>
          <Input value={form.github} placeholder="https://github.com/username" onChange={e => set("github", e.target.value)} />
        </Field>

        {apiError && (
          <div style={{
            background: "rgba(255,68,102,0.08)", border: "1px solid rgba(255,68,102,0.3)",
            color: "#ff4466", padding: "10px 14px", marginBottom: 14,
            fontFamily: "'Share Tech Mono', monospace", fontSize: 12,
          }}>⚠ {apiError}</div>
        )}

        <NeonButton color={accent} fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? "REGISTERING…" : "REGISTER NOW ⚡"}
        </NeonButton>
      </div>
    </div>
  );
}

function TeamForm({ event, onBack, onSuccess }) {
  const { loading, error: apiError, submitTeam } = useRegistration();
  const accent = event.accentColor || "#00FF88";
  const extraFields = event.extraFields?.team || [];
  const numMembers = event.maxTeamMembers ?? 4;
  const minMembers = event.minTeamMembers ?? 1;
  const row = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };

  const [leader, setLeader] = useState({ team_name: "", leader_name: "", leader_email: "", leader_phone: "" });
  const [members, setMembers] = useState(Array(numMembers).fill(""));
  const [other, setOther] = useState({ college: "", skills: "", github: "" });
  const [extra, setExtra] = useState({});
  const [errors, setErrors] = useState({});

  const setL = (k, v) => setLeader(f => ({ ...f, [k]: v }));
  const setO = (k, v) => setOther(f => ({ ...f, [k]: v }));
  const setEx = (k, v) => setExtra(f => ({ ...f, [k]: v }));
  const setMember = (i, v) => setMembers(m => { const a = [...m]; a[i] = v; return a; });

  const validate = () => {
    const e = {};
    if (!leader.team_name.trim())    e.team_name = "Team name required";
    if (!leader.leader_name.trim())  e.leader_name = "Leader name required";
    if (!isEmail(leader.leader_email)) e.leader_email = "Valid email required";
    if (!isPhone(leader.leader_phone)) e.leader_phone = "Valid phone required";
    if (!other.college.trim())       e.college = "College name required";
    if (!other.skills.trim())        e.skills = "Skills / domain required";
    if (!isUrl(other.github))        e.github = "Enter a valid URL";
    members.forEach((m, i) => {
      if (i < minMembers && !m.trim()) e[`member_${i}`] = `Member ${i + 1} name required`;
    });
    extraFields.forEach(f => {
      if (f.required && !extra[f.name]?.trim()) e[f.name] = `${f.label} is required`;
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const result = await submitTeam(event.id, { ...leader, ...other, ...extra, members: members.filter(m => m.trim()) });
      onSuccess(result, "team");
    } catch (_) {}
  };

  return (
    <div>
      <button onClick={onBack} style={{
        background: "transparent", border: "1px solid rgba(0,255,136,0.18)",
        color: "#7ab8a0", fontFamily: "'Share Tech Mono', monospace",
        fontSize: 11, letterSpacing: 2, padding: "7px 14px", cursor: "pointer", marginBottom: 16,
      }}>← BACK</button>

      <div style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: accent,
        letterSpacing: 3, marginBottom: 16, display: "flex", alignItems: "center", gap: 10,
      }}>
        STEP 02 — TEAM REGISTRATION
        <div style={{ flex: 1, height: 1, background: "rgba(0,255,136,0.18)" }} />
      </div>

      <div style={{ border: "1px solid rgba(0,255,136,0.18)", background: "#0a1520", padding: "1.6rem" }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, color: accent, marginBottom: 4 }}>TEAM DETAILS</div>
        <div style={{ fontSize: 13, color: "#3a6a52", marginBottom: 20 }}>Register your team for {event.title}</div>

        <SectionDivider label="TEAM LEADER INFO" />
        <div style={row}>
          <Field label="TEAM NAME" error={errors.team_name}>
            <Input value={leader.team_name} error={errors.team_name} placeholder="e.g. NeonCoders" onChange={e => setL("team_name", e.target.value)} />
          </Field>
          <Field label="LEADER NAME" error={errors.leader_name}>
            <Input value={leader.leader_name} error={errors.leader_name} placeholder="Full name" onChange={e => setL("leader_name", e.target.value)} />
          </Field>
        </div>
        <div style={row}>
          <Field label="LEADER EMAIL" error={errors.leader_email}>
            <Input type="email" value={leader.leader_email} error={errors.leader_email} placeholder="leader@email.com" onChange={e => setL("leader_email", e.target.value)} />
          </Field>
          <Field label="LEADER PHONE" error={errors.leader_phone}>
            <Input value={leader.leader_phone} error={errors.leader_phone} placeholder="+91 98765 43210" onChange={e => setL("leader_phone", e.target.value)} />
          </Field>
        </div>

        <SectionDivider label="TEAM MEMBERS" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {members.map((m, i) => (
            <div key={i} style={{ background: "#080f14", border: "1px solid rgba(0,255,136,0.12)", padding: "0.8rem" }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#3a6a52", letterSpacing: 2, marginBottom: 6 }}>
                MEMBER 0{i + 1}{i >= minMembers ? " (optional)" : ""}
              </div>
              <Input value={m} placeholder="Full name" error={errors[`member_${i}`]} onChange={e => setMember(i, e.target.value)} />
              {errors[`member_${i}`] && (
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#ff4466", marginTop: 4 }}>
                  {errors[`member_${i}`]}
                </div>
              )}
            </div>
          ))}
        </div>

        <SectionDivider label="OTHER DETAILS" />
        <Field label="COLLEGE NAME" error={errors.college}>
          <Input value={other.college} error={errors.college} placeholder="Institution name" onChange={e => setO("college", e.target.value)} />
        </Field>

        <ExtraFields fields={extraFields} values={extra} errors={errors} onChange={setEx} />

        <Field label="TEAM SKILLS / DOMAIN" error={errors.skills}>
          <Input value={other.skills} error={errors.skills} placeholder="e.g. AI/ML, Web Dev, Robotics…" onChange={e => setO("skills", e.target.value)} />
        </Field>
        <Field label="GITHUB / PROJECT PORTFOLIO" optional error={errors.github}>
          <Input value={other.github} placeholder="https://github.com/team" onChange={e => setO("github", e.target.value)} />
        </Field>

        {apiError && (
          <div style={{
            background: "rgba(255,68,102,0.08)", border: "1px solid rgba(255,68,102,0.3)",
            color: "#ff4466", padding: "10px 14px", marginBottom: 14,
            fontFamily: "'Share Tech Mono', monospace", fontSize: 12,
          }}>⚠ {apiError}</div>
        )}

        <NeonButton color={accent} fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? "REGISTERING…" : "REGISTER TEAM ⚡"}
        </NeonButton>
      </div>
    </div>
  );
}

function SuccessScreen({ event, result, regType, onClose }) {
  const accent = event.accentColor || "#00FF88";
  const details = regType === "team"
    ? [["EVENT", event.title], ["REG TYPE", "Team"], ["TEAM NAME", result.team_name],
       ["LEADER", result.leader_name], ["EMAIL", result.leader_email],
       ["COLLEGE", result.college], ["TEAM SIZE", `${(result.members?.length || 0) + 1} members`]]
    : [["EVENT", event.title], ["REG TYPE", "Individual"], ["NAME", result.full_name],
       ["EMAIL", result.email], ["COLLEGE", result.college],
       ["DEPARTMENT", result.department], ["YEAR", result.year_of_study]];

  return (
    <div style={{ textAlign: "center" }}>
      <style>{`@keyframes spulse { 0%,100%{box-shadow:0 0 30px ${accent}50} 50%{box-shadow:0 0 55px ${accent}90} }`}</style>
      <div style={{
        width: 68, height: 68, borderRadius: "50%", border: `2px solid ${accent}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 1.2rem", fontSize: 26, animation: "spulse 2s infinite",
      }}>✓</div>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 900, color: accent, letterSpacing: 2, marginBottom: 4 }}>
        REGISTRATION COMPLETE
      </div>
      <div style={{ fontSize: 14, color: "#7ab8a0", marginBottom: 16 }}>Welcome to AuraX'26! You're officially in.</div>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: accent,
        border: "1px solid rgba(0,255,136,0.2)", padding: "7px 18px",
        display: "inline-block", marginBottom: 20, background: "rgba(0,255,136,0.05)",
      }}>REG-ID: {result.registration_id}</div>

      <div style={{ background: "#080f14", border: "1px solid rgba(0,255,136,0.12)", padding: "1rem", textAlign: "left", marginBottom: 20 }}>
        {details.map(([k, v]) => v && (
          <div key={k} style={{ display: "flex", gap: 12, padding: "5px 0", borderBottom: "1px solid rgba(0,255,136,0.06)", fontSize: 13 }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: "#3a6a52", minWidth: 110, paddingTop: 2 }}>{k}</span>
            <span style={{ color: "#e0ffe8" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: "#3a6a52", lineHeight: 1.8, marginBottom: 20 }}>
        A confirmation has been sent to your registered email.<br />
        Report to the venue 30 minutes before the event begins.
      </div>
      <NeonButton color={accent} onClick={onClose}>← BACK TO EVENTS</NeonButton>
    </div>
  );
}

export default function RegistrationModal({ event, onClose }) {
  const [step, setStep] = useState(event.regType === "solo" ? "solo" : "type");
  const [regType, setRegType] = useState(null);
  const [result, setResult] = useState(null);

  const handleSuccess = (data, type) => { setResult(data); setRegType(type); setStep("success"); };
  const handleBack = () => { if (event.regType === "solo") { onClose(); return; } setStep("type"); };

  const accent = event.accentColor || "#00FF88";

  return (
    <>
      <style>{`@keyframes modalIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`}</style>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(5,10,14,0.88)",
        backdropFilter: "blur(4px)", zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "2rem 1rem", overflowY: "auto",
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          width: "100%", maxWidth: 720, background: "#050a0e",
          border: "1px solid rgba(0,255,136,0.2)",
          animation: "modalIn 0.3s ease", position: "relative",
        }}>
          <div style={{ height: 3, background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />

          <div style={{
            padding: "1.2rem 1.6rem", borderBottom: "1px solid rgba(0,255,136,0.12)",
            display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                {event.tags.map((t, i) => {
                  const c = TAG_COLORS[event.tagColors?.[i] || "green"];
                  return <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: 2, padding: "3px 8px", border: `1px solid ${c.border}`, background: c.bg, color: c.text }}>{t}</span>;
                })}
              </div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 700, color: accent, letterSpacing: 1 }}>{event.title}</div>
              <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                {[["TIME", event.time], ["VENUE", event.venue], ["PRIZE", event.prize]].map(([label, val]) => (
                  <div key={label} style={{ background: "#080f14", border: "1px solid rgba(0,255,136,0.1)", padding: "5px 10px" }}>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: "#3a6a52", letterSpacing: 2 }}>{label}</div>
                    <div style={{ fontSize: 13, color: "#e0ffe8", fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onClose} style={{
              background: "transparent", border: "1px solid rgba(0,255,136,0.18)",
              color: "#7ab8a0", width: 32, height: 32, cursor: "pointer",
              fontFamily: "'Orbitron', monospace", fontSize: 14, flexShrink: 0,
            }}>✕</button>
          </div>

          <div style={{ padding: "1.6rem" }}>
            {step === "type"    && <TypeSelector event={event} onSelect={t => { setRegType(t); setStep(t); }} />}
            {step === "solo"    && <IndividualForm event={event} onBack={handleBack} onSuccess={handleSuccess} />}
            {step === "team"    && <TeamForm event={event} onBack={() => setStep("type")} onSuccess={handleSuccess} />}
            {step === "success" && <SuccessScreen event={event} result={result} regType={regType} onClose={onClose} />}
          </div>
        </div>
      </div>
    </>
  );
}