import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Experience() {
  const [data, setData] = useState(() => {
    const simpan = localStorage.getItem("pengalaman");
    return simpan ? JSON.parse(simpan) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [kategori, setKategori] = useState("PKL");
  const [formData, setFormData] = useState({});
  const [gambar, setGambar] = useState(""); 
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Filter & Search States
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // State untuk melacak card mana yang sedang di-hover
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("pengalaman", JSON.stringify(data));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage:", error);
      alert("Penyimpanan penuh! Gambar dokumen yang dimasukkan terlalu besar. Silakan coba pakai foto lain.");
    }
  }, [data]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleUploadGambar(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

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

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        setGambar(compressedBase64);
      };
    };
    reader.readAsDataURL(file);
  }

  function simpanData(e) {
    e.preventDefault();

    if (isEditing) {
      setData(data.map((item) => item.id === editId ? { ...item, kategori, gambar, ...formData } : item));
      setIsEditing(false);
      setEditId(null);
    } else {
      const dataBaru = {
        id: Date.now(),
        kategori,
        gambar, 
        ...formData,
      };
      setData([...data, dataBaru]);
    }

    setFormData({});
    setGambar(""); 
    setShowModal(false);
  }

  function handleEdit(item) {
    setKategori(item.kategori);
    setGambar(item.gambar || "");
    setEditId(item.id);
    setIsEditing(true);
    
    const { id, kategori: k, gambar: g, ...restData } = item;
    setFormData(restData);
    
    setShowModal(true);
  }

  function hapus(id) {
    if (confirm("Hapus data pengalaman ini?")) {
      setData(data.filter((item) => item.id !== id));
    }
  }

  const filteredData = data.filter((item) => {
    const matchFilter = activeFilter === "All" || item.kategori === activeFilter;
    const searchText = (
      (item.perusahaan || "") +
      (item.posisi || "") +
      (item.project || "") +
      (item.namaLomba || "") +
      (item.namaEkskul || "")
    ).toLowerCase();
    return matchFilter && searchText.includes(search.toLowerCase());
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
     
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      <div
        style={{
          maxWidth: "1250px",
          margin: "40px auto 0 auto",
          background: "#fff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.02)",
          textAlign: "left",
          animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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
            textAlign: "left",
          }}
        >
          <div>
            <p style={{ color: "#0284c7", fontWeight: "700", letterSpacing: "1.5px", fontSize: "13px", margin: "0 0 6px 0" }}>
              EXPERIENCE
            </p>
            <h1 style={{ fontSize: "38px", fontWeight: "800", margin: 0, color: "#0f172a", letterSpacing: "-0.5px" }}>
              Pengalaman & Aktivitas
            </h1>
            <p style={{ color: "#64748b", margin: "8px 0 0 0", fontSize: "15px" }}>
              Kelola daftar pengalaman: PKL, Freelance, Lomba, dan Ekstrakurikuler.
            </p>
          </div>

          <button
            onClick={() => {
              setFormData({});
              setGambar("");
              setKategori("PKL");
              setIsEditing(false);
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
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => e.target.style.background = "#0369a1"}
            onMouseLeave={(e) => e.target.style.background = "#0284c7"}
          >
            <span style={{ fontSize: "18px" }}>+</span> Tambah
          </button>
        </div>

        {/* CONTROLS (SEARCH & FILTER) */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "35px", flexWrap: "wrap", textAlign: "left" }}>
          <input
            type="text"
            placeholder="Cari pengalaman..."
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
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#0284c7";
              e.target.style.backgroundColor = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.backgroundColor = "#f8fafc";
            }}
          />

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "PKL", "Freelance", "Lomba", "Ekstrakurikuler"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  backgroundColor: activeFilter === tab ? "#0284c7" : "#fff",
                  color: activeFilter === tab ? "#fff" : "#64748b",
                  border: activeFilter === tab ? "1px solid #0284c7" : "1px solid #e2e8f0",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* EXPERIENCES GRID */}
        {filteredData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
            <p style={{ fontSize: "16px", margin: 0 }}>Belum ada data pengalaman yang cocok.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "25px",
            }}
          >
            {filteredData.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  border: hoveredCard === item.id ? "1px solid #bae6fd" : "1px solid #e2e8f0",
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  textAlign: "left",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: hoveredCard === item.id ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hoveredCard === item.id ? "0 20px 35px rgba(2, 132, 199, 0.05)" : "none",
                }}
              >
                {item.gambar && (
                  <div style={{ width: "100%", height: "220px", overflow: "hidden", backgroundColor: "#f1f5f9" }}>
                    <img
                      src={item.gambar}
                      alt="Dokumentasi"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: hoveredCard === item.id ? "scale(1.04)" : "scale(1)"
                      }}
                    />
                  </div>
                )}

                <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "left" }}>
                  <div style={{ textAlign: "left" }}>
                    <span
                      style={{
                        backgroundColor: "#e0f2fe",
                        color: "#0369a1",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "700",
                        display: "inline-block",
                        marginBottom: "16px",
                      }}
                    >
                      {item.kategori}
                    </span>

                    {item.kategori === "PKL" && (
                      <div style={{ textAlign: "left" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 10px 0", color: "#0f172a", lineHeight: "1.3" }}>
                          PKL di {item.perusahaan || "Studio Kreatif"}
                        </h2>
                        <p style={{ color: "#475569", margin: "6px 0", fontSize: "14px", fontWeight: "500" }}>📍 {item.posisi}</p>
                        <p style={{ color: "#94a3b8", margin: "4px 0", fontSize: "14px" }}>📅 {item.durasi}</p>
                      </div>
                    )}

                    {item.kategori === "Freelance" && (
                      <div style={{ textAlign: "left" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 10px 0", color: "#0f172a", lineHeight: "1.3" }}>
                          {item.project || "Project Name"}
                        </h2>
                        <p style={{ color: "#475569", margin: "6px 0", fontSize: "14px", fontWeight: "500" }}>👤 Klien: {item.client}</p>
                        <p style={{ color: "#64748b", marginTop: "10px", fontSize: "14px", lineHeight: "1.6" }}>{item.deskripsi}</p>
                      </div>
                    )}

                    {item.kategori === "Lomba" && (
                      <div style={{ textAlign: "left" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 10px 0", color: "#0f172a", lineHeight: "1.3" }}>
                          {item.juara || "Juara"} {item.namaLomba || "Nama Lomba"}
                        </h2>
                        <p style={{ color: "#475569", margin: "6px 0", fontSize: "14px", fontWeight: "500" }}>📍 Tingkat: {item.tingkat}</p>
                      </div>
                    )}

                    {item.kategori === "Ekstrakurikuler" && (
                      <div style={{ textAlign: "left" }}>
                        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 10px 0", color: "#0f172a", lineHeight: "1.3" }}>
                          {item.namaEkskul}
                        </h2>
                        <p style={{ color: "#475569", margin: "6px 0", fontSize: "14px", fontWeight: "500" }}>💼 Jabatan: {item.jabatan}</p>
                        <p style={{ color: "#94a3b8", margin: "4px 0", fontSize: "14px" }}>📅 Tahun: {item.tahun}</p>
                      </div>
                    )}
                  </div>

                  {/* 🔥 SEKSI FOOTER CARD: Tombol digeser penuh ke sisi kanan */}
                  <div 
                    style={{ 
                      marginTop: "25px", 
                      paddingTop: "15px", 
                      borderTop: "1px solid #f1f5f9", 
                      display: "flex",
                      justifyContent: "flex-end", // Menyorong item ke pojok kanan card
                      gap: "14px",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: hoveredCard === item.id ? 1 : 0,
                      transform: hoveredCard === item.id ? "translateX(0)" : "translateX(8px)", // Animasi bergeser masuk dari kanan tipis
                    }}
                  >
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0284c7",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "13px",
                        padding: "6px 0",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => e.target.style.color = "#0369a1"}
                      onMouseLeave={(e) => e.target.style.color = "#0284c7"}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => hapus(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "13px",
                        padding: "6px 0",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => e.target.style.color = "#b91c1c"}
                      onMouseLeave={(e) => e.target.style.color = "#ef4444"}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
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
              animation: "fadeIn 0.2s ease-out forwards",
            }}
          >
            <div
              style={{
                width: "520px",
                maxWidth: "95%",
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
                maxHeight: "85vh",
                overflowY: "auto",
                textAlign: "left",
                animation: "scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <div style={{ display: "flex", justifycontent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", margin: 0, color: "#0f172a" }}>
                  {isEditing ? "Edit Pengalaman" : "Tambah Pengalaman"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ border: "none", background: "none", cursor: "pointer", fontSize: "24px", color: "#94a3b8" }}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={simpanData} style={{ display: "grid", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>Pilih Kategori</label>
                  <select
                    value={kategori}
                    onChange={(e) => {
                      setKategori(e.target.value);
                      setFormData({});
                      setGambar("");
                    }}
                    style={inputModalStyle}
                  >
                    <option value="PKL">PKL</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Lomba">Lomba</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>Foto Dokumentasi / Gambar</label>
                  <input type="file" accept="image/*" onChange={handleUploadGambar} style={{ fontSize: "14px" }} />
                  {gambar && (
                    <div style={{ position: "relative" }}>
                      <img src={gambar} alt="Preview" style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "10px", marginTop: "8px" }} />
                      <button 
                        type="button" 
                        onClick={() => setGambar("")}
                        style={{ position: "absolute", top: "14px", right: "6px", background: "#ef4444", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {kategori === "PKL" && (
                  <>
                    <input name="perusahaan" value={formData.perusahaan || ""} placeholder="Nama Perusahaan / Studio" onChange={handleChange} required style={inputModalStyle} />
                    <input name="posisi" value={formData.posisi || ""} placeholder="Posisi Tugas (Contoh: Frontend Dev)" onChange={handleChange} style={inputModalStyle} />
                    <input name="durasi" value={formData.durasi || ""} placeholder="Durasi Waktu (Contoh: 2024)" onChange={handleChange} style={inputModalStyle} />
                  </>
                )}

                {kategori === "Freelance" && (
                  <>
                    <input name="project" value={formData.project || ""} placeholder="Nama Project" onChange={handleChange} required style={inputModalStyle} />
                    <input name="client" value={formData.client || ""} placeholder="Nama Client" onChange={handleChange} style={inputModalStyle} />
                    <textarea name="deskripsi" value={formData.deskripsi || ""} placeholder="Deskripsi Singkat Hasil Kerja" onChange={handleChange} rows="3" style={textareaModalStyle} />
                  </>
                )}

                {kategori === "Lomba" && (
                  <>
                    <input name="namaLomba" value={formData.namaLomba || ""} placeholder="Nama Lomba" onChange={handleChange} required style={inputModalStyle} />
                    <input name="juara" value={formData.juara || ""} placeholder="Peringkat Juara (Contoh: Juara 2)" onChange={handleChange} style={inputModalStyle} />
                    <input name="tingkat" value={formData.tingkat || ""} placeholder="Tingkat Kompetisi" onChange={handleChange} style={inputModalStyle} />
                  </>
                )}

                {kategori === "Ekstrakurikuler" && (
                  <>
                    <input name="namaEkskul" value={formData.namaEkskul || ""} placeholder="Nama Ekstrakurikuler" onChange={handleChange} required style={inputModalStyle} />
                    <input name="jabatan" value={formData.jabatan || ""} placeholder="Jabatan" onChange={handleChange} style={inputModalStyle} />
                    <input name="tahun" value={formData.tahun || ""} placeholder="Tahun Pelaksanaan" onChange={handleChange} style={inputModalStyle} />
                  </>
                )}

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
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#0369a1"}
                  onMouseLeave={(e) => e.target.style.background = "#0284c7"}
                >
                  {isEditing ? "Simpan Perubahan" : "Simpan Pengalaman"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputModalStyle = { padding: "11px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px", width: "100%", boxSizing: "border-box", outline: "none" };
const textareaModalStyle = { ...inputModalStyle, resize: "vertical", fontFamily: "inherit" };

export default Experience;