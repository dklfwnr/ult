/**************************************************
 * Malla interactiva – Tecnología Médica
 *  – Clic en ramo:
 *      • Si está bloqueado → nada
 *      • Si está desbloqueado → se APRUEBA
 *      • Si ya está aprobado → se DESAPRUEBA
 *  – Al desaprobar, los ramos que dependían
 *    de él se vuelven a bloquear (en cascada)
 **************************************************/

/* =====  LISTA COMPLETA DE CURSOS Y PRERREQUISITOS ===== */
const courses = [
  /* I SEMESTRE */
  { id: "principios", name: "Principios matemáticos", semester: 1, prereqs: [] },
  { id: "biocel",     name: "Biología celular",        semester: 1, prereqs: [] },
  { id: "quimgeneral",name: "Química general",         semester: 1, prereqs: [] },
  { id: "introTM",    name: "Introducción a la Tecnología Médica", semester: 1, prereqs: [] },
  { id: "comunicacion",name:"Taller comp. comunicativas",semester:1,prereqs:[] },
  { id: "aprendizaje",name:"Taller comp. aprendizaje", semester:1,prereqs:[] },
  { id: "personal1",  name:"Taller des. personal I",   semester:1,prereqs:[] },

  /* II SEMESTRE */
  { id: "biofisica",  name:"Biofísica",                      semester:2,prereqs:["principios"] },
  { id: "enfermeria", name:"Proc. de enfermería y P. A.",    semester:2,prereqs:[] },
  { id: "quimorganica",name:"Química orgánica",              semester:2,prereqs:["quimgeneral"] },
  { id: "anatomia",   name:"Anatomía",                       semester:2,prereqs:[] },
  { id: "histologia", name:"Histología",                     semester:2,prereqs:[] },
  { id: "personal2",  name:"Taller des. personal II",        semester:2,prereqs:[] },
  { id: "cultura",    name:"Cultura y valores",              semester:2,prereqs:[] },

  /* III SEMESTRE */
  { id:"estadisticas", name:"Estadísticas p/la salud",semester:3,prereqs:["principios"] },
  { id:"inmunologia",  name:"Inmunología básica",     semester:3,prereqs:["histologia"] },
  { id:"bioquimica",   name:"Fundamentos en bioquímica",semester:3,prereqs:["quimorganica"] },
  { id:"fisiologia",   name:"Fisiología",             semester:3,prereqs:["anatomia"] },
  { id:"bioseguridad", name:"Bioseguridad",           semester:3,prereqs:[] },
  { id:"persona",      name:"Persona y sentido",      semester:3,prereqs:[] },
  { id:"ingles1",      name:"Inglés básico I",        semester:3,prereqs:[] },

  /* IV SEMESTRE */
  { id:"saludpublica",name:"Fundamentos en salud pública",semester:4,prereqs:["estadisticas"] },
  { id:"etica",       name:"Ética en salud",               semester:4,prereqs:[] },
  { id:"morfofisiovisual",name:"Morfofisiología sist. visual",semester:4,prereqs:["inmunologia"] },
  { id:"fisiopato",   name:"Fisiopatología",               semester:4,prereqs:["fisiologia"] },
  { id:"fisicaoftalmica",name:"Física oftálmica",          semester:4,prereqs:["biofisica"] },
  { id:"atencion",    name:"Atención primaria oftalmológica",semester:4,prereqs:[] },
  { id:"ingles2",     name:"Inglés básico II",             semester:4,prereqs:["ingles1"] },

  /* V SEMESTRE */
  { id:"oftalmologia",name:"Oftalmología general",   semester:5,
    prereqs:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"morfofisiopato",name:"Morfofisiopatología sist. visual",semester:5,
    prereqs:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"visionbinocular",name:"Visión binocular",    semester:5,
    prereqs:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"oftalmofarma",name:"Oftalmofarmacología",    semester:5,
    prereqs:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"gestion",    name:"Gestión en salud",        semester:5,prereqs:[] },

  /* VI SEMESTRE */
  { id:"campovisual",name:"Estudio del campo visual",semester:6,
    prereqs:["oftalmologia","morfofisiopato","visionbinocular"] },
  { id:"estrabismo", name:"Estrabismo y ortóptica",   semester:6,
    prereqs:["oftalmologia","morfofisiopato","visionbinocular"] },
  { id:"optobasica", name:"Optometría clínica básica",semester:6,
    prereqs:["oftalmologia","morfofisiopato","visionbinocular","oftalmofarma"] },
  { id:"electivo1",  name:"Electivo I",              semester:6,prereqs:[] },

  /* VII SEMESTRE */
  { id:"neurooftalmo", name:"Neuroftalmología",          semester:7,prereqs:["estrabismo"] },
  { id:"imagenologia",name:"Imagenología ocular",        semester:7,prereqs:["campovisual"] },
  { id:"ecobiometria",name:"Ecobiometría ocular",        semester:7,prereqs:["oftalmologia"] },
  { id:"optoavanzada",name:"Optometría clínica avanzada",semester:7,prereqs:["optobasica"] },

  /* VIII SEMESTRE */
  { id:"metodologia", name:"Metodología de la investigación",semester:8,prereqs:["ecobiometria"] },
  { id:"retina",      name:"Retina clínica",               semester:8,prereqs:["imagenologia"] },
  { id:"apoyocirugia",name:"Apoyo en cirugía refractiva",  semester:8,prereqs:["ecobiometria"] },
  { id:"electivo2",   name:"Electivo II",                 semester:8,prereqs:["electivo1"] },

  /* IX SEMESTRE */
  { id:"seminario", name:"Seminario de investigación",semester:9,
    prereqs:["metodologia","retina","apoyocirugia"] },
  { id:"clinica",  name:"Clínica oftálmica",         semester:9,prereqs:[] },
  { id:"electivo3",name:"Electivo III",              semester:9,prereqs:[] },

  /* X SEMESTRE */
  { id:"internado1",name:"Internado profesional I",semester:10,prereqs:[] },
  { id:"internado2",name:"Internado profesional II",semester:10,prereqs:[] },
  { id:"internado3",name:"Internado profesional III",semester:10,prereqs:[] },
  { id:"internado4",name:"Internado profesional IV",semester:10,prereqs:[] },
  { id:"titulacion",name:"Actividad de titulación",   semester:10,prereqs:[] }
];

