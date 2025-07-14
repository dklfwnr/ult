const courses = [
  // I SEMESTRE
  { id: "principios", name: "Principios matemáticos", semester: 1, prereqs: [], unlocks: ["biofisica", "estadisticas"] },
  { id: "biocel", name: "Biología celular", semester: 1, prereqs: [] },
  { id: "quimgeneral", name: "Química general", semester: 1, prereqs: [], unlocks: ["quimorganica"] },
  { id: "introTM", name: "Introducción a la Tecnología Médica", semester: 1, prereqs: [] },
  { id: "comunicacion", name: "Taller de competencias comunicativas", semester: 1, prereqs: [] },
  { id: "aprendizaje", name: "Taller de competencias para el aprendizaje", semester: 1, prereqs: [] },
  { id: "personal1", name: "Taller de desarrollo personal I", semester: 1, prereqs: [] },

  // II SEMESTRE
  { id: "biofisica", name: "Biofísica", semester: 2, prereqs: ["principios"], unlocks: ["fisicaoftalmica"] },
  { id: "enfermeria", name: "Proc. de enfermería y primeros auxilios", semester: 2, prereqs: [] },
  { id: "quimorganica", name: "Química orgánica", semester: 2, prereqs: ["quimgeneral"], unlocks: ["bioquimica"] },
  { id: "anatomia", name: "Anatomía", semester: 2, prereqs: [], unlocks: ["fisiologia"] },
  { id: "histologia", name: "Histología", semester: 2, prereqs: [], unlocks: ["inmunologia"] },
  { id: "personal2", name: "Taller de desarrollo personal II", semester: 2, prereqs: [] },
  { id: "cultura", name: "Cultura y valores", semester: 2, prereqs: [] },

  // III SEMESTRE
  { id: "estadisticas", name: "Estadísticas para la ciencia de la salud", semester: 3, prereqs: ["principios"], unlocks: ["saludpublica"] },
  { id: "inmunologia", name: "Inmunología básica", semester: 3, prereqs: ["histologia"], unlocks: ["morfofisiovisual"] },
  { id: "bioquimica", name: "Fundamentos en bioquímica", semester: 3, prereqs: ["quimorganica"] },
  { id: "fisiologia", name: "Fisiología", semester: 3, prereqs: ["anatomia"], unlocks: ["fisiopato"] },
  { id: "bioseguridad", name: "Bioseguridad", semester: 3, prereqs: [] },
  { id: "persona", name: "Persona y sentido", semester: 3, prereqs: [] },
  { id: "ingles1", name: "Inglés básico I", semester: 3, prereqs: [], unlocks: ["ingles2"] },

  // IV SEMESTRE
  { id: "saludpublica", name: "Fundamentos en salud pública", semester: 4, prereqs: ["estadisticas"] },
  { id: "etica", name: "Ética en salud", semester: 4, prereqs: [] },
  { id: "morfofisiovisual", name: "Morfofisiología del sistema visual", semester: 4, prereqs: ["inmunologia"], unlocks: ["morfofisiopato", "visionbinocular", "oftalmologia", "oftalmofarma"] },
  { id: "fisiopato", name: "Fisiopatología", semester: 4, prereqs: ["fisiologia"], unlocks: ["morfofisiopato", "visionbinocular", "oftalmologia", "oftalmofarma"] },
  { id: "fisicaoftalmica", name: "Física oftálmica", semester: 4, prereqs: ["biofisica"], unlocks: ["morfofisiopato", "visionbinocular", "oftalmologia", "oftalmofarma"] },
  { id: "atencion", name: "Atención primaria oftalmológica", semester: 4, prereqs: [] },
  { id: "ingles2", name: "Inglés básico II", semester: 4, prereqs: ["ingles1"] },

  // V SEMESTRE
  { id: "oftalmologia", name: "Oftalmología general", semester: 5, prereqs: ["morfofisiovisual", "fisiopato", "fisicaoftalmica"], unlocks: ["campovisual", "estrabismo", "optobasica", "ecobiometria"] },
  { id: "morfofisiopato", name: "Morfofisiopatología del sistema visual", semester: 5, prereqs: ["morfofisiovisual", "fisiopato", "fisicaoftalmica"], unlocks: ["campovisual", "estrabismo", "optobasica"] },
  { id: "visionbinocular", name: "Visión binocular", semester: 5, prereqs: ["morfofisiovisual", "fisiopato", "fisicaoftalmica"], unlocks: ["campovisual", "estrabismo", "optobasica"] },
  { id: "oftalmofarma", name: "Oftalmofarmacología", semester: 5, prereqs: ["morfofisiovisual", "fisiopato", "fisicaoftalmica"], unlocks: ["optobasica"] },
  { id: "gestion", name: "Gestión en salud", semester: 5, prereqs: [] },

  // VI SEMESTRE
  { id: "campovisual", name: "Estudio del campo visual", semester: 6, prereqs: ["oftalmologia", "morfofisiopato", "visionbinocular"], unlocks: ["imagenologia"] },
  { id: "estrabismo", name: "Estrabismo y ortóptica", semester: 6, prereqs: ["oftalmologia", "morfofisiopato", "visionbinocular"], unlocks: ["neurooftalmo"] },
  { id: "optobasica", name: "Optometría clínica básica", semester: 6, prereqs: ["oftalmologia", "morfofisiopato", "visionbinocular", "oftalmofarma"], unlocks: ["optoavanzada"] },
  { id: "electivo1", name: "Electivo I", semester: 6, prereqs: [], unlocks: ["electivo2"] },

  // VII SEMESTRE
  { id: "neurooftalmo", name: "Neuroftalmología", semester: 7, prereqs: ["estrabismo"] },
  { id: "imagenologia", name: "Imagenología ocular", semester: 7, prereqs: ["campovisual"], unlocks: ["retina"] },
  { id: "ecobiometria", name: "Ecobiometría ocular", semester: 7, prereqs: ["oftalmologia"], unlocks: ["metodologia", "apoyocirugia"] },
  { id: "optoavanzada", name: "Optometría clínica avanzada", semester: 7, prereqs: ["optobasica"] },

  // VIII SEMESTRE
  { id: "metodologia", name: "Metodología de la investigación", semester: 8, prereqs: ["ecobiometria"], unlocks: ["seminario"] },
  { id: "retina", name: "Retina clínica", semester: 8, prereqs: ["imagenologia"], unlocks: ["seminario"] },
  { id: "apoyocirugia", name: "Apoyo en cirugía refractiva", semester: 8, prereqs: ["ecobiometria"], unlocks: ["seminario"] },
  { id: "electivo2", name: "Electivo II", semester: 8, prereqs: ["electivo1"] },

  // IX SEMESTRE
  { id: "seminario", name: "Seminario de investigación", semester: 9, prereqs: ["metodologia", "retina", "apoyocirugia"] },
  { id: "clinica", name: "Clínica oftálmica", semester: 9, prereqs: [] },
  { id: "electivo3", name: "Electivo III", semester: 9, prereqs: [] },

  // X SEMESTRE
  { id: "internado1", name: "Internado profesional I", semester: 10, prereqs: [] },
  { id: "internado2", name: "Internado profesional II", semester: 10, prereqs: [] },
  { id: "internado3", name: "Internado profesional III", semester: 10, prereqs: [] },
  { id: "internado4", name: "Internado profesional IV", semester: 10, prereqs: [] },
  { id: "titulacion", name: "Actividad de titulación", semester: 10, prereqs: [] }
];

