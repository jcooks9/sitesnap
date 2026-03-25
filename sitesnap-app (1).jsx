import { useState, useRef } from "react";

const Icon = ({ d, size = 18, stroke = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const CameraIcon = () => <Icon d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />;
const FolderIcon = () => <Icon d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" size={16} />;
const SendIcon = () => <Icon d="M22 2L11 13 M22 2L15 22 9 13 2 9l20-7z" />;
const GridIcon = () => <Icon d="M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" />;
const ListIcon = () => <Icon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />;
const PlusIcon = () => <Icon d="M12 5v14M5 12h14" />;
const TagIcon = () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01" />;
const CheckIcon = () => <Icon d="M20 6L9 17l-5-5" stroke={2.5} />;
const XIcon = () => <Icon d="M18 6L6 18M6 6l12 12" />;
const DownloadIcon = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" />;
const ArrowIcon = () => <Icon d="M19 12H5 M12 5l7 7-7 7" />;
const ZapIcon = () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;

const TAGS = ["Foundation","Framing","Electrical","Plumbing","Roofing","Drywall","Exterior","Interior","Inspection","Issue"];

const MOCK_PROJECTS = [
  { id: 1, name: "Riverside Townhomes", client: "Apex Developers", phase: "Framing", photos: 142, lastUpdate: "2h ago", color: "#E8570A" },
  { id: 2, name: "Harbor View Office", client: "Stonebridge Corp", phase: "Electrical", photos: 89, lastUpdate: "Yesterday", color: "#0F6E56" },
  { id: 3, name: "Maple St. Renovation", client: "John & Sarah Kim", phase: "Drywall", photos: 37, lastUpdate: "3 days ago", color: "#185FA5" },
];

const MOCK_PHOTOS = [
  { id: 1, project: 1, tag: "Framing", date: "Mar 22", time: "8:14 AM", note: "North wall framing complete", thumb: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", flag: false },
  { id: 2, project: 1, tag: "Foundation", date: "Mar 21", time: "2:30 PM", note: "Crack in SE corner — needs review", thumb: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80", flag: true },
  { id: 3, project: 1, tag: "Framing", date: "Mar 21", time: "9:05 AM", note: "Beam installation, Unit 4", thumb: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80", flag: false },
  { id: 4, project: 1, tag: "Inspection", date: "Mar 20", time: "11:00 AM", note: "Inspector sign-off on rough framing", thumb: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=400&q=80", flag: false },
  { id: 5, project: 1, tag: "Electrical", date: "Mar 20", time: "3:45 PM", note: "Panel rough-in Units 1–3", thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", flag: false },
  { id: 6, project: 1, tag: "Issue", date: "Mar 19", time: "7:50 AM", note: "Water intrusion near window opening", thumb: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=400&q=80", flag: true },
];

export default function SiteSnap() {
  const [tab, setTab] = useState("projects");
  const [activeProject, setActiveProject] = useState(null);
  const [photos, setPhotos] = useState(MOCK_PHOTOS);
  const [view, setView] = useState("grid");
  const [filterTag, setFilterTag] = useState("All");
  const [filterFlag, setFilterFlag] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ tag: "Framing", note: "", flag: false });
  const [toast, setToast] = useState(null);
  const fileRef = useRef();

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const projectPhotos = photos.filter(p => p.project === activeProject?.id);
  const filtered = projectPhotos
    .filter(p => filterTag === "All" || p.tag === filterTag)
    .filter(p => !filterFlag || p.flag);

  const handleUpload = () => {
    const added = {
      id: Date.now(), project: activeProject.id,
      tag: newPhoto.tag, date: "Mar 22", time: "Now",
      note: newPhoto.note || "No note added",
      thumb: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
      flag: newPhoto.flag,
    };
    setPhotos(prev => [added, ...prev]);
    setShowUpload(false);
    setNewPhoto({ tag: "Framing", note: "", flag: false });
    showToast("✓ Photo tagged & saved to project");
  };

  const sendReport = () => {
    setReportSent(true);
    setTimeout(() => { setShowReport(false); setReportSent(false); showToast("✓ Progress report sent to client!"); }, 1800);
  };

  const tagColor = (tag) => ({
    "Foundation": { bg: "#FFF0E6", text: "#C44A00" },
    "Framing":    { bg: "#FFF0E6", text: "#E8570A" },
    "Electrical": { bg: "#FFFBE6", text: "#B08000" },
    "Plumbing":   { bg: "#E6F4FF", text: "#0066CC" },
    "Roofing":    { bg: "#F5EDE6", text: "#7A4020" },
    "Drywall":    { bg: "#F5F5F5", text: "#666666" },
    "Exterior":   { bg: "#E8F5EC", text: "#1E7A3A" },
    "Interior":   { bg: "#F0E6FF", text: "#6600CC" },
    "Inspection": { bg: "#E6FAFA", text: "#007A7A" },
    "Issue":      { bg: "#FFEBEB", text: "#CC0000" },
  }[tag] || { bg: "#F5F5F5", text: "#666" });

  return (
    <div style={{ minHeight: "100vh", background: "#F7F6F3", fontFamily: "'DM Sans', sans-serif", color: "#1A1A18" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ss-btn { border: none; cursor: pointer; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px; transition: all 0.15s; display: inline-flex; align-items: center; gap: 7px; }
        .ss-primary { background: #E8570A; color: #fff; padding: 10px 20px; }
        .ss-primary:hover { background: #FF6820; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(232,87,10,0.25); }
        .ss-ghost { background: #fff; color: #1A1A18; border: 1.5px solid #E5E2DC; padding: 9px 16px; }
        .ss-ghost:hover { border-color: #E8570A; color: #E8570A; }
        .ss-danger { background: #FFEBEB; color: #CC0000; border: 1.5px solid #FFCCCC; padding: 10px 20px; }
        .ss-danger:hover { background: #FFDDDD; }

        .project-card { background: #fff; border: 1.5px solid #EEEBE5; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; }
        .project-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--accent); border-radius: 2px 0 0 2px; }
        .project-card:hover { border-color: rgba(232,87,10,0.3); box-shadow: 0 4px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }

        .photo-card { background: #fff; border: 1.5px solid #EEEBE5; border-radius: 10px; overflow: hidden; cursor: pointer; transition: all 0.15s; position: relative; }
        .photo-card:hover { border-color: #E8570A; box-shadow: 0 4px 16px rgba(232,87,10,0.12); transform: scale(1.01); }
        .photo-card.flagged { border-color: #FFAAAA !important; }

        .tag-pill { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-family: 'DM Mono', monospace; font-weight: 500; }

        .filter-btn { padding: 6px 14px; border-radius: 20px; font-size: 12px; background: #fff; border: 1.5px solid #E5E2DC; color: #888; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.15s; white-space: nowrap; }
        .filter-btn.active { background: #E8570A; border-color: #E8570A; color: #fff; }
        .filter-btn:hover:not(.active) { border-color: #E8570A; color: #E8570A; }

        .nav-tab { padding: 12px 20px; background: transparent; border: none; color: #AAA; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; }
        .nav-tab.active { color: #E8570A; border-bottom-color: #E8570A; }
        .nav-tab:hover:not(.active) { color: #555; }

        .input-ss { width: 100%; background: #F7F6F3; border: 1.5px solid #E5E2DC; border-radius: 8px; padding: 10px 14px; color: #1A1A18; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.15s; }
        .input-ss:focus { border-color: #E8570A; background: #fff; }
        .input-ss::placeholder { color: #BBB; }
        select.input-ss option { background: #fff; }

        .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
        .modal { background: #fff; border: 1.5px solid #EEEBE5; border-radius: 16px; padding: 28px; width: 90%; max-width: 480px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: slideUp 0.25s ease; }

        .stat-box { background: #fff; border: 1.5px solid #EEEBE5; border-radius: 10px; padding: 16px 20px; flex: 1; }
        .flag-badge { position: absolute; top: 8px; right: 8px; background: #FFEBEB; color: #CC0000; border-radius: 20px; padding: 2px 8px; font-size: 10px; font-weight: 600; border: 1px solid #FFCCCC; }
        .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #1A1A18; color: #fff; border-radius: 8px; padding: 12px 20px; font-size: 13px; z-index: 999; animation: toastIn 0.3s ease; white-space: nowrap; box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform: translateY(0) } }
        @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
        @keyframes fadeUpIn { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
        .fade-in { animation: fadeUpIn 0.3s ease; }
      `}</style>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1.5px solid #EEEBE5", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {activeProject && (
            <button onClick={() => { setActiveProject(null); setTab("projects"); }} className="ss-btn ss-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>← Back</button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#E8570A", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, color: "#fff" }}>
              <CameraIcon />
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2 }}>SITESNAP</span>
            {activeProject && <>
              <span style={{ color: "#DDD" }}>›</span>
              <span style={{ fontSize: 13, color: "#999", fontWeight: 500 }}>{activeProject.name}</span>
            </>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {activeProject ? <>
            <button className="ss-btn ss-ghost" onClick={() => setShowReport(true)}><SendIcon /> Client Report</button>
            <button className="ss-btn ss-primary" onClick={() => setShowUpload(true)}><PlusIcon /> Add Photos</button>
          </> : <>
            <span style={{ fontSize: 12, color: "#BBB", fontFamily: "'DM Mono',monospace" }}>FREE PLAN · 3/3</span>
            <button className="ss-btn ss-primary" style={{ fontSize: 12, padding: "8px 14px" }}><ZapIcon /> Go Pro $29/mo</button>
          </>}
        </div>
      </header>

      {activeProject && (
        <div style={{ background: "#fff", borderBottom: "1.5px solid #EEEBE5", padding: "0 28px", display: "flex" }}>
          {["photos", "report"].map(t => (
            <button key={t} className={`nav-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t === "photos" ? "📷 Photos" : "📨 Client Report"}
            </button>
          ))}
        </div>
      )}

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px" }}>

        {/* Projects */}
        {!activeProject && (
          <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 34, letterSpacing: 2, lineHeight: 1 }}>YOUR PROJECTS</h1>
                <p style={{ color: "#AAA", fontSize: 13, marginTop: 4 }}>Tap a project to view and organize photos</p>
              </div>
              <button className="ss-btn ss-primary"><PlusIcon /> New Project</button>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              {[{ label: "Total Photos", val: photos.length, color: "#E8570A" }, { label: "Flagged Issues", val: photos.filter(p=>p.flag).length, color: "#CC0000" }, { label: "Active Projects", val: MOCK_PROJECTS.length, color: "#0F6E56" }].map(s => (
                <div key={s.label} className="stat-box">
                  <div style={{ fontSize: 30, fontFamily: "'Bebas Neue',sans-serif", color: s.color, letterSpacing: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: "#AAA", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
              {MOCK_PROJECTS.map(p => (
                <div key={p.id} className="project-card" style={{ "--accent": p.color }} onClick={() => { setActiveProject(p); setTab("photos"); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#AAA", fontWeight: 500 }}>{p.client}</div>
                    </div>
                    <span style={{ color: "#CCC" }}><FolderIcon /></span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="tag-pill" style={{ background: p.color + "18", color: p.color }}>{p.phase}</span>
                    <span style={{ fontSize: 12, color: "#AAA" }}><b style={{ color: "#1A1A18" }}>{p.photos}</b> photos · {p.lastUpdate}</span>
                  </div>
                  <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 4, color: "#E8570A", fontSize: 12, fontWeight: 600 }}>Open project <ArrowIcon /></div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, background: "#FFF8F5", border: "1.5px dashed rgba(232,87,10,0.4)", borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: 1, marginBottom: 4 }}>UPGRADE TO PRO — $29/MONTH</div>
                <div style={{ fontSize: 13, color: "#AAA" }}>Unlimited projects · Client portal · Auto PDF reports · Team access</div>
              </div>
              <button className="ss-btn ss-primary">Upgrade ↗</button>
            </div>
          </div>
        )}

        {/* Photos */}
        {activeProject && tab === "photos" && (
          <div className="fade-in">
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
              <button className={`filter-btn ${filterTag==="All"?"active":""}`} onClick={() => setFilterTag("All")}>All ({projectPhotos.length})</button>
              {TAGS.filter(t => projectPhotos.some(p => p.tag === t)).map(t => (
                <button key={t} className={`filter-btn ${filterTag===t?"active":""}`} onClick={() => setFilterTag(t)}>{t}</button>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button className={`filter-btn ${filterFlag?"active":""}`} style={filterFlag ? { background:"#FFEBEB", borderColor:"#FFAAAA", color:"#CC0000" } : {}} onClick={() => setFilterFlag(f=>!f)}>🚩 Issues</button>
                <button className={`filter-btn ${view==="grid"?"active":""}`} onClick={() => setView("grid")}><GridIcon /></button>
                <button className={`filter-btn ${view==="list"?"active":""}`} onClick={() => setView("list")}><ListIcon /></button>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#AAA", marginBottom: 14, fontWeight: 500 }}>
              Showing {filtered.length} of {projectPhotos.length} photos{filterTag !== "All" && <span style={{ color:"#E8570A" }}> · {filterTag}</span>}
            </div>
            {view === "grid" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
                {filtered.map(photo => (
                  <div key={photo.id} className={`photo-card ${photo.flag?"flagged":""}`} onClick={() => setLightbox(photo)}>
                    {photo.flag && <div className="flag-badge">🚩 Issue</div>}
                    <img src={photo.thumb} alt="" style={{ width:"100%", height:138, objectFit:"cover", display:"block" }} />
                    <div style={{ padding:"10px 12px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                        <span className="tag-pill" style={{ background:tagColor(photo.tag).bg, color:tagColor(photo.tag).text }}>{photo.tag}</span>
                        <span style={{ fontSize:10, color:"#CCC", fontFamily:"'DM Mono',monospace" }}>{photo.time}</span>
                      </div>
                      <div style={{ fontSize:12, color:"#888", lineHeight:1.4 }}>{photo.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {view === "list" && (
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {filtered.map(photo => (
                  <div key={photo.id} className={`photo-card ${photo.flag?"flagged":""}`} style={{ display:"flex", gap:14, padding:12, alignItems:"center" }} onClick={() => setLightbox(photo)}>
                    <img src={photo.thumb} alt="" style={{ width:72, height:54, objectFit:"cover", borderRadius:6, flexShrink:0 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span className="tag-pill" style={{ background:tagColor(photo.tag).bg, color:tagColor(photo.tag).text }}>{photo.tag}</span>
                        {photo.flag && <span style={{ fontSize:11, color:"#CC0000", fontWeight:600 }}>🚩 Flagged</span>}
                      </div>
                      <div style={{ fontSize:13, color:"#555" }}>{photo.note}</div>
                    </div>
                    <div style={{ fontSize:11, color:"#CCC", textAlign:"right", flexShrink:0, fontFamily:"'DM Mono',monospace" }}>
                      <div>{photo.date}</div><div>{photo.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Report */}
        {activeProject && tab === "report" && (
          <div className="fade-in" style={{ maxWidth:620 }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:2, marginBottom:4 }}>CLIENT PROGRESS REPORT</h2>
            <p style={{ color:"#AAA", fontSize:13, marginBottom:24 }}>Preview what your client will receive</p>
            <div style={{ background:"#fff", border:"1.5px solid #EEEBE5", borderRadius:12, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ background:"#E8570A", padding:"20px 24px" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:2, color:"#fff" }}>PROGRESS REPORT</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:2 }}>{activeProject.name} · {activeProject.client}</div>
              </div>
              <div style={{ padding:24 }}>
                <div style={{ display:"flex", gap:12, marginBottom:20 }}>
                  {[{ l:"Report Date", v:"March 22, 2026" }, { l:"Current Phase", v:activeProject.phase }, { l:"Photos This Week", v:projectPhotos.length }].map(s => (
                    <div key={s.l} style={{ flex:1, background:"#F7F6F3", borderRadius:8, padding:"12px 14px", border:"1px solid #EEEBE5" }}>
                      <div style={{ fontSize:11, color:"#AAA", marginBottom:4, fontWeight:600, textTransform:"uppercase", letterSpacing:0.5 }}>{s.l}</div>
                      <div style={{ fontSize:14, fontWeight:600 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontSize:12, color:"#AAA", fontWeight:600, textTransform:"uppercase", letterSpacing:0.5, marginBottom:10 }}>Photo Highlights</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    {projectPhotos.slice(0,3).map(p => (
                      <div key={p.id} style={{ borderRadius:8, overflow:"hidden", border:"1px solid #EEEBE5" }}>
                        <img src={p.thumb} alt="" style={{ width:"100%", height:90, objectFit:"cover", display:"block" }} />
                        <div style={{ background:"#F7F6F3", padding:"6px 8px", fontSize:10, color:"#888" }}>{p.note.substring(0,28)}...</div>
                      </div>
                    ))}
                  </div>
                </div>
                {projectPhotos.filter(p=>p.flag).length > 0 && (
                  <div style={{ background:"#FFEBEB", border:"1.5px solid #FFCCCC", borderRadius:8, padding:"14px 16px", marginBottom:16 }}>
                    <div style={{ fontSize:12, color:"#CC0000", fontWeight:600, marginBottom:6 }}>⚠ Flagged Items ({projectPhotos.filter(p=>p.flag).length})</div>
                    {projectPhotos.filter(p=>p.flag).map(p => (
                      <div key={p.id} style={{ fontSize:12, color:"#AA4444", marginBottom:3 }}>• {p.note}</div>
                    ))}
                  </div>
                )}
                <button className="ss-btn ss-primary" style={{ width:"100%", justifyContent:"center" }} onClick={() => setShowReport(true)}>
                  <SendIcon /> Send Report to Client
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div className="modal-bg" onClick={() => setLightbox(null)}>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:680, width:"92%", background:"#fff", border:"1.5px solid #EEEBE5", borderRadius:16, overflow:"hidden", boxShadow:"0 24px 60px rgba(0,0,0,0.18)" }}>
            <img src={lightbox.thumb} alt="" style={{ width:"100%", maxHeight:380, objectFit:"cover", display:"block" }} />
            <div style={{ padding:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <span className="tag-pill" style={{ background:tagColor(lightbox.tag).bg, color:tagColor(lightbox.tag).text, fontSize:13, padding:"5px 14px" }}><TagIcon /> {lightbox.tag}</span>
                <span style={{ fontSize:12, color:"#AAA", fontFamily:"'DM Mono',monospace" }}>{lightbox.date} · {lightbox.time}</span>
              </div>
              <p style={{ fontSize:14, color:"#555", marginBottom:16, lineHeight:1.5 }}>{lightbox.note}</p>
              <div style={{ display:"flex", gap:8 }}>
                <button className="ss-btn ss-ghost" onClick={() => setLightbox(null)}><XIcon /> Close</button>
                <button className="ss-btn ss-ghost"><DownloadIcon /> Download</button>
                {!lightbox.flag && (
                  <button className="ss-btn ss-danger" onClick={() => {
                    setPhotos(prev => prev.map(p => p.id===lightbox.id ? {...p,flag:true} : p));
                    setLightbox(prev => ({...prev,flag:true}));
                    showToast("🚩 Photo flagged as issue");
                  }}>🚩 Flag Issue</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="modal-bg" onClick={() => setShowUpload(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2, marginBottom:20 }}>ADD PHOTOS</div>
            <div style={{ border:"2px dashed #E5E2DC", borderRadius:10, padding:"28px 20px", textAlign:"center", marginBottom:18, cursor:"pointer", background:"#F7F6F3", transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#E8570A";e.currentTarget.style.background="#FFF8F5";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E2DC";e.currentTarget.style.background="#F7F6F3";}}
              onClick={()=>fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} />
              <div style={{ fontSize:32, marginBottom:8 }}>📸</div>
              <div style={{ fontSize:13, color:"#888", fontWeight:500 }}>Tap to select photos from your device</div>
              <div style={{ fontSize:11, color:"#CCC", marginTop:4 }}>GPS & timestamp auto-extracted</div>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, color:"#AAA", fontWeight:600, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Category Tag</label>
              <select className="input-ss" value={newPhoto.tag} onChange={e=>setNewPhoto(p=>({...p,tag:e.target.value}))}>
                {TAGS.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, color:"#AAA", fontWeight:600, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Note (optional)</label>
              <input className="input-ss" placeholder="Describe what's in the photo..." value={newPhoto.note} onChange={e=>setNewPhoto(p=>({...p,note:e.target.value}))} />
            </div>
            <div style={{ marginBottom:20, display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"#FFF8F5", borderRadius:8, border:"1px solid #FFE0CC" }}>
              <input type="checkbox" id="flagCheck" checked={newPhoto.flag} onChange={e=>setNewPhoto(p=>({...p,flag:e.target.checked}))} style={{ accentColor:"#E8570A", width:16, height:16, cursor:"pointer" }} />
              <label htmlFor="flagCheck" style={{ fontSize:13, color:"#888", cursor:"pointer" }}>🚩 Flag this as an issue / defect</label>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="ss-btn ss-primary" style={{ flex:1, justifyContent:"center" }} onClick={handleUpload}><CheckIcon /> Save to Project</button>
              <button className="ss-btn ss-ghost" onClick={()=>setShowUpload(false)}><XIcon /> Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="modal-bg" onClick={() => setShowReport(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            {!reportSent ? <>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2, marginBottom:6 }}>SEND PROGRESS REPORT</div>
              <p style={{ color:"#AAA", fontSize:13, marginBottom:20 }}>A professional report with photos and flagged issues will be emailed to your client.</p>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, color:"#AAA", fontWeight:600, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Client Email</label>
                <input className="input-ss" placeholder="client@email.com" defaultValue="apex@developers.com" />
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, color:"#AAA", fontWeight:600, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Message (optional)</label>
                <input className="input-ss" placeholder="Here's this week's site update..." />
              </div>
              <div style={{ background:"#F7F6F3", border:"1px solid #EEEBE5", borderRadius:8, padding:"12px 14px", marginBottom:20, fontSize:13, color:"#888" }}>
                📎 Includes: <b style={{ color:"#1A1A18" }}>{projectPhotos.length} photos</b> · <b style={{ color:"#CC0000" }}>{projectPhotos.filter(p=>p.flag).length} flagged issues</b> · Phase: {activeProject.phase}
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="ss-btn ss-primary" style={{ flex:1, justifyContent:"center" }} onClick={sendReport}><SendIcon /> Send Report</button>
                <button className="ss-btn ss-ghost" onClick={()=>setShowReport(false)}><XIcon /> Cancel</button>
              </div>
            </> : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:2 }}>REPORT SENT!</div>
                <div style={{ color:"#AAA", fontSize:13, marginTop:6 }}>Your client will receive it in seconds.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
