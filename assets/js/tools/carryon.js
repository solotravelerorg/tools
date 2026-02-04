const els = {
  bag: document.getElementById("cBag"),
  limit: document.getElementById("cLimit"),
  items: document.getElementById("cItems"),
  btn: document.getElementById("cCalcBtn"),
  out: document.getElementById("cResult")
};

const weights = {
  "laptop": 1.4,
  "tablet": 0.5,
  "camera": 0.8,
  "charger": 0.2,
  "power bank": 0.3,
  "shoes": 1.0,
  "sneakers": 1.0,
  "sandals": 0.5,
  "jeans": 0.7,
  "jacket": 0.8,
  "hoodie": 0.7,
  "toiletries": 0.6,
  "water bottle": 0.4,
  "book": 0.4
};

function norm(s){ return (s||"").toLowerCase().trim(); }
function round1(n){ return Math.round(n*10)/10; }

els.btn.addEventListener("click", () => {
  const bag = Math.max(0, Number(els.bag.value || 0));
  const limit = Math.max(0, Number(els.limit.value || 0));
  const items = (els.items.value || "").split("\n").map(norm).filter(Boolean);

  const breakdown = [];
  let sum = bag;

  for(const item of items){
    const w = weights[item] ?? 0.3;
    sum += w;
    breakdown.push([item, w]);
  }

  const total = round1(sum);
  const remaining = round1(limit - total);

  els.out.style.display = "block";
  els.out.innerHTML = `
    <strong>Estimate</strong>
    <pre style="white-space:pre-wrap;margin:8px 0 0;">Bag: ${round1(bag)} kg
Items: ${items.length} lines
Total: ${total} kg
Remaining: ${remaining} kg</pre>
    <br/>
    <strong>Breakdown</strong>
    <pre style="white-space:pre-wrap;margin:8px 0 0;">${breakdown.map(([i,w]) => `${i}: ${w} kg`).join("\n") || "(no items)"}</pre>
  `;
});
