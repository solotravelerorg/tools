const sEls = {
  shared: document.getElementById("sShared"),
  solo: document.getElementById("sSolo"),
  nights: document.getElementById("sNights"),
  currency: document.getElementById("sCurrency"),
  btn: document.getElementById("sCalcBtn"),
  out: document.getElementById("sResult")
};

function formatMoney(amount, symbol){
  return `${symbol}${(Math.round(amount * 100) / 100).toFixed(2)}`;
}

function renderSingleSupplement(){
  const shared = Math.max(0, Number(sEls.shared.value || 0));
  const solo = Math.max(0, Number(sEls.solo.value || 0));
  const nightsRaw = sEls.nights.value === "" ? null : Math.max(1, Number(sEls.nights.value || 1));
  const symbol = (sEls.currency.value || "$").trim() || "$";

  if(shared <= 0 || solo <= 0){
    sEls.out.style.display = "block";
    sEls.out.innerHTML = "<strong>Please enter both the shared price and the solo price.</strong>";
    return;
  }

  const supplement = solo - shared;
  const markupPct = shared === 0 ? 0 : (supplement / shared) * 100;
  const soloVsRoomPct = shared === 0 ? 0 : (solo / shared) * 100;

  const lines = [
    `Shared-occupancy price: ${formatMoney(shared, symbol)}`,
    `Solo traveler price: ${formatMoney(solo, symbol)}`,
    `Single supplement amount: ${formatMoney(supplement, symbol)}`,
    `Markup vs shared price: ${markupPct.toFixed(1)}%`,
    `Solo price as share of shared price: ${soloVsRoomPct.toFixed(1)}%`
  ];

  if(nightsRaw){
    lines.push(`Extra cost per night: ${formatMoney(supplement / nightsRaw, symbol)}`);
    lines.push(`Solo price per night: ${formatMoney(solo / nightsRaw, symbol)}`);
    lines.push(`Shared price per night: ${formatMoney(shared / nightsRaw, symbol)}`);
  }

  let status = "<strong>This fare charges more for the solo option.</strong>";
  if(supplement < 0){
    status = "<strong>The solo price is lower than the shared price entered.</strong>";
  } else if(supplement === 0){
    status = "<strong>No single supplement appears in the prices entered.</strong>";
  }

  sEls.out.style.display = "block";
  sEls.out.innerHTML = `
    ${status}
    <pre style="white-space:pre-wrap;margin:8px 0 0;">${lines.join("\n")}</pre>
  `;
}

if(sEls.btn){
  sEls.btn.addEventListener("click", renderSingleSupplement);
}
