function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  document.getElementById("contactWhatsapp").href = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  document.getElementById("contactEmail").textContent = SITE_CONFIG.email;
  document.getElementById("contactPhone").textContent = SITE_CONFIG.phone;
  document.getElementById("contactAddress").textContent = SITE_CONFIG.address;
  document.getElementById("contactHours").textContent = SITE_CONFIG.hours;
  document.getElementById("contactInstagram").href = SITE_CONFIG.social.instagram;
  document.getElementById("contactFacebook").href = SITE_CONFIG.social.facebook;
  document.getElementById("contactTwitter").href = SITE_CONFIG.social.twitter;

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
      <div class="form-success">
        <span class="icon-circle">${icon("check")}</span>
        <h3>Message sent</h3>
        <p>Thank you for reaching out. Our team will get back to you within one business day.</p>
        <button id="contactAnother">Send another message</button>
      </div>`;
    document.getElementById("contactAnother").addEventListener("click", () => window.location.reload());
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);
