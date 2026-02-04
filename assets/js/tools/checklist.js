const els = {
  name: document.getElementById("clName"),
  item: document.getElementById("clItem"),
  add: document.getElementById("clAddBtn"),
  save: document.getElementById("clSaveBtn"),
  load: document.getElementById("clLoadBtn"),
  clear: document.getElementById("clClearBtn"),
  out: document.getElementById("clResult")
};

let items = [];

function render(){
  els.out.style.display = "block";
  if(!items.length){
    els.out.innerHTML = "No items yet.";
    return;
  }
  const text = items.map(i => `- [ ] ${i}`).join("\n");
  els.out.innerHTML = `<pre style="white-space:pre-wrap;margin:0;">${text}</pre>`;
}

els.add.addEventListener("click", () => {
  const v = (els.item.value || "").trim();
  if(!v) return;
  items.push(v);
  els.item.value = "";
  render();
});

els.save.addEventListener("click", () => {
  const name = (els.name.value || "").trim();
  if(!name){ alert("Name your checklist first."); return; }
  localStorage.setItem(`st-checklist:${name}`, JSON.stringify(items));
  alert("Saved.");
});

els.load.addEventListener("click", () => {
  const name = (els.name.value || "").trim();
  if(!name){ alert("Enter a checklist name to load."); return; }
  const raw = localStorage.getItem(`st-checklist:${name}`);
  if(!raw){ alert("No saved checklist found with that name."); return; }
  items = JSON.parse(raw);
  render();
});

els.clear.addEventListener("click", () => {
  items = [];
  render();
});

render();
