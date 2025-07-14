/* ======== Lista de ramos & requisitos (sin cambios) ======== */
const courses=[ /* …tu misma lista completa… */ ];

/* ======== Lógica de interacción mejorada ======== */
document.addEventListener("DOMContentLoaded",()=>{

  const palette=["#c5b2f2","#bda4f0","#b496ee","#ac87ec","#a37ae9",
                 "#9b6ce7","#925ee5","#8a50e2","#8143e0","#7837dd"];

  const mesh=document.getElementById("mesh");
  const completed=new Set();

  /* —— Pintar semestres —— */
  const semesters=[...new Set(courses.map(c=>c.semester))].sort((a,b)=>a-b);
  semesters.forEach(sem=>{
    const section=document.createElement("section");
    section.className="semester";

    const h2=document.createElement("h2");
    h2.textContent=`Semestre ${sem}`;
    section.appendChild(h2);

    courses.filter(c=>c.semester===sem).forEach((c,i)=>{
      const btn=document.createElement("button");
      btn.className="course";
      btn.textContent=c.name;
      btn.dataset.id=c.id;
      btn.style.setProperty("--border-color",palette[(i+sem)%palette.length]);

      /* Estado inicial */
      if(c.prereqs.length){
        btn.classList.add("disabled");
      }else{
        btn.classList.add("unlocked");           // ramos sin requisito
      }

      c.el=btn;
      section.appendChild(btn);
    });

    mesh.appendChild(section);
  });

  /* —— Desbloqueo —— */
  function unlock(){
    courses.forEach(c=>{
      if(completed.has(c.id))return;                      // ya aprobado
      if(c.prereqs.every(p=>completed.has(p))){
        c.el.classList.remove("disabled");
        c.el.classList.add("unlocked");                   // resaltamos habilitado
      }
    });
  }

  /* —— Clic en curso —— */
  mesh.addEventListener("click",e=>{
    const btn=e.target.closest(".course");
    if(!btn||btn.classList.contains("disabled"))return;

    const id=btn.dataset.id;
    if(completed.has(id))return;

    completed.add(id);

    // Marcar como completado: tachado + ✔
    btn.classList.remove("unlocked");
    btn.classList.add("completed");
    const check=document.createElement("span");
    check.className="badge";
    check.textContent="✔";
    btn.appendChild(check);

    unlock();   // revisar y habilitar dependientes
  });
});
