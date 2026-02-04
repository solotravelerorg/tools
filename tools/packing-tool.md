---
layout: tool
title: Packing Tool
description: Generate a packing list based on trip length, climate, and laundry access.
icon: "🎒"
tool_js: /assets/js/tools/packing.js
---

<div class="form-grid">
  <div class="field">
    <label for="pDays">Trip length (days)</label>
    <input id="pDays" type="number" min="1" value="7" />
  </div>

  <div class="field">
    <label for="pClimate">Climate</label>
    <select id="pClimate">
      <option value="warm">Warm</option>
      <option value="mixed" selected>Mixed</option>
      <option value="cold">Cold</option>
    </select>
  </div>

  <div class="field">
    <label for="pLaundry">Laundry access</label>
    <select id="pLaundry">
      <option value="none">No laundry</option>
      <option value="some" selected>Maybe once</option>
      <option value="often">Easy access</option>
    </select>
  </div>

  <div class="field">
    <label for="pStyle">Travel style</label>
    <select id="pStyle">
      <option value="carryon" selected>Carry-on focused</option>
      <option value="checked">Checked bag ok</option>
    </select>
  </div>
</div>

<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
  <button class="btn btn-primary" id="pBuildBtn" type="button">Build list</button>
  <button class="btn" id="pCopyBtn" type="button">Copy list</button>
</div>

<div class="result" id="pResult" style="display:none;"></div>
