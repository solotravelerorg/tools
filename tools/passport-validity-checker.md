---
layout: tool
title: Passport Validity Checker
description: Check your passport expiry against common 3-month and 6-month travel validity rules.
icon: "🛂"
tool_js: /assets/js/tools/passport-validity.js
---

<div class="form-grid">
  <div class="field">
    <label for="pExpiry">Passport expiry date</label>
    <input id="pExpiry" type="date" />
  </div>
  <div class="field">
    <label for="pReturn">Trip end or departure from destination</label>
    <input id="pReturn" type="date" />
  </div>
  <div class="field">
    <label for="pRule">Validity rule to check</label>
    <select id="pRule">
      <option value="none">No additional validity rule</option>
      <option value="3m" selected>At least 3 months after trip end</option>
      <option value="6m">At least 6 months after trip end</option>
    </select>
  </div>
  <div class="field">
    <label for="pBlank">Minimum blank visa pages wanted</label>
    <select id="pBlank">
      <option value="0">Not checking blank pages</option>
      <option value="1">1 blank page</option>
      <option value="2" selected>2 blank pages</option>
      <option value="4">4 blank pages</option>
    </select>
  </div>
  <div class="field">
    <label for="pPages">Blank pages remaining (optional)</label>
    <input id="pPages" type="number" min="0" step="1" placeholder="e.g. 3" />
  </div>
</div>

<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
  <button class="btn btn-primary" id="pCalcBtn" type="button">Check validity</button>
</div>

<div class="result" id="pResult" style="display:none;"></div>
<p class="small">This tool is a planning aid only. Entry rules depend on destination, nationality, visa type, and airline or border requirements. Always verify current official rules before travel.</p>
