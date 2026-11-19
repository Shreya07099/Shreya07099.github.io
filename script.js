(function () {
  const site = window.SITE;
  if (!site) return;

  document.querySelectorAll("[data-bind]").forEach(function (el) {
    const key = el.getAttribute("data-bind");
    if (key === "year") {
      el.textContent = String(new Date().getFullYear());
      return;
    }
    if (site[key] != null) el.textContent = site[key];
  });

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

  function fillLinkList(list) {
    if (!list) return;
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
      list.appendChild(li);
    });
  }

  fillLinkList(document.getElementById("social-list"));
  fillLinkList(document.getElementById("footer-links"));

  function renderCards(targetId, items, extraClass) {
    const target = document.getElementById(targetId);
    if (!target || !items) return;
    items.forEach(function (project) {
      const article = document.createElement("article");
      article.className = extraClass || "project-card";

      const h3 = document.createElement("h3");
      h3.textContent = project.title;

      const p = document.createElement("p");
      p.textContent = project.blurb;

      const tags = document.createElement("ul");
      tags.className = "tags";
      (project.tags || []).forEach(function (tag) {
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
      target.appendChild(article);
    });
  }

  renderCards("project-grid", site.projects, "project-card");
  renderCards("mini-grid", site.miniProjects, "project-card mini-card");

  const blogList = document.getElementById("blog-list");
  (site.blogPosts || []).forEach(function (post) {
    const card = document.createElement("article");
    card.className = "blog-card";

    const h3 = document.createElement("h3");
    const link = document.createElement("a");
    link.href = "#/blog/" + post.id;
    link.textContent = post.title;
    h3.appendChild(link);

    const meta = document.createElement("p");
    meta.className = "post-meta";
    meta.textContent = formatMeta(post);

    const excerpt = document.createElement("p");
    excerpt.textContent = post.excerpt || "";

    const read = document.createElement("a");
    read.className = "text-link";
    read.href = "#/blog/" + post.id;
    read.textContent = "Read post";

    card.append(h3, meta, excerpt, read);
    blogList.appendChild(card);
  });

  function wordCount(post) {
    let text = (post.title || "") + " " + (post.excerpt || "");
    (post.body || []).forEach(function (block) {
      if (block.text) text += " " + block.text;
      if (block.items) {
        block.items.forEach(function (item) {
          if (typeof item === "string") text += " " + item;
          else text += " " + (item.label || "") + " " + (item.text || "");
        });
      }
    });
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function readingTime(post) {
    const minutes = Math.max(1, Math.round(wordCount(post) / 230));
    return minutes + " min read";
  }

  function formatMeta(post) {
    const parts = [];
    if (post.author) parts.push("by " + post.author);
    if (post.date) parts.push(post.date);
    parts.push(readingTime(post));
    return parts.join(" · ");
  }

  function renderPost(post) {
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-meta").textContent = formatMeta(post);
    const body = document.getElementById("post-body");
    body.replaceChildren();

    post.body.forEach(function (block) {
      if (block.type === "h2" || block.type === "h3" || block.type === "h4") {
        const el = document.createElement(block.type);
        el.textContent = block.text;
        body.appendChild(el);
        return;
      }
      if (block.type === "p") {
        const p = document.createElement("p");
        p.textContent = block.text;
        body.appendChild(p);
        return;
      }
      if (block.type === "ol" || block.type === "ul") {
        const list = document.createElement(block.type);
        block.items.forEach(function (item) {
          const li = document.createElement("li");
          li.textContent = item;
          list.appendChild(li);
        });
        body.appendChild(list);
        return;
      }
      if (block.type === "levels") {
        const dl = document.createElement("dl");
        dl.className = "level-list";
        block.items.forEach(function (item) {
          const dt = document.createElement("dt");
          dt.textContent = item.label;
          const dd = document.createElement("dd");
          dd.textContent = item.text;
          dl.append(dt, dd);
        });
        body.appendChild(dl);
      }
    });
  }

  function parseRoute() {
    var hash = location.hash || "#/";
    var legacy = {
      "#about": "#/",
      "#work": "#/projects",
      "#mini": "#/mini",
      "#contact": "#/contact",
      "#top": "#/",
    };
    if (legacy[hash]) {
      location.hash = legacy[hash];
      return parseRoute();
    }
    var path = hash.replace(/^#/, "");
    if (path.charAt(0) !== "/") path = "/" + path;
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return { page: "home" };
    if (parts[0] === "blog" && parts[1]) return { page: "post", id: parts[1] };
    if (parts[0] === "blog") return { page: "blog" };
    if (parts[0] === "projects") return { page: "projects" };
    if (parts[0] === "mini") return { page: "mini" };
    if (parts[0] === "contact") return { page: "contact" };
    return { page: "home" };
  }

  const pages = {
    home: document.getElementById("page-home"),
    blog: document.getElementById("page-blog"),
    post: document.getElementById("page-post"),
    projects: document.getElementById("page-projects"),
    mini: document.getElementById("page-mini"),
    contact: document.getElementById("page-contact"),
  };

  function showPage(name) {
    Object.keys(pages).forEach(function (key) {
      const visible = key === name;
      pages[key].classList.toggle("is-visible", visible);
      pages[key].hidden = !visible;
    });
    window.scrollTo(0, 0);
  }

  function route() {
    const parsed = parseRoute();
    const nav = document.getElementById("site-nav");
    nav.querySelectorAll("[data-nav]").forEach(function (link) {
      const key = link.getAttribute("data-nav");
      const active =
        key === parsed.page || (parsed.page === "post" && key === "blog");
      link.classList.toggle("is-active", active);
    });

    if (parsed.page === "post") {
      const post = (site.blogPosts || []).find(function (item) {
        return item.id === parsed.id;
      });
      if (!post) {
        location.hash = "#/blog";
        return;
      }
      renderPost(post);
      document.title = post.title + " | " + site.name;
      showPage("post");
      return;
    }

    const titles = {
      home: site.name,
      blog: "Blog | " + site.name,
      projects: "Projects | " + site.name,
      mini: "Mini projects | " + site.name,
      contact: "Contact | " + site.name,
    };
    document.title = titles[parsed.page] || site.name;
    showPage(parsed.page);
  }

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

  const aboutCta = document.getElementById("about-cta");
  if (aboutCta) {
    aboutCta.addEventListener("click", function (event) {
      event.preventDefault();
      location.hash = "#/";
      const about = document.getElementById("about");
      if (about) about.scrollIntoView();
    });
  }

  window.addEventListener("hashchange", route);
  route();
})();
