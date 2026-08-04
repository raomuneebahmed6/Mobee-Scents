function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  document.getElementById("contactWhatsapp").href = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  document.getElementById("contactWhatsappText").textContent = SITE_CONFIG.phone;
  document.getElementById("contactEmailLink").href = `mailto:${SITE_CONFIG.email}`;
  document.getElementById("contactEmail").textContent = SITE_CONFIG.email;
  document.getElementById("contactAddress").textContent = SITE_CONFIG.address;
  document.getElementById("contactHours").textContent = SITE_CONFIG.hours;
  document.getElementById("contactInstagram").href = SITE_CONFIG.social.instagram;
  document.getElementById("contactFacebook").href = SITE_CONFIG.social.facebook;

  function setError(field, message) {
    const el = document.getElementById(`err-${field}`);
    if (el) {
      el.textContent = message || "";
      el.hidden = !message;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const subject = document.getElementById("cf-subject").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    let valid = true;
    setError("name", "");
    setError("email", "");
    setError("subject", "");
    setError("message", "");

    if (!name) {
      setError("name", "Please enter your name.");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", "Please enter a valid email.");
      valid = false;
    }
    if (!subject) {
      setError("subject", "Please add a subject.");
      valid = false;
    }
    if (message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      valid = false;
    }
    if (!valid) return;

    document.getElementById("contactFormWrap").innerHTML = `
      <div class="form-success" style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start;background:var(--gold-soft);border-radius:16px;padding:2rem;">
        <span style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:999px;background:rgba(179,146,79,.25);color:var(--teal);">${icon("check")}</span>
        <h3 style="font-family:var(--display);font-size:1.25rem;">Message sent</h3>
        <p style="font-size:.9rem;color:var(--muted);">Thank you for reaching out. Our team will get back to you within one business day.</p>
        <button id="contactAnother" style="margin-top:.25rem;border-bottom:1px solid var(--ink);padding-bottom:2px;font-size:.9rem;">Send another message</button>
      </div>`;
    document.getElementById("contactAnother").addEventListener("click", () => window.location.reload());
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);
