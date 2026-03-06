const pEls = {
  expiry: document.getElementById("pExpiry"),
  tripEnd: document.getElementById("pReturn"),
  rule: document.getElementById("pRule"),
  blank: document.getElementById("pBlank"),
  pages: document.getElementById("pPages"),
  btn: document.getElementById("pCalcBtn"),
  out: document.getElementById("pResult")
};

function formatDate(date){
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function parseDate(value){
  if(!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addMonths(date, months){
  const clone = new Date(date.getTime());
  const originalDay = clone.getDate();
  clone.setMonth(clone.getMonth() + months);
  if(clone.getDate() !== originalDay){
    clone.setDate(0);
  }
  return clone;
}

function daysBetween(a, b){
  const ms = 24 * 60 * 60 * 1000;
  return Math.floor((b - a) / ms);
}

function suggestedRuleText(rule){
  if(rule === "6m") return "6 months after trip end";
  if(rule === "3m") return "3 months after trip end";
  return "no added buffer rule selected";
}

function renderPassportResult(){
  const expiry = parseDate(pEls.expiry.value);
  const tripEnd = parseDate(pEls.tripEnd.value);
  const rule = pEls.rule.value;
  const blankRequired = Number(pEls.blank.value || 0);
  const blankPages = pEls.pages.value === "" ? null : Math.max(0, Number(pEls.pages.value || 0));

  if(!expiry || !tripEnd){
    pEls.out.style.display = "block";
    pEls.out.innerHTML = "<strong>Please enter both your passport expiry date and your trip end date.</strong>";
    return;
  }

  let requiredDate = new Date(tripEnd.getTime());
  if(rule === "3m") requiredDate = addMonths(tripEnd, 3);
  if(rule === "6m") requiredDate = addMonths(tripEnd, 6);

  const passesDate = expiry >= requiredDate;
  const extraDays = daysBetween(requiredDate, expiry);
  const pageCheck = blankPages === null ? null : blankPages >= blankRequired;

  let statusLine = passesDate
    ? `<strong>Likely okay for the selected rule.</strong>`
    : `<strong>Warning: your passport may not meet the selected rule.</strong>`;

  let pageLine = "Blank pages: not checked.";
  if(pageCheck === true){
    pageLine = `Blank pages: ${blankPages} remaining, which meets your selected minimum of ${blankRequired}.`;
  } else if(pageCheck === false) {
    pageLine = `Blank pages: ${blankPages} remaining, which is below your selected minimum of ${blankRequired}.`;
  }

  let marginLine = passesDate
    ? `Validity margin: about ${extraDays} day${extraDays === 1 ? "" : "s"} beyond the selected requirement.`
    : `Short by about ${Math.abs(extraDays)} day${Math.abs(extraDays) === 1 ? "" : "s"} compared with the selected requirement.`;

  pEls.out.style.display = "block";
  pEls.out.innerHTML = `
    ${statusLine}
    <pre style="white-space:pre-wrap;margin:8px 0 0;">Passport expiry: ${formatDate(expiry)}
Trip end used: ${formatDate(tripEnd)}
Rule checked: ${suggestedRuleText(rule)}
Minimum expiry date for this check: ${formatDate(requiredDate)}
${marginLine}
${pageLine}</pre>
  `;
}

if(pEls.btn){
  const today = new Date();
  const plusMonths = addMonths(today, 6);
  const plusMonthsEnd = addMonths(today, 3);
  pEls.expiry.value = pEls.expiry.value || plusMonths.toISOString().slice(0, 10);
  pEls.tripEnd.value = pEls.tripEnd.value || plusMonthsEnd.toISOString().slice(0, 10);
  pEls.btn.addEventListener("click", renderPassportResult);
}
