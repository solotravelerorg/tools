---
layout: tool
title: Airport Buffer Calculator
description: Estimate what time you should leave for the airport.
icon: "✈️"
tool_js: /assets/js/tools/airport-buffer.js
---

<div class="form-grid">
  <div class="field">
    <label for="aFlight">Flight departure time</label>
    <input id="aFlight" type="time" value="12:30" />
  </div>
  <div class="field">
    <label for="aType">Flight type</label>
    <select id="aType">
      <option value="domestic" selected>Domestic</option>
      <option value="international">International</option>
    </select>
  </div>
  <div class="field">
    <label for="aTransit">Travel time to airport (minutes)</label>
    <input id="aTransit" type="number" min="0" value="60" />
  </div>
  <div class="field">
    <label for="aAdd">Extra buffer (minutes)</label>
    <input id="aAdd" type="number" min="0" value="20" />
  </div>
</div>

<div style="margin-top:12px;">
  <button class="btn btn-primary" id="aCalcBtn" type="button">Calculate</button>
</div>

<div class="result" id="aResult" style="display:none;"></div>
