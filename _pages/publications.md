---
layout: page
permalink: /publications/
title: Publications
description: Full publication list on Google Scholar; filter papers by research topic or browse everything in reverse chronological order.
nav: true
nav_order: 1
---

<div class="pub-hub" markdown="0">

  <div class="pub-hub__intro">
    <div class="pub-hub__intro-inner">
      <p class="mb-0">
        <strong><a href="https://scholar.google.com/citations?user={{ site.scholar_userid }}" target="_blank" rel="noopener noreferrer">Google Scholar</a></strong>
        mirrors the complete list. Below, everything is shown <strong>newest first</strong>. Use the topic chips to narrow the list (OR logic when several are on). Assign <code>topic</code> or comma-separated <code>topics</code> in <code>_bibliography/papers.bib</code>.
      </p>
    </div>
  </div>

  <div
    class="pub-filter-bar"
    role="group"
    aria-label="Filter by research topic"
  >
    <button
      type="button"
      class="pub-filter-chip pub-filter-chip--all is-active"
      data-pub-filter-topic="all"
      aria-pressed="true"
    >
      All papers
    </button>
    {% for theme in site.data.publication_themes %}
    <button
      type="button"
      class="pub-filter-chip"
      data-pub-filter-topic="{{ theme.slug }}"
      aria-pressed="false"
      style="--chip-gradient: linear-gradient({{ theme.gradient }})"
    >
      <span class="pub-filter-chip__icon" aria-hidden="true">{{ theme.icon }}</span>
      <span class="pub-filter-chip__label">{{ theme.filter_label }}</span>
    </button>
    {% endfor %}
  </div>

  <p class="pub-filter-meta text-muted small mb-3">
    <span data-pub-filter-status>Loading…</span>
  </p>

  <div class="publications" id="pub-filter-list">
    {% bibliography -f papers -q @* --sort_by year --order descending %}
  </div>

</div>

<script>
(function () {
  var hub = document.querySelector(".pub-hub");
  var root = document.getElementById("pub-filter-list");
  if (!hub || !root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll(":scope > ol.bibliography > li"));
  if (!items.length) {
    items = Array.prototype.slice.call(root.querySelectorAll("ol.bibliography > li"));
  }
  var chips = hub.querySelectorAll("[data-pub-filter-topic]");
  var statusEl = hub.querySelector("[data-pub-filter-status]");
  var active = {};

  function hasActiveFilter() {
    return Object.keys(active).length > 0;
  }

  function parseTopics(li) {
    var inner = li.querySelector(".pub-bib-entry");
    var raw = inner ? inner.getAttribute("data-topics") || "" : "";
    return raw.split(/\s+/).filter(Boolean);
  }

  function liMatches(li) {
    if (!hasActiveFilter()) return true;
    var tags = parseTopics(li);
    if (!tags.length) return false;
    for (var i = 0; i < tags.length; i++) {
      if (active[tags[i]]) return true;
    }
    return false;
  }

  function syncChips() {
    var allOn = !hasActiveFilter();
    chips.forEach(function (chip) {
      var t = chip.getAttribute("data-pub-filter-topic");
      var on = t === "all" ? allOn : !!active[t];
      chip.classList.toggle("is-active", on);
      chip.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function applyFilter() {
    var n = 0;
    items.forEach(function (li) {
      var ok = liMatches(li);
      li.hidden = !ok;
      li.style.display = ok ? "" : "none";
      if (ok) n++;
    });
    if (statusEl) {
      statusEl.textContent =
        hasActiveFilter()
          ? "Showing " + n + " of " + items.length + " (newest first among matches)"
          : "Showing all " + items.length + " publications (newest first)";
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var t = chip.getAttribute("data-pub-filter-topic");
      if (t === "all") {
        active = {};
        syncChips();
        applyFilter();
        return;
      }
      if (active[t]) delete active[t];
      else active[t] = true;
      syncChips();
      applyFilter();
    });
  });

  syncChips();
  applyFilter();
})();
</script>