document.addEventListener("DOMContentLoaded", () => {
  const palette = ["#c5b2f2", "#bda4f0", "#b496ee", "#ac87ec", "#a37ae9", "#9b6ce7", "#925ee5", "#8a50e2", "#8143e0", "#7837dd"];
  const mesh = document.getElementById("mesh");
  const completed = new Set();

  const semesters = [...new Set(courses.map(c => c.semester))].sort((a, b) => a - b);
  semesters.forEach(sem => {
    const section = document.createElement("section");
    section.className = "semester";

    const h2 = document.createElement("h2");
    h2.textContent = `Semestre ${sem}`;
    section.appendChild(h2);

    courses.filter(c => c.semester === sem).forEach((c, i) => {
      const btn = document.createElement("button");
      btn.className = "course";
      btn.textContent = c.name;
      btn.dataset.id = c.id;
      btn.style.setProperty("--border-color", palette[(i + sem) % palette.length]);

      if (c.prereqs.length) {
        btn.classList.add("disabled");
      } else {
        btn.classList.add("unlocked");
      }

      c.el = btn;
      section.appendChild(btn);
    });

    mesh.appendChild(section);
  });

  function unlock() {
    courses.forEach(c => {
      if (completed.has(c.id)) return;
      if (c.prereqs.every(p => completed.has(p))) {
        c.el.classList.remove("disabled");
        c.el.classList.add("unlocked");
      }
    });
  }

  mesh.addEventListener("click", e => {
    const btn = e.target.closest(".course");
    if (!btn || btn.classList.contains("disabled")) return;

    const id = btn.dataset.id;
    if (completed.has(id)) return;

    completed.add(id);
    btn.classList.remove("unlocked");
    btn.classList.add("completed");

    const check = document.createElement("span");
    check.className = "badge";
    check.textContent = "✔";
    btn.appendChild(check);

    unlock();
  });
});
