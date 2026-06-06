function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px", // Diubah dari 24px ke 20px agar sudutnya konsisten dengan halaman baru
        overflow: "hidden",
        border: "1px solid #e2e8f0", // Menambahkan border halus agar mirip dengan layout Experience
        boxShadow: "0 4px 20px rgba(0,0,0,0.01)", // Bayangan standar dibuat super tipis/soft
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"; // Efek naik tipis agar tidak terlalu drastis
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.01)";
      }}
    >
      {/* AREA IMAGE */}
      <div style={{ width: "100%", height: "240px", overflow: "hidden" }}>
        <img
          src={project.gambar || "https://placehold.co/800x500"}
          alt={project.nama}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* AREA CONTENT */}
      <div
        style={{
          padding: "28px", // Diubah ke 28px agar ruang bernapas teksnya pas dengan kartu Experience
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* BADGE KATEGORI & TAHUN */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                backgroundColor: "#e0f2fe", // Background pill biru muda transparan
                color: "#0369a1",
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {project.kategori}
            </span>

            <span
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              📅 {project.tahun}
            </span>
          </div>

          {/* JUDUL PROJECT */}
          <h2
            style={{
              margin: "0 0 10px 0",
              color: "#0f172a",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            {project.nama}
          </h2>

          {/* UTILS / SOFTWARE */}
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              margin: "0 0 12px 0",
              fontWeight: "500",
            }}
          >
            🛠️ Tools: <span style={{ color: "#475569" }}>{project.software}</span>
          </p>

          {/* DESKRIPSI PROJECT */}
          <p
            style={{
              color: "#475569",
              lineHeight: "1.6",
              fontSize: "14px",
              margin: 0,
            }}
          >
            {project.deskripsi || "Tidak ada deskripsi tambahan."}
          </p>
        </div>

        {/* FOOTER ACTION */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "25px",
            paddingTop: "15px",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#0284c7",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Lihat Project ↗
            </a>
          ) : (
            <span />
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => onEdit(project.id)}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(project.id)}
              style={{
                background: "none",
                border: "none",
                color: "#ef4444",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;