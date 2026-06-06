import { useState } from "react";
import { Link } from "react-router-dom";
import fotoProfil from "../image/profilaldoni.jpeg";

function Home() {
  // Lazy State Initialization tetap dipertahankan agar sinkron dengan local storage
  const [listProject] = useState(() => {
    const dataProject = localStorage.getItem("projects");
    return dataProject ? JSON.parse(dataProject) : [];
  });

  const [listExperience] = useState(() => {
    const dataExperience = localStorage.getItem("pengalaman");
    return dataExperience ? JSON.parse(dataExperience) : [];
  });

  // State Pelacak Hover Elemen
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  // Ambil maksimal 3 project terbaru untuk ditampilkan sebagai preview
  const previewProject = listProject.slice(0, 3);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc", 
        color: "#0f172a", 
        padding: "80px 20px",
        fontFamily: '"Segoe UI", -apple-system, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GRAPHIC OVERLAYS & MICRO ANIMATIONS */}
      <style>{`
        @keyframes dynamicFadeUp {
          from { opacity: 0; transform: translateY(40px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .reveal-node {
          animation: dynamicFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ambient-glow {
          position: absolute;
          top: -10%;
          right: -5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(248, 250, 252, 0) 70%);
          z-index: 1;
          pointer-events: none;
        }
        .noise-sheet {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.015; pointer-events: none; z-index: 9999;
        }
      `}</style>

      <div className="noise-sheet" />
      <div className="ambient-glow" />

      {/* MAIN LAYOUT WRAPPER */}
      <div 
        className="reveal-node"
        style={{ 
          maxWidth: "1100px", 
          margin: "40px auto 0 auto", 
          position: "relative", 
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "80px"
        }}
      >
        
        {/* ================= HERO MASTER SPLIT ================= */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr", 
            gap: "50px",
            alignItems: "center"
          }}
        >
          {/* Teks Deskripsi Kiri */}
          <div style={{ textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{
                backgroundColor: "#e0f2fe",
                padding: "6px 14px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid #bae6fd"
              }}>
                <span style={{ fontSize: "12px" }}>🚀</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#0ea5e9",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}
                >
                  Tersedia untuk kolaborasi
                </span>
              </div>
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 5vw, 54px)",
                fontWeight: "800",
                lineHeight: "1.1",
                color: "#0f172a",
                letterSpacing: "-2.5px",
                margin: "0 0 20px 0"
              }}
            >
              Hai, saya mengubah ide <br />
              menjadi <span style={{ color: "#0ea5e9" }}>karya digital</span>.
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "15px",
                lineHeight: "1.7",
                maxWidth: "520px",
                margin: "0 0 32px 0"
              }}
            >
              3D Artist & Web Developer Beginner. Saya mengeksplorasi modeling low-poly, UI minimalis, dan animasi sederhana.
            </p>

            {/* Tombol Aksi Utama */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
              <Link
                to="/project"
                onMouseEnter={() => setHoveredBtn("primary")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  ...btnStyle,
                  background: "#0ea5e9",
                  color: "#ffffff",
                  transform: hoveredBtn === "primary" ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: hoveredBtn === "primary" ? "0 12px 24px rgba(14, 165, 233, 0.25)" : "none",
                }}
              >
                Lihat Project &rarr;
              </Link>

              <Link
                to="/about"
                onMouseEnter={() => setHoveredBtn("secondary")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  ...btnStyle,
                  background: hoveredBtn === "secondary" ? "#f1f5f9" : "#ffffff",
                  color: "#334155",
                  border: "1px solid #e2e8f0",
                  transform: hoveredBtn === "secondary" ? "translateY(-3px)" : "translateY(0)",
                }}
              >
                Tentang Saya
              </Link>
            </div>

            {/* ================= PANEL COUNTER NUMERIK BENTO (BAWAH KIRI) ================= */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                maxWidth: "480px"
              }}
            >
              {[
                { key: "proj", num: listProject.length, label: "Project", icon: "⬡" },
                { key: "exp", num: listExperience.length, label: "Pengalaman", icon: "⌥" },
                { key: "skill", num: "8", label: "Skill", icon: "⚡" }
              ].map((stat) => (
                <div 
                  key={stat.key}
                  onMouseEnter={() => setHoveredStat(stat.key)}
                  onMouseLeave={() => setHoveredStat(null)}
                  style={{
                    ...statCardStyle,
                    borderColor: hoveredStat === stat.key ? "#cbd5e1" : "#e2e8f0",
                    transform: hoveredStat === stat.key ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: hoveredStat === stat.key ? "0 10px 20px rgba(0,0,0,0.02)" : "none"
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#0ea5e9", fontWeight: "700" }}>{stat.icon}</span>
                  <h2 style={statNumberStyle}>{stat.num}</h2>
                  <p style={statLabelStyle}>{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Visual Kanan: Premium Frame Profil (Diperbesar Sesuai Gambar) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "440px", 
                height: "440px",
                borderRadius: "36px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                padding: "14px",
                boxShadow: "0 20px 40px rgba(15, 23, 42, 0.03)",
                zIndex: 3
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative"
                }}
              >
                <img
                  src={fotoProfil}
                  alt="Profile Aldoni"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
              </div>
            </div>

            {/* Efek Garis Refleksi / Bayangan di Bawah Layout Foto Profil */}
            <div 
              style={{
                width: "85%",
                height: "2px",
                background: "linear-gradient(90deg, transparent 0%, #cbd5e1 50%, transparent 100%)",
                marginTop: "24px",
                opacity: 0.7,
                position: "relative",
                filter: "blur(0.5px)"
              }}
            />
          </div>
        </section>

        {/* ================= GRID PREVIEW PROJECT (BENTO STYLE) ================= */}
        <section style={{ display: "flex", flexDirection: "column", gap: "32px", marginTop: "20px" }}>
          
          {/* Header Section Grid */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "20px"
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0,
                  letterSpacing: "-0.5px"
                }}
              >
                Project Pilihan
              </h2>
              <p style={{ margin: "6px 0 0 0", color: "#64748b", fontSize: "14px" }}>
                Cuplikan kreasi baris kode frontend dan aset visual objek terbaru.
              </p>
            </div>
            
            <Link
              to="/project"
              style={{
                color: "#0f172a",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600",
                borderBottom: "2px solid #0f172a",
                paddingBottom: "4px",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.target.style.color = "#0ea5e9"; e.target.style.borderColor = "#0ea5e9"; }}
              onMouseLeave={(e) => { e.target.style.color = "#0f172a"; e.target.style.borderColor = "#0f172a"; }}
            >
              Lihat Semua
            </Link>
          </div>

          {/* Kondisi Jika Project Kosong */}
          {previewProject.length === 0 ? (
            <div
              style={{
                padding: "80px 40px",
                borderRadius: "32px",
                textAlign: "center",
                border: "1px dashed #cbd5e1",
                color: "#94a3b8",
                fontSize: "14px",
                backgroundColor: "#ffffff"
              }}
            >
              Belum ada cuplikan project yang tersimpan di server lokal saat ini.
            </div>
          ) : (
            /* Render Kartu Project - Mempertahankan Tepat 3 Item */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {previewProject.map((project, index) => (
                <div
                  key={project.id || index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    ...projectCardStyle,
                    transform: hoveredCard === index ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: hoveredCard === index ? "0 20px 30px rgba(15, 23, 42, 0.04)" : "none",
                    borderColor: hoveredCard === index ? "#cbd5e1" : "#e2e8f0",
                  }}
                >
                  <div 
                    style={{ 
                      width: "100%", 
                      height: "200px", 
                      borderRadius: "20px", 
                      overflow: "hidden", 
                      marginBottom: "20px", 
                      backgroundColor: "#f1f5f9" 
                    }}
                  >
                    <img
                      src={project.gambar || "https://placehold.co/600x400"}
                      alt={project.nama || "Project Image"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: hoveredCard === index ? "scale(1.04)" : "scale(1)"
                      }}
                    />
                  </div>
                  
                  <h3
                    style={{
                      margin: "0 0 6px 0",
                      color: "#0f172a",
                      fontSize: "18px",
                      fontWeight: "700",
                      letterSpacing: "-0.3px"
                    }}
                  >
                    {project.nama}
                  </h3>
                  
                  <p
                    style={{
                      color: "#64748b",
                      lineHeight: "1.6",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    {project.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

// Token Desain Komponen
const btnStyle = { 
  padding: "12px 26px", 
  borderRadius: "14px", 
  textDecoration: "none", 
  fontWeight: "600", 
  fontSize: "14px", 
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", 
  display: "inline-block" 
};

const statCardStyle = { 
  textAlign: "left",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "18px",
  padding: "16px 20px",
  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
};

const statNumberStyle = { 
  margin: "4px 0 2px 0", 
  fontSize: "28px", 
  fontWeight: "800", 
  color: "#0f172a", 
  letterSpacing: "-1px" 
};

const statLabelStyle = { 
  margin: 0, 
  color: "#64748b", 
  fontSize: "12px", 
  fontWeight: "600" 
};

const projectCardStyle = { 
  border: "1px solid #e2e8f0", 
  borderRadius: "32px", 
  backgroundColor: "#ffffff", 
  padding: "20px", 
  textAlign: "left",
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" 
};

export default Home;