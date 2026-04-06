const sections = document.querySelectorAll("section[id]");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
const allNavLinks = document.querySelectorAll(".nav a, .mobile-nav a");

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function setActiveLink() {
  if (!sections.length) return;

  let currentSection = "";
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.getAttribute("id");
    }
  });

  allNavLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function openMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.add("open");
  menuToggle.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function toggleMenu() {
  if (!mobileMenu) return;

  if (mobileMenu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    closeMenu();
  }
  setActiveLink();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu?.classList.contains("open")) {
    closeMenu();
  }
});

/* MAP CONSENT */
const acceptMapButton = document.getElementById("accept-map");

function loadGoogleMap() {
  const mapConsentBox = document.getElementById("map-consent");
  if (!mapConsentBox) return;

  const mapSrc = mapConsentBox.dataset.mapSrc;

  const iframe = document.createElement("iframe");
  iframe.className = "contact-map";
  iframe.src = mapSrc;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;
  iframe.title = "Lokacija salona na zemljevidu";

  mapConsentBox.replaceWith(iframe);
}

if (
  document.getElementById("map-consent") &&
  localStorage.getItem("simona_map_consent") === "accepted"
) {
  loadGoogleMap();
}

if (acceptMapButton) {
  acceptMapButton.addEventListener("click", () => {
    localStorage.setItem("simona_map_consent", "accepted");
    loadGoogleMap();
  });
}