const els = {
  trip: document.getElementById("sTripType"),
  accom: document.getElementById("sAccommodation"),
  build: document.getElementById("sBuildBtn"),
  copy: document.getElementById("sCopyBtn"),
  out: document.getElementById("sResult")
};

function checklist(){
  const base = [
    "Share itinerary (high-level) with a trusted contact",
    "Save offline maps and key addresses",
    "Note emergency numbers + local equivalents",
    "Keep two payment methods",
    "Backup IDs (digital + separate physical copy)",
    "Check arrival plan for late-night transit"
  ];

  const accom = els.accom.value;
  if(accom === "hotel") base.push("Confirm 24-hour front desk (if arriving late)");
  if(accom === "hostel") base.push("Bring a small lock for locker");
  if(accom === "rental") base.push("Confirm check-in process and exact address before travel day");

  const trip = els.trip.value;
  if(trip === "road"){
    base.push("Confirm spare tire/tools and emergency roadside plan");
    base.push("Download offline routes in case of no signal");
  }
  if(trip === "nature"){
    base.push("Check trail conditions and daylight hours");
    base.push("Tell someone your return time window");
  }

  return base;
}

function render(list){
  els.out.style.display = "block";
  const text = list.map(i => `- [ ] ${i}`).join("\n");
  els.out.innerHTML = `<pre style="white-space:pre-wrap;margin:0;">${text}</pre>`;
  els.out.dataset.text = text;
}

els.build.addEventListener("click", () => render(checklist()));

els.copy.addEventListener("click", async () => {
  const text = els.out.dataset.text || "";
  if(!text){ alert("Build the checklist first."); return; }
  await navigator.clipboard.writeText(text);
  els.copy.textContent = "Copied";
  setTimeout(() => els.copy.textContent = "Copy", 1200);
});
