---
layout: tool
title: Trip Budget Splitter
description: Split a total trip budget into daily and category targets.
icon: "💸"
tool_js: /assets/js/tools/budget.js
---

<div class="form-grid">
  <div class="field">
    <label for="bTotal">Total budget (your currency)</label>
    <input id="bTotal" type="number" min="1" value="1500" />
  </div>
  <div class="field">
    <label for="bDays">Trip length (days)</label>
    <input id="bDays" type="number" min="1" value="10" />
  </div>
  <div class="field">
    <label for="bStyle">Style</label>
    <select id="bStyle">
      <option value="budget">Budget</option>
      <option value="mid" selected>Mid-range</option>
      <option value="comfort">Comfort</option>
    </select>
  </div>
  <div class="field">
    <label for="bBuffer">Contingency buffer</label>
    <select id="bBuffer">
      <option value="0.05">5%</option>
      <option value="0.10" selected>10%</option>
      <option value="0.15">15%</option>
      <option value="0.20">20%</option>
    </select>
  </div>
</div>

<div style="margin-top:12px;">
  <button class="btn btn-primary" id="bCalcBtn" type="button">Calculate</button>
</div>

<div class="result" id="bResult" style="display:none;"></div>
