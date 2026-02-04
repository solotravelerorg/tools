const els = {
  total: document.getElementById("bTotal"),
  days: document.getElementById("bDays"),
  style: document.getElementById("bStyle"),
  buffer: document.getElementById("bBuffer"),
  btn: document.getElementById("bCalcBtn"),
  out: document.getElementById("bResult")
};

function pctForStyle(style){
  if(style === "budget")   return { lodging: 0.35, food: 0.25, transit: 0.15, activities: 0.15, misc: 0.10 };
  if(style === "comfort")  return { lodging: 0.45, food: 0.20, transit: 0.12, activities: 0.15, misc: 0.08 };
  return { lodging: 0.40, food: 0.22, transit: 0.13, activities: 0.15, misc: 0.10 };
}

function money(n){ return (Math.round(n * 100) / 100).toFixed(2); }

els.btn.addEventListener("click", () => {
  const total = Math.max(1, Number(els.total.value || 0));
  const days = Math.max(1, Number(els.days.value || 1));
  const buffer = Number(els.buffer.value || 0.1);

  const usable = total * (1 - buffer);
  const perDay = usable / days;

  const p = pctForStyle(els.style.value);
  const rows = [
    ["Usable budget (after buffer)", money(usable)],
    ["Daily target", money(perDay)],
    ["Buffer set aside", money(total - usable)]
  ];

  const cats = [
    ["Lodging", usable * p.lodging],
    ["Food", usable * p.food],
    ["Transit", usable * p.transit],
    ["Activities", usable * p.activities],
    ["Misc", usable * p.misc]
  ];

  els.out.style.display = "block";
  els.out.innerHTML = `
    <strong>Summary</strong>
    <pre style="white-space:pre-wrap;margin:8px 0 0;">${rows.map(r => `${r[0]}: ${r[1]}`).join("\n")}</pre>
    <br/>
    <strong>Category targets</strong>
    <pre style="white-space:pre-wrap;margin:8px 0 0;">${cats.map(c => `${c[0]}: ${money(c[1])}`).join("\n")}</pre>
  `;
});
