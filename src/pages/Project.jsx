import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

function Project() {
  // Ambil data langsung dari localStorage saat state pertama kali dibuat
  const [projects, setProjects] = useState(() => {
    const dataTersimpan = localStorage.getItem("projects");
    return dataTersimpan ? JSON.parse(dataTersimpan) : [];
  });

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State Form Input
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("3D Modeling");
  const [gambar, setGambar] = useState("");
  const [software, setSoftware] = useState("");
  const [tahun, setTahun] = useState("");
  const [link, setLink] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  // Filter & Search States
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  // Menyimpan data dengan aman menggunakan try-catch agar jika penuh tidak membuat layar blank
  useEffect(() => {
    try {
      localStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage:", error);
      alert("Ukuran penyimpanan penuh! Gambar yang kamu masukkan terlalu besar. Silakan coba gunakan gambar lain yang lebih ringan.");
    }
  }, [projects]);

  function simpanProject(e) {
    e.preventDefault();

    if (!nama || !kategori || !software || !tahun) {
      alert("Lengkapi data yang wajib diisi!");
      return;
    }

    const projectBaru = {
      id: Date.now(),
      nama,
      kategori,
      gambar,
      software,
      tahun,
      link,
      deskripsi,
    };

    setProjects([...projects, projectBaru]);
    resetForm();
    setShowModal(false);
  }

  function editProject(id) {
    const item = projects.find((p) => p.id === id);

    setNama(item.nama);
    setKategori(item.kategori);
    setGambar(item.gambar);
    setSoftware(item.software);
    setTahun(item.tahun);
    setLink(item.link);
    setDeskripsi(item.deskripsi);

    setEditId(id);
    setShowModal(true);
  }

  function updateProject(e) {
    e.preventDefault();

    const dataUpdate = projects.map((item) =>
      item.id === editId
        ? {
            ...item,
            nama,
            kategori,
            gambar,
            software,
            tahun,
            link,
            deskripsi,
          }
        : item
    );

    setProjects(dataUpdate);
    setEditId(null);
    resetForm();
    setShowModal(false);
  }

  function hapusProject(id) {
    if (confirm("Apakah Anda yakin ingin menghapus project ini?")) {
      setProjects(projects.filter((item) => item.id !== id));
    }
  }

  function resetForm() {
    setNama("");
    setKategori("3D Modeling");
    setGambar("");
    setSoftware("");
    setTahun("");
    setLink("");
    setDeskripsi("");
  }

  // Mengompresi file gambar menjadi sangat ringan sebelum masuk state
  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set maksimal resolusi lebar 600px (proporsional)
        const MAX_WIDTH = 600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Ubah menjadi format JPEG dengan kualitas kompresi 0.6 (60%)
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        setGambar(compressedBase64);
      };
    };
    reader.readAsDataURL(file);
  }

  const filteredProjects = projects.filter(
    (item) =>
      (filter === "Semua" || item.kategori === filter) &&
      item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
     

      <div
        style={{
          maxWidth: "1250px",
          margin: "40px auto 0 auto",
          background: "#fff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.02)",
        }}
      >
        {/* HEADER SECTION */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "35px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p style={{ color: "#0284c7", fontWeight: "700", letterSpacing: "1.5px", fontSize: "13px", margin: "0 0 6px 0" }}>
              PROJECTS
            </p>
            <h1 style={{ fontSize: "38px", fontWeight: "800", margin: 0, color: "#0f172a", letterSpacing: "-0.5px" }}>
              Karya & Project
            </h1>
            <p style={{ color: "#64748b", margin: "8px 0 0 0", fontSize: "15px" }}>
              Koleksi karya 3D Modeling, Website Development, UI/UX Design, dan project lainnya.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setEditId(null);
              setShowModal(true);
            }}
            style={{
              background: "#0284c7",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "18px" }}>+</span> Tambah Project
          </button>
        </div>

        {/* CONTROLS (SEARCH & FILTER) */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "35px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Cari project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: "260px",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["Semua", "3D Modeling", "Website", "UI/UX Design", "Animation", "School Project"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  backgroundColor: filter === item ? "#0284c7" : "#fff",
                  color: filter === item ? "#fff" : "#64748b",
                  border: filter === item ? "1px solid #0284c7" : "1px solid #e2e8f0",
                  transition: "all 0.2s ease",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID VIEW */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
            <p style={{ fontSize: "16px", margin: 0 }}>Belum ada data project yang cocok.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
              gap: "25px",
            }}
          >
            {filteredProjects.map((item) => (
              <ProjectCard
                key={item.id}
                project={item}
                onEdit={editProject}
                onDelete={hapusProject}
              />
            ))}
          </div>
        )}

        {/* MODAL INPUT POPUP */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                width: "550px",
                maxWidth: "95%",
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifycontent: "space-between", alignitems: "center", marginbottom: "20px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", margin: 0, color: "#0f172a" }}>
                  {editId ? "Edit Detail Project" : "Tambah Project Baru"}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                    setEditId(null);
                  }}
                  style={{ border: "none", background: "none", cursor: "pointer", fontSize: "24px", color: "#94a3b8" }}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={editId ? updateProject : simpanProject} style={{ display: "grid", gap: "16px" }}>
                <div style={inputContainerStyle}>
                  <label style={labelModalStyle}>Nama Project *</label>
                  <input placeholder="Masukkan nama project" value={nama} onChange={(e) => setNama(e.target.value)} required style={inputModalStyle} />
                </div>

                <div style={inputContainerStyle}>
                  <label style={labelModalStyle}>Kategori Project *</label>
                  <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={inputModalStyle}>
                    <option>3D Modeling</option>
                    <option>Website</option>
                    <option>UI/UX Design</option>
                    <option>Animation</option>
                    <option>School Project</option>
                  </select>
                </div>

                <div style={inputContainerStyle}>
                  <label style={labelModalStyle}>Cover/Gambar Project</label>
                  <input type="file" accept="image/*" onChange={handleUpload} style={{ fontSize: "14px" }} />
                  {gambar && (
                    <img src={gambar} alt="preview" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px", marginTop: "8px" }} />
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={inputContainerStyle}>
                    <label style={labelModalStyle}>Software/Tools *</label>
                    <input placeholder="Blender, VS Code, dll" value={software} onChange={(e) => setSoftware(e.target.value)} required style={inputModalStyle} />
                  </div>
                  <div style={inputContainerStyle}>
                    <label style={labelModalStyle}>Tahun Pembuatan *</label>
                    <input placeholder="Contoh: 2026" value={tahun} onChange={(e) => setTahun(e.target.value)} required style={inputModalStyle} />
                  </div>
                </div>

                <div style={inputContainerStyle}>
                  <label style={labelModalStyle}>Link Dokumentasi / GitHub</label>
                  <input placeholder="https://example.com" value={link} onChange={(e) => setLink(e.target.value)} style={inputModalStyle} />
                </div>

                <div style={inputContainerStyle}>
                  <label style={labelModalStyle}>Deskripsi Project</label>
                  <textarea placeholder="Jelaskan detail project yang kamu buat..." value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows="3" style={textareaModalStyle} />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "#0284c7",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "15px",
                    marginTop: "10px",
                  }}
                >
                  {editId ? "Simpan Perubahan" : "Terbitkan Project"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputContainerStyle = { display: "flex", flexDirection: "column", gap: "4px" };
const labelModalStyle = { fontSize: "13px", fontWeight: "600", color: "#334155" };
const inputModalStyle = { padding: "11px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", width: "100%", boxSizing: "border-box", outline: "none" };
const textareaModalStyle = { ...inputModalStyle, resize: "vertical", fontFamily: "inherit" };

export default Project;