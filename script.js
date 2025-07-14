/****************************************************************
 *  Malla interactiva – toggle aprobar ↔ desaprobar con cascada *
 ****************************************************************/

/* ---------- 1. Lista de cursos ---------- */
const courses = [
  /* I */
  { id:"principios",   name:"Principios matemáticos", sem:1, pre:[] },
  { id:"biocel",       name:"Biología celular",        sem:1, pre:[] },
  { id:"quimgeneral",  name:"Química general",         sem:1, pre:[] },
  { id:"introTM",      name:"Introducción a TM",       sem:1, pre:[] },
  { id:"comunicacion", name:"Comp. comunicativas",     sem:1, pre:[] },
  { id:"aprendizaje",  name:"Comp. aprendizaje",       sem:1, pre:[] },
  { id:"personal1",    name:"Desarrollo personal I",   sem:1, pre:[] },

  /* II */
  { id:"biofisica",    name:"Biofísica",          sem:2, pre:["principios"] },
  { id:"enfermeria",   name:"Enfermería y P.A.",  sem:2, pre:[] },
  { id:"quimorganica", name:"Química orgánica",   sem:2, pre:["quimgeneral"] },
  { id:"anatomia",     name:"Anatomía",           sem:2, pre:[] },
  { id:"histologia",   name:"Histología",         sem:2, pre:[] },
  { id:"personal2",    name:"Desarrollo personal II", sem:2, pre:[] },
  { id:"cultura",      name:"Cultura y valores",  sem:2, pre:[] },

  /* … (añade o deja los demás igual como antes) … */
];

/* ---------- 2. Estado ---------- */
const done = new Set();          // ramos aprobados

/* ---------- 3. Render ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const mesh = document.getElementById("mesh");
  const palette = ["#c5b2f2","#bda4f0","#b496ee","#ac87ec","#a37ae9",
                   "#9b6ce7","#925ee5","#8a50e2","#8143e0","#7837dd"];

  // agrupa y crea columnas por semestre
  [...new Set(courses.map(c=>c.sem))].sort((a,b)=>a-b).forEach(sem=>{
    const sec=document.createElement("section");
    sec.className="semester";
    sec.innerHTML=`<h2>Semestre ${sem}</h2>`;
    courses.filter(c=>c.sem===sem).forEach((c,i)=>{
      const btn=document.createElement("button");
      btn.className="course";
      btn.dataset.id=c.id;
      btn.textContent=c.name;
      btn.style.setProperty("--border-color",palette[(i+sem)%palette.length]);
      c.el=btn;                 // guarda referencia
      sec.appendChild(btn);
    });
    mesh.appendChild(sec);
  });

  // clic centralizado
  mesh.addEventListener("click", e=>{
    const btn=e.target.closest(".course");
    if(!btn) return;
    const id=btn.dataset.id;
    const course=courses.find(c=>c.id===id);
    if(!course) return;

    if(btn.classList.contains("disabled")) return; // bloqueado → nada

    if(done.has(id)){
      unapproveCascade(id);   // quitar aprobación
    }else{
      done.add(id);           // aprobar
    }
    refreshAll();
  });

  refreshAll(); // estado inicial
});

/* ---------- 4. Lógica auxiliar ---------- */
function unmet(c){ return c.pre.filter(p=>!done.has(p)).length }

function unapproveCascade(id){
  const stack=[id];
  while(stack.length){
    const current=stack.pop();
    done.delete(current);

    // cualquier ramo aprobado que dependa de este y pierde requisito se quita
    courses.forEach(c=>{
      if(done.has(c.id) && c.pre.includes(current) && unmet(c)){
        stack.push(c.id);
      }
    });
  }
}

function refreshAll(){
  courses.forEach(c=>{
    const el=c.el;
    el.className="course";   // reset
    (el.querySelector(".badge")||{}).remove?.();

    if(done.has(c.id)){
      el.classList.add("completed");
      const b=document.createElement("span");
      b.className="badge"; b.textContent="✔";
      el.appendChild(b);
    }else if(unmet(c)){
      el.classList.add("disabled");
    }else{
      el.classList.add("unlocked");
    }
  });
}
