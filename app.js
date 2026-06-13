const categories = [
  {
    id: "all",
    label: "All Work"
  },
  {
    id: "restaurant",
    label: "Restaurants",
    heading: "Restaurant Branding",
    kicker: "Hospitality",
    description:
      "Creative restaurant identity boards ranging from bold signage logos to calm, upscale bistro systems with packaging and menu mockups."
  },
  {
    id: "bakery",
    label: "Bakery",
    heading: "Bakery Branding",
    kicker: "Food Retail",
    description:
      "Warm bakery concepts designed to feel inviting, crafted, and shelf-ready across bread bags, pastry boxes, and neighborhood storefronts."
  },
  {
    id: "salon",
    label: "Salon",
    heading: "Salon Branding",
    kicker: "Beauty",
    description:
      "Refined salon and beauty logo collections with premium type, product styling, and polished client-facing presentation boards."
  },
  {
    id: "product-brands",
    label: "Consumer Brands",
    heading: "Consumer Brand Identity",
    kicker: "Retail & Lifestyle",
    description:
      "Diverse identity concepts created for packaging-led brands across beauty, wellness, retail, lifestyle, and everyday consumer goods."
  }
];

const portfolioItems = [
  {
    id: "restaurant-signature",
    category: "restaurant",
    title: "Restaurant Identity Sampler",
    style: "Multi-style logo board",
    image: "./assets/gallery/restaurant-logo-samples.png",
    alt: "Restaurant portfolio board featuring multiple fictional restaurant logo concepts in polished branding mockups.",
    description:
      "A broad restaurant showcase designed to demonstrate range across fine dining, casual concepts, grills, and bistro-style identities.",
    tags: ["Restaurant logos", "Menu styling", "Takeaway packaging"]
  },
  {
    id: "restaurant-creative-01",
    category: "restaurant",
    title: "Creative Signage Collection I",
    style: "Bold 3D signage",
    image: "./assets/gallery/restaurant-creative-portfolio-01.png",
    alt: "Creative restaurant portfolio board with bold 3D signage-style restaurant logo concepts.",
    description:
      "A high-impact set of restaurant marks built around dimensional signage, flame motifs, and statement typography for client presentations.",
    tags: ["3D signage", "Hospitality branding", "Statement type"]
  },
  {
    id: "restaurant-creative-02",
    category: "restaurant",
    title: "Creative Signage Collection II",
    style: "Metallic wall mockups",
    image: "./assets/gallery/restaurant-creative-portfolio-02.png",
    alt: "Second creative restaurant portfolio board with metallic and polished wall signage mockups.",
    description:
      "A companion restaurant set focused on darker luxury mockups, metallic finishes, and original fictional brand names with a premium feel.",
    tags: ["Premium signage", "Mockup presentation", "Creative concepts"]
  },
  {
    id: "restaurant-bistro",
    category: "restaurant",
    title: "Minimal Bistro Collection",
    style: "Soft editorial system",
    image: "./assets/gallery/restaurant-minimal-bistro-portfolio-03.png",
    alt: "Minimal bistro branding board with soft pastel logo concepts, menus, cups, and packaging.",
    description:
      "A cleaner direction for cafes and bistros, pairing simplified symbols with soft palettes and contemporary packaging mockups.",
    tags: ["Bistro branding", "Packaging", "Minimal identity"]
  },
  {
    id: "bakery-core",
    category: "bakery",
    title: "Bakery Brand Concepts",
    style: "Warm retail branding",
    image: "./assets/gallery/bakery-logo-samples.png",
    alt: "Bakery branding board showing multiple fictional bakery logo concepts on packaging and storefront mockups.",
    description:
      "An artisan bakery collection featuring inviting marks suited for pastry boxes, coffee cups, bread sleeves, and neighborhood signage.",
    tags: ["Bakery logos", "Artisan feel", "Packaging mockups"]
  },
  {
    id: "salon-core",
    category: "salon",
    title: "Salon Identity Collection",
    style: "Luxury beauty branding",
    image: "./assets/gallery/salon-logo-samples.png",
    alt: "Hair salon and beauty branding board with premium logo concepts and product mockups.",
    description:
      "A polished beauty-focused portfolio board using elevated typography, premium product styling, and upscale storefront treatment.",
    tags: ["Salon logos", "Beauty products", "Luxury presentation"]
  },
  {
    id: "product-brands-01",
    category: "product-brands",
    title: "Product Branding Collection I",
    style: "Luxury and lifestyle packaging",
    image: "./assets/gallery/product-logo-portfolio-01.png",
    alt: "Product branding portfolio board featuring diverse fictional consumer product logos and packaging mockups.",
    description:
      "A varied product-branding board spanning skincare, candles, beverages, wellness, eco goods, and fashion-led packaging directions.",
    tags: ["Product logos", "Packaging systems", "Consumer branding"]
  },
  {
    id: "product-brands-03",
    category: "product-brands",
    title: "Product Branding Collection II",
    style: "Retail and specialty goods",
    image: "./assets/gallery/product-logo-portfolio-03.png",
    alt: "Second product branding portfolio board featuring fictional specialty consumer brands on packaging mockups.",
    description:
      "A second product-focused showcase with broader packaging concepts for tea, pet care, fragrance, toys, cleaning goods, and more.",
    tags: ["Retail products", "Packaging mockups", "Brand variety"]
  }
];

