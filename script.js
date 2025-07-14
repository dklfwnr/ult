/*****************************************************************
 * Malla interactiva – aprobar/desaprobar con cascada de bloqueo *
 *****************************************************************/

const courses = [
  /* I */
  { id:"principios", name:"Principios matemáticos", sem:1, pre:[] },
  { id:"biocel",     name:"Biología celular",        sem:1, pre:[] },
  { id:"quimgeneral",name:"Química general",         sem:1, pre:[] },
  { id:"introTM",    name:"Introducción a Tecnologia Médica", sem:1, pre:[] },
  { id:"comunicacion",name:"Taller comp. comunicativas", sem:1, pre:[] },
  { id:"aprendizaje",name:"Taller comp. aprendizaje", sem:1, pre:[] },
  { id:"personal1",  name:"Taller des. personal I",   sem:1, pre:[] },

  /* II */
  { id:"biofisica",  name:"Biofísica",                     sem:2, pre:["principios"] },
  { id:"enfermeria", name:"Proc. de enfermería y P.A.",    sem:2, pre:[] },
  { id:"quimorganica",name:"Química orgánica",             sem:2, pre:["quimgeneral"] },
  { id:"anatomia",   name:"Anatomía",                      sem:2, pre:[] },
  { id:"histologia", name:"Histología",                    sem:2, pre:[] },
  { id:"personal2",  name:"Taller des. personal II",       sem:2, pre:[] },
  { id:"cultura",    name:"Cultura y valores",             sem:2, pre:[] },

  /* III */
  { id:"estadisticas", name:"Estadísticas p/la salud", sem:3, pre:["principios"] },
  { id:"inmunologia",  name:"Inmunología básica",     sem:3, pre:["histologia"] },
  { id:"bioquimica",   name:"Fundamentos en bioquímica", sem:3, pre:["quimorganica"] },
  { id:"fisiologia",   name:"Fisiología",             sem:3, pre:["anatomia"] },
  { id:"bioseguridad", name:"Bioseguridad",           sem:3, pre:[] },
  { id:"persona",      name:"Persona y sentido",      sem:3, pre:[] },
  { id:"ingles1",      name:"Inglés básico I",        sem:3, pre:[] },

  /* IV */
  { id:"saludpublica", name:"Fundamentos en salud pública", sem:4, pre:["estadisticas"] },
  { id:"etica",        name:"Ética en salud",               sem:4, pre:[] },
  { id:"morfofisiovisual", name:"Morfofisiología sist. visual", sem:4, pre:["inmunologia"] },
  { id:"fisiopato",    name:"Fisiopatología",                sem:4, pre:["fisiologia"] },
  { id:"fisicaoftalmica",name:"Física oftálmica",            sem:4, pre:["biofisica"] },
  { id:"atencion",     name:"Atención primaria oftalmológica", sem:4, pre:[] },
  { id:"ingles2",      name:"Inglés básico II",             sem:4, pre:["ingles1"] },

  /* V */
  { id:"oftalmologia", name:"Oftalmología general",   sem:5,
    pre:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"morfofisiopato", name:"Morfofisiopatología sist. visual", sem:5,
    pre:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"visionbinocular", name:"Visión binocular",    sem:5,
    pre:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"oftalmofarma", name:"Oftalmofarmacología",    sem:5,
    pre:["morfofisiovisual","fisiopato","fisicaoftalmica"] },
  { id:"gestion",      name:"Gestión en salud",       sem:5, pre:[] },

  /* VI */
  { id:"campovisual",  name:"Estudio del campo visual", sem:6,
    pre:["oftalmologia","morfofisiopato","visionbinocular"] },
  { id:"estrabismo",   name:"Estrabismo y ortóptica",   sem:6,
    pre:["oftalmologia","morfofisiopato","visionbinocular"] },
  { id:"optobasica",   name:"Optometría clínica básica", sem:6,
    pre:["oftalmologia","morfofisiopato","visionbinocular","oftalmofarma"] },
  { id:"electivo1",    name:"Electivo I",              sem:6, pre:[] },

  /* VII */
  { id:"neurooftalmo", name:"Neuroftalmología", sem:7, pre:["estrabismo"] },
  { id:"imagenologia", name:"Imagenología ocular", sem:7, pre:["campovisual"] },
  { id:"ecobiometria", name:"Ecobiometría ocular", sem:7, pre:["oftalmologia"] },
  { id:"optoavanzada", name:"Optometría clínica avanzada", sem:7, pre:["optobasica"] },

  /* VIII */
  { id:"metodologia",   name:"Metodología de la investigación", sem:8, pre:["ecobiometria"] },
  { id:"retina",        name:"Retina clínica",                 sem:8, pre:["imagenologia"] },
  { id:"apoyocirugia",  name:"Apoyo en cirugía refractiva",    sem:8, pre:["ecobiometria"] },
  { id:"electivo2",     name:"Electivo II",                    sem:8, pre:["electivo1"] },

  /* IX */
  { id:"seminario", name:"Seminario de investigación", sem:9,
    pre:["metodologia","retina","apoyocirugia"] },
  { id:"clinica",   name:"Clínica oftálmica",          sem:9, pre:[] },
  { id:"electivo3", name:"Electivo III",               sem:9, pre:[] },

  /* X */
  { id:"internado1", name:"Internado profesional I",  sem:10, pre:[] },
  { id:"internado2", name:"Internado profesional II", sem:10, pre:[] },
  { id:"internado3", name:"Internado profesional III",sem:10, pre:[] },
  { id:"internado4", name:"Internado profesional IV", sem:10, pre:[] },
  { id:"titulacion", name:"Actividad de titulación",  sem:10, pre:[] }
];