/* ===========  LÓGICA INTERACTIVA  =========== */
document.addEventListener("DOMContentLoaded", () => {
  const palette = ["#c5b2f2","#bda4f0","#b496ee","#ac87ec","#a37ae9",
                   "#9b6ce7","#925ee5","#8a50e2","#8143e0","#7837dd"];

  const mesh      = document.getElementById("mesh");
  const completed = new Set();   // cursos aprobados

  /* ----- Renderizar malla ----- */
  const semesters = [...new Set(courses.map(c => c.semester))].sort((a,b)=>a-b);

  semesters.forEach(sem => {
    const section = document.createElement("section");
    section.className = "semester";

    const h2 = document.createElement("h2");
    h2.textContent = `Semestre ${sem}`;
    section.appendChild(h2);

    courses.filter(c=>c.semester===sem).forEach((c,i)=>{
      const btn = document.createElement("button");
      btn.className = "course";
      btn.textContent = c.name;
      btn.dataset.id = c.id;
      btn.style.setProperty("--border-color", palette[(i+sem)%palette.length]);
      section.appendChild(btn);
      c.el = btn;   // guardar referencia DOM
    });
    mesh.appendChild(section);
  });

  /* ----- Función para refrescar estados visuales de TODOS los cursos ----- */
  function refreshAll() {
    courses.forEach(c => {
      const el = c.el;
      el.classList.remove("disabled","unlocked","completed");
      // Quitar badge si existe
      const badge = el.querySelector(".badge");
      if (badge) badge.remove();

      if (completed.has(c.id)) {
        el.classList.add("completed");
        const b = document.createElement("span");
        b.className = "badge";
        b.textContent = "✔";
        el.appendChild(b);
      } else if (c.prereqs.every(p => completed.has(p))) {
        el.classList.add("unlocked");
      } else {
        el.classList.add("disabled");
      }
    });
  }

  /* ----- Cascada: al desaprobar, retirar dependientes que ya no cumplen ----- */
  function cascadeUncomplete(lostId) {
    let queue = [lostId];
    while (queue.length) {
      const cur = queue.pop();
      courses.forEach(c => {
        if (completed.has(c.id) && c.prereqs.includes(cur) && !c.prereqs.every(p=>completed.has(p))) {
          completed.delete(c.id);
          queue.push(c.id);
        }
      });
    }
  }

  /* ----- Click handler ----- */
  mesh.addEventListener("click", e => {
    const btn = e.target.closest(".course");
    if (!btn) return;

    const id = btn.dataset.id;
    const course = courses.find(c => c.id === id);
    if (!course) return;

    if (btn.classList.contains("disabled")) return;              // bloqueado → nada

    if (completed.has(id)) {                                     // DESAPROBAR
      completed.delete(id);
      cascadeUncomplete(id);                                     // quitar dependientes
    } else {                                                     // APROBAR
      completed.add(id);
    }
    refreshAll();
  });

  /* Estado inicial */
  refreshAll();
});
