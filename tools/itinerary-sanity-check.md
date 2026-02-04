---
layout: tool
title: Itinerary Sanity Check
description: Paste a day-by-day plan and get warnings about overpacked days.
icon: "🗺️"
tool_js: /assets/js/tools/itinerary.js
---

<label class="field">
  <span class="small">Paste your itinerary. Use one line per activity. Add times like “09:00” if you have them.</span>
  <textarea id="iText" placeholder="Day 1: Arrive, check-in, museum, dinner&#10;Day 2: ..."></textarea>
</label>

<div style="margin-top:12px;">
  <button class="btn btn-primary" id="iCheckBtn" type="button">Run check</button>
</div>

<div class="result" id="iResult" style="display:none;"></div>
