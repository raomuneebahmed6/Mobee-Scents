/* Home page: hero animation, featured products, fragrance notes, benefits,
   brand story reveal, testimonials slider, newsletter. */

function initHero() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const bottleMount = document.getElementById("heroBottle");
  bottleMount.innerHTML = `<span class="hero-visual-breathe">${bottleSVG("facet", "#a3812c", "#e0c069")}</span>`;

  const titleEl = document.getElementById("heroTitle");
  const words = titleEl.textContent.trim().split(" ");
  titleEl.innerHTML = words
    .map((w) => `<span class="word"><span>${w}${w === words[words.length - 1] ? "" : "&nbsp;"}</span></span>`)
    .join("");

  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("is-ready")));

  // Mouse-follow parallax for the bottle
  const inner = document.getElementById("heroVisualInner");
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    inner.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
  });

  // Scroll parallax + fade
  window.addEventListener(
    "scroll",
    () => {
      const progress = Math.min(1, window.scrollY / hero.offsetHeight);
      const visual = document.getElementById("heroVisualWrap");
      visual.style.transform = `translateY(${progress * 140}px)`;
      document.getElementById("heroContent").style.opacity = String(1 - progress / 0.7);
    },
    { passive: true }
  );
}

function initFeaturedProducts() {
  const mount = document.getElementById("featuredGrid");
  if (mount) renderProductGrid(mount, PRODUCTS);
}

function initFragranceNotes() {
  const mount = document.getElementById("notesGrid");
  if (!mount) return;
  mount.innerHTML = FRAGRANCE_NOTES.map(
    (n, i) => `
    <a class="note-card reveal reveal-delay-${(i % 4) + 1}" href="shop.html?note=${encodeURIComponent(n.name)}">
      <span class="note-icon">${n.name[0]}${icon(n.icon)}</span>
      <span class="note-name">${n.name}</span>
      <span class="note-desc">${n.description}</span>
    </a>`
  ).join("");
  initReveal(mount);
}

function initBenefits() {
  const mount = document.getElementById("benefitsGrid");
  if (!mount) return;
  mount.innerHTML = BENEFITS.map(
    (b, i) => `
    <div class="benefit reveal reveal-delay-${(i % 3) + 1}">
      <span class="benefit-icon">${icon(b.icon)}</span>
      <div><h3>${b.title}</h3><p>${b.description}</p></div>
    </div>`
  ).join("");
  initReveal(mount);
}

function initBrandStory() {
  const visual = document.getElementById("storyImage");
  if (!visual) return;
  document.getElementById("storyBottle").innerHTML = bottleSVG("round", "#6b4a2f", "#c9a876");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visual.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  io.observe(visual);
}

function initTestimonials() {
  const slideEl = document.getElementById("testimonialSlide");
  const dotsEl = document.getElementById("testimonialDots");
  if (!slideEl) return;
  let index = 0;

  function render() {
    const t = TESTIMONIALS[index];
    slideEl.innerHTML = `
      <p class="testimonial-text">&ldquo;${t.review}&rdquo;</p>
      <div class="testimonial-meta">
        ${starsMarkup(t.rating)}
        <div class="testimonial-person">
          <span class="testimonial-avatar">${t.initials}</span>
          <div><p class="name">${t.name}</p><p class="loc">${t.location}</p></div>
        </div>
      </div>`;
    dotsEl.querySelectorAll("button").forEach((b, i) => b.classList.toggle("active", i === index));
  }

  dotsEl.innerHTML = TESTIMONIALS.map((_, i) => `<button aria-label="Go to testimonial ${i + 1}" data-i="${i}"></button>`).join("");
  dotsEl.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      index = Number(b.getAttribute("data-i"));
      render();
    });
  });
  document.getElementById("testimonialPrev").addEventListener("click", () => {
    index = (index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    render();
  });
  document.getElementById("testimonialNext").addEventListener("click", () => {
    index = (index + 1) % TESTIMONIALS.length;
    render();
  });
  render();
  setInterval(() => {
    index = (index + 1) % TESTIMONIALS.length;
    render();
  }, 7000);
}

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletterInput");
    const errorEl = document.getElementById("newsletterError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;
    document.getElementById("newsletterWrap").innerHTML = `
      <div class="newsletter-success">${icon("check")} You&rsquo;re on the list — welcome to Mobee Scents.</div>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initFeaturedProducts();
  initFragranceNotes();
  initBenefits();
  initBrandStory();
  initTestimonials();
  initNewsletter();
});
