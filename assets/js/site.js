document.getElementById("year").textContent = new Date().getFullYear();

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  }catch{
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    return true;
  }
}

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if(!btn) return;

  const id = btn.getAttribute("data-copy");
  const url = `${location.origin}${location.pathname}#${id}`;
  await copyText(url);

  const original = btn.textContent;
  btn.textContent = "Copied";
  setTimeout(() => btn.textContent = original, 1100);
});
