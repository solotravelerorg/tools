---
layout: tool
title: Checklist Builder
description: Create and save checklists locally in your browser.
icon: "🧾"
tool_js: /assets/js/tools/checklist.js
---

<div class="form-grid">
  <div class="field">
    <label for="clName">Checklist name</label>
    <input id="clName" type="text" placeholder="Example: Europe carry-on" />
  </div>
  <div class="field">
    <label for="clItem">Add item</label>
    <input id="clItem" type="text" placeholder="Example: eSIM activation" />
  </div>
</div>

<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
  <button class="btn btn-primary" id="clAddBtn" type="button">Add item</button>
  <button class="btn" id="clSaveBtn" type="button">Save</button>
  <button class="btn" id="clLoadBtn" type="button">Load</button>
  <button class="btn" id="clClearBtn" type="button">Clear</button>
</div>

<div class="result" id="clResult" style="display:none;"></div>
<p class="small">Saved to your browser (localStorage). No server.</p>
