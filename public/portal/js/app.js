/* ===== CCNA Portal — shared logic ===== */

// Premium users + their certificates (PDF placed in /portal/certificates/)
const PREMIUM_USERS = {
  "dhanrajkshirsagar302@gmail.com": {
    name: "Dhanraj Kshirsagar",
    initials: "DK",
    country: "India",
    language: "English",
    goal: "Network Engineer at Cisco",
    certificate: "certificates/dhanraj.pdf",
    certificateImg: "certificates/dhanraj.png"
  },
  "vedant2727swami@gmail.com": {
    name: "Vedant Swami",
    initials: "VS",
    country: "India",
    language: "English",
    goal: "Cloud & Network Architect",
    certificate: "certificates/vedant.pdf",
    certificateImg: "certificates/vedant.png"
  },
  "aditya.dabhade@mitaoe.ac.in": {
    name: "Aditya Dabhade",
    initials: "AD",
    country: "India",
    language: "English",
    goal: "Enterprise Network Specialist",
    certificate: "certificates/aditya.pdf",
    certificateImg: "certificates/aditya.png"
  }
};

const COURSE = {
  title: "Cisco Certified Network Associate",
  short: "Cisco Certified Network Associate (CCNA) Certification",
  duration: "18 – 24 Weeks",
  hours: "70+ Hours",
  price: 200,
  skills: [
   
    "Network Security","Cisco Packet Tracer","Subnetting","Automation Basics"
  ],
  weeks: [
    {n:1, name:"Networking Basics", topics:"Introduction to CCNA, devices, topologies"},
    {n:2, name:"OSI & TCP/IP Models", topics:"Layered models, encapsulation"},
    {n:3, name:"IP Addressing", topics:"IPv4 & IPv6 addressing schemes"},
    {n:4, name:"Subnetting & CIDR", topics:"Subnet masks, VLSM, supernetting"},
    {n:5, name:"Switching Concepts", topics:"MAC tables, frame forwarding"},
    {n:6, name:"VLANs & Trunking", topics:"802.1Q, inter-VLAN routing"},
    {n:7, name:"STP Protocol", topics:"Spanning Tree, RSTP, PVST+"},
    {n:8, name:"Routing Fundamentals", topics:"Routing tables, longest match"},
    {n:9, name:"Static Routing", topics:"Default routes, summarization"},
    {n:10, name:"Dynamic Routing", topics:"Distance vector vs link state"},
    {n:11, name:"OSPF", topics:"Single & multi-area OSPF, LSAs"},
    {n:12, name:"ACL Configuration", topics:"Standard & extended ACLs"},
    {n:13, name:"DHCP & NAT", topics:"DHCP scopes, PAT, port forwarding"},
    {n:14, name:"Wireless Networking", topics:"WLAN, WPA3, controllers"},
    {n:15, name:"Network Security", topics:"AAA, port security, threats"},
    {n:16, name:"Enterprise Networking", topics:"WAN, SD-WAN, QoS"},
    {n:17, name:"Automation Basics", topics:"Python, REST APIs, Ansible"},
    {n:18, name:"Final Lab Preparation", topics:"Packet Tracer integration"},
    {n:19, name:"Advanced Lab I", topics:"Multi-site routing scenario"},
    {n:20, name:"Advanced Lab II", topics:"Security hardening lab"},
    {n:21, name:"Mock Assessment I", topics:"Timed simulation exam"},
    {n:22, name:"Mock Assessment II", topics:"Hands-on troubleshooting"},
    {n:23, name:"Capstone Project", topics:"Design enterprise network"},
    {n:24, name:"Final Certification", topics:"Submission & evaluation"}
  ]
};

// ====== Session ======
const Session = {
  get(){ try { return JSON.parse(localStorage.getItem("ccna_user")||"null"); } catch { return null; } },
  set(email){
    const lower = email.toLowerCase().trim();
    const premium = PREMIUM_USERS[lower];
    const data = premium
      ? { email: lower, ...premium, premium:true }
      : { email: lower, name: lower.split("@")[0].replace(/\W/g," ").replace(/\b\w/g,c=>c.toUpperCase()), initials: lower.slice(0,2).toUpperCase(), premium:false };
    localStorage.setItem("ccna_user", JSON.stringify(data));
    return data;
  },
  clear(){ localStorage.removeItem("ccna_user"); },
  require(){
    const u = this.get();
    if(!u){ window.location.replace("index.html"); throw new Error("auth"); }
    return u;
  }
};

