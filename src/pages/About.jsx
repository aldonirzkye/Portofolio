import { useState } from "react";

function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [hoveredBento, setHoveredBento] = useState(null);

  const skills = [
    { name: "Blender", icon: "📦", level: "Advanced" },
    { name: "React + Vite", icon: "⚛️", level: "Intermediate" },
    { name: "Figma", icon: "📐", level: "Advanced" },
    { name: "CSS / Tailwind", icon: "🎨", level: "Advanced" },
    { name: "HTML", icon: "🌐", level: "Advanced" },
    { name: "MySQL", icon: "🛢️", level: "Intermediate" },
    { name: "Motion Design", icon: "✨", level: "Creative" },
    { name: "Machine Learning", icon: "🤖", level: "Exploring" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc", 
        color: "#0f172a", 
        padding: "80px 20px",
        fontFamily: '"Segoe UI", -apple-system, sans-serif',
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* GLOBAL INTERACTIVE STYLES & ANIMATIONS */}
      <style>{`
        @keyframes subtleFadeUp {
          from { opacity: 0; transform: translateY(40px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal {
          animation: subtleFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ambient-glow-about {
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, rgba(248, 250, 252, 0) 70%);
          z-index: 1;
          pointer-events: none;
        }
        .noise-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.015; pointer-events: none; z-index: 9999;
        }
      `}</style>

      <div className="noise-bg" />
      <div className="ambient-glow-about" />

      {/* MAIN CONTAINER */}
      <div 
        className="animate-reveal"
        style={{ 
          maxWidth: "1100px", 
          margin: "40px auto 0 auto", 
          display: "flex",
          flexDirection: "column",
          gap: "60px",
          position: "relative",
          zIndex: 2
        }}
      >
        
        {/* ================= SECTION 1: ASYMMETRIC HERO SPLIT ================= */}
        <section 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "50px",
            alignItems: "start"
          }}
        >
          {/* Left Column: Bold Header Typography */}
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#0ea5e9", 
                textTransform: "uppercase",
                letterSpacing: "3px",
                display: "inline-block",
                marginBottom: "16px",
                borderBottom: "2px solid #0ea5e9",
                paddingBottom: "4px"
              }}
            >
              Profile / About
            </span>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: "800",
                lineHeight: "1.1",
                color: "#0f172a",
                letterSpacing: "-1.5px",
                margin: 0
              }}
            >
              Desain Visual.<br />
              Baris Kode.<br />
              <span style={{ color: "#64748b" }}>Eksplorasi Dimensi.</span>
            </h1>
          </div>

          {/* Right Column: Statement Paragraphs */}
          <div style={{ textAlign: "left", paddingTop: "40px" }}>
            <p
              style={{
                fontSize: "16px",
                color: "#334155",
                lineHeight: "1.75",
                fontWeight: "normal",
                margin: "0 0 24px 0"
              }}
            >
              Halo, saya seorang siswa jurusan Rekayasa Perangkat Lunak (RPL) yang mendedikasikan waktu untuk menjembatani estetika 3D ke dalam fungsionalitas web modern. Melalui ekosistem Blender, saya merancang struktur lingkungan (*environment props*), pencahayaan, dan detail visual objek yang kemudian saya hidupkan di dalam arsitektur kode frontend yang interaktif.
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                lineHeight: "1.7",
                margin: 0
              }}
            >
              Melalui ruang portfolio digital ini, saya mendokumentasikan setiap kurva belajar, kegagalan eksperimen, serta hasil akhir karya yang siap dikolaborasikan bersama industry ataupun kreator lainnya.
            </p>
          </div>
        </section>

        {/* ================= SECTION 2: BENTO BOX GRID LAYOUT ================= */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            gridAutoRows: "minmax(180px, auto)"
          }}
        >
          {/* BENTO CARD 1: LARGE SKILL CONTAINER (Spans 2 Columns) */}
          <div
            onMouseEnter={() => setHoveredBento("skills")}
            onMouseLeave={() => setHoveredBento(null)}
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              backgroundColor: "#ffffff",
              border: "1px solid",
              borderColor: hoveredBento === "skills" ? "#cbd5e1" : "#e2e8f0",
              borderRadius: "32px",
              padding: "40px",
              textAlign: "left",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hoveredBento === "skills" ? "translateY(-4px)" : "translateY(0)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: "700", color: "#0f172a", letterSpacing: "-0.5px" }}>
              Arsitektur Skill & Tools
            </h3>
            <p style={{ margin: "0 0 32px 0", fontSize: "14px", color: "#64748b" }}>
              Teknologi dan instrumen kreatif yang saya gunakan untuk mewujudkan konsep digital.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "14px"
              }}
            >
              {skills.map((skill, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 16px",
                    borderRadius: "16px",
                    backgroundColor: hoveredSkill === index ? "#0ea5e9" : "#f1f5f9",
                    border: "1px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: hoveredSkill === index ? "translateY(-2px)" : "translateY(0)"
                  }}
                >
                  <span style={{ 
                    fontSize: "20px",
                    transform: hoveredSkill === index ? "scale(1.1) rotate(6deg)" : "scale(1)",
                    transition: "transform 0.3s"
                  }}>
                    {skill.icon}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ 
                      fontSize: "14px", 
                      fontWeight: "600", 
                      color: hoveredSkill === index ? "#ffffff" : "#1e293b",
                      transition: "color 0.3s"
                    }}>
                      {skill.name}
                    </span>
                    <span style={{ 
                      fontSize: "11px", 
                      color: hoveredSkill === index ? "#e0f2fe" : "#64748b",
                      marginTop: "2px"
                    }}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BENTO CARD 2: HIGHLIGHT QUOTE BOX */}
          <div
            onMouseEnter={() => setHoveredBento("quote")}
            onMouseLeave={() => setHoveredBento(null)}
            style={{
              backgroundColor: "#1e293b", 
              color: "#ffffff",
              borderRadius: "32px",
              padding: "35px 30px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hoveredBento === "quote" ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hoveredBento === "quote" ? "0 15px 30px rgba(30, 41, 59, 0.1)" : "none"
            }}
          >
            <span style={{ fontSize: "32px", color: "#0ea5e9", fontWeight: "700", lineHeight: 1 }}>“</span>
            <p style={{ margin: "10px 0 20px 0", fontSize: "14px", lineHeight: "1.65", fontWeight: "300", color: "#f1f5f9" }}>
              Desain tanpa fungsionalitas hanyalah sebuah lukisan, dan kode tanpa visual hanyalah sebuah mesin tanpa jiwa.
            </p>
            <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", textAlign: "right", letterSpacing: "0.5px" }}>
              — PRINSIP KERJA
            </span>
          </div>

          {/* BENTO CARD 3: INTERACTIVE CONNECT / CONTACT BOX */}
          <div
            onMouseEnter={() => setHoveredBento("contact")}
            onMouseLeave={() => setHoveredBento(null)}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid",
              borderColor: hoveredBento === "contact" ? "#cbd5e1" : "#e2e8f0",
              borderRadius: "32px",
              padding: "30px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hoveredBento === "contact" ? "translateY(-4px)" : "translateY(0)"
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", fontWeight: "700", color: "#0f172a", letterSpacing: "-0.5px" }}>
                Mari Terhubung
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>
                Terbuka untuk diskusi proyek, kritik konstruktif, atau sekadar berbagi wawasan baru.
              </p>
            </div>
            
            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
              {[
                { id: "email", label: "Email", url: "mailto:aldotokk@gmail.com" },
                { id: "ig", label: "Instagram", url: "https://instagram.com/aldonirzky.e" },
                { id: "github", label: "GitHub", url: "https://github.com/aldonirzkye" }
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.id !== "email" ? "_blank" : undefined}
                  rel="noreferrer"
                  onMouseEnter={() => setHoveredContact(link.id)}
                  onMouseLeave={() => setHoveredContact(null)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "11px 0",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textDecoration: "none",
                    backgroundColor: hoveredContact === link.id ? "#0ea5e9" : "#f1f5f9",
                    color: hoveredContact === link.id ? "#ffffff" : "#475569",
                    border: "1px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: hoveredContact === link.id ? "translateY(-2px)" : "translateY(0)"
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

export default About;