const filterGroup = document.getElementById("filter-group");
const collection = document.getElementById("collection");
const statGrid = document.getElementById("stat-grid");
const sectionTemplate = document.getElementById("section-template");
const cardTemplate = document.getElementById("card-template");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxTags = document.getElementById("lightbox-tags");

let activeCategory = "all";

renderStats();
renderFilters();
renderCollection();
setupRevealObserver();

function renderStats() {
  const stats = [
    { value: portfolioItems.length, label: "Portfolio boards" },
    ...categories
      .filter((category) => category.id !== "all")
      .map((category) => ({
        value: portfolioItems.filter((item) => item.category === category.id).length,
        label: `${category.label} sets`
      }))
  ];

  statGrid.innerHTML = "";

  stats.forEach((stat) => {
    const card = document.createElement("article");
    card.className = "stat-card";
    card.innerHTML = `
      <p class="stat-value">${stat.value}</p>
      <p class="stat-label">${stat.label}</p>
    `;
    statGrid.append(card);
  });
}

function renderFilters() {
  filterGroup.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `filter-pill${category.id === activeCategory ? " is-active" : ""}`;
    button.type = "button";
    button.textContent = category.label;
    button.setAttribute("aria-pressed", String(category.id === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category.id;
      renderFilters();
      renderCollection();
    });
    filterGroup.append(button);
  });
}

function renderCollection() {
  collection.innerHTML = "";

  const visibleCategories = activeCategory === "all" ? categories.filter((category) => category.id !== "all") : categories.filter((category) => category.id === activeCategory);

  visibleCategories.forEach((category) => {
    const items = portfolioItems.filter((item) => item.category === category.id);
    if (!items.length) {
      return;
    }

    const section = sectionTemplate.content.firstElementChild.cloneNode(true);
    section.querySelector(".category-kicker").textContent = category.kicker;
    section.querySelector(".category-title").textContent = `${category.heading} (${items.length})`;
    section.querySelector(".category-description").textContent = category.description;

    const grid = section.querySelector(".card-grid");

    items.forEach((item) => {
      grid.append(renderCard(item, category.label));
    });

    collection.append(section);
  });

  setupRevealObserver();
}

function renderCard(item, categoryLabel) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  const trigger = card.querySelector(".card-media");
  const image = card.querySelector("img");

  image.src = item.image;
  image.alt = item.alt;
  card.querySelector(".card-category").textContent = categoryLabel;
  card.querySelector(".card-style").textContent = item.style;
  card.querySelector(".card-title").textContent = item.title;
  card.querySelector(".card-description").textContent = item.description;

  const tagRow = card.querySelector(".card-tags");
  item.tags.forEach((tagText) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagText;
    tagRow.append(tag);
  });

  trigger.addEventListener("click", () => openLightbox(item, categoryLabel));

  return card;
}

function openLightbox(item, categoryLabel) {
  lightboxImage.src = item.image;
  lightboxImage.alt = item.alt;
  lightboxCategory.textContent = categoryLabel;
  lightboxTitle.textContent = item.title;
  lightboxDescription.textContent = item.description;
  lightboxTags.innerHTML = "";

  item.tags.forEach((tagText) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagText;
    lightboxTags.append(tag);
  });

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
}

function setupRevealObserver() {
  const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!revealItems.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}
