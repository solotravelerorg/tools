---
layout: tool
title: Time Zone Converter
description: Convert a date/time between common travel time zones.
icon: "🕒"
tool_js: /assets/js/tools/time-zone.js
---

<div class="form-grid">
  <div class="field">
    <label for="tzDate">Date</label>
    <input id="tzDate" type="date" />
  </div>

  <div class="field">
    <label for="tzTime">Time</label>
    <input id="tzTime" type="time" />
  </div>

  <div class="field">
    <label for="tzFrom">From time zone</label>
    <select id="tzFrom"></select>
  </div>

  <div class="field">
    <label for="tzTo">To time zone</label>
    <select id="tzTo"></select>
  </div>
</div>

<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
  <button class="btn btn-primary" id="tzConvertBtn" type="button">Convert</button>
  <button class="btn" id="tzSwapBtn" type="button">Swap</button>
</div>

<div class="result" id="tzResult" style="display:none;"></div>
<p class="small">Uses your browser’s built-in time zone support (no API calls).</p>
