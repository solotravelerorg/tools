const els = {
  flight: document.getElementById("aFlight"),
  type: document.getElementById("aType"),
  transit: document.getElementById("aTransit"),
  add: document.getElementById("aAdd"),
  btn: document.getElementById("aCalcBtn"),
  out: document.getElementById("aResult")
};

function toMinutes(t){
  const [h,m] = t.split(":").map(Number);
  return h*60 + m;
}
function fromMinutes(min){
  min = (min % (24*60) + (24*60)) % (24*60);
  const h = Math.floor(min/60);
  const m = min%60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}

els.btn.addEventListener("click", () => {
  const dep = toMinutes(els.flight.value || "12:00");
  const transit = Math.max(0, Number(els.transit.value || 0));
  const add = Math.max(0, Number(els.add.value || 0));
  const baseAirport = (els.type.value === "international") ? 180 : 120;

  const leave = dep - baseAirport - transit - add;
  const arrive = dep - baseAirport;

  els.out.style.display = "block";
  els.out.innerHTML = `
    <strong>Recommendation</strong>
    <pre style="white-space:pre-wrap;margin:8px 0 0;">Leave by: ${fromMinutes(leave)}
Arrive at airport by: ${fromMinutes(arrive)}
Airport buffer used: ${baseAirport} min
Transit: ${transit} min
Extra buffer: ${add} min</pre>
  `;
});
