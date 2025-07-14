document.addEventListener("DOMContentLoaded", () => {
  const semesters = {
    "I SEMESTRE": [
      { name: "Principios matematicos", unlocks: ["Biofisica", "Estadisticas para la ciencia de la salud"] },
      { name: "Biologia celular", unlocks: [] },
      { name: "Quimica general", unlocks: ["Quimica organica"] },
      { name: "Introduccion a la tecnologia medica", unlocks: [] },
      { name: "Taller de competencias comunicativas", unlocks: [] },
      { name: "Taller de competencias para el aprendisaje", unlocks: [] },
      { name: "Taller de desarrollo personal I", unlocks: [] }
    ],
    "II SEMESTRE": [
      { name: "Biofisica", unlocks: ["Fisica oftalmica"] },
      { name: "Proc de enfermeria y primeros auxilios", unlocks: [] },
      { name: "Quimica organica", unlocks: ["Fundamentos en bioquimica"] },
      { name: "Anatomia", unlocks: ["Fisiologia"] },
      { name: "Histologia", unlocks: ["Inmunologia basica"] },
      { name: "Taller de desarrollo personal II", unlocks: [] },
      { name: "Cultura y valores", unlocks: [] }
    ],
    "III SEMESTRE": [
      { name: "Estadisticas para la ciencia de la salud", unlocks: ["Fundamentos en salud publica"] },
      { name: "Inmunologia basica", unlocks: ["Morfofisiologia del sistema visual"] },
      { name: "Fundamentos en bioquimica", unlocks: [] },
      { name: "Fisiologia", unlocks: ["Fisiopatologia"] },
      { name: "Bioseguridad", unlocks: [] },
      { name: "Persona y sentido", unlocks: [] },
      { name: "Ingles basico I", unlocks: ["Ingles basico II"] }
    ],
    "IV SEMESTRE": [
      { name: "Fundamentos en salud publica", unlocks: [] },
      { name: "Etica en salud", unlocks: [] },
      { name: "Morfofisiologia del sistema visual", unlocks: ["Morfofisiopatologia del sistema visual", "Vision binocular", "Oftalmologia general", "Oftalmofarmacologia"] },
      { name: "Fisiopatologia", unlocks: ["Morfofisiopatologia del sistema visual", "Vision binocular", "Oftalmologia general", "Oftalmofarmacologia"] },
      { name: "Fisica oftalmica", unlocks: ["Morfofisiopatologia del sistema visual", "Vision binocular", "Oftalmologia general", "Oftalmofarmacologia"] },
      { name: "Atencion primaria oftalmologica", unlocks: [] },
      { name: "Ingles basico II", unlocks: [] }
    ],
    "V SEMESTRE": [
      { name: "Oftalmologia general", unlocks: ["Estudio del campo visual", "Estrabismo y ortoptica", "Optometria clinica basica", "Ecobiometria ocular"] },
      { name: "Morfofisiopatologia del sistema visual", unlocks: ["Estudio del campo visual", "Estrabismo y ortoptica", "Optometria clinica basica"] },
      { name: "Vision binocular", unlocks: ["Estudio del campo visual", "Estrabismo y ortoptica", "Optometria clinica basica"] },
      { name: "Oftalmofarmacologia", unlocks: ["Optometria clinica basica"] },
      { name: "Gestion en salud", unlocks: [] }
    ],
    "VI SEMESTRE": [
      { name: "Estudio del campo visual", unlocks: ["Imagenologia Ocular"] },
      { name: "Estrabismo y ortoptica", unlocks: ["Neuroftalmologia"] },
      { name: "Optometria clinica basica", unlocks: ["Optometria clinica avanzada"] },
      { name: "ELECTIVO I", unlocks: ["ELECTIVO II"] }
    ],
    "VII SEMESTRE": [
      { name: "Neuroftalmologia", unlocks: [] },
      { name: "Imagenologia Ocular", unlocks: ["Retina clínica"] },
      { name: "Ecobiometria ocular", unlocks: ["Metodologia de la investigacion", "Apoyo en cirugia refractiva"] },
      { name: "Optometria clinica avanzada", unlocks: [] }
    ],
    "VIII SEMESTRE": [
      { name: "Metodologia de la investigacion", unlocks: ["SEMINARIO DE INVESTIGACIÓN"] },
      { name: "Retina clínica", unlocks: ["SEMINARIO DE INVESTIGACIÓN"] },
      { name: "Apoyo en cirugia refractiva", unlocks: ["SEMINARIO DE INVESTIGACIÓN"] },
      { name: "ELECTIVO II", unlocks: [] }
    ],
    "IX SEMESTRE": [
      { name: "SEMINARIO DE INVESTIGACIÓN", unlocks: [] },
      { name: "CLINICA OFTALMICA", unlocks: [] },
      { name: "ELECTIVO III", unlocks: [] }
    ],
    "X SEMESTRE": [
      { name: "INTERNADO PROFESIONAL I", unlocks: [] },
      { name: "INTERNADO PROFESIONAL II", unlocks: [] },
      { name: "INTERNADO PROFESIONAL III", unlocks: [] },
      { name: "INTERNADO PROFESIONAL IV", unlocks: [] }
    ],
    "TITULACIÓN": [
      { name: "ACTIVIDAD DE TITULACIÓN", unlocks: [] }
    ]
  };

  const completed = new Set();
  const mesh = document.getElementById("mesh");

  Object.entries(semesters).forEach(([sem, list]) => {
    const col = document.createElement("div");
    col.className = "semester";
    col.innerHTML = `<h2>${sem}</h2>`;
    list.forEach(course => {
      const btn = document.createElement("div");
      btn.className = "course";
      btn.textContent = course.name;
      btn.dataset.name = course.name;
      btn.onclick = () => toggleCourse(course.name);
      btn.ondblclick = () => openGradeModal(course.name);
      col.appendChild(btn);
    });
    mesh.appendChild(col);
  });

  updateState();

  function toggleCourse(name) {
    completed.has(name) ? completed.delete(name) : completed.add(name);
    updateState();
  }

  function updateState() {
    document.querySelectorAll(".course").forEach(el => {
      const name = el.dataset.name;
      el.classList.remove("completed", "unlocked");
      if (completed.has(name)) {
        el.classList.add("completed");
      } else if (isUnlocked(name)) {
        el.classList.add("unlocked");
      }
    });
  }

  function isUnlocked(name) {
    return Object.values(semesters).some(list =>
      list.some(c => completed.has(c.name) && c.unlocks.includes(name))
    );
  }

  // ---------------- MODAL DE NOTAS ----------------
  const gradeModal = document.getElementById("gradeModal");
  const titleEl = document.getElementById("gradeTitle");
  const inputPres = document.getElementById("inputPres");
  const inputExam = document.getElementById("inputExam");
  const resultEl = document.getElementById("gradeResult");
  const saveBtn = document.getElementById("saveGrade");

  let currentCourse = "";

  document.getElementById("closeGrade").onclick = () => gradeModal.style.display = "none";

  inputPres.oninput = inputExam.oninput = calcularNotaFinal;

  function calcularNotaFinal() {
    const p = parseFloat(inputPres.value);
    const e = parseFloat(inputExam.value);
    if (isNaN(p) || isNaN(e)) { resultEl.textContent = ""; return; }
    const final = (p * 0.7 + e * 0.3).toFixed(2);
    let msg = `Nota final: ${final}`;
    msg += final >= 5.5 ? " ✅ Eximido" : final >= 4 ? " ✔️ Aprobado" : " ❌ Reprobado";
    resultEl.textContent = msg;
  }

  function openGradeModal(name) {
    currentCourse = name;
    titleEl.textContent = `Notas para ${name}`;
    const saved = JSON.parse(localStorage.getItem("notas_" + name)) || {};
    inputPres.value = saved.pres || "";
    inputExam.value = saved.exam || "";
    calcularNotaFinal();
    gradeModal.style.display = "flex";
  }

  saveBtn.onclick = () => {
    const pres = parseFloat(inputPres.value);
    const exam = parseFloat(inputExam.value);
    if (!isNaN(pres) && !isNaN(exam)) {
      localStorage.setItem("notas_" + currentCourse, JSON.stringify({ pres, exam }));
    }
    gradeModal.style.display = "none";
  };

  // ---------------- NOTAS GENERALES ----------------
  document.getElementById("openNotes").onclick = () => {
    const notes = localStorage.getItem("general_notes") || "";
    document.getElementById("generalNotes").value = notes;
    document.getElementById("notesModal").style.display = "flex";
  };

  document.getElementById("closeNotes").onclick = () => {
    const notes = document.getElementById("generalNotes").value;
    localStorage.setItem("general_notes", notes);
    document.getElementById("notesModal").style.display = "none";
  };
});
