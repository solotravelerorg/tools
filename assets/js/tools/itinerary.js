const els = {
  text: document.getElementById("iText"),
  btn: document.getElementById("iCheckBtn"),
  out: document.getElementById("iResult")
};

function analyze(text){
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const dayBuckets = [];
  let current = { name: "Itinerary", items: [] };

  for(const line of lines){
    if(/^day\s*\d+/i.test(line)){
      if(current.items.length) dayBuckets.push(current);
      current = { name: line, items: [] };
    }else{
      current.items.push(line);
    }
  }
  if(current.items.length) dayBuckets.push(current);

  const warnings = [];
  for(const day of dayBuckets){
    const count = day.items.length;
    if(count >= 6) warnings.push(`${day.name}: ${count} items (likely overpacked).`);
    if(day.items.some(i => /arrive|flight|train|bus/i.test(i)) && count >= 4){
      warnings.push(`${day.name}: travel day + ${count} items. Consider adding buffer.`);
    }
    const times = day.items.filter(i => /\b([01]\d|2[0-3]):[0-5]\d\b/.test(i)).length;
    if(times >= 4) warnings.push(`${day.name}: many timed items (${times}). Risk of schedule slip.`);
  }

  if(!dayBuckets.length){
    return { ok:false, msg:"Add lines (and optionally Day headers like 'Day 1: ...')." };
  }

  return { ok:true, dayBuckets, warnings };
}

els.btn.addEventListener("click", () => {
  const res = analyze(els.text.value || "");
  els.out.style.display = "block";

  if(!res.ok){
    els.out.textContent = res.msg;
    return;
  }

  const summary = res.dayBuckets.map(d => `${d.name}: ${d.items.length} items`).join("\n");
  const warn = res.warnings.length ? res.warnings.map(w => `- ${w}`).join("\n") : "- No major red flags found.";

  els.out.innerHTML = `
    <strong>Summary</strong>
    <pre style="white-space:pre-wrap;margin:8px 0 0;">${summary}</pre>
    <br/>
    <strong>Warnings</strong>
    <pre style="white-space:pre-wrap;margin:8px 0 0;">${warn}</pre>
  `;
});
