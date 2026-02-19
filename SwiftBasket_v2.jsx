import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ╔══════════════════════════════════════════════════════════╗
// ║           SWIFTBASKET v2 — Fully Functional             ║
// ╚══════════════════════════════════════════════════════════╝

// ─── APP CONTEXT ──────────────────────────────────────────
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

// ─── STYLES ───────────────────────────────────────────────
const GS = () => (
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&family=JetBrains+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f8f7f4;--bg2:#f0ede8;--surface:#ffffff;--surface2:#fafaf8;
  --border:#e8e3db;--border2:#d4cec4;
  --ink:#1a1714;--ink2:#4a4540;--ink3:#9a948e;
  --accent:#e85d26;--accent2:#ff7a45;--accent-dark:#c44d1e;
  --blue:#2563eb;--green:#16a34a;--gold:#d97706;--red:#dc2626;
  --purple:#7c3aed;
  --r:12px;--r-sm:8px;--r-lg:20px;
  --sh:0 2px 12px rgba(0,0,0,0.08);--sh2:0 8px 32px rgba(0,0,0,0.12);
  --nav-h:64px;
}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;overflow-x:hidden}
h1,h2,h3,h4{font-family:'Playfair Display',serif}
.mono{font-family:'JetBrains Mono',monospace}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}
input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif;background:var(--surface);border:1.5px solid var(--border);color:var(--ink);border-radius:var(--r-sm);padding:11px 14px;width:100%;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s}
input:focus,select:focus,textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(232,93,38,0.1)}
input::placeholder{color:var(--ink3)}
button{cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;border:none;transition:all .18s}
.btn{display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:50px;font-weight:600;font-size:14px;cursor:pointer;transition:all .18s;white-space:nowrap}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 3px 12px rgba(232,93,38,0.3)}
.btn-primary:hover{background:var(--accent-dark);transform:translateY(-1px);box-shadow:0 5px 20px rgba(232,93,38,0.4)}
.btn-primary:active{transform:translateY(0)}
.btn-secondary{background:var(--surface);color:var(--ink);border:1.5px solid var(--border2)}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent);background:rgba(232,93,38,0.04)}
.btn-ghost{background:transparent;color:var(--ink2);padding:8px 14px;border-radius:8px}
.btn-ghost:hover{background:var(--bg2);color:var(--ink)}
.btn-blue{background:var(--blue);color:#fff;box-shadow:0 3px 12px rgba(37,99,235,0.3)}
.btn-blue:hover{background:#1d4ed8}
.btn-sm{padding:7px 16px;font-size:13px}
.btn-lg{padding:14px 32px;font-size:16px}
.btn-icon{width:38px;height:38px;border-radius:10px;background:var(--surface);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--ink2)}
.btn-icon:hover{border-color:var(--accent);color:var(--accent);background:rgba(232,93,38,0.04)}
.card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);padding:20px;transition:border-color .2s,box-shadow .2s}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:50px;font-size:11px;font-weight:700;letter-spacing:.3px}
.badge-red{background:#fef2f2;color:var(--red);border:1px solid #fecaca}
.badge-green{background:#f0fdf4;color:var(--green);border:1px solid #bbf7d0}
.badge-gold{background:#fffbeb;color:var(--gold);border:1px solid #fde68a}
.badge-blue{background:#eff6ff;color:var(--blue);border:1px solid #bfdbfe}
.badge-orange{background:#fff7ed;color:var(--accent);border:1px solid #fed7aa}
.badge-purple{background:#f5f3ff;color:var(--purple);border:1px solid #ddd6fe}
.chip{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:6px;font-size:12px;font-weight:600;background:var(--bg2);color:var(--ink2);border:1px solid var(--border);cursor:pointer;transition:all .15s}
.chip:hover,.chip.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.divider{height:1.5px;background:var(--border);margin:20px 0}
.input-group{display:flex;flex-direction:column;gap:6px}
.input-label{font-size:13px;font-weight:600;color:var(--ink2)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(6px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:var(--surface);border-radius:24px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:var(--sh2),0 0 0 1px rgba(0,0,0,0.05)}
.modal-hd{display:flex;align-items:center;justify-content:space-between;padding:22px 24px;border-bottom:1.5px solid var(--border);position:sticky;top:0;background:var(--surface);z-index:1;border-radius:24px 24px 0 0}
.modal-bd{padding:24px}
.modal-ft{padding:20px 24px;border-top:1.5px solid var(--border)}
.drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);z-index:900}
.drawer{position:fixed;right:0;top:0;bottom:0;width:420px;max-width:96vw;background:var(--surface);border-left:1.5px solid var(--border);z-index:901;display:flex;flex-direction:column;box-shadow:-12px 0 40px rgba(0,0,0,0.12)}
@keyframes slideInRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes slideInLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes shimmer{from{background-position:-200% 0}to{background-position:200% 0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.drawer{animation:slideInRight .28s cubic-bezier(.22,.68,0,1.2)}
.anim-up{animation:fadeUp .35s ease both}
.anim-scale{animation:scaleIn .25s ease both}
.anim-spin{animation:spin .7s linear infinite}
.anim-pulse{animation:pulse 1.5s ease infinite}
.anim-float{animation:float 3s ease-in-out infinite}
.skeleton{background:linear-gradient(90deg,var(--bg2) 25%,var(--border) 50%,var(--bg2) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:8px}
.product-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden;transition:all .25s;cursor:pointer;position:relative}
.product-card:hover{border-color:var(--accent);box-shadow:var(--sh2);transform:translateY(-3px)}
.product-img-wrap{width:100%;aspect-ratio:1;background:var(--bg2);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;transition:transform .4s}
.product-card:hover .product-img-wrap{transform:scale(1.03)}
.heart-btn{position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.9);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--ink3);cursor:pointer;transition:all .2s;z-index:2;backdrop-filter:blur(4px)}
.heart-btn:hover{color:var(--red);border-color:var(--red);background:#fff}
.heart-btn.wishlisted{color:var(--red);border-color:#fecaca;background:#fef2f2}
.add-cart-bar{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(255,255,255,.98) 0%,transparent 100%);padding:16px 12px 10px;opacity:0;transition:opacity .22s;display:flex;gap:6px}
.product-card:hover .add-cart-bar{opacity:1}
.qty-stepper{display:inline-flex;align-items:center;background:var(--bg2);border:1.5px solid var(--border);border-radius:10px;overflow:hidden}
.qty-btn{width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:var(--ink2);font-size:17px;cursor:pointer}
.qty-btn:hover{background:var(--border);color:var(--ink)}
.qty-val{min-width:32px;text-align:center;font-size:14px;font-weight:700;color:var(--ink)}
.tab-bar{display:flex;border-bottom:2px solid var(--border);gap:0}
.tab-item{padding:12px 20px;background:none;border:none;color:var(--ink2);font-weight:500;font-size:14px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .15s;white-space:nowrap}
.tab-item.active{color:var(--accent);border-bottom-color:var(--accent);font-weight:700}
.timeline{display:flex;flex-direction:column}
.tl-item{display:flex;gap:14px}
.tl-dot-col{display:flex;flex-direction:column;align-items:center}
.tl-dot{width:11px;height:11px;border-radius:50%;border:2px solid var(--border);background:var(--bg2);flex-shrink:0;margin-top:3px}
.tl-dot.done{background:var(--green);border-color:var(--green)}
.tl-dot.active{background:var(--accent);border-color:var(--accent);box-shadow:0 0 0 3px rgba(232,93,38,0.2)}
.tl-line{width:2px;flex:1;background:var(--border);min-height:22px}
.tl-line.done{background:var(--green)}
.tl-content{padding-bottom:22px;flex:1}
.star-fill{color:#f59e0b;font-size:13px}
.star-empty{color:#d1ccc4;font-size:13px}
.toast-wrap{position:fixed;bottom:22px;right:22px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r-sm);padding:13px 18px;display:flex;align-items:center;gap:11px;box-shadow:var(--sh2);animation:fadeUp .3s ease;min-width:260px;max-width:360px;pointer-events:auto;font-size:13.5px;font-weight:500}
.toast.s{border-left:3px solid var(--green)}
.toast.e{border-left:3px solid var(--red)}
.toast.i{border-left:3px solid var(--blue)}
.toast.w{border-left:3px solid var(--gold)}
.nav-top{position:sticky;top:0;z-index:800;background:rgba(248,247,244,.93);backdrop-filter:blur(16px);border-bottom:1.5px solid var(--border)}
.nav-main{max-width:1500px;margin:0 auto;padding:0 24px;height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;gap:16px}
.nav-cats{background:#1a1714;padding:0 24px;overflow-x:auto;scrollbar-width:none}
.nav-cats::-webkit-scrollbar{display:none}
.nav-cats-inner{max-width:1500px;margin:0 auto;display:flex;gap:0;height:40px;align-items:center}
.nav-cat-btn{background:none;border:none;color:rgba(255,255,255,.75);font-size:13px;font-weight:500;padding:0 16px;height:100%;cursor:pointer;transition:color .15s;white-space:nowrap;display:flex;align-items:center;gap:5px}
.nav-cat-btn:hover,.nav-cat-btn.active{color:#fff;border-bottom:2px solid var(--accent)}
.section{padding:48px 24px;max-width:1500px;margin:0 auto}
.section-hd{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;gap:12px;flex-wrap:wrap}
.section-title{font-size:clamp(22px,3vw,30px);font-weight:800;color:var(--ink)}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px}
.progress{height:5px;background:var(--bg2);border-radius:3px;overflow:hidden}
.progress-fill{height:100%;background:var(--accent);border-radius:3px;transition:width .5s ease}
.rating-row{display:flex;align-items:center;gap:8px}
.rating-track{flex:1;height:5px;background:var(--bg2);border-radius:3px;overflow:hidden}
.rating-fill{height:100%;background:var(--gold);border-radius:3px}
.notice{padding:12px 16px;border-radius:var(--r-sm);font-size:13px;font-weight:500;display:flex;align-items:flex-start;gap:10px}
.notice-blue{background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe}
.notice-green{background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0}
.notice-orange{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}
.notice-red{background:#fef2f2;color:#b91c1c;border:1px solid #fecaca}
.price-tag{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;color:var(--ink)}
.price-original{color:var(--ink3);text-decoration:line-through;font-size:.85em}
.price-save{color:var(--green);font-size:.82em;font-weight:700}
.filter-chip-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.filter-sidebar{width:220px;flex-shrink:0;position:sticky;top:calc(var(--nav-h) + 8px);max-height:calc(100vh - var(--nav-h) - 20px);overflow-y:auto;padding-right:4px}
.filter-sidebar::-webkit-scrollbar{width:3px}
.sidebar-section{margin-bottom:22px}
.sidebar-title{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:var(--ink2);margin-bottom:10px}
.filter-option{display:flex;align-items:center;gap:8px;padding:5px 0;cursor:pointer;color:var(--ink2);font-size:14px}
.filter-option:hover{color:var(--ink)}
input[type=checkbox]{width:15px;height:15px;accent-color:var(--accent);cursor:pointer;flex-shrink:0}
input[type=radio]{width:15px;height:15px;accent-color:var(--accent);cursor:pointer;flex-shrink:0}
input[type=range]{-webkit-appearance:none;height:4px;background:var(--bg2);border-radius:2px;padding:0;border:none;width:100%}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent);cursor:pointer;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.2)}
.toggle{width:42px;height:23px;border-radius:12px;background:var(--border2);border:none;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.toggle.on{background:var(--accent)}
.toggle-knob{width:17px;height:17px;border-radius:50%;background:#fff;position:absolute;top:3px;left:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,0.2)}
.toggle.on .toggle-knob{left:22px}
.step-bar{display:flex;align-items:center;margin-bottom:32px}
.step-node{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1}
.step-circle{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border:2px solid;transition:all .3s}
.step-circle.done{background:var(--green);border-color:var(--green);color:#fff}
.step-circle.active{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 0 0 4px rgba(232,93,38,0.18)}
.step-circle.future{background:var(--surface);border-color:var(--border2);color:var(--ink3)}
.step-connector{flex:1;height:2px;background:var(--border);margin-bottom:22px;transition:background .3s}
.step-connector.done{background:var(--green)}
.google-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:13px 22px;background:#fff;border:1.5px solid #dadce0;border-radius:50px;color:#3c4043;font-size:15px;font-weight:600;cursor:pointer;transition:all .18s;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.08)}
.google-btn:hover{box-shadow:0 2px 8px rgba(0,0,0,0.14);border-color:#bbb}
.price-old{color:var(--ink3);text-decoration:line-through;font-size:12px;font-weight:400}
.deal-countdown{display:flex;gap:6px;align-items:center}
.countdown-block{background:var(--ink);color:#fff;border-radius:6px;padding:4px 8px;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600;min-width:38px;text-align:center}
.countdown-sep{font-weight:700;color:var(--ink2)}
.stars-row{display:flex;gap:2px}
.avatar-circle{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;overflow:hidden;flex-shrink:0}
.pfp-upload{width:96px;height:96px;border-radius:50%;background:var(--bg2);border:2.5px dashed var(--border2);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;font-size:11px;color:var(--ink3);text-align:center;gap:4px}
.pfp-upload:hover{border-color:var(--accent);color:var(--accent);background:rgba(232,93,38,0.04)}
.section-tag{display:inline-block;background:var(--accent);color:#fff;border-radius:4px;padding:2px 10px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px}
.hero-band{background:linear-gradient(135deg,#1a1714 0%,#2d2520 100%);padding:60px 24px;overflow:hidden;position:relative}
@media(max-width:768px){
  .products-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
  .filter-sidebar{display:none}
  .section{padding:28px 14px}
  .nav-main{padding:0 14px}
  .modal{border-radius:20px 20px 0 0;max-height:96vh;margin-top:auto;width:100%;max-width:100%}
  .modal-overlay{align-items:flex-end;padding:0}
  .drawer{width:100%;max-width:100%}
}
`}</style>
);

// ─── ICONS ─────────────────────────────────────────────────
const Ic = ({ n, s = 18, c = "", st = {} }) => {
  const d = {
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35",
    cart: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
    heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
    x: "M18 6 6 18M6 6l12 12",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
    chevR: "M9 18l6-6-6-6",
    chevL: "M15 18l-6-6 6-6",
    chevD: "M6 9l6 6 6-6",
    chevU: "M18 15l-6-6-6 6",
    check: "M20 6 9 17 4 12",
    pkg: "M16.5 9.4 7.5 4.21M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
    truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
    gift: "M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    card: "M1 4h22v16H1zM1 10h22",
    lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
    copy: "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8h.01M12 12v4",
    zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
    tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
    spin: "M21 12a9 9 0 1 1-6.22-8.56",
    return: "M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11",
    headset: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
    trend: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
    crown: "M2 20h20M5 20V10l7-7 7 7v10",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  };
  return (
    <span className={c} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0, ...st }}>
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={d[n] || ""} />
      </svg>
    </span>
  );
};

// Google logo
const GoogleLogo = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ─── HELPERS ──────────────────────────────────────────────
const fp = (n) => `$${Number(n).toFixed(2)}`;
const pct = (o, d) => Math.round(((o - d) / o) * 100);
const Stars = ({ r = 0, s = 13 }) => (
  <span className="stars-row">
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= Math.round(r) ? "#f59e0b" : "#d1ccc4", fontSize: s }}>★</span>
    ))}
  </span>
);
const statusColor = s => ({ Delivered: "green", Shipped: "blue", Processing: "orange", Pending: "gold", Cancelled: "red", Returned: "purple" })[s] || "blue";

// ─── TOAST ────────────────────────────────────────────────
let tid = 0;
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "i") => {
    const id = ++tid;
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3800);
  }, []);
  return { toasts, add };
};
const ToastUI = ({ toasts }) => {
  const icons = { s: "✅", e: "❌", i: "ℹ️", w: "⚠️" };
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{icons[t.type] || "ℹ️"}</span>{t.msg}
        </div>
      ))}
    </div>
  );
};

// ─── DATA ─────────────────────────────────────────────────
const PRODUCTS = [
  // Electronics — Phones
  { id:"p1", cat:"Electronics", sub:"Smartphones", name:"iPhone 15 Pro Max", brand:"Apple", price:1099, orig:1199, emoji:"📱", rating:4.9, rv:18432, stock:8, tags:["5G","A17 Pro chip","Titanium"], specs:{Storage:["256GB","512GB","1TB"], Color:["Black Titanium","White Titanium","Blue Titanium"]}, badge:"Best Seller", isNew:false, isTrending:true, desc:"The most powerful iPhone ever with A17 Pro chip, titanium build, and professional-grade cameras.", highlights:["6.7-inch Super Retina XDR","A17 Pro chip","48MP main camera","USB-C with USB3","Up to 29hr battery"] },
  { id:"p2", cat:"Electronics", sub:"Smartphones", name:"Samsung Galaxy S24 Ultra", brand:"Samsung", price:1199, orig:1299, emoji:"📲", rating:4.8, rv:12341, stock:12, tags:["S Pen","200MP","AI"], specs:{Storage:["256GB","512GB"], Color:["Titanium Black","Titanium Gray","Titanium Violet"]}, badge:"New", isNew:true, isTrending:true, desc:"Ultimate Android with built-in S Pen and 200MP camera system.", highlights:["6.8-inch Dynamic AMOLED","Snapdragon 8 Gen 3","200MP quad camera","Built-in S Pen","5000mAh battery"] },
  // Electronics — Laptops
  { id:"p3", cat:"Electronics", sub:"Laptops", name:"MacBook Pro 14\" M3 Pro", brand:"Apple", price:1999, orig:2199, emoji:"💻", rating:4.9, rv:8765, stock:5, tags:["M3 Pro","18hr battery"], specs:{RAM:["18GB","36GB"], Storage:["512GB","1TB","2TB"], Color:["Space Black","Silver"]}, badge:"Top Rated", isNew:false, isTrending:true, desc:"The world's most capable 14-inch laptop for professionals.", highlights:["M3 Pro chip","Liquid Retina XDR","18-hour battery","Up to 36GB unified memory","MagSafe 3"] },
  { id:"p4", cat:"Electronics", sub:"Laptops", name:"Dell XPS 15 OLED", brand:"Dell", price:1599, orig:1799, emoji:"🖥️", rating:4.7, rv:5432, stock:9, tags:["OLED","RTX 4060","Intel i9"], specs:{RAM:["16GB","32GB","64GB"], Storage:["512GB","1TB"]}, badge:null, isNew:false, isTrending:false, desc:"Stunning OLED display meets professional performance in a slim chassis.", highlights:["15.6\" 3.5K OLED 120Hz","Intel Core i9","RTX 4060","CNC aluminum","72Wh battery"] },
  // Electronics — Audio
  { id:"p5", cat:"Electronics", sub:"Audio", name:"Sony WH-1000XM5", brand:"Sony", price:279, orig:379, emoji:"🎧", rating:4.8, rv:22109, stock:20, tags:["ANC","30hr","LDAC"], specs:{Color:["Black","Silver","Midnight Blue"]}, badge:"Best Seller", isNew:false, isTrending:true, desc:"Industry-leading noise cancellation with unbeatable audio quality.", highlights:["30hr battery","Multipoint connection","8 mics for ANC","LDAC hi-res","Quick charge 3min=3hr"] },
  { id:"p6", cat:"Electronics", sub:"Audio", name:"AirPods Pro 2", brand:"Apple", price:229, orig:249, emoji:"🎵", rating:4.7, rv:31240, stock:30, tags:["ANC","Spatial Audio"], specs:{}, badge:null, isNew:false, isTrending:true, desc:"Active noise cancellation with Adaptive Transparency and Spatial Audio.", highlights:["H2 chip","Adaptive EQ","30hr total battery","USB-C charging","IPX4 water resistant"] },
  // Electronics — Watches
  { id:"p7", cat:"Electronics", sub:"Smartwatches", name:"Apple Watch Series 9 45mm", brand:"Apple", price:429, orig:469, emoji:"⌚", rating:4.8, rv:14230, stock:15, tags:["GPS","Health","S9 chip"], specs:{Size:["41mm","45mm"], Case:["Aluminium","Stainless Steel","Titanium"], Band:["Sport Band","Sport Loop","Milanese Loop","Leather Link"]}, badge:"Hot", isNew:false, isTrending:true, desc:"Your most powerful health companion with next-level display and chip.", highlights:["Always-On Retina display","S9 SiP chip","ECG & Blood Oxygen","18hr battery","Double tap gesture"] },
  { id:"p8", cat:"Electronics", sub:"Smartwatches", name:"Samsung Galaxy Watch 6 Classic", brand:"Samsung", price:379, orig:429, emoji:"🕐", rating:4.6, rv:9871, stock:18, tags:["Rotating bezel","Health"], specs:{Size:["43mm","47mm"], Color:["Black","Silver"]}, badge:null, isNew:false, isTrending:false, desc:"Iconic rotating bezel meets comprehensive health tracking.", highlights:["Rotating physical bezel","Super AMOLED","Body composition","Sleep coaching","4nm Exynos"] },
  // Electronics — Cameras
  { id:"p9", cat:"Electronics", sub:"Cameras", name:"Sony A7 IV Full-Frame", brand:"Sony", price:2499, orig:2699, emoji:"📷", rating:4.8, rv:4321, stock:4, tags:["Full-Frame","33MP","4K 60fps"], specs:{}, badge:"Pro Pick", isNew:false, isTrending:false, desc:"33MP full-frame mirrorless with advanced AF and 4K 60fps video.", highlights:["33MP BSI CMOS","Real-time Eye AF","4K 60fps","10fps burst","Dual card slots"] },
  { id:"p10", cat:"Electronics", sub:"Cameras", name:"GoPro Hero 12 Black", brand:"GoPro", price:349, orig:399, emoji:"🎥", rating:4.7, rv:8654, stock:22, tags:["5.3K","HyperSmooth","Waterproof"], specs:{}, badge:null, isNew:true, isTrending:false, desc:"The world's most versatile action camera, waterproof to 33ft.", highlights:["5.3K/60fps","HyperSmooth 6.0","4K 120fps slo-mo","Waterproof 33ft","5.3K full-frame"] },

  // Clothing — Men
  { id:"c1", cat:"Clothing", sub:"Men's Tops", name:"Premium Oxford Shirt", brand:"Ralph Lauren", price:129, orig:189, emoji:"👔", rating:4.7, rv:6543, stock:40, tags:["Cotton","Formal","Slim Fit"], specs:{Size:["XS","S","M","L","XL","XXL"], Color:["White","Blue","Pink","Light Grey"], Fit:["Slim","Regular"]}, badge:"Trending", isNew:false, isTrending:true, desc:"Classic Oxford cloth shirt crafted from premium 100% cotton.", highlights:["100% Oxford cloth","Button-down collar","Machine washable","Slim & regular fits","Preshrunk"] },
  { id:"c2", cat:"Clothing", sub:"Men's Bottoms", name:"Slim Chino Trousers", brand:"Levi's", price:79, orig:109, emoji:"👖", rating:4.5, rv:4321, stock:55, tags:["Stretch","Slim Fit"], specs:{Size:["28","30","32","34","36","38"], Color:["Khaki","Navy","Olive","Black","Dark Grey"], Fit:["Slim","Regular","Relaxed"]}, badge:null, isNew:false, isTrending:false, desc:"Modern slim-fit chinos with a touch of stretch for all-day comfort.", highlights:["2% elastane stretch","5-pocket design","Machine washable","Versatile styling","Sits at waist"] },
  // Clothing — Women
  { id:"c3", cat:"Clothing", sub:"Women's Dresses", name:"Floral Midi Wrap Dress", brand:"Zara", price:89, orig:129, emoji:"👗", rating:4.6, rv:8901, stock:28, tags:["Floral","Midi","Wrap"], specs:{Size:["XS","S","M","L","XL"], Color:["Floral Blue","Floral Pink","Floral White"]}, badge:"Trending", isNew:true, isTrending:true, desc:"Effortlessly elegant wrap dress with vibrant floral print.", highlights:["V-neckline","Midi length","Wrap front","Tie waist","100% viscose"] },
  { id:"c4", cat:"Clothing", sub:"Women's Tops", name:"Cashmere Turtleneck Sweater", brand:"Uniqlo", price:99, orig:139, emoji:"🧥", rating:4.8, rv:12340, stock:22, tags:["Cashmere","Luxury","Warm"], specs:{Size:["XS","S","M","L","XL","XXL"], Color:["Cream","Black","Camel","Navy","Burgundy","Forest Green"]}, badge:"Best Seller", isNew:false, isTrending:true, desc:"Premium 100% cashmere turtleneck — unbelievably soft and warm.", highlights:["100% Grade A cashmere","Ribbed turtleneck","Drop-shoulder silhouette","Dry clean or hand wash","Pilling resistant"] },
  // Clothing — Footwear
  { id:"c5", cat:"Clothing", sub:"Footwear", name:"Nike Air Max 270", brand:"Nike", price:149, orig:179, emoji:"👟", rating:4.7, rv:19876, stock:30, tags:["Air","Running","Lifestyle"], specs:{Size:["6","7","8","9","10","11","12","13"], Color:["Black/White","White/Red","All White","Triple Black"], Width:["Standard","Wide"]}, badge:null, isNew:false, isTrending:true, desc:"Max air unit in the heel delivers all-day comfort and cushioning.", highlights:["270-unit Max Air","Engineered mesh upper","Foam midsole","Rubber waffle outsole","Pull tab"] },
  { id:"c6", cat:"Clothing", sub:"Footwear", name:"Adidas Stan Smith", brand:"Adidas", price:99, orig:119, emoji:"👠", rating:4.6, rv:23450, stock:45, tags:["Classic","Leather","Tennis"], specs:{Size:["5","6","7","8","9","10","11","12"], Color:["White/Green","White/Black","White/Navy","Monochrome White"]}, badge:"Classic", isNew:false, isTrending:false, desc:"The iconic tennis shoe that became a streetwear legend since 1971.", highlights:["Full grain leather","Perforated 3-Stripes","OrthoLite insole","Rubber cupsole","Eco-friendly version"] },
  // Clothing — Accessories
  { id:"c7", cat:"Clothing", sub:"Accessories", name:"Leather Bifold Wallet", brand:"Coach", price:125, orig:185, emoji:"👜", rating:4.7, rv:5432, stock:35, tags:["Leather","Slim","RFID"], specs:{Color:["Black","Brown","Tan","Navy"]}, badge:null, isNew:false, isTrending:false, desc:"Slim leather bifold with RFID protection and premium craftsmanship.", highlights:["Full-grain leather","RFID blocking","8 card slots","Center currency divider","Gift ready"] },

  // Grocery — Coffee & Tea
  { id:"g1", cat:"Grocery", sub:"Coffee & Tea", name:"Ethiopian Yirgacheffe Single Origin", brand:"Blue Bottle", price:22, orig:28, emoji:"☕", rating:4.9, rv:14320, stock:80, tags:["Single Origin","Light Roast","Organic"], specs:{Grind:["Whole Bean","Espresso","Drip","French Press"], Size:["250g","500g","1kg"]}, badge:"Fan Favorite", isNew:false, isTrending:true, desc:"Bright, floral Ethiopian beans with notes of blueberry and jasmine.", highlights:["Single-origin","Altitude 1800-2200m","Washed process","Light roast","Specialty grade 90+"] },
  { id:"g2", cat:"Grocery", sub:"Coffee & Tea", name:"Uji Ceremonial Matcha 30g", brand:"Ippodo", price:48, orig:56, emoji:"🍵", rating:4.9, rv:8765, stock:40, tags:["Ceremonial","Japanese","Stone Ground"], specs:{}, badge:"Premium Import", isNew:false, isTrending:true, desc:"Top-grade ceremonial matcha stone-ground at Ippodo's Uji factory.", highlights:["Tencha cultivar","Shade grown 4 weeks","Hand-picked first flush","<3 month shelf life","Certified JAS Organic"] },
  // Grocery — Pantry
  { id:"g3", cat:"Grocery", sub:"Pantry Staples", name:"Organic Extra Virgin Olive Oil 750ml", brand:"California Olive Ranch", price:24, orig:32, emoji:"🫒", rating:4.8, rv:11230, stock:60, tags:["Cold-Press","Organic","California"], specs:{Size:["375ml","750ml","1L"]}, badge:"EVOO Choice", isNew:false, isTrending:false, desc:"Award-winning California-grown EVOO, first cold-pressed within hours of harvest.", highlights:["First cold press","<0.2% acidity","USDA Organic","Harvest date on label","Best within 15 months"] },
  { id:"g4", cat:"Grocery", sub:"Pantry Staples", name:"Raw Wildflower Honey 500g", brand:"Beekeeper's Naturals", price:26, orig:34, emoji:"🍯", rating:4.8, rv:9876, stock:70, tags:["Raw","Unfiltered","Antioxidant"], specs:{Size:["250g","500g","1kg"]}, badge:"Raw", isNew:false, isTrending:false, desc:"Unprocessed wildflower honey packed with enzymes and antioxidants.", highlights:["Unpasteurized","Superfood enzymes","No additives","Tested for pesticides","B-Corp certified"] },
  // Grocery — Fresh & Snacks
  { id:"g5", cat:"Grocery", sub:"Snacks", name:"Ancient Grain Granola 400g", brand:"Kind", price:14, orig:18, emoji:"🥣", rating:4.6, rv:7654, stock:100, tags:["Gluten-Free","Whole Grain","Low Sugar"], specs:{Flavor:["Dark Chocolate","Honey Oat","Berry Almond"]}, badge:null, isNew:false, isTrending:false, desc:"Crunchy granola with ancient grains and dark chocolate clusters.", highlights:["<5g sugar per serving","Whole grain oats","Non-GMO","No artificial flavors","8g+ fiber"] },
  { id:"g6", cat:"Grocery", sub:"Snacks", name:"Truffle & Sea Salt Popcorn 150g", brand:"Angie's Boom Chicka Pop", price:8, orig:10, emoji:"🍿", rating:4.5, rv:4321, stock:150, tags:["Truffle","Gourmet","Non-GMO"], specs:{Flavor:["Truffle Sea Salt","Kettle Corn","White Cheddar"]}, badge:null, isNew:true, isTrending:false, desc:"Premium microwave popcorn elevated with real black truffle and fleur de sel.", highlights:["Real black truffle","Fleur de sel","Non-GMO corn","Gluten-free","40% fewer calories"] },
  // Grocery — Health
  { id:"g7", cat:"Grocery", sub:"Health & Supplements", name:"AG1 Daily Greens Powder 30 Servings", brand:"Athletic Greens", price:79, orig:99, emoji:"🥤", rating:4.7, rv:18765, stock:50, tags:["Vitamins","Greens","Probiotic"], specs:{}, badge:"Trending", isNew:false, isTrending:true, desc:"75 vitamins, minerals and whole-food sourced ingredients in one scoop.", highlights:["75 nutrients","Prebiotics & probiotics","Adaptogens","NSF certified","Doctor formulated"] },

  // Fashion subcategory extras
  { id:"f1", cat:"Fashion", sub:"Bags", name:"Structured Tote Bag", brand:"Tory Burch", price:279, orig:379, emoji:"👝", rating:4.7, rv:3456, stock:12, tags:["Leather","Tote","Work"], specs:{Color:["Black","Camel","Navy"]}, badge:"New Season", isNew:true, isTrending:true, desc:"Polished structured tote crafted from pebbled leather with signature hardware.", highlights:["Pebbled leather","Magnetic closure","Laptop pocket","Gold-tone hardware","Detachable strap"] },
  { id:"f2", cat:"Fashion", sub:"Jewellery", name:"Gold Vermeil Necklace", brand:"Mejuri", price:145, orig:195, emoji:"📿", rating:4.8, rv:6543, stock:20, tags:["18K Gold","Vermeil","Fine"], specs:{Length:["16\"","18\"","20\""]}, badge:"Bestseller", isNew:false, isTrending:true, desc:"18K gold vermeil chain necklace that layers beautifully.", highlights:["18K gold over sterling","2.5 microns gold","Tarnish resistant","Recycled materials","Lifetime guarantee"] },
];

const GIFT_CARDS = [
  { id:"gc1", amt:25, design:"🎁", label:"$25" },
  { id:"gc2", amt:50, design:"🎀", label:"$50" },
  { id:"gc3", amt:100, design:"🎊", label:"$100" },
  { id:"gc4", amt:200, design:"✨", label:"$200" },
  { id:"gc5", amt:500, design:"💎", label:"$500" },
];

const SUBSCRIPTION_PLANS = [
  { id:"basic", name:"Swift Basic", price:4.99, billing:"monthly", perks:["Free shipping on orders $25+","Early access to deals","Monthly voucher $5","Basic customer priority","Cancel anytime"], color:"var(--blue)", icon:"⚡" },
  { id:"prime", name:"Swift Prime", price:12.99, billing:"monthly", perks:["FREE shipping on ALL orders","Priority 1-day delivery","10% cashback on every order","Exclusive member-only deals","Dedicated support line","$15 monthly voucher","Access to subscription box","Early access new products"], color:"var(--accent)", icon:"👑", popular:true },
  { id:"yearly", name:"Swift Prime Annual", price:99, billing:"yearly", perks:["Everything in Prime","Save $57 vs monthly","2× vouchers ($30/month)","VIP customer service","Free gift wrapping forever","Exclusive annual sale access"], color:"var(--purple)", icon:"💎" },
];

const CAT_FILTERS = {
  "Electronics": {
    sub: ["All","Smartphones","Laptops","Audio","Smartwatches","Cameras"],
    brand: ["Apple","Samsung","Sony","Dell","GoPro","All"],
    attrs: {
      Smartwatches: { Case: ["Aluminium","Stainless Steel","Titanium"], Band: ["Sport Band","Milanese Loop","Leather Link","Nylon"], Size: ["41mm","45mm","43mm","47mm"] },
      Smartphones: { Storage: ["64GB","128GB","256GB","512GB","1TB"], Color: ["Black","White","Gold","Blue","Purple"] },
      Audio: { Type: ["Over-ear","In-ear","On-ear"], Connection: ["Wireless","Wired","True Wireless"] },
    }
  },
  "Clothing": {
    sub: ["All","Men's Tops","Men's Bottoms","Women's Dresses","Women's Tops","Footwear","Accessories"],
    brand: ["Nike","Adidas","Apple","Ralph Lauren","Zara","Uniqlo","Levi's","Coach","All"],
    attrs: {
      Footwear: { Size: ["6","7","8","9","10","11","12","13"], Width: ["Standard","Wide"], Color: ["Black","White","Brown","Grey","Multi"] },
      "Men's Tops": { Size: ["XS","S","M","L","XL","XXL"], Fit: ["Slim","Regular","Relaxed"], Color: ["White","Blue","Black","Grey","Navy"] },
      "Women's Dresses": { Size: ["XS","S","M","L","XL"], Length: ["Mini","Midi","Maxi"] },
    }
  },
  "Grocery": {
    sub: ["All","Coffee & Tea","Pantry Staples","Snacks","Health & Supplements"],
    brand: ["Blue Bottle","Ippodo","California Olive Ranch","Beekeeper's Naturals","Kind","Athletic Greens","All"],
    attrs: {}
  },
  "Fashion": {
    sub: ["All","Bags","Jewellery"],
    brand: ["Tory Burch","Mejuri","All"],
    attrs: {}
  },
};

const MAIN_CATS = ["All","Electronics","Clothing","Grocery","Fashion"];
const NAV_CATS = ["Home","Shop","Best Sellers","Today's Deals","Customer Service","Gift Cards","Fashion","Subscriptions"];

const SAMPLE_ORDERS = [
  { id:"ORD-1042", date:"2024-11-10", status:"Delivered", items:[{ name:"Sony WH-1000XM5", emoji:"🎧", qty:1, price:279 }], total:279, addr:"42 Maple St, SF CA", tracking:"SB1234567890", payment:"Visa ••4242", canReturn:true, returnDL:"2024-12-10" },
  { id:"ORD-1041", date:"2024-11-25", status:"Shipped", items:[{ name:"Ethiopian Yirgacheffe", emoji:"☕", qty:2, price:22 },{ name:"Raw Wildflower Honey", emoji:"🍯", qty:1, price:26 }], total:70, addr:"42 Maple St, SF CA", tracking:"SB0987654321", payment:"Mastercard ••7890", canReturn:false, returnDL:null },
  { id:"ORD-1040", date:"2024-12-01", status:"Processing", items:[{ name:"Cashmere Turtleneck", emoji:"🧥", qty:1, price:99 }], total:99, addr:"42 Maple St, SF CA", tracking:null, payment:"PayPal", canReturn:false, returnDL:null },
];

const CUSTOMER_CARE = {
  phone: "+1 (800) SWIFT-01",
  email: "support@swiftbasket.com",
  chat: "Live chat 24/7",
  hours: "Mon–Fri 8am–10pm EST, Sat–Sun 9am–8pm EST",
};

// ─── AUTH MODAL ────────────────────────────────────────────
const AuthModal = ({ onClose, onLogin, reason = "" }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [step2, setStep2] = useState(false);
  const [code, setCode] = useState("");

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: "Alex Johnson", email: "alex.johnson@gmail.com", avatar: "AJ", provider: "google", sub: true, pfp: null });
      setLoading(false);
    }, 1400);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!step2) { setStep2(true); return; }
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: name || "User", email, avatar: ((name || "U")[0] + (name.split(" ")[1]?.[0] || "")).toUpperCase(), provider: "email", sub: false, pfp: null });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
        <div className="modal-hd">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <span style={{ fontFamily: "Playfair Display", fontSize: 20, fontWeight: 700 }}>SwiftBasket</span>
          </div>
          <button className="btn-icon" onClick={onClose}><Ic n="x" s={17} /></button>
        </div>
        <div className="modal-bd">
          {reason && <div className="notice notice-blue" style={{ marginBottom: 18 }}><Ic n="info" s={16} />{reason}</div>}
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{mode === "login" ? "Sign in" : "Create account"}</h3>
          <p style={{ color: "var(--ink3)", fontSize: 14, marginBottom: 22 }}>to continue shopping on SwiftBasket</p>

          <button className="google-btn" onClick={handleGoogle} disabled={loading} style={{ marginBottom: 18 }}>
            {loading ? <Ic n="spin" s={18} c="anim-spin" /> : <GoogleLogo />}
            Continue with Google
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1.5, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--ink3)" }}>or with email</span>
            <div style={{ flex: 1, height: 1.5, background: "var(--border)" }} />
          </div>
          {!step2 ? (
            <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {mode === "signup" && <div className="input-group"><label className="input-label">Full Name</label><input placeholder="Alex Johnson" value={name} onChange={e => setName(e.target.value)} required /></div>}
              <div className="input-group"><label className="input-label">Email</label><input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} style={{ paddingRight: 42 }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--ink3)", cursor: "pointer" }}><Ic n="eye" s={16} /></button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Continue →</button>
            </form>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="notice notice-blue"><Ic n="info" s={15} />Verification code sent to <b>{email}</b>. Demo: use <b>123456</b></div>
              <div className="input-group">
                <label className="input-label">6-digit code</label>
                <input placeholder="123456" value={code} onChange={e => setCode(e.target.value)} maxLength={6} className="mono" style={{ textAlign: "center", letterSpacing: 10, fontSize: 24, padding: "14px" }} />
              </div>
              <button onClick={handleEmail} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={code.length < 6}>Verify & Sign In</button>
              <button onClick={() => setStep2(false)} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>← Back</button>
            </div>
          )}
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink3)", marginTop: 18 }}>
            {mode === "login" ? "New here? " : "Have an account? "}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setStep2(false); }} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 700 }}>{mode === "login" ? "Sign up free" : "Sign in"}</button>
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["🔒 256-bit SSL", "🛡️ GDPR Compliant", "🔐 2FA Enabled"].map(b => (
              <span key={b} style={{ fontSize: 11, color: "var(--ink3)", background: "var(--bg2)", padding: "3px 10px", borderRadius: 50 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── LOGO ──────────────────────────────────────────────────
const Logo = ({ size = 30 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", flexShrink: 0 }}>
    <div style={{ width: size, height: size, borderRadius: 9, background: "linear-gradient(135deg,#e85d26,#ff9a45)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(232,93,38,0.35)", fontSize: size * 0.6 }}>⚡</div>
    <span style={{ fontFamily: "Playfair Display", fontWeight: 800, fontSize: size * 0.75, color: "var(--ink)", letterSpacing: "-0.3px" }}>SwiftBasket</span>
  </div>
);

// ─── PRODUCT CARD ──────────────────────────────────────────
const PCard = ({ p, onCart, onWish, wishlisted, onClick }) => {
  const [justAdded, setJA] = useState(false);
  const doCart = (e) => {
    e.stopPropagation();
    onCart(p);
    setJA(true);
    setTimeout(() => setJA(false), 1100);
  };
  const disc = p.orig > p.price ? pct(p.orig, p.price) : 0;
  return (
    <div className="product-card anim-up" onClick={() => onClick(p)}>
      <div className="product-img-wrap" style={{ fontSize: 80, height: 200 }}>
        <span className="anim-float" style={{ lineHeight: 1 }}>{p.emoji}</span>
        {p.badge && <span className="badge badge-orange" style={{ position: "absolute", top: 10, left: 10 }}>{p.badge}</span>}
        {disc > 0 && <span className="badge badge-red" style={{ position: "absolute", top: 10, right: p.badge ? "auto" : 10, left: p.badge ? "auto" : undefined, ...(p.badge ? { top: 10, left: "auto", right: 10 } : {}) }}>-{disc}%</span>}
        {p.isNew && !p.badge && <span className="badge badge-green" style={{ position: "absolute", top: 10, left: 10 }}>New</span>}
        <button className={`heart-btn ${wishlisted ? "wishlisted" : ""}`} onClick={e => { e.stopPropagation(); onWish(p); }}>
          {wishlisted ? "❤️" : "🤍"}
        </button>
        <div className="add-cart-bar">
          <button onClick={doCart} style={{ flex: 1, background: justAdded ? "var(--green)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "9px 0", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
            {justAdded ? <><Ic n="check" s={14} /> Added!</> : <><Ic n="cart" s={14} /> Add to Cart</>}
          </button>
        </div>
      </div>
      <div style={{ padding: "12px 14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>{p.brand}</div>
        <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.4, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
          <Stars r={p.rating} s={12} />
          <span style={{ fontSize: 11, color: "var(--ink3)" }}>({p.rv.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="price-tag" style={{ fontSize: 17 }}>{fp(p.price)}</span>
          {p.orig > p.price && <span className="price-old">{fp(p.orig)}</span>}
          {disc > 0 && <span className="price-save">Save {fp(p.orig - p.price)}</span>}
        </div>
        <div style={{ marginTop: 6, fontSize: 12, color: p.stock < 5 ? "var(--red)" : "var(--green)", fontWeight: 600 }}>
          {p.stock < 5 ? `⚠️ Only ${p.stock} left` : p.stock < 10 ? `⚡ ${p.stock} left` : "✓ In Stock"}
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT DETAIL MODAL ──────────────────────────────────
const PDModal = ({ p, onClose, onCart, onWish, wishlisted, user, showAuth, addToast }) => {
  const [tab, setTab] = useState("overview");
  const [qty, setQty] = useState(1);
  const [selSpec, setSelSpec] = useState({});
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMsg, setGiftMsg] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [reviewText, setRevText] = useState("");
  const [myRating, setMyRating] = useState(5);
  const disc = p.orig > p.price ? pct(p.orig, p.price) : 0;
  const sampleRevs = [
    { u: "Sarah M.", av: "SM", r: 5, d: "Nov 12, 2024", title: "Absolutely love it!", body: `Best ${p.name} I've ever owned. Arrived quickly, perfect condition. Highly recommend!`, hlp: 234 },
    { u: "James R.", av: "JR", r: 4, d: "Nov 8, 2024", title: "Great quality", body: "Really happy with this purchase. The quality is excellent for the price.", hlp: 89 },
    { u: "Priya K.", av: "PK", r: 5, d: "Oct 29, 2024", title: "Exceeded expectations", body: "Came ahead of schedule and was better than described. Would buy again.", hlp: 56 },
  ];

  const handleCart = () => {
    if (!user) { onClose(); showAuth("Sign in to add items to your cart"); return; }
    onCart(p, qty, selSpec, giftWrap ? giftMsg : null);
    addToast(`${p.name} added to cart!`, "s");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 880 }} onClick={e => e.stopPropagation()}>
        <div className="modal-hd">
          <div style={{ fontSize: 12, color: "var(--ink3)" }}>{p.cat} › {p.sub} › {p.brand}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => { setShareOpen(!shareOpen); }}>
              <Ic n="share" s={14} /> Share
            </button>
            <button className="btn btn-secondary btn-sm" style={wishlisted ? { color: "var(--red)", borderColor: "var(--red)" } : {}} onClick={() => onWish(p)}>
              {wishlisted ? "❤️ Saved" : "🤍 Wishlist"}
            </button>
            <button className="btn-icon" onClick={onClose}><Ic n="x" s={17} /></button>
          </div>
        </div>
        {shareOpen && (
          <div style={{ background: "var(--bg2)", padding: "10px 24px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--ink2)", fontWeight: 600 }}>Share:</span>
            {["📧 Email", "💬 WhatsApp", "🐦 Twitter/X", "📋 Copy Link"].map(s => (
              <button key={s} onClick={() => { addToast("Link copied to clipboard!", "s"); setShareOpen(false); }} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 12px", fontSize: 12, cursor: "pointer", fontFamily: "Plus Jakarta Sans" }}>{s}</button>
            ))}
          </div>
        )}
        <div className="modal-bd" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {/* Image */}
          <div>
            <div style={{ background: "var(--bg2)", borderRadius: 16, height: 280, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 110, position: "relative" }}>
              <span className="anim-float">{p.emoji}</span>
              {disc > 0 && <span className="badge badge-red" style={{ position: "absolute", top: 14, left: 14, fontSize: 14, padding: "5px 12px" }}>-{disc}% OFF</span>}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
              {["🔒 Secure", "🚚 Free $50+", "↩️ 30-Day Return"].map(b => (
                <div key={b} style={{ flex: 1, background: "var(--bg2)", borderRadius: 8, padding: "7px 4px", textAlign: "center", fontSize: 11, color: "var(--ink2)", fontWeight: 600, border: "1px solid var(--border)" }}>{b}</div>
              ))}
            </div>
          </div>
          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>{p.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Stars r={p.rating} />
              <span style={{ fontWeight: 700 }}>{p.rating}</span>
              <span style={{ fontSize: 13, color: "var(--ink3)" }}>{p.rv.toLocaleString()} reviews</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span className="price-tag" style={{ fontSize: 28 }}>{fp(p.price)}</span>
              {p.orig > p.price && <span className="price-old" style={{ fontSize: 16 }}>{fp(p.orig)}</span>}
              {disc > 0 && <span className="price-save" style={{ fontSize: 14 }}>Save {fp(p.orig - p.price)}</span>}
            </div>
            <p style={{ color: "var(--ink2)", fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
            {/* Variants */}
            {Object.keys(p.specs || {}).map(sk => (
              <div key={sk}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", marginBottom: 6 }}>{sk}: <span style={{ color: "var(--ink)", fontWeight: 600 }}>{selSpec[sk] || p.specs[sk][0]}</span></div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.specs[sk].map(v => (
                    <button key={v} onClick={() => setSelSpec({ ...selSpec, [sk]: v })} style={{ padding: "5px 12px", border: `1.5px solid ${(selSpec[sk] || p.specs[sk][0]) === v ? "var(--accent)" : "var(--border)"}`, borderRadius: 8, background: (selSpec[sk] || p.specs[sk][0]) === v ? "rgba(232,93,38,0.06)" : "var(--surface)", color: (selSpec[sk] || p.specs[sk][0]) === v ? "var(--accent)" : "var(--ink2)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{v}</button>
                  ))}
                </div>
              </div>
            ))}
            {/* Gift wrap */}
            <div style={{ background: "var(--bg2)", borderRadius: 10, padding: 12, border: "1px solid var(--border)" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: giftWrap ? 8 : 0 }}>
                <input type="checkbox" checked={giftWrap} onChange={e => setGiftWrap(e.target.checked)} />
                <span style={{ fontWeight: 600, fontSize: 14 }}><Ic n="gift" s={14} st={{ marginRight: 4 }} />Add gift wrapping (+$3.99)</span>
              </label>
              {giftWrap && <textarea value={giftMsg} onChange={e => setGiftMsg(e.target.value)} placeholder="Write a gift message…" rows={2} style={{ resize: "none", fontSize: 13, marginTop: 4 }} />}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="qty-stepper">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}><Ic n="minus" s={14} /></button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(Math.min(p.stock, qty + 1))}><Ic n="plus" s={14} /></button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", height: 44 }} onClick={handleCart}>
                <Ic n="cart" s={16} /> Add {qty > 1 ? `${qty}× ` : ""}to Cart
              </button>
            </div>
            <div style={{ fontSize: 12, color: p.stock < 5 ? "var(--red)" : "var(--green)", fontWeight: 600 }}>
              {p.stock < 5 ? `⚠️ Only ${p.stock} left in stock` : `✓ In Stock — ships in 1–2 business days`}
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="tab-bar" style={{ paddingLeft: 24, paddingRight: 24, overflowX: "auto" }}>
          {["overview","highlights","reviews","returns","security"].map(t => (
            <button key={t} className={`tab-item ${tab === t ? "active" : ""}`} onClick={() => setTab(t)} style={{ textTransform: "capitalize" }}>{t}</button>
          ))}
        </div>
        <div className="modal-bd" style={{ paddingTop: 18 }}>
          {tab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["Brand", p.brand], ["Category", p.sub], ["Rating", `${p.rating} / 5`], ["Reviews", p.rv.toLocaleString()], ["Stock", `${p.stock} units`], ["Tags", p.tags?.join(", ")]].map(([k, v]) => (
                <div key={k} style={{ background: "var(--bg2)", borderRadius: 10, padding: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700, color: "var(--ink3)", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          )}
          {tab === "highlights" && (
            <ul style={{ paddingLeft: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {(p.highlights || []).map((h, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--ink2)" }}>
                  <span style={{ color: "var(--green)", fontWeight: 700, marginTop: 1 }}>✓</span>{h}
                </li>
              ))}
            </ul>
          )}
          {tab === "reviews" && (
            <div>
              <div style={{ display: "flex", gap: 28, marginBottom: 24, padding: 16, background: "var(--bg2)", borderRadius: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 48, fontWeight: 800, fontFamily: "Playfair Display", lineHeight: 1 }}>{p.rating}</div>
                  <Stars r={p.rating} />
                  <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>{p.rv.toLocaleString()} reviews</div>
                </div>
                <div style={{ flex: 1 }}>
                  {[[5,82],[4,11],[3,5],[2,1],[1,1]].map(([star, pct]) => (
                    <div key={star} className="rating-row" style={{ marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: "var(--ink3)", width: 12 }}>{star}</span>
                      <span style={{ fontSize: 12 }}>★</span>
                      <div className="rating-track"><div className="rating-fill" style={{ width: `${pct}%` }} /></div>
                      <span style={{ fontSize: 12, color: "var(--ink3)", width: 28 }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {sampleRevs.map((r, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    <div className="avatar-circle" style={{ width: 34, height: 34, background: "var(--accent)", color: "#fff", fontSize: 13 }}>{r.av}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{r.u}</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Stars r={r.r} s={12} /><span style={{ fontSize: 11, color: "var(--ink3)" }}>{r.d}</span></div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{r.title}</div>
                  <p style={{ fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.7 }}>{r.body}</p>
                  <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 8 }}>👍 {r.hlp} helpful</div>
                </div>
              ))}
              <div style={{ background: "var(--bg2)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Write a Review</div>
                <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                  {[1,2,3,4,5].map(s => <button key={s} onClick={() => setMyRating(s)} style={{ fontSize: 22, background: "none", border: "none", cursor: "pointer", filter: s <= myRating ? "none" : "grayscale(1)" }}>⭐</button>)}
                </div>
                <textarea placeholder="Share your experience…" value={reviewText} onChange={e => setRevText(e.target.value)} rows={3} style={{ resize: "none", marginBottom: 10 }} />
                <button onClick={() => { addToast("Review submitted — thank you!", "s"); setRevText(""); }} disabled={!reviewText} className="btn btn-primary btn-sm" style={{ opacity: reviewText ? 1 : 0.5 }}>Submit Review</button>
              </div>
            </div>
          )}
          {tab === "returns" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="notice notice-green"><Ic n="check" s={15} />This item is eligible for a <b>30-day return</b> from the date of delivery.</div>
              {[["📦 Free Returns", "Use our pre-paid return label — return shipping is on us."], ["💰 Full Refund", "Refunds processed within 3–5 business days to original payment."], ["🔄 Easy Exchange", "Prefer an exchange? Select your new item during return process."], ["📸 Item Condition", "Items must be unused, in original packaging with all accessories."]].map(([t, d]) => (
                <div key={t} style={{ background: "var(--bg2)", borderRadius: 10, padding: 14, border: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t}</div>
                  <p style={{ fontSize: 13.5, color: "var(--ink2)" }}>{d}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["🔒 AES-256 Encryption", "All transactions and personal data encrypted with bank-grade AES-256. Data never stored in plain text."], ["🛡️ PCI DSS Level 1", "Highest level of PCI compliance. Your card details are never stored on our servers — only tokenized references."], ["🔐 2-Factor Auth", "Optional 2FA protects your account. Unusual logins trigger instant alerts to your registered email."], ["👁️ Zero Data Selling", "We NEVER sell your data. GDPR, CCPA, and DPDP compliant. You can request full data export or deletion anytime."], ["🌐 Secure Sessions", "Sessions are device-fingerprinted and expire automatically. Concurrent sessions monitored for anomalies."]].map(([t, d]) => (
                <div key={t} style={{ background: "var(--bg2)", borderRadius: 10, padding: 14, border: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{t}</div>
                  <p style={{ fontSize: 13.5, color: "var(--ink2)" }}>{d}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── CART DRAWER ───────────────────────────────────────────
const CartDrawer = ({ cart, onClose, updateQty, removeItem, setPage }) => {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 50 ? 0 : 7.99;
  const total = subtotal + shipping;
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div style={{ padding: "18px 20px", borderBottom: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>Cart ({cart.reduce((s, i) => s + i.qty, 0)} items)</h3>
          <button className="btn-icon" onClick={onClose}><Ic n="x" s={16} /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 0", color: "var(--ink3)" }}>
              <div style={{ fontSize: 56, marginBottom: 10 }}>🛒</div>
              <div style={{ fontWeight: 600 }}>Your cart is empty</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 16 }} onClick={() => { onClose(); setPage("shop"); }}>Start Shopping</button>
            </div>
          ) : cart.map(item => (
            <div key={item.id + (item.specKey || "")} style={{ display: "flex", gap: 12, background: "var(--bg2)", borderRadius: 12, padding: 12, border: "1px solid var(--border)" }}>
              <div style={{ width: 54, height: 54, background: "var(--surface)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                {item.specs && <div style={{ fontSize: 11, color: "var(--ink3)", marginBottom: 6 }}>{Object.entries(item.specs).map(([k, v]) => `${k}: ${v}`).join(" · ")}</div>}
                {!item.specs && <div style={{ fontSize: 11, color: "var(--ink3)", marginBottom: 6 }}>{item.brand}</div>}
                {item.giftMsg && <div style={{ fontSize: 11, color: "var(--accent)", marginBottom: 4 }}>🎁 Gift wrapped</div>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="qty-stepper" style={{ transform: "scale(.82)", transformOrigin: "left" }}>
                    <button className="qty-btn" onClick={() => updateQty(item.cartId, item.qty - 1)}><Ic n="minus" s={12} /></button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.cartId, item.qty + 1)}><Ic n="plus" s={12} /></button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{fp(item.price * item.qty)}</span>
                    <button onClick={() => removeItem(item.cartId)} style={{ background: "none", border: "none", color: "var(--ink3)", cursor: "pointer", padding: 3 }}><Ic n="trash" s={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: 20, borderTop: "1.5px solid var(--border)" }}>
            {subtotal < 50 && (
              <div className="progress" style={{ marginBottom: 10 }}>
                <div className="progress-fill" style={{ width: `${(subtotal / 50) * 100}%` }} />
              </div>
            )}
            {subtotal < 50 && <div style={{ fontSize: 12, color: "var(--ink2)", marginBottom: 12, fontWeight: 600 }}>Add {fp(50 - subtotal)} more for <span style={{ color: "var(--green)" }}>FREE shipping!</span></div>}
            {[["Subtotal", fp(subtotal)], ["Shipping", shipping === 0 ? "FREE 🎉" : fp(shipping)], ["Total", fp(total)]].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: i === 2 ? 16 : 13, fontWeight: i === 2 ? 800 : 400, color: i === 2 ? "var(--ink)" : "var(--ink2)" }}>
                <span>{k}</span><span style={{ color: v === "FREE 🎉" ? "var(--green)" : "inherit" }}>{v}</span>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 14, height: 48, fontSize: 16 }} onClick={() => { onClose(); setPage("checkout"); }}>
              Checkout →
            </button>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 11.5, color: "var(--ink3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <Ic n="shield" s={12} /> Secured with 256-bit SSL encryption
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// ─── SEARCH MODAL ──────────────────────────────────────────
const SearchModal = ({ onClose, products, onProduct }) => {
  const [q, setQ] = useState("");
  const ref = useRef();
  useEffect(() => { ref.current?.focus(); }, []);

  const res = q.length > 1 ? products.filter(p =>
    [p.name, p.brand, p.cat, p.sub, ...(p.tags || [])].some(f => f?.toLowerCase().includes(q.toLowerCase()))
  ).slice(0, 8) : [];

  return (
    <div className="modal-overlay" style={{ alignItems: "flex-start", paddingTop: 70 }} onClick={onClose}>
      <div style={{ background: "var(--surface)", borderRadius: 18, width: "100%", maxWidth: 620, border: "1.5px solid var(--border)", overflow: "hidden", boxShadow: "var(--sh2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "1.5px solid var(--border)" }}>
          <Ic n="search" s={18} c="" st={{ color: "var(--ink3)" }} />
          <input ref={ref} placeholder="Search products, brands…" value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1, border: "none", background: "none", padding: 0, fontSize: 16, outline: "none", color: "var(--ink)" }} />
          <span style={{ fontSize: 11, background: "var(--bg2)", padding: "3px 8px", borderRadius: 5, color: "var(--ink3)", border: "1px solid var(--border)" }}>ESC</span>
        </div>
        {q.length > 1 ? (
          res.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "var(--ink3)" }}>No results for "{q}"</div>
          ) : res.map(p => (
            <div key={p.id} onClick={() => { onProduct(p); onClose(); }} style={{ display: "flex", gap: 12, padding: "11px 18px", cursor: "pointer", borderBottom: "1px solid var(--border)", transition: "background .15s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--bg2)"} onMouseLeave={e => e.currentTarget.style.background = ""}>
              <div style={{ width: 42, height: 42, background: "var(--bg2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{p.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink3)" }}>{p.brand} · {p.sub}</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{fp(p.price)}</div>
            </div>
          ))
        ) : (
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "var(--ink3)", marginBottom: 10 }}>Trending Searches</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["iPhone 15","Sony headphones","Cashmere sweater","Matcha","MacBook M3","Nike Air Max","Olive oil"].map(t => (
                <button key={t} onClick={() => setQ(t)} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 50, padding: "5px 14px", fontSize: 13, cursor: "pointer", fontFamily: "Plus Jakarta Sans" }}>🔥 {t}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── NAVBAR ────────────────────────────────────────────────
const Navbar = ({ user, cartCount, wishCount, notifCount, onCart, onSearch, setPage, page, onAuthReq }) => (
  <div className="nav-top">
    <div className="nav-main">
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}><Logo /></button>
      <div style={{ flex: 1, maxWidth: 500 }}>
        <button onClick={onSearch} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "var(--bg2)", border: "1.5px solid var(--border)", borderRadius: 50, padding: "9px 18px", cursor: "pointer", color: "var(--ink3)", fontSize: 14, fontFamily: "Plus Jakarta Sans", transition: "border-color .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"} onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
          <Ic n="search" s={16} /><span>Search products, brands, categories…</span>
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative" }}>
          <button className="btn-icon" onClick={() => setPage("notifications")}><Ic n="bell" s={18} /></button>
          {notifCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, width: 17, height: 17, borderRadius: "50%", background: "var(--red)", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--bg)" }}>{notifCount}</span>}
        </div>
        <div style={{ position: "relative" }}>
          <button className="btn-icon" onClick={() => { if (!user) { onAuthReq("Sign in to view your cart"); return; } onCart(); }}><Ic n="cart" s={18} /></button>
          {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, width: 17, height: 17, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--bg)" }}>{cartCount}</span>}
        </div>
        <div style={{ position: "relative" }}>
          <button className="btn-icon" onClick={() => { if (!user) { onAuthReq("Sign in to view your wishlist"); return; } setPage("wishlist"); }}><Ic n="heart" s={18} /></button>
          {wishCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, width: 17, height: 17, borderRadius: "50%", background: "var(--red)", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--bg)" }}>{wishCount}</span>}
        </div>
        {user ? (
          <button onClick={() => setPage("profile")} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 50, padding: "5px 12px 5px 5px", cursor: "pointer" }}>
            {user.pfp ? <img src={user.pfp} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} /> : <div className="avatar-circle" style={{ width: 28, height: 28, background: "var(--accent)", color: "#fff", fontSize: 11 }}>{user.avatar}</div>}
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{user.name.split(" ")[0]}</span>
          </button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={() => onAuthReq()}><Ic n="user" s={14} /> Sign In</button>
        )}
      </div>
    </div>
    <div className="nav-cats">
      <div className="nav-cats-inner">
        {NAV_CATS.map(cat => (
          <button key={cat} className={`nav-cat-btn ${page === cat.toLowerCase().replace(" ", "-") ? "active" : ""}`} onClick={() => setPage(cat.toLowerCase().replace(/ /g, "-"))}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ─── HERO ──────────────────────────────────────────────────
const Hero = ({ setPage, onSearch }) => {
  const [count, setCount] = useState({ h: 5, m: 43, s: 27 });
  useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => {
        let { h, m, s } = c;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  const pad = n => String(n).padStart(2, "0");

  return (
    <div className="hero-band">
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(232,93,38,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1500, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <div className="anim-up">
          <span className="section-tag">Today's Flash Sale</span>
          <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: 16, marginTop: 8 }}>
            Deals so fast,<br />
            <span style={{ color: "var(--accent)" }}>blink and miss.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
            Up to 60% off on Electronics, Clothing & Grocery. Free shipping on orders over $50.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage("today's-deals")}><Ic n="zap" s={18} /> Shop Today's Deals</button>
            <button className="btn btn-lg" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)" }} onClick={() => setPage("shop")}>Browse All Products</button>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600 }}>Sale ends in:</span>
            <div className="deal-countdown">
              {[pad(count.h), pad(count.m), pad(count.s)].map((v, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span className="countdown-block">{v}</span>
                  {i < 2 && <span className="countdown-sep" style={{ color: "rgba(255,255,255,.4)" }}>:</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="anim-up" style={{ animationDelay: ".1s" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { emoji: "📱", label: "iPhone 15 Pro", price: "$1,099", disc: "8%", color: "#1c1c1e" },
              { emoji: "🎧", label: "Sony XM5", price: "$279", disc: "27%", color: "#1a1420" },
              { emoji: "💻", label: "MacBook M3", price: "$1,999", disc: "9%", color: "#0d1a14" },
              { emoji: "⌚", label: "Apple Watch", price: "$429", disc: "9%", color: "#1a1209" },
            ].map((it, i) => (
              <div key={i} onClick={() => setPage("shop")} style={{ background: it.color, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 18, cursor: "pointer", transition: "transform .2s,box-shadow .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{it.emoji}</div>
                <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12, marginBottom: 4 }}>{it.label}</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{it.price}</div>
                <span className="badge badge-red" style={{ marginTop: 6 }}>-{it.disc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main export default at the end of this file
// continued in the component below
export default function SwiftBasket() {
  const { toasts, add: addToast } = useToast();

  // ── State ──
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [authOpen, setAuthOpen] = useState(false);
  const [authReason, setAuthReason] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selProduct, setSelProduct] = useState(null);

  // ── Cart ops ──
  let cartIdCounter = useRef(0);
  const addToCart = useCallback((p, qty = 1, specs = {}, giftMsg = null) => {
    if (!user && !isGuest) return;
    const cartId = ++cartIdCounter.current;
    setCart(prev => {
      const specKey = JSON.stringify(specs);
      const ex = prev.find(i => i.id === p.id && JSON.stringify(i.specs) === specKey);
      if (ex) return prev.map(i => i.id === p.id && JSON.stringify(i.specs) === specKey ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...p, cartId, qty, specs: Object.keys(specs).length ? specs : null, giftMsg }];
    });
  }, [user, isGuest]);

  const updateQty = useCallback((cartId, qty) => {
    if (qty <= 0) setCart(p => p.filter(i => i.cartId !== cartId));
    else setCart(p => p.map(i => i.cartId === cartId ? { ...i, qty } : i));
  }, []);

  const removeItem = useCallback((cartId) => setCart(p => p.filter(i => i.cartId !== cartId)), []);

  const toggleWish = useCallback((p) => {
    if (!user && !isGuest) { showAuth("Sign in to save items to your wishlist"); return; }
    setWishlist(prev => {
      const has = prev.includes(p.id);
      addToast(has ? "Removed from wishlist" : "❤️ Added to wishlist!", "i");
      return has ? prev.filter(id => id !== p.id) : [...prev, p.id];
    });
  }, [user, isGuest, addToast]);

  const showAuth = useCallback((reason = "") => {
    setAuthReason(reason);
    setAuthOpen(true);
  }, []);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setIsGuest(false);
    setAuthOpen(false);
    addToast(`Welcome back, ${userData.name.split(" ")[0]}! 👋`, "s");
  }, [addToast]);

  const handleGuest = useCallback(() => {
    setIsGuest(true);
    addToast("Browsing as guest. Sign in to checkout.", "i");
  }, [addToast]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setIsGuest(false);
    setCart([]);
    setWishlist([]);
    setPage("home");
    addToast("Signed out successfully", "i");
  }, [addToast]);

  const placeOrder = useCallback((orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      items: cart.map(i => ({ name: i.name, emoji: i.emoji, qty: i.qty, price: i.price })),
      total: orderData.total,
      addr: orderData.addr,
      tracking: null,
      payment: orderData.payment,
      canReturn: false,
      returnDL: null,
    };
    setOrders(p => [newOrder, ...p]);
    setCart([]);
    setPage("orders");
    addToast("🎉 Order placed successfully!", "s");
  }, [cart, addToast]);

  // Keyboard shortcut
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setSelProduct(null); setAuthOpen(false); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // ── Landing / auth gate ──
  if (!user && !isGuest) {
    return (
      <>
        <GS />
        <LandingPage onGoogleLogin={() => {
          setUser({ name: "Alex Johnson", email: "alex.johnson@gmail.com", avatar: "AJ", provider: "google", sub: true, pfp: null });
          addToast("Welcome back, Alex! 👋", "s");
        }} onGuest={handleGuest} onEmailLogin={() => setAuthOpen(true)} />
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onLogin={handleLogin} reason={authReason} />}
        <ToastUI toasts={toasts} />
      </>
    );
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Page routing ──
  const renderPage = () => {
    if (page === "home") return <HomePage products={PRODUCTS} user={user} onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} setPage={setPage} showAuth={showAuth} />;
    if (page === "shop") return <ShopPage products={PRODUCTS} cat="All" onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} user={user} showAuth={showAuth} />;
    if (page === "electronics") return <ShopPage products={PRODUCTS} cat="Electronics" onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} user={user} showAuth={showAuth} />;
    if (page === "clothing") return <ShopPage products={PRODUCTS} cat="Clothing" onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} user={user} showAuth={showAuth} />;
    if (page === "grocery") return <ShopPage products={PRODUCTS} cat="Grocery" onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} user={user} showAuth={showAuth} />;
    if (page === "fashion") return <ShopPage products={PRODUCTS} cat="Fashion" onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} user={user} showAuth={showAuth} />;
    if (page === "today's-deals") return <DealsPage products={PRODUCTS} onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} user={user} showAuth={showAuth} />;
    if (page === "best-sellers") return <BestSellersPage products={PRODUCTS} onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} user={user} showAuth={showAuth} />;
    if (page === "orders") return <OrdersPage orders={orders} user={user} showAuth={showAuth} addToast={addToast} />;
    if (page === "wishlist") return <WishlistPage wishlist={wishlist} products={PRODUCTS} onCart={addToCart} onWish={toggleWish} onProduct={setSelProduct} user={user} />;
    if (page === "profile") return <ProfilePage user={user} onLogout={handleLogout} addToast={addToast} setUser={setUser} />;
    if (page === "checkout") return <CheckoutPage cart={cart} user={user} showAuth={showAuth} onPlace={placeOrder} addToast={addToast} setPage={setPage} />;
    if (page === "notifications") return <NotificationsPage orders={orders} />;
    if (page === "customer-service") return <CustomerServicePage />;
    if (page === "gift-cards") return <GiftCardsPage user={user} showAuth={showAuth} addToast={addToast} />;
    if (page === "subscriptions") return <SubscriptionsPage user={user} showAuth={showAuth} addToast={addToast} />;
    return <HomePage products={PRODUCTS} user={user} onCart={addToCart} wishlist={wishlist} onWish={toggleWish} onProduct={setSelProduct} setPage={setPage} showAuth={showAuth} />;
  };

  return (
    <>
      <GS />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar user={user} cartCount={cartCount} wishCount={wishlist.length} notifCount={2} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} setPage={setPage} page={page} onAuthReq={showAuth} />
        <main style={{ flex: 1 }}>{renderPage()}</main>
        <Footer setPage={setPage} user={user} />
      </div>

      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} updateQty={updateQty} removeItem={removeItem} setPage={p => { setCartOpen(false); setPage(p); }} />}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} products={PRODUCTS} onProduct={p => setSelProduct(p)} />}
      {selProduct && <PDModal p={selProduct} onClose={() => setSelProduct(null)} onCart={(p, qty, specs, giftMsg) => addToCart(p, qty, specs, giftMsg)} onWish={toggleWish} wishlisted={wishlist.includes(selProduct.id)} user={user} showAuth={showAuth} addToast={addToast} />}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onLogin={handleLogin} reason={authReason} />}
      <ToastUI toasts={toasts} />
    </>
  );
}

// ─── LANDING PAGE ──────────────────────────────────────────
function LandingPage({ onGoogleLogin, onGuest, onEmailLogin }) {
  const [loading, setLoading] = useState(false);
  const doGoogle = () => { setLoading(true); setTimeout(onGoogleLogin, 1400); };
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>
      {/* Left */}
      <div style={{ flex: 1, background: "linear-gradient(145deg,#1a1714 0%,#2d1f14 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "15%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,93,38,0.18) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,93,38,0.1) 0%,transparent 60%)", pointerEvents: "none" }} />
        <div className="anim-up" style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#e85d26,#ff9a45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 4px 14px rgba(232,93,38,0.45)" }}>⚡</div>
            <span style={{ fontFamily: "Playfair Display", fontSize: 26, fontWeight: 800, color: "#fff" }}>SwiftBasket</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, lineHeight: 1.15, color: "#fff", marginBottom: 20 }}>
            Your one-stop shop<br />for <span style={{ color: "var(--accent)" }}>everything.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 16.5, lineHeight: 1.8, maxWidth: 380, marginBottom: 44 }}>
            Electronics, Fashion, Grocery and more. Premium products, secured payments, delivered fast.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[["🔒", "AES-256 encrypted transactions"], ["⚡", "1-day delivery in 50+ cities"], ["↩️", "Hassle-free 30-day returns"], ["🛡️", "GDPR & PCI DSS compliant"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(255,255,255,.65)", fontSize: 14 }}>
                <span style={{ fontSize: 20 }}>{ic}</span>{t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 36, marginTop: 44 }}>
            {[["50k+", "Happy Customers"], ["200+", "Premium Brands"], ["4.9★", "Average Rating"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "Playfair Display", fontSize: 24, fontWeight: 800, color: "var(--accent)" }}>{v}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ width: 460, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 52px", background: "var(--surface)", borderLeft: "1.5px solid var(--border)" }}>
        <div className="anim-up" style={{ animationDelay: ".1s" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Welcome to SwiftBasket</h2>
          <p style={{ color: "var(--ink3)", fontSize: 14.5, marginBottom: 28 }}>Sign in to unlock your personalized shopping experience</p>

          <button className="google-btn" onClick={doGoogle} disabled={loading} style={{ marginBottom: 20 }}>
            {loading ? <Ic n="spin" s={18} c="anim-spin" /> : <GoogleLogo />}
            {loading ? "Signing you in…" : "Continue with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1.5, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--ink3)" }}>or</span>
            <div style={{ flex: 1, height: 1.5, background: "var(--border)" }} />
          </div>

          <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginBottom: 12, height: 46 }} onClick={onEmailLogin}>
            <Ic n="mail" s={16} /> Continue with Email
          </button>

          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginBottom: 24, height: 44, color: "var(--ink3)" }} onClick={onGuest}>
            Browse as Guest (limited access)
          </button>

          <div className="notice notice-orange" style={{ marginBottom: 20 }}>
            <Ic n="info" s={14} />Guest mode lets you browse. Sign in to add to cart, wishlist, and checkout.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["🔒", "256-bit SSL encryption"], ["🛡️", "Data never sold to third parties"], ["🔐", "2FA account protection"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "var(--ink3)" }}>
                <span style={{ fontSize: 15 }}>{ic}</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────
function HomePage({ products, user, onCart, wishlist, onWish, onProduct, setPage, showAuth }) {
  const trending = products.filter(p => p.isTrending).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.badge === "Best Seller").slice(0, 6);
  const recommended = user ? products.slice(0, 4) : trending.slice(0, 4);

  return (
    <div>
      <Hero setPage={setPage} />

      {/* Category quick links */}
      <div style={{ background: "var(--surface)", borderBottom: "1.5px solid var(--border)", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto", display: "flex", gap: 10, overflowX: "auto", flexWrap: "wrap" }}>
          {[["⚡", "Electronics", "electronics"], ["👔", "Clothing", "clothing"], ["🥗", "Grocery", "grocery"], ["👝", "Fashion", "fashion"], ["🔥", "Today's Deals", "today's-deals"], ["⭐", "Best Sellers", "best-sellers"], ["🎁", "Gift Cards", "gift-cards"], ["💎", "Subscriptions", "subscriptions"]].map(([ic, l, p]) => (
            <button key={l} onClick={() => setPage(p)} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg2)", border: "1.5px solid var(--border)", borderRadius: 50, padding: "8px 18px", fontSize: 13.5, fontWeight: 600, cursor: "pointer", color: "var(--ink2)", whiteSpace: "nowrap", fontFamily: "Plus Jakarta Sans", transition: "all .15s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink2)"; }}>
              <span>{ic}</span>{l}
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="section">
        <div className="section-hd">
          <div><span className="section-tag">Hot Right Now</span><h2 className="section-title">Trending Products</h2></div>
          <button className="btn btn-secondary btn-sm" onClick={() => setPage("shop")}>View All <Ic n="chevR" s={14} /></button>
        </div>
        <div className="products-grid">
          {trending.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
        </div>
      </div>

      {/* Deals banner */}
      <div style={{ background: "linear-gradient(135deg,#fff7f3 0%,#fff0e8 100%)", borderTop: "1.5px solid var(--border)", borderBottom: "1.5px solid var(--border)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto", display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div>
            <span className="section-tag">Limited Time</span>
            <h2 style={{ fontSize: 30, fontWeight: 800, marginTop: 6, marginBottom: 8 }}>Today's Mega Deals 🔥</h2>
            <p style={{ color: "var(--ink2)", fontSize: 15 }}>Fresh deals every day. Discounts up to 60% off premium brands.</p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setPage("today's-deals")}>Explore All Deals <Ic n="chevR" s={18} /></button>
        </div>
      </div>

      {/* Best sellers */}
      <div className="section">
        <div className="section-hd">
          <div><span className="section-tag">Customer Approved</span><h2 className="section-title">Best Sellers</h2></div>
          <button className="btn btn-secondary btn-sm" onClick={() => setPage("best-sellers")}>All Best Sellers <Ic n="chevR" s={14} /></button>
        </div>
        <div className="products-grid">
          {bestSellers.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
        </div>
      </div>

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <div style={{ background: "var(--bg2)", borderTop: "1.5px solid var(--border)", borderBottom: "1.5px solid var(--border)", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1500, margin: "0 auto" }}>
            <div className="section-hd" style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div><span className="section-tag">Just Dropped</span><h2 className="section-title">New Arrivals</h2></div>
            </div>
            <div className="products-grid" style={{ marginTop: 24 }}>
              {newArrivals.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
            </div>
          </div>
        </div>
      )}

      {/* Subscription teaser */}
      {user?.provider === "google" && (
        <div style={{ padding: "48px 24px", background: "linear-gradient(135deg,#1a1714 0%,#2d1f14 100%)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>👑</div>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Try Swift Prime</h2>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 16, marginBottom: 24, lineHeight: 1.7 }}>
              Free shipping on everything, 10% cashback on every order, priority delivery, and exclusive member deals — starting at $12.99/month.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => setPage("subscriptions")}>See Plans & Pricing</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SHOP PAGE ─────────────────────────────────────────────
function ShopPage({ products, cat, onCart, wishlist, onWish, onProduct, user, showAuth }) {
  const [activeCat, setActiveCat] = useState(cat === "All" ? "All" : cat);
  const [activeSub, setActiveSub] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [maxPrice, setMaxPrice] = useState(2700);
  const [selAttrs, setSelAttrs] = useState({});
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const catInfo = CAT_FILTERS[activeCat] || { sub: ["All"], brand: [], attrs: {} };
  const subAttrs = catInfo.attrs?.[activeSub] || {};

  const filtered = products.filter(p => {
    if (activeCat !== "All" && p.cat !== activeCat) return false;
    if (activeSub !== "All" && p.sub !== activeSub) return false;
    if (p.price > maxPrice) return false;
    if (brands.length > 0 && !brands.includes(p.brand)) return false;
    if (search && searched) {
      const q = search.toLowerCase();
      if (![p.name, p.brand, p.sub, ...(p.tags || [])].some(f => f?.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Highest Rated") return b.rating - a.rating;
    if (sort === "Most Reviews") return b.rv - a.rv;
    if (sort === "Biggest Discount") return pct(b.orig, b.price) - pct(a.orig, a.price);
    return 0;
  });

  const toggleBrand = (br) => setBrands(prev => prev.includes(br) ? prev.filter(b => b !== br) : [...prev, br]);

  return (
    <div style={{ maxWidth: 1500, margin: "0 auto", padding: "28px 24px", display: "flex", gap: 28, minHeight: "80vh" }}>
      {/* Filter sidebar */}
      <div className="filter-sidebar">
        <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Filters</span>
          <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => { setActiveSub("All"); setMaxPrice(2700); setBrands([]); setSelAttrs({}); setSearch(""); setSearched(false); }}>Reset</button>
        </div>

        {/* Category */}
        <div className="sidebar-section">
          <div className="sidebar-title">Category</div>
          {MAIN_CATS.map(c => (
            <label key={c} className="filter-option">
              <input type="radio" name="cat" checked={activeCat === c} onChange={() => { setActiveCat(c); setActiveSub("All"); setSelAttrs({}); }} />
              {c}
            </label>
          ))}
        </div>

        {/* Subcategory */}
        {catInfo.sub.length > 1 && (
          <div className="sidebar-section">
            <div className="sidebar-title">Type</div>
            {catInfo.sub.map(s => (
              <label key={s} className="filter-option">
                <input type="radio" name="sub" checked={activeSub === s} onChange={() => { setActiveSub(s); setSelAttrs({}); }} />
                {s}
              </label>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="sidebar-section">
          <div className="sidebar-title">Max Price: {fp(maxPrice)}</div>
          <input type="range" min={5} max={2700} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink3)", marginTop: 4 }}><span>$5</span><span>$2,700</span></div>
        </div>

        {/* Dynamic attrs */}
        {Object.entries(subAttrs).map(([key, vals]) => (
          <div className="sidebar-section" key={key}>
            <div className="sidebar-title">{key}</div>
            {vals.map(v => (
              <label key={v} className="filter-option">
                <input type="checkbox" checked={selAttrs[key]?.includes(v) || false} onChange={() => {
                  setSelAttrs(prev => {
                    const cur = prev[key] || [];
                    return { ...prev, [key]: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] };
                  });
                }} />
                {v}
              </label>
            ))}
          </div>
        ))}

        {/* Brand */}
        {catInfo.brand.length > 1 && (
          <div className="sidebar-section">
            <div className="sidebar-title">Brand</div>
            {catInfo.brand.filter(b => b !== "All").map(br => (
              <label key={br} className="filter-option">
                <input type="checkbox" checked={brands.includes(br)} onChange={() => toggleBrand(br)} />
                {br}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Search & sort toolbar */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", gap: 0, minWidth: 200 }}>
            <input placeholder="Search within results…" value={search} onChange={e => { setSearch(e.target.value); if (!e.target.value) setSearched(false); }} onKeyDown={e => { if (e.key === "Enter") setSearched(true); }} style={{ borderRadius: "8px 0 0 8px", borderRight: "none" }} />
            <button onClick={() => setSearched(true)} className="btn btn-primary" style={{ borderRadius: "0 8px 8px 0", padding: "0 16px", height: 44 }}><Ic n="search" s={16} /></button>
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ width: 200, fontSize: 13.5 }}>
            {["Featured", "Price: Low to High", "Price: High to Low", "Highest Rated", "Most Reviews", "Biggest Discount"].map(s => <option key={s}>{s}</option>)}
          </select>
          <span style={{ fontSize: 13, color: "var(--ink3)", fontWeight: 600, whiteSpace: "nowrap" }}>{filtered.length} results</span>
        </div>

        {/* Active filter chips */}
        {(activeSub !== "All" || brands.length > 0) && (
          <div className="filter-chip-row">
            {activeSub !== "All" && <span className="chip active" onClick={() => setActiveSub("All")}>{activeSub} ✕</span>}
            {brands.map(b => <span key={b} className="chip active" onClick={() => toggleBrand(b)}>{b} ✕</span>)}
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink3)" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>No products match your filters</div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 16 }} onClick={() => { setActiveSub("All"); setMaxPrice(2700); setBrands([]); setSearch(""); setSearched(false); }}>Clear all filters</button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DEALS PAGE ────────────────────────────────────────────
function DealsPage({ products, onCart, wishlist, onWish, onProduct, user, showAuth }) {
  const [count, setCount] = useState({ h: 11, m: 28, s: 44 });
  useEffect(() => {
    const iv = setInterval(() => setCount(c => {
      let { h, m, s } = c;
      s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) h = 23;
      return { h, m, s };
    }), 1000);
    return () => clearInterval(iv);
  }, []);
  const pad = n => String(n).padStart(2, "0");

  const mega = products.filter(p => pct(p.orig, p.price) >= 20);
  const flash = products.filter(p => p.isTrending && p.orig > p.price).slice(0, 4);
  const newDeals = products.filter(p => p.isNew && p.orig > p.price);

  return (
    <div>
      {/* Deal header */}
      <div style={{ background: "linear-gradient(135deg,#7f1d1d 0%,#991b1b 50%,#7f1d1d 100%)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: 38, fontWeight: 800, marginBottom: 8 }}>🔥 Today's Mega Deals</h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16, marginBottom: 20 }}>Hand-picked deals refreshed daily. Limited quantities — act fast!</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,.7)", fontSize: 14, fontWeight: 600 }}>Deals end in:</span>
            <div className="deal-countdown">
              {[pad(count.h), pad(count.m), pad(count.s)].map((v, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span className="countdown-block">{v}</span>
                  {i < 2 && <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 700 }}>:</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mega offers */}
      <div className="section">
        <div className="section-hd"><div><span className="section-tag">Up to 60% off</span><h2 className="section-title">Mega Offers</h2></div></div>
        <div className="products-grid">
          {mega.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
        </div>
      </div>

      {/* Flash deals */}
      <div style={{ background: "var(--bg2)", borderTop: "1.5px solid var(--border)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto" }}>
          <div className="section-hd" style={{ paddingTop: 0 }}><div><span className="section-tag">⚡ Lightning Deals</span><h2 className="section-title">Flash Sale — 24 Hours Only</h2></div></div>
          <div className="products-grid" style={{ marginTop: 20 }}>
            {flash.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
          </div>
        </div>
      </div>

      {/* Newly launched */}
      {newDeals.length > 0 && (
        <div className="section">
          <div className="section-hd"><div><span className="section-tag">Just Launched</span><h2 className="section-title">New Arrivals with Intro Pricing</h2></div></div>
          <div className="products-grid">
            {newDeals.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BEST SELLERS ──────────────────────────────────────────
function BestSellersPage({ products, onCart, wishlist, onWish, onProduct }) {
  const [activeTab, setActiveTab] = useState("All");
  const cats = ["All", ...MAIN_CATS.filter(c => c !== "All")];
  const sorted = products.filter(p => activeTab === "All" || p.cat === activeTab).sort((a, b) => b.rv - a.rv);

  return (
    <div className="section">
      <div className="section-hd"><div><span className="section-tag">Community Picks</span><h2 className="section-title">Best Sellers</h2></div></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {cats.map(c => (
          <button key={c} className={`chip ${activeTab === c ? "active" : ""}`} onClick={() => setActiveTab(c)}>{c}</button>
        ))}
      </div>
      <div className="products-grid">
        {sorted.map((p, i) => (
          <div key={p.id} style={{ position: "relative" }}>
            {i < 3 && <div style={{ position: "absolute", top: -8, left: -8, width: 28, height: 28, borderRadius: "50%", background: ["#f59e0b","#9ca3af","#cd7c2e"][i], color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, border: "2px solid #fff" }}>#{i+1}</div>}
            <PCard p={p} onCart={onCart} onWish={onWish} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ─────────────────────────────────────────
function CheckoutPage({ cart, user, showAuth, onPlace, addToast, setPage }) {
  const [step, setStep] = useState(1);
  const [addr, setAddr] = useState({ name: user?.name || "", line1: "", city: "", state: "", zip: "", country: "United States", phone: "" });
  const [pay, setPay] = useState("card");
  const [card, setCard] = useState({ num: "", name: "", exp: "", cvv: "" });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [upi, setUpi] = useState("");

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Sign in to Checkout</h2>
        <p style={{ color: "var(--ink2)", marginBottom: 24 }}>You need to be signed in to complete your purchase.</p>
        <button className="btn btn-primary btn-lg" onClick={() => showAuth("Sign in to complete your purchase")}><GoogleLogo s={18} /> Sign in with Google</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Your cart is empty</h2>
        <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setPage("shop")}>Start Shopping</button>
      </div>
    );
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SWIFT20") { setDiscount(subtotal * 0.2); addToast("Coupon applied! 20% off 🎉", "s"); }
    else if (coupon.toUpperCase() === "SAVE10") { setDiscount(subtotal * 0.1); addToast("Coupon applied! 10% off", "s"); }
    else addToast("Invalid coupon code", "e");
  };

  const doPlace = () => {
    setPlacing(true);
    setTimeout(() => {
      onPlace({ total, addr: `${addr.line1}, ${addr.city}, ${addr.state} ${addr.zip}`, payment: pay === "card" ? `**** ${card.num.slice(-4)}` : pay === "upi" ? `UPI: ${upi}` : "Cash on Delivery" });
    }, 2000);
  };

  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>
      <div>
        {/* Step bar */}
        <div className="step-bar">
          {steps.map((s, i) => (
            <span key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <span className="step-node">
                <span className={`step-circle ${step > i + 1 ? "done" : step === i + 1 ? "active" : "future"}`}>
                  {step > i + 1 ? "✓" : i + 1}
                </span>
                <span style={{ fontSize: 12, fontWeight: step === i + 1 ? 700 : 400, color: step >= i + 1 ? "var(--ink)" : "var(--ink3)", whiteSpace: "nowrap" }}>{s}</span>
              </span>
              {i < steps.length - 1 && <div className={`step-connector ${step > i + 1 ? "done" : ""}`} />}
            </span>
          ))}
        </div>

        {/* Step 1: Shipping */}
        {step === 1 && (
          <div className="card anim-up">
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}><Ic n="map" s={17} st={{ marginRight: 7 }} />Shipping Address</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="input-group"><label className="input-label">Full Name *</label><input value={addr.name} onChange={e => setAddr({ ...addr, name: e.target.value })} placeholder="Alex Johnson" /></div>
              <div className="input-group"><label className="input-label">Phone *</label><input value={addr.phone} onChange={e => setAddr({ ...addr, phone: e.target.value })} placeholder="+1 (555) 000-0000" /></div>
              <div className="input-group" style={{ gridColumn: "1/-1" }}><label className="input-label">Address Line 1 *</label><input value={addr.line1} onChange={e => setAddr({ ...addr, line1: e.target.value })} placeholder="42 Maple Street, Apt 3B" /></div>
              <div className="input-group"><label className="input-label">City *</label><input value={addr.city} onChange={e => setAddr({ ...addr, city: e.target.value })} placeholder="San Francisco" /></div>
              <div className="input-group"><label className="input-label">State *</label><input value={addr.state} onChange={e => setAddr({ ...addr, state: e.target.value })} placeholder="CA" /></div>
              <div className="input-group"><label className="input-label">ZIP Code *</label><input value={addr.zip} onChange={e => setAddr({ ...addr, zip: e.target.value })} placeholder="94102" /></div>
              <div className="input-group"><label className="input-label">Country</label>
                <select value={addr.country} onChange={e => setAddr({ ...addr, country: e.target.value })}>
                  {["United States", "United Kingdom", "Canada", "India", "Australia", "Germany", "France"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 22, float: "right" }} onClick={() => { if (!addr.name || !addr.line1 || !addr.city) { addToast("Please fill all required fields", "e"); return; } setStep(2); }}>Continue to Payment →</button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="card anim-up">
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}><Ic n="card" s={17} st={{ marginRight: 7 }} />Payment Method</h3>
            <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
              {[["card", "💳", "Credit/Debit Card"], ["upi", "📱", "UPI / Wallet"], ["netbank", "🏦", "Net Banking"], ["cod", "💵", "Cash on Delivery"]].map(([id, ic, lbl]) => (
                <button key={id} onClick={() => setPay(id)} style={{ flex: 1, minWidth: 130, padding: "14px 8px", background: pay === id ? "rgba(232,93,38,0.06)" : "var(--bg2)", border: `1.5px solid ${pay === id ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: pay === id ? "var(--accent)" : "var(--ink2)", fontWeight: 700, fontSize: 13, fontFamily: "Plus Jakarta Sans" }}>
                  <span style={{ fontSize: 24 }}>{ic}</span>{lbl}
                </button>
              ))}
            </div>

            {pay === "card" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="input-group"><label className="input-label">Cardholder Name</label><input placeholder="Alex Johnson" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} /></div>
                <div className="input-group"><label className="input-label">Card Number</label><input placeholder="1234 5678 9012 3456" value={card.num} className="mono" onChange={e => setCard({ ...card, num: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim() })} maxLength={19} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="input-group"><label className="input-label">Expiry (MM/YY)</label><input placeholder="08/27" value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} maxLength={5} /></div>
                  <div className="input-group"><label className="input-label">CVV</label>
                    <div style={{ position: "relative" }}>
                      <input type={showCvv ? "text" : "password"} placeholder="•••" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} maxLength={4} style={{ paddingRight: 40 }} />
                      <button type="button" onClick={() => setShowCvv(!showCvv)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink3)" }}><Ic n="eye" s={15} /></button>
                    </div>
                  </div>
                </div>
                <div className="notice notice-green"><Ic n="shield" s={14} />Your card details are protected with PCI DSS Level 1 encryption. We never store raw card data.</div>
              </div>
            )}
            {pay === "upi" && (
              <div className="input-group"><label className="input-label">UPI ID or Mobile Number</label><input placeholder="name@upi or +91 98765 43210" value={upi} onChange={e => setUpi(e.target.value)} /></div>
            )}
            {pay === "netbank" && (
              <div className="input-group"><label className="input-label">Select Bank</label>
                <select>
                  {["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Chase", "Bank of America", "Wells Fargo"].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            )}
            {pay === "cod" && (
              <div className="notice notice-orange"><Ic n="info" s={14} />Cash on Delivery available. An additional $2.99 COD handling fee applies. Pay at your door.</div>
            )}

            <div className="divider" />
            <div style={{ display: "flex", gap: 10 }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Coupon Code (try SWIFT20 or SAVE10)</label>
                <input placeholder="Enter coupon" value={coupon} onChange={e => setCoupon(e.target.value)} />
              </div>
              <button className="btn btn-secondary" style={{ alignSelf: "flex-end" }} onClick={applyCoupon}>Apply</button>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)}><Ic n="chevL" s={15} /> Back</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(3)}>Review Order →</button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="card anim-up">
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Review & Confirm</h3>
            <div style={{ background: "var(--bg2)", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Delivering to</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{addr.name}</div>
              <div style={{ fontSize: 13, color: "var(--ink2)" }}>{addr.line1}, {addr.city}, {addr.state} {addr.zip}, {addr.country}</div>
              <div style={{ fontSize: 13, color: "var(--ink2)" }}>{addr.phone}</div>
            </div>
            <div style={{ background: "var(--bg2)", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Payment</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{pay === "card" ? `Card ending ••${card.num.replace(/\s/g,"").slice(-4) || "••"}` : pay === "upi" ? `UPI: ${upi || "—"}` : pay === "netbank" ? "Net Banking" : "Cash on Delivery"}</div>
            </div>
            {cart.map(i => (
              <div key={i.cartId} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 24 }}>{i.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{i.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink3)" }}>Qty: {i.qty}</div>
                </div>
                <span style={{ fontWeight: 700 }}>{fp(i.price * i.qty)}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button className="btn btn-ghost" onClick={() => setStep(2)}><Ic n="chevL" s={15} /> Back</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", height: 48, fontSize: 15 }} onClick={doPlace} disabled={placing}>
                {placing ? <><Ic n="spin" s={16} c="anim-spin" /> Placing Order…</> : "✅ Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order summary */}
      <div className="card" style={{ position: "sticky", top: 80 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Order Summary</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {cart.map(i => (
            <div key={i.cartId} style={{ display: "flex", gap: 8, fontSize: 13 }}>
              <span>{i.emoji}</span>
              <span style={{ flex: 1, color: "var(--ink2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.name} ×{i.qty}</span>
              <span style={{ fontWeight: 600 }}>{fp(i.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="divider" />
        {[["Subtotal", fp(subtotal)], ["Shipping", shipping === 0 ? "FREE" : fp(shipping)], ["Tax (8%)", fp(tax)], ...(discount > 0 ? [["Discount", `-${fp(discount)}`]] : [])].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontSize: 13, color: "var(--ink2)" }}>
            <span>{k}</span><span style={{ color: v === "FREE" ? "var(--green)" : k === "Discount" ? "var(--red)" : "inherit", fontWeight: v === "FREE" || k === "Discount" ? 700 : 400 }}>{v}</span>
          </div>
        ))}
        <div className="divider" />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 17 }}>
          <span>Total</span><span style={{ color: "var(--accent)" }}>{fp(total)}</span>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14, flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 6, fontSize: 12, color: "var(--green)", fontWeight: 600 }}><Ic n="shield" s={13} /> Secured checkout</div>
          <div style={{ display: "flex", gap: 6, fontSize: 12, color: "var(--ink3)" }}><Ic n="refresh" s={13} /> 30-day return policy</div>
        </div>
      </div>
    </div>
  );
}

// ─── ORDERS PAGE ───────────────────────────────────────────
function OrdersPage({ orders, user, showAuth, addToast }) {
  const [selected, setSelected] = useState(null);
  const [returnModal, setReturnModal] = useState(null);
  const [returnReason, setReturnReason] = useState("");

  if (!user) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: 52, marginBottom: 12 }}>📦</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Sign in to view your orders</h2>
      <button className="btn btn-primary" onClick={() => showAuth("Sign in to view your order history")}><GoogleLogo s={16} /> Sign In</button>
    </div>
  );

  const order = selected ? orders.find(o => o.id === selected) : null;

  if (order) {
    const timeline = ["Order Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
    const doneIdx = { "Processing": 1, "Shipped": 2, "Out for Delivery": 3, "Delivered": 4, "Cancelled": 0 }[order.status] ?? 1;

    return (
      <div style={{ maxWidth: 750, margin: "0 auto", padding: "32px 24px" }}>
        <button onClick={() => setSelected(null)} className="btn btn-ghost" style={{ marginBottom: 20 }}><Ic n="chevL" s={15} /> Back to Orders</button>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{order.id}</h2>
              <div style={{ color: "var(--ink3)", fontSize: 13, marginTop: 3 }}>Placed on {order.date}</div>
            </div>
            <span className={`badge badge-${statusColor(order.status)}`}>{order.status}</span>
          </div>
          <div className="divider" />

          <h4 style={{ fontWeight: 700, marginBottom: 12 }}>Items</h4>
          {order.items.map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 26 }}>{it.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{it.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink3)" }}>Qty: {it.qty}</div>
              </div>
              <span style={{ fontWeight: 700 }}>{fp(it.price * it.qty)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end", fontWeight: 800, fontSize: 16, marginTop: 14, marginBottom: 20 }}>
            Total: {fp(order.total)}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            <div style={{ background: "var(--bg2)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>Delivery Address</div>
              <div style={{ fontSize: 13 }}>{order.addr}</div>
            </div>
            <div style={{ background: "var(--bg2)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>Payment</div>
              <div style={{ fontSize: 13 }}>{order.payment}</div>
            </div>
          </div>

          {order.tracking && (
            <div style={{ background: "var(--bg2)", borderRadius: 10, padding: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>Tracking Number</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span className="mono" style={{ color: "var(--blue)", fontWeight: 600 }}>{order.tracking}</span>
                <button className="btn btn-ghost" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => addToast("Tracking number copied!", "s")}><Ic n="copy" s={12} /> Copy</button>
              </div>
            </div>
          )}

          {/* Shipment timeline */}
          <h4 style={{ fontWeight: 700, marginBottom: 14 }}>Shipment Status</h4>
          <div className="timeline">
            {timeline.map((t, i, arr) => (
              <div key={t} className="tl-item">
                <div className="tl-dot-col">
                  <div className={`tl-dot ${i <= doneIdx ? "done" : i === doneIdx + 1 ? "active" : ""}`} />
                  {i < arr.length - 1 && <div className={`tl-line ${i < doneIdx ? "done" : ""}`} />}
                </div>
                <div className="tl-content">
                  <div style={{ fontWeight: 600, fontSize: 14, color: i <= doneIdx ? "var(--ink)" : "var(--ink3)" }}>{t}</div>
                  <div style={{ fontSize: 12, color: "var(--ink3)" }}>{i <= doneIdx ? (i === doneIdx ? "Current status" : "Completed") : "Pending"}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Return */}
          {order.canReturn && order.status === "Delivered" && (
            <div className="notice notice-blue" style={{ marginTop: 16 }}>
              <Ic n="return" s={14} />This order is eligible for return until <b>{order.returnDL}</b>.
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: "auto" }} onClick={() => setReturnModal(order.id)}>Request Return</button>
            </div>
          )}
        </div>

        {returnModal && (
          <div className="modal-overlay" onClick={() => setReturnModal(null)}>
            <div className="modal" style={{ maxWidth: 460 }} onClick={e => e.stopPropagation()}>
              <div className="modal-hd"><h3 style={{ fontSize: 17, fontWeight: 700 }}>Request Return / Refund</h3><button className="btn-icon" onClick={() => setReturnModal(null)}><Ic n="x" s={16} /></button></div>
              <div className="modal-bd">
                <div className="input-group" style={{ marginBottom: 14 }}>
                  <label className="input-label">Return Reason</label>
                  <select value={returnReason} onChange={e => setReturnReason(e.target.value)}>
                    {["Select reason", "Defective/Damaged", "Wrong item received", "Item not as described", "Changed my mind", "Better price found", "Other"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="input-group" style={{ marginBottom: 18 }}>
                  <label className="input-label">Additional comments (optional)</label>
                  <textarea rows={3} placeholder="Describe the issue…" />
                </div>
                <div className="notice notice-green" style={{ marginBottom: 16 }}><Ic n="check" s={14} />Return shipping label will be emailed to you within 24 hours. Full refund in 3–5 business days.</div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => { addToast("Return request submitted! Label sent to your email.", "s"); setReturnModal(null); }}>Submit Return Request</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h2 className="section-title" style={{ marginBottom: 22 }}>Order History</h2>
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink3)" }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>📦</div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>No orders yet</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {orders.map(o => (
            <div key={o.id} className="card" style={{ cursor: "pointer" }} onClick={() => setSelected(o.id)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ fontSize: 30, width: 50, height: 50, background: "var(--bg2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{o.items[0]?.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{o.id}</div>
                    <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2 }}>{o.date} · {o.items.length} item{o.items.length > 1 ? "s" : ""}</div>
                    <div style={{ fontSize: 12, color: "var(--ink2)", marginTop: 2 }}>{o.items.map(i => i.name).join(", ").slice(0, 50)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span className={`badge badge-${statusColor(o.status)}`}>{o.status}</span>
                  <span style={{ fontWeight: 800, fontSize: 16 }}>{fp(o.total)}</span>
                  <Ic n="chevR" s={16} st={{ color: "var(--ink3)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── WISHLIST PAGE ─────────────────────────────────────────
function WishlistPage({ wishlist, products, onCart, onWish, onProduct, user }) {
  const items = products.filter(p => wishlist.includes(p.id));
  return (
    <div className="section">
      <div className="section-hd"><h2 className="section-title">My Wishlist ({items.length})</h2>
        {items.length > 0 && <button className="btn btn-primary btn-sm" onClick={() => items.forEach(p => onCart(p))}>Add All to Cart</button>}
      </div>
      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink3)" }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>❤️</div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>Your wishlist is empty</div>
          <p style={{ marginTop: 6 }}>Browse products and tap the heart to save them here.</p>
        </div>
      ) : (
        <div className="products-grid">
          {items.map(p => <PCard key={p.id} p={p} onCart={onCart} onWish={onWish} wishlisted={true} onClick={onProduct} />)}
        </div>
      )}
    </div>
  );
}

// ─── NOTIFICATIONS ─────────────────────────────────────────
function NotificationsPage({ orders }) {
  const notifs = [
    { id: 1, type: "order", title: "Order Shipped! 📦", msg: `${orders[1]?.id || "ORD-1041"} is on its way. Estimated delivery: Dec 2.`, time: "2 hours ago", read: false },
    { id: 2, type: "deal", title: "Flash Deal Alert 🔥", msg: "Sony WH-1000XM5 just dropped to $249 — save $130 today only!", time: "5 hours ago", read: false },
    { id: 3, type: "wishlist", title: "Wishlist item on sale!", msg: "MacBook Pro M3 is now 9% off. Add to cart before it sells out.", time: "Yesterday", read: true },
    { id: 4, type: "order", title: "Order Delivered ✅", msg: `${orders[0]?.id || "ORD-1042"} has been delivered. How was your experience?`, time: "Nov 17", read: true },
    { id: 5, type: "security", title: "New sign-in detected", msg: "Your account was accessed from Chrome on macOS. If this wasn't you, secure your account.", time: "Nov 15", read: true },
    { id: 6, type: "promo", title: "Your exclusive coupon: SWIFT20 🎁", msg: "Enjoy 20% off your next order. Valid until Dec 31. Use at checkout.", time: "Nov 10", read: true },
  ];
  const icons = { order: "📦", deal: "🏷️", wishlist: "❤️", security: "🔒", promo: "🎁" };
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
        <h2 className="section-title">Notifications</h2>
        <button className="btn btn-ghost btn-sm">Mark all read</button>
      </div>
      {notifs.map(n => (
        <div key={n.id} style={{ display: "flex", gap: 14, padding: 16, background: n.read ? "var(--surface)" : "rgba(232,93,38,0.03)", border: `1.5px solid ${n.read ? "var(--border)" : "rgba(232,93,38,0.2)"}`, borderRadius: 14, marginBottom: 10, cursor: "pointer", transition: "all .15s" }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>{icons[n.type]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: n.read ? 500 : 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              {n.title}
              {!n.read && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />}
            </div>
            <div style={{ fontSize: 13, color: "var(--ink2)", marginTop: 3, lineHeight: 1.6 }}>{n.msg}</div>
          </div>
          <div style={{ fontSize: 11, color: "var(--ink3)", whiteSpace: "nowrap" }}>{n.time}</div>
        </div>
      ))}
    </div>
  );
}

// ─── PROFILE PAGE ──────────────────────────────────────────
function ProfilePage({ user, onLogout, addToast, setUser }) {
  const [tab, setTab] = useState("account");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", dob: "" });
  const [notifPrefs, setNotifPrefs] = useState({ email: true, push: true, sms: false, deals: true, security: true });
  const [twoFA, setTwoFA] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [pfpPreview, setPfpPreview] = useState(user?.pfp || null);
  const fileRef = useRef();

  const handlePfp = (e) => {
    const f = e.target.files[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setPfpPreview(url);
      setUser({ ...user, pfp: url });
      addToast("Profile photo updated!", "s");
    }
  };

  const Toggle = ({ on, onToggle }) => (
    <button className={`toggle ${on ? "on" : ""}`} onClick={onToggle}>
      <div className="toggle-knob" />
    </button>
  );

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
      {/* Profile header */}
      <div style={{ background: "linear-gradient(135deg,#1a1714 0%,#2d1f14 100%)", borderRadius: 20, padding: 28, marginBottom: 24, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          {pfpPreview ? (
            <img src={pfpPreview} alt="" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,.2)" }} />
          ) : (
            <div className="avatar-circle" style={{ width: 80, height: 80, background: "var(--accent)", color: "#fff", fontSize: 28, border: "3px solid rgba(255,255,255,.15)" }}>{user?.avatar || "U"}</div>
          )}
          <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--accent)", border: "2px solid #1a1714", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Ic n="upload" s={12} st={{ color: "#fff" }} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePfp} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{user?.name}</h2>
          <div style={{ color: "rgba(255,255,255,.6)", fontSize: 14, marginBottom: 8 }}>{user?.email}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {user?.provider === "google" && <span className="badge badge-blue">Google Account</span>}
            <span className="badge badge-green">✅ Verified</span>
            {user?.sub && <span className="badge badge-orange">👑 Prime Member</span>}
          </div>
        </div>
        <button className="btn" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }} onClick={() => { setTab("account"); setEditMode(true); }}>Edit Profile</button>
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ overflowX: "auto", marginBottom: 24 }}>
        {[["account","👤 Account"], ["security","🔒 Security"], ["notifications","🔔 Notifications"], ["settings","⚙️ Settings"]].map(([id, label]) => (
          <button key={id} className={`tab-item ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {tab === "account" && (
        <div className="card anim-up">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Account Information</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel" : "Edit"}</button>
          </div>
          {editMode ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["Full Name", "name", "Alex Johnson"], ["Email", "email", "alex@email.com"], ["Phone", "phone", "+1 (555) 000-0000"], ["Date of Birth", "dob", ""]].map(([lbl, key, ph]) => (
                <div key={key} className="input-group">
                  <label className="input-label">{lbl}</label>
                  <input type={key === "dob" ? "date" : key === "email" ? "email" : "text"} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={ph} />
                </div>
              ))}
              <div style={{ gridColumn: "1/-1", display: "flex", gap: 10 }}>
                <button className="btn btn-primary" onClick={() => { setUser({ ...user, name: form.name, email: form.email }); setEditMode(false); addToast("Profile updated!", "s"); }}>Save Changes</button>
                <button className="btn btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["Full Name", user?.name], ["Email", user?.email], ["Phone", "Not set"], ["Provider", user?.provider === "google" ? "Google" : "Email"], ["Member Since", "Jan 2024"], ["Account Status", "Active"]].map(([k, v]) => (
                <div key={k} style={{ background: "var(--bg2)", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          )}
          <div className="divider" />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-secondary btn-sm" onClick={() => addToast("Data export sent to your email!", "s")}><Ic n="upload" s={14} /> Export My Data</button>
            <button className="btn btn-ghost btn-sm" onClick={onLogout} style={{ color: "var(--red)" }}><Ic n="x" s={14} /> Sign Out</button>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="card anim-up">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Security Settings</h3>
          {[["Two-Factor Authentication", "Verify your identity when signing in from new devices", twoFA, v => { setTwoFA(v); addToast(`2FA ${v ? "enabled" : "disabled"}`, "s"); }]].map(([lbl, desc, val, set]) => (
            <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1.5px solid var(--border)" }}>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{lbl}</div><div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2 }}>{desc}</div></div>
              <Toggle on={val} onToggle={() => set(!val)} />
            </div>
          ))}
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-secondary btn-sm" style={{ marginBottom: 10 }} onClick={() => addToast("Password reset email sent!", "s")}><Ic n="lock" s={14} /> Change Password</button>
          </div>
          <div className="divider" />
          <h4 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Security Certifications</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["🔒 AES-256 Encryption", "All data encrypted end-to-end"], ["🛡️ PCI DSS Level 1", "Highest payment security standard"], ["🌐 GDPR Compliant", "Full data privacy rights honored"], ["👁️ SOC 2 Type II", "Annually audited security controls"]].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 12, padding: "10px 12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green)" }}>{t}</span>
                <span style={{ fontSize: 12, color: "var(--ink2)" }}>— {d}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="card anim-up">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Notification Preferences</h3>
          {Object.entries(notifPrefs).map(([key, val]) => {
            const labels = { email: ["Email Notifications", "Order updates, receipts, promos"], push: ["Push Notifications", "Real-time app alerts"], sms: ["SMS Alerts", "Text messages for critical updates"], deals: ["Deal Alerts", "Flash sales and exclusive offers"], security: ["Security Alerts", "Account sign-ins and suspicious activity"] };
            const [lbl, desc] = labels[key];
            return (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1.5px solid var(--border)" }}>
                <div><div style={{ fontWeight: 600, fontSize: 14 }}>{lbl}</div><div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2 }}>{desc}</div></div>
                <button className={`toggle ${val ? "on" : ""}`} onClick={() => { const n = { ...notifPrefs, [key]: !val }; setNotifPrefs(n); addToast(`${lbl} ${n[key] ? "on" : "off"}`, "i"); }}>
                  <div className="toggle-knob" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === "settings" && (
        <div className="card anim-up">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>App Settings</h3>
          {[["Dark Mode", "Switch to dark theme (restart required)", darkMode, setDarkMode], ["Auto-save Address", "Remember shipping addresses", true, () => {}], ["Compact View", "Show more products per row", false, () => {}]].map(([lbl, desc, val, set]) => (
            <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1.5px solid var(--border)" }}>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{lbl}</div><div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2 }}>{desc}</div></div>
              <button className={`toggle ${val ? "on" : ""}`} onClick={() => { set(!val); addToast(`${lbl} updated`, "i"); }}><div className="toggle-knob" /></button>
            </div>
          ))}
          <div className="divider" />
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-secondary btn-sm">🔔 Manage Reminders</button>
            <button className="btn btn-ghost btn-sm" style={{ color: "var(--red)" }}>🗑️ Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CUSTOMER SERVICE ──────────────────────────────────────
function CustomerServicePage() {
  const [topic, setTopic] = useState("");
  const [msg, setMsg] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([{ from: "bot", text: "Hi! I'm SwiftBot 🤖 How can I help you today?" }]);
  const [chatInput, setChatInput] = useState("");

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const user = { from: "user", text: chatInput };
    const replies = ["I understand, let me help you with that!", "Great question! Our team will look into this.", "That's been resolved. Is there anything else?", "I've noted your concern. Expect a follow-up in 24 hours."];
    const bot = { from: "bot", text: replies[Math.floor(Math.random() * replies.length)] };
    setChatMsgs(p => [...p, user, bot]);
    setChatInput("");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h2 className="section-title" style={{ marginBottom: 8 }}>Customer Service</h2>
      <p style={{ color: "var(--ink2)", marginBottom: 28 }}>We're here 24/7 to help you. Average response time: 2 minutes.</p>

      {/* Contact options */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { ic: "📞", title: "Phone Support", val: CUSTOMER_CARE.phone, sub: CUSTOMER_CARE.hours, btn: "Call Now" },
          { ic: "💬", title: "Live Chat", val: "SwiftBot & agents", sub: "Available 24/7", btn: "Start Chat" },
          { ic: "📧", title: "Email Support", val: CUSTOMER_CARE.email, sub: "Reply within 4 hours", btn: "Email Us" },
          { ic: "📍", title: "Store Locator", val: "Find a store near you", sub: "50+ stores nationwide", btn: "Find Store" },
        ].map(({ ic, title, val, sub, btn }) => (
          <div key={title} className="card" style={{ textAlign: "center", cursor: "pointer" }} onClick={() => btn === "Start Chat" && setChatOpen(true)}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{ic}</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink3)", marginBottom: 14 }}>{sub}</div>
            <button className="btn btn-primary btn-sm" style={{ width: "100%" }} onClick={() => btn === "Start Chat" && setChatOpen(true)}>{btn}</button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Frequently Asked Questions</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {[["How do I track my order?", "Go to Orders → select your order → you'll find real-time tracking with your tracking number."],
          ["What is the return policy?", "30-day hassle-free returns. Items must be in original condition. Use our prepaid return label."],
          ["How do I cancel an order?", "Orders can be cancelled within 1 hour of placing. Go to Orders → Cancel. After dispatch, initiate a return."],
          ["Is my payment information safe?", "Yes. We use AES-256 encryption and PCI DSS Level 1 compliance. We never store raw card data."],
          ["How do I subscribe to Swift Prime?", "Visit the Subscriptions page, choose your plan, and complete payment. Enjoy benefits immediately."]
        ].map(([q, a]) => {
          const [open, setOpen] = useState(false);
          return (
            <div key={q} className="card" style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{q}</span>
                <Ic n={open ? "chevU" : "chevD"} s={16} st={{ color: "var(--ink3)" }} />
              </div>
              {open && <div style={{ color: "var(--ink2)", fontSize: 13.5, marginTop: 10, lineHeight: 1.7, borderTop: "1px solid var(--border)", paddingTop: 10 }}>{a}</div>}
            </div>
          );
        })}
      </div>

      {/* Contact form */}
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Send Us a Message</h3>
      <div className="card">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div className="input-group"><label className="input-label">Your Name</label><input placeholder="Alex Johnson" /></div>
          <div className="input-group"><label className="input-label">Email</label><input type="email" placeholder="alex@email.com" /></div>
        </div>
        <div className="input-group" style={{ marginBottom: 14 }}>
          <label className="input-label">Topic</label>
          <select value={topic} onChange={e => setTopic(e.target.value)}>
            {["Select topic", "Order issue", "Return/Refund", "Payment problem", "Account issue", "Product question", "Delivery issue", "Other"].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="input-group" style={{ marginBottom: 18 }}>
          <label className="input-label">Message</label>
          <textarea rows={4} placeholder="Describe your issue in detail…" value={msg} onChange={e => setMsg(e.target.value)} />
        </div>
        <button className="btn btn-primary" disabled={!topic || topic === "Select topic" || !msg}>Submit Ticket</button>
      </div>

      {/* Live chat */}
      {chatOpen && (
        <div style={{ position: "fixed", bottom: 24, right: 24, width: 340, background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, overflow: "hidden", zIndex: 900, boxShadow: "var(--sh2)" }}>
          <div style={{ background: "var(--accent)", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>💬 SwiftBot</span>
            <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.8)", cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <div style={{ height: 260, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {chatMsgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "9px 14px", borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.from === "user" ? "var(--accent)" : "var(--bg2)", color: m.from === "user" ? "#fff" : "var(--ink)", fontSize: 13.5, lineHeight: 1.5 }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderTop: "1.5px solid var(--border)" }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") sendChat(); }} placeholder="Type a message…" style={{ flex: 1, borderRadius: 50, padding: "8px 14px", fontSize: 13 }} />
            <button onClick={sendChat} className="btn btn-primary" style={{ borderRadius: 50, padding: "8px 14px" }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GIFT CARDS ────────────────────────────────────────────
function GiftCardsPage({ user, showAuth, addToast }) {
  const [sel, setSel] = useState(null);
  const [custom, setCustom] = useState("");
  const [recEmail, setRecEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState(1);

  return (
    <div className="section">
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🎁</div>
        <h2 className="section-title">SwiftBasket Gift Cards</h2>
        <p style={{ color: "var(--ink2)", fontSize: 16, marginTop: 6 }}>The perfect gift for everyone. Redeemable on anything in our store.</p>
      </div>

      {step === 1 && (
        <div>
          <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 16 }}>Choose an amount</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {GIFT_CARDS.map(gc => (
              <button key={gc.id} onClick={() => setSel(gc)} style={{ width: 110, height: 110, border: `2px solid ${sel?.id === gc.id ? "var(--accent)" : "var(--border)"}`, borderRadius: 16, background: sel?.id === gc.id ? "rgba(232,93,38,0.06)" : "var(--surface)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, transition: "all .15s" }}>
                <span style={{ fontSize: 36 }}>{gc.design}</span>
                <span style={{ fontWeight: 800, fontSize: 18, color: sel?.id === gc.id ? "var(--accent)" : "var(--ink)" }}>{gc.label}</span>
              </button>
            ))}
          </div>
          <div className="input-group" style={{ maxWidth: 250, marginBottom: 24 }}>
            <label className="input-label">Or enter custom amount ($10–$1,000)</label>
            <input type="number" min={10} max={1000} placeholder="e.g. 75" value={custom} onChange={e => { setCustom(e.target.value); setSel(null); }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 600, marginBottom: 24 }}>
            <div className="input-group">
              <label className="input-label">Recipient's Email</label>
              <input type="email" placeholder="friend@email.com" value={recEmail} onChange={e => setRecEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Your Name (From)</label>
              <input placeholder={user?.name || "Your name"} />
            </div>
            <div className="input-group" style={{ gridColumn: "1/-1" }}>
              <label className="input-label">Gift Message (optional)</label>
              <textarea rows={2} placeholder="Happy Birthday! Enjoy!" value={msg} onChange={e => setMsg(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => { if (!user) { showAuth("Sign in to purchase a gift card"); return; } if (!sel && !custom) { addToast("Please select or enter an amount", "e"); return; } if (!recEmail) { addToast("Please enter recipient email", "e"); return; } setStep(2); }}>
            Continue to Payment →
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: 500 }}>
          <div className="notice notice-blue" style={{ marginBottom: 20 }}>
            <Ic n="gift" s={15} />Sending <b>{sel ? sel.label : `$${custom}`}</b> gift card to <b>{recEmail}</b>
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            <h4 style={{ fontWeight: 700, marginBottom: 14 }}>Payment for Gift Card</h4>
            <div className="input-group" style={{ marginBottom: 12 }}><label className="input-label">Card Number</label><input placeholder="1234 5678 9012 3456" className="mono" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="input-group"><label className="input-label">Expiry</label><input placeholder="MM/YY" /></div>
              <div className="input-group"><label className="input-label">CVV</label><input type="password" placeholder="•••" /></div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setStep(1)}><Ic n="chevL" s={14} /> Back</button>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => { addToast(`🎁 Gift card sent to ${recEmail}!`, "s"); setStep(3); }}>
              Purchase Gift Card
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center", maxWidth: 460, margin: "0 auto" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Gift Card Sent!</h3>
          <p style={{ color: "var(--ink2)", marginBottom: 24, lineHeight: 1.7 }}>Your {sel ? sel.label : `$${custom}`} gift card has been sent to <b>{recEmail}</b>. They'll receive it within a few minutes.</p>
          <button className="btn btn-primary" onClick={() => setStep(1)}>Send Another</button>
        </div>
      )}
    </div>
  );
}

// ─── SUBSCRIPTIONS PAGE ────────────────────────────────────
function SubscriptionsPage({ user, showAuth, addToast }) {
  const [selPlan, setSelPlan] = useState(null);
  const [step, setStep] = useState(1); // 1:plans, 2:payment, 3:success
  const [card, setCard] = useState({ num: "", name: "", exp: "", cvv: "" });
  const [billing, setBilling] = useState("monthly");

  if (!user) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: 56, marginBottom: 14 }}>👑</div>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Sign in to Subscribe</h2>
      <p style={{ color: "var(--ink2)", marginBottom: 24 }}>Subscriptions are available for logged-in users only.</p>
      <button className="btn btn-primary btn-lg" onClick={() => showAuth("Sign in to access Swift Prime subscriptions")}><GoogleLogo s={18} /> Sign In with Google</button>
    </div>
  );

  if (step === 3) return (
    <div style={{ textAlign: "center", padding: "80px 24px", maxWidth: 500, margin: "0 auto" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>👑</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Welcome to {selPlan?.name}!</h2>
      <p style={{ color: "var(--ink2)", marginBottom: 10, lineHeight: 1.7 }}>Your subscription is active. Enjoy all your premium benefits starting now.</p>
      <div style={{ background: "rgba(232,93,38,0.06)", border: "1.5px solid rgba(232,93,38,0.2)", borderRadius: 16, padding: 20, marginBottom: 24 }}>
        {selPlan?.perks.map((p, i) => <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0", fontSize: 14 }}><span style={{ color: "var(--green)" }}>✓</span>{p}</div>)}
      </div>
      <button className="btn btn-primary btn-lg" onClick={() => { setStep(1); setSelPlan(null); }}>Back to Plans</button>
    </div>
  );

  if (step === 2 && selPlan) return (
    <div style={{ maxWidth: 560, margin: "40px auto", padding: "0 24px" }}>
      <button className="btn btn-ghost" style={{ marginBottom: 20 }} onClick={() => setStep(1)}><Ic n="chevL" s={15} /> Back to Plans</button>
      <div style={{ background: selPlan.color, borderRadius: 16, padding: "20px 24px", marginBottom: 24, color: "#fff" }}>
        <div style={{ fontSize: 28 }}>{selPlan.icon}</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{selPlan.name}</h3>
        <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{fp(selPlan.price)}<span style={{ fontSize: 14, fontWeight: 400, opacity: 0.75 }}>/{selPlan.billing}</span></div>
      </div>
      <div className="card">
        <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Payment Details</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="input-group"><label className="input-label">Cardholder Name</label><input placeholder={user.name} value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Card Number</label><input placeholder="1234 5678 9012 3456" className="mono" value={card.num} onChange={e => setCard({ ...card, num: e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim() })} maxLength={19} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="input-group"><label className="input-label">Expiry</label><input placeholder="MM/YY" value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} maxLength={5} /></div>
            <div className="input-group"><label className="input-label">CVV</label><input type="password" placeholder="•••" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} maxLength={4} /></div>
          </div>
        </div>
        <div className="notice notice-green" style={{ marginTop: 16, marginBottom: 16 }}><Ic n="shield" s={14} />Your subscription can be cancelled anytime. No hidden fees. PCI DSS secured.</div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", height: 48, fontSize: 15 }} onClick={() => { if (!card.num || !card.name || !card.exp || !card.cvv) { addToast("Please fill all payment details", "e"); return; } addToast("Subscription activated! 👑", "s"); setStep(3); }}>
          Start {selPlan.name} — {fp(selPlan.price)}/{selPlan.billing}
        </button>
      </div>
    </div>
  );

  return (
    <div className="section">
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>⚡</div>
        <h2 className="section-title">Swift Prime Subscriptions</h2>
        <p style={{ color: "var(--ink2)", fontSize: 16, marginTop: 6 }}>Premium benefits for the ultimate shopping experience</p>
        {user.sub && <div className="badge badge-orange" style={{ marginTop: 10, fontSize: 13 }}>👑 You already have Swift Prime!</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
        {SUBSCRIPTION_PLANS.map(plan => (
          <div key={plan.id} className="card anim-up" style={{ border: `2px solid ${plan.popular ? plan.color : "var(--border)"}`, position: "relative", overflow: "hidden" }}>
            {plan.popular && <div style={{ position: "absolute", top: 14, right: -18, background: plan.color, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 28px", transform: "rotate(45deg)", transformOrigin: "center" }}>POPULAR</div>}
            <div style={{ fontSize: 36, marginBottom: 8 }}>{plan.icon}</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{plan.name}</h3>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: plan.color }}>{fp(plan.price)}</span>
              <span style={{ color: "var(--ink3)", fontSize: 14 }}>/{plan.billing}</span>
              {plan.billing === "yearly" && <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, marginTop: 2 }}>Save $57 vs monthly!</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
              {plan.perks.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontSize: 13.5, color: "var(--ink2)" }}>
                  <span style={{ color: "var(--green)", fontWeight: 700, marginTop: 1 }}>✓</span>{p}
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", background: plan.color, boxShadow: `0 4px 14px ${plan.color}44` }} onClick={() => { setSelPlan(plan); setStep(2); }}>
              {user.sub ? "Upgrade Plan" : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, maxWidth: 700, margin: "48px auto 0" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Subscription FAQ</h3>
        {[["Can I cancel anytime?", "Yes! Cancel from Profile → Settings with one click. No questions asked, no fees."], ["When does billing occur?", "Billing starts on the day you subscribe and renews on the same date each month/year."], ["Can I switch plans?", "Absolutely. Upgrade or downgrade anytime — you'll be charged the prorated difference."]].map(([q, a]) => {
          const [open, setOpen] = useState(false);
          return (
            <div key={q} className="card" style={{ cursor: "pointer", marginBottom: 10 }} onClick={() => setOpen(!open)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{q}</span><Ic n={open ? "chevU" : "chevD"} s={15} st={{ color: "var(--ink3)" }} />
              </div>
              {open && <div style={{ color: "var(--ink2)", fontSize: 13.5, marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 10 }}>{a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── FOOTER ────────────────────────────────────────────────
function Footer({ setPage, user }) {
  return (
    <footer style={{ background: "#1a1714", color: "rgba(255,255,255,.65)", borderTop: "1.5px solid rgba(255,255,255,.06)", padding: "52px 24px 32px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚡</div>
              <span style={{ fontFamily: "Playfair Display", fontSize: 20, fontWeight: 800, color: "#fff" }}>SwiftBasket</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, maxWidth: 280 }}>Premium shopping for electronics, clothing, and grocery. Secured, fast, and always fair.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {["🐦", "📘", "📸", "▶️"].map((ic, i) => (
                <button key={i} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", fontSize: 16, cursor: "pointer" }}>{ic}</button>
              ))}
            </div>
          </div>
          {[
            { title: "Shop", items: [["Electronics", "electronics"], ["Clothing", "clothing"], ["Grocery", "grocery"], ["Fashion", "fashion"], ["Today's Deals", "today's-deals"]] },
            { title: "Account", items: [["My Orders", "orders"], ["Wishlist", "wishlist"], ["Profile", "profile"], ["Subscriptions", "subscriptions"], ["Gift Cards", "gift-cards"]] },
            { title: "Support", items: [["Customer Service", "customer-service"], ["Returns", "customer-service"], ["Track Order", "orders"], ["FAQ", "customer-service"]] },
            { title: "Company", items: [["About Us", "home"], ["Careers", "home"], ["Press", "home"], ["Privacy Policy", "home"], ["Terms", "home"]] },
          ].map(({ title, items }) => (
            <div key={title}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,.4)", marginBottom: 14 }}>{title}</div>
              {items.map(([label, pg]) => (
                <div key={label} style={{ marginBottom: 9 }}>
                  <button onClick={() => setPage(pg)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.55)", fontSize: 13.5, cursor: "pointer", fontFamily: "Plus Jakarta Sans", transition: "color .15s", padding: 0 }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.55)"}>{label}</button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {user && (
          <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "20px 24px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, marginBottom: 3 }}>👑 Try Swift Prime</div>
              <div style={{ fontSize: 13 }}>Free shipping, 10% cashback, exclusive deals — from $12.99/month</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setPage("subscriptions")}>View Plans</button>
          </div>
        )}

        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12 }}>© 2024 SwiftBasket Inc. All rights reserved.</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["🔒 SSL Secured", "🛡️ GDPR", "🔐 PCI DSS L1", "✅ SOC 2"].map(b => (
              <span key={b} style={{ fontSize: 11, background: "rgba(255,255,255,.06)", padding: "3px 10px", borderRadius: 50, border: "1px solid rgba(255,255,255,.1)" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
