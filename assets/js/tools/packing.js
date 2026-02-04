const els = {
  days: document.getElementById("pDays"),
  climate: document.getElementById("pClimate"),
  laundry: document.getElementById("pLaundry"),
  style: document.getElementById("pStyle"),
  build: document.getElementById("pBuildBtn"),
  copy: document.getElementById("pCopyBtn"),
  out: document.getElementById("pResult")
};

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function buildList(){
  const days = clamp(parseInt(els.days.value || "7", 10), 1, 60);
  const climate = els.climate.value;
  const laundry = els.laundry.value;
  const style = els.style.value;

  let wearCycle = days;
  if(laundry === "some") wearCycle = Math.ceil(days * 0.65);
  if(laundry === "often") wearCycle = Math.ceil(days * 0.45);

  const tees = clamp(wearCycle, 3, style === "carryon" ? 8 : 12);
  const underwear = clamp(wearCycle + 1, 4, style === "carryon" ? 10 : 14);
  const socks = clamp(wearCycle, 3, style === "carryon" ? 9 : 12);

  const base = [
    ["Clothing", [
      `${tees} tops (t-shirts/shirts)`,
      `${underwear} underwear`,
      `${socks} socks`,
      `2 bottoms (pants/shorts)`,
      `1 sleepwear set`,
      `1 nicer outfit (optional)`
    ]],
    ["Essentials", [
      `Passport/ID + backups`,
      `Wallet + 2 payment methods`,
      `Phone + charger + cable`,
      `Travel adapter (if needed)`,
      `Sunglasses`,
      `Reusable water bottle`
    ]],
    ["Toiletries", [
      `Toothbrush + toothpaste`,
      `Deodorant`,
      `Travel-size liquids`,
      `Basic meds (pain relief, etc.)`,
      `Band-aids / blister care`
    ]],
    ["Solo travel practical", [
      `Small day bag`,
      `Offline map saved`,
      `Emergency contacts noted`,
      `Tiny flashlight (optional)`
    ]]
  ];

  if(climate === "cold"){
    base[0][1].push(`Warm layer (fleece/sweater)`);
    base[0][1].push(`Insulating jacket`);
    base[0][1].push(`Hat + gloves (if needed)`);
  }
  if(climate === "warm"){
    base[0][1].push(`Light layer (sun shirt)`);
    base[0][1].push(`Swimwear (if needed)`);
    base[2][1].push(`Sunscreen`);
  }
  if(climate === "mixed"){
    base[0][1].push(`Light jacket`);
    base[0][1].push(`One warm layer`);
  }

  if(style === "carryon"){
    base.push(["Carry-on helpers", [
      `Compression cubes (optional)`,
      `Laundry kit (tiny detergent sheet)`,
      `Packable tote`,
      `Digital copies of docs`
    ]]);
  }else{
    base.push(["Checked bag extras", [
      `Spare shoes (if needed)`,
      `More liquids (within rules)`,
      `Souvenir space`
    ]]);
  }

  return base;
}

function render(list){
  const md = list.map(([h, items]) => {
    const lines = items.map(i => `- ${i}`).join("\n");
    return `<strong>${h}</strong><br/><pre style="white-space:pre-wrap;margin:8px 0 0;">${lines}</pre>`;
  }).join("<br/>");

  els.out.style.display = "block";
  els.out.innerHTML = md;
}

function plainText(list){
  return list.map(([h, items]) => {
    return `${h}\n${items.map(i => `- ${i}`).join("\n")}`;
  }).join("\n\n");
}

els.build.addEventListener("click", () => {
  const list = buildList();
  render(list);
  els.out.dataset.text = plainText(list);
});

els.copy.addEventListener("click", async () => {
  const text = els.out.dataset.text || "";
  if(!text){ alert("Build a list first."); return; }
  try{
    await navigator.clipboard.writeText(text);
    els.copy.textContent = "Copied";
    setTimeout(() => (els.copy.textContent = "Copy list"), 1200);
  }catch{
    alert("Copy failed in this browser context.");
  }
});
