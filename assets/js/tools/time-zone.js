const TZ = [
  { id: "America/Toronto", name: "Toronto (ET)" },
  { id: "America/Los_Angeles", name: "Los Angeles (PT)" },
  { id: "America/Denver", name: "Denver (MT)" },
  { id: "America/Chicago", name: "Chicago (CT)" },
  { id: "Europe/London", name: "London (UK)" },
  { id: "Europe/Paris", name: "Paris (CET)" },
  { id: "Europe/Athens", name: "Athens (EET)" },
  { id: "Asia/Dubai", name: "Dubai (GST)" },
  { id: "Asia/Bangkok", name: "Bangkok (ICT)" },
  { id: "Asia/Tokyo", name: "Tokyo (JST)" },
  { id: "Australia/Sydney", name: "Sydney (AEDT/AEST)" }
];

const els = {
  date: document.getElementById("tzDate"),
  time: document.getElementById("tzTime"),
  from: document.getElementById("tzFrom"),
  to: document.getElementById("tzTo"),
  convert: document.getElementById("tzConvertBtn"),
  swap: document.getElementById("tzSwapBtn"),
  result: document.getElementById("tzResult")
};

function fillSelect(sel){
  sel.innerHTML = TZ.map(t => `<option value="${t.id}">${t.name}</option>`).join("");
}

function pad(n){ return String(n).padStart(2,"0"); }

function formatInTZ(date, tz){
  const fmt = new Intl.DateTimeFormat(undefined, {
    timeZone: tz,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  return fmt.format(date);
}

// Convert wall-clock time in "from TZ" into an absolute instant.
// Searches for a UTC instant whose formatted parts in "from TZ" match the input.
function findInstantForWallTime({y,m,d,hh,mm}, tz){
  const target = `${y}-${pad(m)}-${pad(d)} ${pad(hh)}:${pad(mm)}`;
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false
  });

  let guess = Date.UTC(y, m-1, d, hh, mm, 0);

  const step = 5 * 60 * 1000;
  const start = guess - 36 * 60 * 60 * 1000;
  const end   = guess + 36 * 60 * 60 * 1000;

  for(let t = start; t <= end; t += step){
    const parts = fmt.formatToParts(new Date(t));
    const get = (type) => parts.find(p => p.type === type)?.value;
    const got = `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
    if(got === target) return new Date(t);
  }
  return null;
}

function todayISO(){
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}
function nowTimeISO(){
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

fillSelect(els.from);
fillSelect(els.to);
els.from.value = "America/Toronto";
els.to.value = "Europe/London";
els.date.value = todayISO();
els.time.value = nowTimeISO();

els.swap.addEventListener("click", () => {
  const a = els.from.value;
  els.from.value = els.to.value;
  els.to.value = a;
});

els.convert.addEventListener("click", () => {
  const [y, m, d] = els.date.value.split("-").map(Number);
  const [hh, mm] = els.time.value.split(":").map(Number);
  const fromTZ = els.from.value;
  const toTZ = els.to.value;

  const instant = findInstantForWallTime({y,m,d,hh,mm}, fromTZ);
  if(!instant){
    els.result.style.display = "block";
    els.result.textContent = "Could not resolve that time (it may fall into a DST gap). Try a different time.";
    return;
  }

  els.result.style.display = "block";
  els.result.innerHTML = `
    <strong>${formatInTZ(instant, fromTZ)}</strong> in <strong>${fromTZ}</strong>
    <br/>
    → <strong>${formatInTZ(instant, toTZ)}</strong> in <strong>${toTZ}</strong>
  `;
});
