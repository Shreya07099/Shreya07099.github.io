(function () {
  const site = window.SITE;
  if (!site) return;

  document.title = site.name + " | Projects";

  document.querySelectorAll("[data-bind]").forEach(function (el) {
    const key = el.getAttribute("data-bind");
    if (key === "year") {
      el.textContent = String(new Date().getFullYear());
      return;
    }
    if (site[key] != null) el.textContent = site[key];
  });

  const emailLink = document.querySelector("[data-bind-email]");
  if (emailLink && site.email) {
    emailLink.href = "mailto:" + site.email;
    emailLink.textContent = site.email;
  }

  const aboutCopy = document.getElementById("about-copy");
  site.about.forEach(function (paragraph) {
    const p = document.createElement("p");
    p.textContent = paragraph;
    aboutCopy.appendChild(p);
  });

  const skillList = document.getElementById("skill-list");
  site.skills.forEach(function (skill) {
    const li = document.createElement("li");
    li.textContent = skill;
    skillList.appendChild(li);
  });

  const socialList = document.getElementById("social-list");
  site.socials.forEach(function (social) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = social.href;
    a.textContent = social.label;
    if (social.href.startsWith("http") || social.href.endsWith(".pdf")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    li.appendChild(a);
    socialList.appendChild(li);
  });

  const grid = document.getElementById("project-grid");
  site.projects.forEach(function (project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const h3 = document.createElement("h3");
    h3.textContent = project.title;

    const p = document.createElement("p");
    p.textContent = project.blurb;

    const tags = document.createElement("ul");
    tags.className = "tags";
    project.tags.forEach(function (tag) {
      const li = document.createElement("li");
      li.textContent = tag;
      tags.appendChild(li);
    });

    const links = document.createElement("div");
    links.className = "project-links";

    function addLink(href, label) {
      if (!href) return;
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      links.appendChild(a);
    }

    addLink(project.paperUrl, "Paper");
    addLink(project.liveUrl, "Live");
    addLink(project.repoUrl, "GitHub");

    article.append(h3, p, tags, links);
    grid.appendChild(article);
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const sectionIds = ["about", "work", "contact"];
  const navLinks = Array.from(nav.querySelectorAll("a"));

  function setActive() {
    let current = "";
    sectionIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    navLinks.forEach(function (link) {
      const match = link.getAttribute("href") === "#" + current;
      link.classList.toggle("is-active", match);
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