/* -------------- Estado -------------- */
const done = new Set();      // aprobados
const palette = ["#c5b2f2","#bda4f0","#b496ee","#ac87ec","#a37ae9",
                 "#9b6ce7","#925ee5","#8a50e2","#8143e0","#7837dd"];

/* -------------- Render inicial -------------- */
document.addEventListener("DOMContentLoaded", () => {
  const mesh = document.getElementById("mesh");
  const semesters = [...new Set(courses.map(c=>c.sem))].sort((a,b)=>a-b);

  semesters.forEach(sem=>{
    const sec = document.createElement("section");
    sec.className="semester";
    sec.innerHTML = `<h2>Semestre ${sem}</h2>`;
    courses.filter(c=>c.sem===sem).forEach((c,i)=>{
      const btn=document.createElement("button");
      btn.className="course";
      btn.textContent=c.name;
      btn.dataset.id=c.id;
      btn.style.setProperty("--border-color",palette[(i+sem)%palette.length]);
      c.el=btn;
      sec.appendChild(btn);
    });
    mesh.appendChild(sec);
  });

  refresh();

  mesh.addEventListener("click", e=>{
    const btn=e.target.closest(".course");
    if(!btn) return;
    const id=btn.dataset.id;
    const course=courses.find(c=>c.id===id);
    if(!course) return;

    if(btn.classList.contains("disabled")) return;       // bloqueado

    if(done.has(id)){            // DESAPROBAR
      uncompleteCascade(id);
    }else{                       // APROBAR
      done.add(id);
    }
    refresh();
  });
});

/* -------------- Funciones -------------- */
function unmetPrereqs(courseId){
  const course=courses.find(c=>c.id===courseId);
  return course.pre.filter(p=>!done.has(p));
}
function uncompleteCascade(lostId){
  const stack=[lostId];
  while(stack.length){
    const cur=stack.pop();
    done.delete(cur);
    courses.forEach(c=>{
      if(done.has(c.id) && c.pre.includes(cur) && unmetPrereqs(c.id).length){
        stack.push(c.id);
      }
    });
  }
}
function refresh(){
  courses.forEach(c=>{
    const el=c.el;
    el.className="course";                // limpia clases
    const badge=el.querySelector(".badge");
    if(badge) badge.remove();

    if(done.has(c.id)){
      el.classList.add("completed");
      const b=document.createElement("span");
      b.className="badge";
      b.textContent="✔";
      el.appendChild(b);
    }else if(unmetPrereqs(c.id).length){
      el.classList.add("disabled");
    }else{
      el.classList.add("unlocked");
    }
  });
}
