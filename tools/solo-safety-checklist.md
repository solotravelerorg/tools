---
layout: tool
title: Solo Safety Checklist
description: Build a destination-agnostic checklist you can copy and customize.
icon: "✅"
tool_js: /assets/js/tools/safety.js
---

<div class="form-grid">
  <div class="field">
    <label for="sTripType">Trip type</label>
    <select id="sTripType">
      <option value="city" selected>City break</option>
      <option value="road">Road trip</option>
      <option value="nature">Nature/outdoors</option>
    </select>
  </div>

  <div class="field">
    <label for="sAccommodation">Accommodation</label>
    <select id="sAccommodation">
      <option value="hotel" selected>Hotel</option>
      <option value="hostel">Hostel</option>
      <option value="rental">Rental</option>
    </select>
  </div>
</div>

<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
  <button class="btn btn-primary" id="sBuildBtn" type="button">Build checklist</button>
  <button class="btn" id="sCopyBtn" type="button">Copy</button>
</div>

<div class="result" id="sResult" style="display:none;"></div>
