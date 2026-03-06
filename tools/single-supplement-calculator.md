---
layout: tool
title: Single Supplement Calculator
description: Measure the extra cost solo travelers pay when pricing is built around shared occupancy.
icon: "🧮"
tool_js: /assets/js/tools/single-supplement.js
---

<div class="form-grid">
  <div class="field">
    <label for="sShared">Price per person based on shared occupancy</label>
    <input id="sShared" type="number" min="0" step="0.01" value="1800" />
  </div>
  <div class="field">
    <label for="sSolo">Solo traveler price</label>
    <input id="sSolo" type="number" min="0" step="0.01" value="2600" />
  </div>
  <div class="field">
    <label for="sNights">Number of nights (optional)</label>
    <input id="sNights" type="number" min="1" step="1" value="7" />
  </div>
  <div class="field">
    <label for="sCurrency">Currency symbol</label>
    <input id="sCurrency" type="text" value="$" maxlength="5" />
  </div>
</div>

<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
  <button class="btn btn-primary" id="sCalcBtn" type="button">Calculate</button>
</div>

<div class="result" id="sResult" style="display:none;"></div>
<p class="small">This calculator shows the gap between a shared-occupancy price and the solo price offered. It does not judge whether the markup is reasonable, but it makes the difference easier to compare.</p>