// ====== Particles ======
function mountParticles(count=22){
  if(document.querySelector(".particles")) return;
  const wrap = document.createElement("div"); wrap.className="particles";
  for(let i=0;i<count;i++){
    const s=document.createElement("span");
    const size = 2+Math.random()*5;
    s.style.left = Math.random()*100+"%";
    s.style.width = size+"px"; s.style.height = size+"px";
    s.style.animationDuration = (12+Math.random()*18)+"s";
    s.style.animationDelay = (-Math.random()*20)+"s";
    s.style.opacity = (.2+Math.random()*.5);
    wrap.appendChild(s);
  }
  document.body.appendChild(wrap);
}

// ====== Toasts ======
function toast(msg, type="success"){
  let wrap = document.querySelector(".toast-wrap");
  if(!wrap){ wrap=document.createElement("div"); wrap.className="toast-wrap"; document.body.appendChild(wrap); }
  const t = document.createElement("div"); t.className=`toast ${type}`; t.textContent=msg;
  wrap.appendChild(t);
  setTimeout(()=>{ t.style.animation="slideIn .3s reverse both"; setTimeout(()=>t.remove(),320); }, 3200);
}

// ====== Confetti ======
function confetti(){
  const c=document.createElement("div"); c.className="confetti";
  const colors=["#00c2ff","#21d07a","#7c4dff","#f5c563","#ff4d6d"];
  for(let i=0;i<80;i++){
    const p=document.createElement("i");
    p.style.left=Math.random()*100+"%";
    p.style.background=colors[i%colors.length];
    p.style.animationDuration=(2+Math.random()*2)+"s";
    p.style.animationDelay=(Math.random()*.6)+"s";
    p.style.transform=`rotate(${Math.random()*360}deg)`;
    c.appendChild(p);
  }
  document.body.appendChild(c);
  setTimeout(()=>c.remove(),4500);
}

// ====== App layout (sidebar/topbar) ======
function buildLayout(active){
  const u = Session.require();
  const html = `
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="brand-mark">N</div>
        <div>
          <div class="brand-name">NetAcademy</div>
          <div class="brand-sub">CCNA Portal</div>
        </div>
      </div>
      <nav class="nav">
        ${navItem("dashboard.html","Dashboard","grid",active)}
        ${navItem("course-details.html","My Learning","book",active)}
        ${navItem("certificates.html","Badges & Certificates","award",active)}
        ${navItem("certificate-view.html","Certificate Viewer","shield",active)}
        ${navItem("profile.html","Profile","user",active)}
      </nav>
      <div class="sidebar-foot">
        <div class="badge">${u.premium?"PREMIUM ACCESS":"FREE TIER"}</div>
        <div style="font-size:.78rem;color:var(--text-dim);margin-top:.3rem">
          ${u.premium?"All certifications unlocked":"Upgrade to unlock certificates"}
        </div>
      </div>
    </aside>
    <div class="backdrop" id="backdrop"></div>
    <div class="main">
      <header class="topbar">
        <button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu">
          ${icon("menu")}
        </button>
        <div class="search"><input placeholder="Search courses, badges, modules…" /></div>
        <div class="top-actions">
          <button class="icon-btn" id="notifBtn" aria-label="Notifications" style="position:relative">
            ${icon("bell")} <span class="dot"></span>
            <div class="notif-panel glass-strong" id="notifPanel">
              <div style="font-weight:700;margin-bottom:.4rem;padding:.2rem .4rem">Notifications</div>
              <div class="notif-item"><span class="d"></span><div><div class="t">New module unlocked</div><div class="s">Week 17 · Automation Basics</div></div></div>
              <div class="notif-item"><span class="d" style="background:var(--emerald)"></span><div><div class="t">Badge earned</div><div class="s">Routing Specialist</div></div></div>
              <div class="notif-item"><span class="d" style="background:var(--gold)"></span><div><div class="t">Certificate ready</div><div class="s">Download your CCNA certificate</div></div></div>
            </div>
          </button>
          <div class="profile-pill" id="profilePill">
            <div class="avatar">${u.initials}</div>
            <div>
              <div class="nm">${u.name}</div>
              <div class="em">${u.email}</div>
            </div>
          </div>
          <button class="icon-btn" id="logoutBtn" aria-label="Sign out" title="Sign out">${icon("logout")}</button>
        </div>
      </header>
      <div id="pageBody"></div>
      <footer class="footer">
        <div>© ${new Date().getFullYear()} NetAcademy · CCNA Certification Portal</div>
        <div class="socials">
          <a href="#" aria-label="LinkedIn">${icon("linkedin")}</a>
          <a href="#" aria-label="Twitter">${icon("twitter")}</a>
          <a href="#" aria-label="GitHub">${icon("github")}</a>
        </div>
      </footer>
    </div>
  `;
  // wrap shell content into existing app container (do NOT add .app to body — would double-grid)
  const shell = document.createElement("div");
  shell.className = "app";
  shell.innerHTML = html;
  // move existing body children into pageBody
  const existing = Array.from(document.body.childNodes);
  document.body.innerHTML = "";
  document.body.appendChild(shell);
  const pageBody = shell.querySelector("#pageBody");
  existing.forEach(n => pageBody.appendChild(n));

  // wire interactions
  const sidebar = shell.querySelector("#sidebar");
  const backdrop = shell.querySelector("#backdrop");
  shell.querySelector("#menuBtn").addEventListener("click",()=>{ sidebar.classList.toggle("open"); backdrop.classList.toggle("show"); });
  backdrop.addEventListener("click",()=>{ sidebar.classList.remove("open"); backdrop.classList.remove("show"); });
  shell.querySelector("#logoutBtn").addEventListener("click",()=>{ Session.clear(); window.location.href="index.html"; });
  const notifBtn = shell.querySelector("#notifBtn");
  const notifPanel = shell.querySelector("#notifPanel");
  notifBtn.addEventListener("click",e=>{ e.stopPropagation(); notifPanel.classList.toggle("open"); });
  document.addEventListener("click",e=>{ if(!notifPanel.contains(e.target)) notifPanel.classList.remove("open"); });
  shell.querySelector("#profilePill").addEventListener("click",()=>window.location.href="profile.html");

  mountParticles();
  return u;
}
function navItem(href,label,ic,active){
  const isActive = active===href ? "active":"";
  return `<a href="${href}" class="${isActive}">${icon(ic,"ico")}<span>${label}</span></a>`;
}

