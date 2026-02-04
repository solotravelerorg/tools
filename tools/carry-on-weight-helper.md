---
layout: tool
title: Carry-on Weight Helper
description: Estimate your carry-on weight using common item weights.
icon: "⚖️"
tool_js: /assets/js/tools/carryon.js
---

<div class="form-grid">
  <div class="field">
    <label for="cBag">Bag weight (kg)</label>
    <input id="cBag" type="number" step="0.1" value="1.8" />
  </div>
  <div class="field">
    <label for="cLimit">Airline limit (kg)</label>
    <input id="cLimit" type="number" step="0.1" value="7.0" />
  </div>
</div>

<label class="field" style="margin-top:12px;">
  <span class="small">Items (one per line). Example: “laptop”, “shoes”, “jeans”. Unknown items default to 0.3kg.</span>
  <textarea id="cItems" placeholder="laptop&#10;charger&#10;shoes&#10;jeans"></textarea>
</label>

<div style="margin-top:12px;">
  <button class="btn btn-primary" id="cCalcBtn" type="button">Estimate</button>
</div>

<div class="result" id="cResult" style="display:none;"></div>
