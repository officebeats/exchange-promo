/**
 * Lumina Facility Care — Controller
 */

const LUMINA_SERVICES = [
  {
    category: "Core Operations",
    items: [
      "High-Rise Exterior Restoration",
      "Medical/Lab Sterilization",
      "Critical Server Room Maintenance",
      "Industrial Floor Coatings",
      "Commercial HVAC Sanitation",
    ],
  },
  {
    category: "Specialized Precision",
    items: [
      "Luxury Penthouse Concierge Cleaning",
      "Bio-Guardian Air Purification",
      "Botanical Atrium Maintenance",
      "Post-Construction Detail",
      "Executive Suite Preservation",
    ],
  },
];

function initLumina() {
  const servicesRows = document.getElementById("servicesRows");
  const searchInput = document.getElementById("serviceSearch");
  const searchClear = document.getElementById("searchClear");
  const themeToggle = document.getElementById("themeToggle");
  const toggleSound = document.getElementById("toggleSound");
  const preloader = document.getElementById("preloader");

  // Render Services
  function renderServices() {
    servicesRows.innerHTML = "";
    LUMINA_SERVICES.forEach((group) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "services-group";
      groupDiv.innerHTML = `
        <span class="group-title">${group.category}</span>
        <div class="pills-grid">
          ${group.items.map((item) => `<div class="pill" data-service="${item.toLowerCase()}">${item}</div>`).join("")}
        </div>
      `;
      servicesRows.appendChild(groupDiv);
    });
  }

  // Filtering Logic
  function filterServices(query) {
    const q = query.toLowerCase().trim();
    const groups = document.querySelectorAll(".services-group");
    let totalItemsFound = 0;

    groups.forEach((group) => {
      const pills = group.querySelectorAll(".pill");
      let itemsInGroupFound = 0;

      pills.forEach((pill) => {
        const text = pill.getAttribute("data-service");
        if (q === "" || text.includes(q)) {
          pill.classList.remove("pill--hidden");
          itemsInGroupFound++;
          totalItemsFound++;
          if (q !== "") {
            pill.classList.add("pill--highlight");
          } else {
            pill.classList.remove("pill--highlight");
          }
        } else {
          pill.classList.add("pill--hidden");
          pill.classList.remove("pill--highlight");
        }
      });

      // Hide category if empty
      group.style.display = itemsInGroupFound > 0 ? "flex" : "none";
    });

    searchClear.style.display = q.length > 0 ? "block" : "none";
  }

  // Event Listeners
  searchInput.addEventListener("input", (e) => filterServices(e.target.value));

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    filterServices("");
    searchInput.focus();
  });

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const target = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", target);

    // SFX
    if (toggleSound) {
      toggleSound.currentTime = 0;
      toggleSound.play().catch(() => {});
    }
  });

  // Preloader clear
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    }, 1000);
  });

  renderServices();
}

document.addEventListener("DOMContentLoaded", initLumina);