// ====== Mini icon set (inline SVGs) ======
function icon(name, cls=""){
  const ico = {
    grid:`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`,
    book:`<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h12"/>`,
    award:`<circle cx="12" cy="9" r="6"/><path d="m8.5 13.5-2 7L12 18l5.5 2.5-2-7"/>`,
    shield:`<path d="M12 3 4 6v6c0 4.5 3.5 8.5 8 9 4.5-.5 8-4.5 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/>`,
    user:`<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,
    bell:`<path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/>`,
    menu:`<path d="M4 6h16M4 12h16M4 18h16"/>`,
    logout:`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>`,
    download:`<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>`,
    print:`<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M6 14h12v7H6z"/>`,
    check:`<path d="m5 12 5 5L20 7"/>`,
    lock:`<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/>`,
    play:`<path d="m6 4 14 8-14 8z"/>`,
    linkedin:`<path d="M4 9h3v11H4zM5.5 4a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM10 9h3v1.5c.5-1 1.8-1.8 3.4-1.8 3 0 3.6 2 3.6 4.5V20h-3v-5.5c0-1.3-.6-2.2-1.8-2.2-1.3 0-2.2 1-2.2 2.2V20h-3z"/>`,
    twitter:`<path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.7c0 .3 0 .6.1.9C8.6 9.4 5.5 7.7 3.5 5.2c-.4.6-.6 1.4-.6 2.2 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.6.2-1.3.2-1.9.1.5 1.7 2.1 2.9 4 2.9A8 8 0 0 1 2 19a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2.1z"/>`,
    github:`<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1 1 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>`
  };
  const path = ico[name]||"";
  const fill = ["linkedin","twitter","github"].includes(name)?"currentColor":"none";
  const stroke = fill==="none"?"currentColor":"none";
  return `<svg class="${cls}" width="20" height="20" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

// Animate count-up
function countUp(el, target, dur=1200){
  const start = performance.now(); const from = 0;
  const isFloat = String(target).includes(".");
  function step(t){
    const p = Math.min((t-start)/dur,1);
    const e = 1 - Math.pow(1-p,3);
    const v = from + (target-from)*e;
    el.textContent = isFloat ? v.toFixed(1) : Math.round(v).toLocaleString();
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
