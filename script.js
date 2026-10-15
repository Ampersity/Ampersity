// Ampersity launch-style studio website
// Contact form submissions are handled by Netlify Forms after deployment.
const AMPERSITY_EMAIL = "ampersity0@gmail.com";
// Add your WhatsApp number with country code, digits only (e.g. "919876543210").
// Leave empty to open WhatsApp's contact picker with the message pre-filled.
const AMPERSITY_WHATSAPP = "6207922651";
const WHATSAPP_MESSAGE = "Hi Ampersity! I'd like to talk about a website project.";

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const emailText = document.getElementById("emailText");
emailText.href = `mailto:${AMPERSITY_EMAIL}`;
emailText.textContent = AMPERSITY_EMAIL;

const whatsappNumber = AMPERSITY_WHATSAPP.replace(/\D/g, "");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll("#whatsappCta, #whatsappFloat").forEach((link) => {
  link.href = whatsappUrl;
});

const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  contactSubmit.disabled = true;
  formStatus.className = "form-status";
  formStatus.textContent = "Sending your enquiry…";

  try {
    const formData = new FormData(contactForm);
    const body = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") body.append(key, value);
    }

    const response = await fetch(contactForm.action || "/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    if (!response.ok) throw new Error(`Submission failed: ${response.status}`);

    contactForm.reset();
    formStatus.className = "form-status is-success";
    formStatus.textContent = "Thanks! Your enquiry has been submitted successfully. We'll be in touch soon.";
  } catch (error) {
    console.error("Ampersity contact form error:", error);
    formStatus.className = "form-status is-error";
    formStatus.textContent = `We couldn't submit your enquiry. Please try again or email ${AMPERSITY_EMAIL}.`;
  } finally {
    contactSubmit.disabled = false;
  }
});
