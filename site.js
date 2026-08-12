(function initializeCrystalRoodSite() {
  "use strict";

  const content = window.CRYSTAL_ROOD_CONTENT || {
    siteProfile: window.siteProfile || {},
    projects: window.projects || [],
    recipes: window.recipes || [],
  };
  const profile = content.siteProfile || {};
  const projects = Array.isArray(content.projects) ? content.projects : [];
  const recipes = Array.isArray(content.recipes) ? content.recipes : [];
  const escapeHTML = (value = "") =>
    String(value).replace(
      /[&<>"]/g,
      (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character],
    );

  const safeURL = (value = "") => {
    const url = String(value).trim();
    if (!url || url === "#") return "";
    if (/^(https?:|mailto:|\/|\.\/|\.\.\/)/i.test(url)) return url;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith("//")) return url;
    return "";
  };

  const pluralize = (count, singular, plural = `${singular}s`) => `${count} ${count === 1 ? singular : plural}`;

  function recipeFacts(recipe) {
    const facts = [];
    if (recipe.timeLabel) facts.push(recipe.timeLabel);
    else if (recipe.totalMinutes) facts.push(`${recipe.totalMinutes} min`);
    if (recipe.yield) facts.push(recipe.yield);
    else if (recipe.servings) facts.push(`Serves ${recipe.servings}`);
    if (recipe.difficulty) facts.push(recipe.difficulty);
    return facts;
  }

  function directionParts(direction) {
    if (typeof direction === "string") return { heading: "", text: direction };
    return {
      heading: direction?.heading || "",
      text: direction?.text || "",
    };
  }

  function isGlutenFree(recipe) {
    return [...(recipe.dietary || []), ...(recipe.tags || [])].some(
      (label) => String(label).toLowerCase() === "gluten-free",
    );
  }
  function imageOrArtwork(item, className) {
    const image = safeURL(item.image);
    if (image) {
      return `<div class="${className} media--image"><img src="${escapeHTML(image)}" alt="${escapeHTML(item.imageAlt || "")}" width="900" height="650" /></div>`;
    }
    return "";
  }

  function projectCard(project, index) {
    const slug = encodeURIComponent(project.slug || project.id || "project");
    const status = project.status || "In progress";
    return `
      <article class="project-card">
        <a class="project-card__link" href="project.html?slug=${slug}" aria-label="Read about ${escapeHTML(project.title)}">
          ${imageOrArtwork(project, "project-card__media")}
          <div class="project-card__body">
            <div class="card-meta">
              <span>${escapeHTML(project.category || project.eyebrow || "Project")}</span>
              <span>${escapeHTML(status)}</span>
              ${project.placeholder ? "<span>Sample</span>" : ""}
            </div>
            <h3>${escapeHTML(project.title)}</h3>
            <p>${escapeHTML(project.summary)}</p>
            <span class="card-arrow">View project <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </article>`;
  }

  function recipeCard(recipe, index) {
    const slug = encodeURIComponent(recipe.slug || recipe.id || "recipe");
    return `
      <article class="recipe-card">
        <a class="recipe-card__link" href="recipe.html?slug=${slug}" aria-label="Open the recipe for ${escapeHTML(recipe.title)}">
          ${imageOrArtwork(recipe, "recipe-card__art")}
          <div class="recipe-card__body">
            <div class="card-meta">
              <span>${escapeHTML(recipe.category || "Recipe")}</span>
              ${isGlutenFree(recipe) ? '<span class="dietary-label">Gluten-free</span>' : ""}
              ${recipe.placeholder ? "<span>Sample</span>" : ""}
            </div>
            <h3>${escapeHTML(recipe.title)}</h3>
            <p>${escapeHTML(recipe.summary)}</p>
            ${recipeFacts(recipe).length ? `<div class="recipe-facts">${recipeFacts(recipe).map((fact) => `<span>${escapeHTML(fact)}</span>`).join("")}</div>` : ""}
          </div>
        </a>
      </article>`;
  }

  function homeRecipe(recipe) {
    const slug = encodeURIComponent(recipe.slug || recipe.id || "recipe");
    return `
      <a class="home-recipe" href="recipe.html?slug=${slug}" aria-label="Open the recipe for ${escapeHTML(recipe.title)}">
        <h3>${escapeHTML(recipe.title)}</h3>
      </a>`;
  }

  function renderHome() {
    const projectContainer = document.querySelector("[data-featured-projects]");
    const recipeContainer = document.querySelector("[data-featured-recipes]");
    const featuredProjects = projects.filter((item) => item.featured).slice(0, 2);
    const featuredRecipes = recipes.filter((item) => item.featured).slice(0, 3);

    if (projectContainer) {
      projectContainer.innerHTML = featuredProjects.length
        ? featuredProjects.map(projectCard).join("")
        : '<p class="empty-note">Your featured projects will appear here.</p>';
    }
    if (recipeContainer) {
      recipeContainer.innerHTML = featuredRecipes.length
        ? featuredRecipes.map(homeRecipe).join("")
        : '<p class="empty-note">Your featured recipes will appear here.</p>';
    }

  }

  function normalizeProjectStatus(status) {
    const normalized = String(status || "").trim().toLowerCase();
    if (normalized === "complete") return "completed";
    return normalized;
  }

  function normalizeRecipeCategory(category) {
    const normalized = String(category || "").trim().toLowerCase();
    if (["dinner", "lunch", "main", "mains"].includes(normalized)) return "main";
    return normalized;
  }

  function initializeArchive({ items, gridSelector, filterSelector, countSelector, totalSelector, card, normalize }) {
    const grid = document.querySelector(gridSelector);
    const filters = document.querySelector(filterSelector);
    const resultCount = document.querySelector(countSelector);
    const total = document.querySelector(totalSelector);
    if (!grid) return;

    const render = (filter = "all") => {
      const visibleItems = filter === "all" ? items : items.filter((item) => normalize(item.status || item.category) === filter);
      grid.innerHTML = visibleItems.length
        ? visibleItems.map((item) => card(item, items.indexOf(item))).join("")
        : '<p class="empty-note">Nothing is filed here yet. Try another filter.</p>';
      if (resultCount) resultCount.textContent = `${pluralize(visibleItems.length, "entry", "entries")} shown`;
    };

    if (total) total.textContent = String(items.length).padStart(2, "0");
    render();

    filters?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      filters.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      render(button.dataset.filter);
    });
  }

  function setPageMetadata(title, description, canonicalPath) {
    document.title = `${title} — Crystal Rood`;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.content = description;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `https://crystalrood.com/${canonicalPath}`;
  }

  function getSlug() {
    return new URLSearchParams(window.location.search).get("slug") || "";
  }

  function notFoundMarkup(type) {
    const archive = type === "project" ? "projects.html" : "recipes.html";
    return `<section class="not-found"><p class="eyebrow">Not found</p><h1>This ${type} isn’t on the shelf.</h1><p>It may have moved, or its link may need an update.</p><a class="button button--primary" href="${archive}">Back to ${type === "project" ? "projects" : "recipes"} <span aria-hidden="true">→</span></a></section>`;
  }

  function placeholderBanner(type) {
    return `<div class="placeholder-banner" role="note"><span><strong>Sample ${type}.</strong> This entry is fictional starter content.</span><span>Edit or replace it in <code>content.js</code>.</span></div>`;
  }

  function renderProjectDetail() {
    const container = document.querySelector("[data-project-detail]");
    if (!container) return;
    const project = projects.find((item) => item.slug === getSlug());
    if (!project) {
      container.innerHTML = notFoundMarkup("project");
      document.title = "Project not found — Crystal Rood";
      return;
    }

    const index = Math.max(projects.indexOf(project), 0);
    const tags = (project.tags || []).map((tag) => `<li>${escapeHTML(tag)}</li>`).join("");
    const notes = (project.notes || []).map((note) => `<li>${escapeHTML(note)}</li>`).join("");
    const usableLinks = (project.links || []).filter((link) => safeURL(link.url));
    const links = usableLinks
      .map((link) => `<a class="button button--quiet" href="${escapeHTML(safeURL(link.url))}">${escapeHTML(link.label)} <span aria-hidden="true">↗</span></a>`)
      .join("");

    setPageMetadata(project.title, project.summary || project.description, `project.html?slug=${encodeURIComponent(project.slug)}`);
    container.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="projects.html">Projects</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHTML(project.title)}</span></nav>
      ${project.placeholder ? placeholderBanner("project") : ""}
      <section class="detail-hero">
        <div>
          <div class="card-meta"><span>${escapeHTML(project.eyebrow || project.category || "Project")}</span><span>${escapeHTML(project.status || "")}</span></div>
          <h1>${escapeHTML(project.title)}</h1>
          <p class="detail-summary">${escapeHTML(project.summary)}</p>
          <dl class="detail-meta">
            <div><dt>Year</dt><dd>${escapeHTML(project.year || "—")}</dd></div>
            <div><dt>Category</dt><dd>${escapeHTML(project.category || "—")}</dd></div>
            <div><dt>Role</dt><dd>${escapeHTML(project.role || "—")}</dd></div>
          </dl>
        </div>
        ${imageOrArtwork(project, "detail-art")}
      </section>
      <section class="detail-content">
        <div class="detail-content__label"><p class="eyebrow">The project</p><h2>Context & notes</h2></div>
        <div class="prose">
          <p>${escapeHTML(project.description || project.summary)}</p>
          ${notes ? `<h3>What I’m keeping</h3><ul class="note-list">${notes}</ul>` : ""}
          ${tags ? `<ul class="tag-list" aria-label="Project tags">${tags}</ul>` : ""}
          ${links ? `<div class="button-row" style="margin-top: 32px">${links}</div>` : ""}
        </div>
      </section>`;
  }

  function addRecipeSchema(recipe) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: recipe.title,
      description: recipe.summary || recipe.description,
      author: { "@type": "Person", name: profile.name || "Crystal Rood" },
      recipeCategory: recipe.category,
      recipeIngredient: (recipe.ingredientGroups || []).flatMap((group) => group.items || []),
      recipeInstructions: (recipe.directions || []).map((direction) => {
        const parts = directionParts(direction);
        return {
          "@type": "HowToStep",
          ...(parts.heading ? { name: parts.heading } : {}),
          text: parts.text,
        };
      }),
    };
    if (recipe.publishedDate) schema.datePublished = recipe.publishedDate;
    if (Number.isFinite(recipe.prepMinutes)) schema.prepTime = `PT${recipe.prepMinutes}M`;
    if (Number.isFinite(recipe.cookMinutes)) schema.cookTime = `PT${recipe.cookMinutes}M`;
    if (Number.isFinite(recipe.totalMinutes)) schema.totalTime = `PT${recipe.totalMinutes}M`;
    if (recipe.yield) schema.recipeYield = recipe.yield;
    else if (recipe.servings) schema.recipeYield = `${recipe.servings} servings`;
    if (recipe.cuisine) schema.recipeCuisine = recipe.cuisine;
    const image = safeURL(recipe.image);
    if (image) schema.image = new URL(image, window.location.href).href;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.append(script);
  }

  function renderRecipeDetail() {
    const container = document.querySelector("[data-recipe-detail]");
    if (!container) return;
    const recipe = recipes.find((item) => item.slug === getSlug());
    if (!recipe) {
      container.innerHTML = notFoundMarkup("recipe");
      document.title = "Recipe not found — Crystal Rood";
      return;
    }

    const index = Math.max(recipes.indexOf(recipe), 0);
    const groups = (recipe.ingredientGroups || [])
      .map(
        (group) => `<section class="ingredient-group"><h3>${escapeHTML(group.heading || "Ingredients")}</h3><ul class="ingredient-list">${(group.items || [])
          .map((item) => `<li>${escapeHTML(item)}</li>`)
          .join("")}</ul></section>`,
      )
      .join("");
    const directions = (recipe.directions || [])
      .map((direction) => {
        const parts = directionParts(direction);
        return `<li>${parts.heading ? `<strong>${escapeHTML(parts.heading)}.</strong> ` : ""}${escapeHTML(parts.text)}</li>`;
      })
      .join("");
    const notes = (recipe.notes || []).map((note) => `<li>${escapeHTML(note)}</li>`).join("");
    const sourceURL = safeURL(recipe.source?.url);
    const source = recipe.source?.label
      ? `<p><strong>Source:</strong> ${sourceURL ? `<a href="${escapeHTML(sourceURL)}">${escapeHTML(recipe.source.label)}</a>` : escapeHTML(recipe.source.label)}</p>`
      : "";

    setPageMetadata(recipe.title, recipe.summary || recipe.description, `recipe.html?slug=${encodeURIComponent(recipe.slug)}`);
    addRecipeSchema(recipe);
    container.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="recipes.html">Recipes</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHTML(recipe.title)}</span></nav>
      ${recipe.placeholder ? placeholderBanner("recipe") : ""}
      <section class="detail-hero">
        <div>
          <div class="card-meta"><span>${escapeHTML(recipe.eyebrow || recipe.category || "Recipe")}</span>${isGlutenFree(recipe) ? '<span class="dietary-label">Gluten-free</span>' : ""}${recipe.difficulty ? `<span>${escapeHTML(recipe.difficulty)}</span>` : ""}</div>
          <h1>${escapeHTML(recipe.title)}</h1>
          <p class="detail-summary">${escapeHTML(recipe.summary)}</p>
          <dl class="detail-meta">
            ${recipe.timeLabel ? `<div><dt>Timing</dt><dd>${escapeHTML(recipe.timeLabel)}</dd></div>` : ""}
            ${recipe.yield ? `<div><dt>Yield</dt><dd>${escapeHTML(recipe.yield)}</dd></div>` : recipe.servings ? `<div><dt>Yield</dt><dd>Serves ${escapeHTML(recipe.servings)}</dd></div>` : ""}
            ${recipe.oven ? `<div><dt>Oven</dt><dd>${escapeHTML(recipe.oven)}</dd></div>` : ""}
          </dl>
        </div>
        ${imageOrArtwork(recipe, "detail-art")}
      </section>
      <section class="recipe-detail__layout">
        <aside class="ingredient-panel"><h2>Ingredients</h2>${groups || "<p>Add ingredients in content.js.</p>"}</aside>
        <div class="directions">
          <p class="eyebrow">Method</p><h2>Directions</h2>
          <ol class="directions-list">${directions}</ol>
          ${(notes || source) ? `<aside class="recipe-notes"><h3>Crystal’s notes</h3>${notes ? `<ul>${notes}</ul>` : ""}${source}</aside>` : ""}
        </div>
      </section>`;
  }

  function initializeMenu() {
    const header = document.querySelector("[data-site-header]");
    const button = document.querySelector(".menu-button");
    if (!header || !button) return;

    const close = () => {
      header.dataset.open = "false";
      button.setAttribute("aria-expanded", "false");
      const label = button.querySelector(".sr-only");
      if (label) label.textContent = "Open navigation";
    };

    button.addEventListener("click", () => {
      const willOpen = header.dataset.open !== "true";
      header.dataset.open = String(willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      const label = button.querySelector(".sr-only");
      if (label) label.textContent = willOpen ? "Close navigation" : "Open navigation";
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.dataset.open === "true") {
        close();
        button.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (header.dataset.open === "true" && !header.contains(event.target)) close();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) close();
    });
  }

  function applyProfileDetails() {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  initializeMenu();
  applyProfileDetails();

  switch (document.body.dataset.page) {
    case "home":
      renderHome();
      break;
    case "projects":
      initializeArchive({
        items: projects,
        gridSelector: "[data-project-grid]",
        filterSelector: "[data-project-filters]",
        countSelector: "[data-project-result-count]",
        totalSelector: "[data-project-count]",
        card: projectCard,
        normalize: normalizeProjectStatus,
      });
      break;
    case "recipes":
      initializeArchive({
        items: recipes,
        gridSelector: "[data-recipe-grid]",
        filterSelector: "[data-recipe-filters]",
        countSelector: "[data-recipe-result-count]",
        totalSelector: "[data-recipe-count]",
        card: recipeCard,
        normalize: normalizeRecipeCategory,
      });
      break;
    case "project-detail":
      renderProjectDetail();
      break;
    case "recipe-detail":
      renderRecipeDetail();
      break;
  }
})();
