// Renders the whole page using data from SHOP_CONFIG (config.js).
// Any new shop only needs to edit config.js — this file stays untouched.

const cart = []; // { id, name, price, qty }

document.addEventListener("DOMContentLoaded", () => {
    renderNavbar();
    renderHero();
    renderFeatures();
    renderMenu();
    renderMixBuilder();
    renderSignatureMix();
    renderAbout();
    renderFooter();
    renderCart();
});
// ---------- Helpers ----------
function whatsappLink(message = "") {
    const number = SHOP_CONFIG.contact.whatsapp;
    const text = encodeURIComponent(
        message || `Hi ${SHOP_CONFIG.shop.name}, I'd like to place an order.`
    );
    return `https://wa.me/${number}?text=${text}`;
}

function productEmoji(category) {
    const map = {
        mixes: "🍹",
        mojito: "🥤",
        milkshake: "🥛",
        "iced-coffee": "☕",
        fruits: "🍓",
        "hot-drinks": "☕",
    };
    return map[category] || "🥤";
}

// ---------- Navbar ----------
function renderNavbar() {
    const navbar = document.getElementById("navbar");

    navbar.innerHTML = `
        <div class="navbar__inner">

          <a href="#hero" class="navbar__logo">
    <span class="navbar__logo-icon">
        <img src="${SHOP_CONFIG.shop.logo}" alt="${SHOP_CONFIG.shop.name} logo" class="navbar__logo-img">
    </span>
    ${SHOP_CONFIG.shop.name}
</a>

            <div class="navbar__links" id="navbarLinks">

                <a href="#hero">Home</a>
                <a href="#menu">Menu</a>
                <a href="#build-your-mix">Build Your Mix</a>
                <a href="#about">About</a>
                <a href="#footer">Contact</a>

            </div>

            <div class="navbar__actions">

                <button
                    class="cart-btn"
                    id="cartOpen"
                    aria-label="Open cart"
                >
                    🛒
                    <span class="cart-btn__count" id="cartCount">0</span>
                </button>

                <a
                    href="#menu"
                    class="btn btn--primary"
                >
                    Order Now
                </a>

                <button
                    class="navbar__toggle"
                    id="navbarToggle"
                    aria-label="Open navigation"
                    aria-expanded="false"
                >
                    ☰
                </button>

            </div>

        </div>
    `;

    setupNavbar();
}

function setupNavbar() {
    const toggle = document.getElementById("navbarToggle");
    const links = document.getElementById("navbarLinks");

    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("active");

        toggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        toggle.textContent = isOpen ? "✕" : "☰";
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            links.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.textContent = "☰";
        });
    });
}

function whatsappIconSvg() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.84-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.22-8.2 4.53 0 8.21 3.68 8.21 8.2 0 4.53-3.68 8.22-8.21 8.22zm4.5-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"/>
  </svg>`;
}

// ---------- Hero ----------
let heroIndex = 0;
let heroInterval = null;

function renderHero() {
    const section = document.getElementById("hero");

    section.innerHTML = `
        <div class="hero__container">
            <div class="hero__content">
                <span class="hero__slogan" id="hero-slogan"></span>
                <h1 class="hero__title" id="hero-title"></h1>
                <p class="hero__description" id="hero-description"></p>

                <div class="hero__actions">
                    <a href="#menu" class="btn btn--primary hero__btn">View Menu</a>
                    <a href="#build-your-mix" class="btn btn--outline hero__btn">Build Your Mix</a>
                </div>
            </div>

            <div class="hero__image">
                <img src="" alt="${SHOP_CONFIG.shop.name}" class="hero__photo" id="hero-photo">
            </div>
        </div>
    `;

    updateHeroSlide(0, false);
    startHeroCycle();
}

function updateHeroSlide(index, animate = true) {
    const slide = SHOP_CONFIG.shop.heroSlides[index];
    const section = document.getElementById("hero");

    const slogan = document.getElementById("hero-slogan");
    const title = document.getElementById("hero-title");
    const desc = document.getElementById("hero-description");
    const photo = document.getElementById("hero-photo");
    const content = section.querySelector(".hero__content");
    const imageWrap = section.querySelector(".hero__image");

    const apply = () => {
        slogan.textContent = slide.slogan;
        title.textContent = slide.title;
        desc.textContent = slide.description;
        photo.src = slide.image;
        section.style.background = slide.bg;
    };

    if (!animate) {
        apply();
        return;
    }

    content.classList.add("hero__content--fade");
    imageWrap.classList.add("hero__image--fade");

    setTimeout(() => {
        apply();
        content.classList.remove("hero__content--fade");
        imageWrap.classList.remove("hero__image--fade");
    }, 350);
}

function startHeroCycle() {
    if (heroInterval) clearInterval(heroInterval);

    heroInterval = setInterval(() => {
        heroIndex = (heroIndex + 1) % SHOP_CONFIG.shop.heroSlides.length;
        updateHeroSlide(heroIndex);
    }, 5000);
}


function renderFeatures() {
    const section = document.getElementById("features");

    section.innerHTML = `
        <div class="container">

            <div class="features__grid">

                ${SHOP_CONFIG.heroFeatures
            .map(
                (feature) => `
                            <div class="feature-card">

                                <div class="feature-card__icon">
                                    ${feature.icon}
                                </div>

                                <div class="feature-card__content">
                                    <h3>
                                        ${feature.label}
                                    </h3>
                                </div>

                            </div>
                        `
            )
            .join("")}

            </div>

        </div>
    `;
}
// ---------- Menu ----------
function renderMenu() {
    const section = document.getElementById("menu");

    const categories = SHOP_CONFIG.categories.filter(
        (category) => category.id !== "fruits"
    );

    section.innerHTML = `
        <div class="container">

            <div class="section-header">
                <span class="section-eyebrow">
                    Our Menu
                </span>

                <h2 class="section-title">
                    Freshness in Every Cup
                </h2>

                <p class="section-description">
                    Explore our fresh juices, delicious mixes,
                    mojitos and more.
                </p>
            </div>

            <div class="menu-filters">

                ${categories
            .map(
                (category, index) => `
                            <button
                                class="menu-filter${index === 0 ? " active" : ""}"
                                data-category="${category.id}"
                            >
                                <span>${category.icon}</span>
                                ${category.name}
                            </button>
                        `
            )
            .join("")}

            </div>

            <div class="menu-grid" id="menuGrid">

                ${renderProductCards(
                SHOP_CONFIG.products.filter(
                    (product) => product.category === categories[0].id
                )
            )}

            </div>

        </div>
    `;

    setupMenuFilters();
}


function renderProductCards(products) {
    if (!products.length) {
        return `
            <div class="menu-empty">
                <span>🥤</span>
                <h3>No products found</h3>
                <p>Try another category.</p>
            </div>
        `;
    }

    return products
        .map(
            (product) => `
                <article class="product-card">

                    <div class="product-card__image">

                        ${product.bestSeller
                    ? `
                                    <span class="product-card__badge">
                                        Best Seller
                                    </span>
                                `
                    : ""
                }

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        >

                        <span
                            class="product-card__emoji"
                            style="display:none;"
                        >
                            ${productEmoji(product.category)}
                        </span>

                    </div>

                    <div class="product-card__body">

                        <h3 class="product-card__name">
                            ${product.name}
                        </h3>

                        <p class="product-card__desc">
                            ${product.description}
                        </p>

                        <div class="product-card__footer">

                            <span class="product-card__price">
                                ${product.price}
                                <small>EGP</small>
                            </span>

                            <button
                                class="btn btn--sm product-card__add"
                                data-product-id="${product.id}"
                            >
                                + Add
                            </button>

                        </div>

                    </div>

                </article>
            `
        )
        .join("");
}

function setupMenuFilters() {
    const filters = document.querySelectorAll(".menu-filter");
    const grid = document.getElementById("menuGrid");

    filters.forEach((filter) => {
        filter.addEventListener("click", (event) => {
            event.preventDefault();

            filters.forEach((item) => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const category = filter.dataset.category;

            const filteredProducts =
                category === "all"
                    ? SHOP_CONFIG.products
                    : SHOP_CONFIG.products.filter(
                        (product) =>
                            product.category === category
                    );

            grid.innerHTML =
                renderProductCards(filteredProducts);

            setupProductButtons();
        });
    });

    setupProductButtons();
}

function setupProductButtons() {
    const buttons = document.querySelectorAll(
        ".product-card__add"
    );

    buttons.forEach((button) => {
        button.addEventListener("click", () => {

            const productId =
                button.dataset.productId;

            addToCart(productId);
        });
    });
}


// ---------- Build Your Mix ----------
function renderMixBuilder() {
    const section = document.getElementById("build-your-mix");

    if (!SHOP_CONFIG.features.buildYourMix) {
        section.style.display = "none";
        return;
    }

    section.innerHTML = `
        <div class="container">

            <div class="section-header mix-builder__header">
                <span class="section-eyebrow">
                    Create Your Drink
                </span>

                <h2 class="section-title">
                    Build Your Mix
                </h2>

                <p class="section-description">
                    Choose your favorite fruits, pick your size,
                    and add the extras you love.
                </p>
            </div>


            <div class="mix-builder__inner">

                <!-- Steps -->
                <div class="mix-builder__steps">

                    <!-- Step 1 -->
                    <div class="mix-step">

                        <div class="mix-step__header">
                            <span class="mix-step__number">01</span>

                            <div>
                                <h3>Choose Your Fruits</h3>
                                <p>Select your favorite fruits.</p>
                            </div>
                        </div>

                        <div class="mix-fruits-grid">

                            ${SHOP_CONFIG.fruits
            .map(
                (fruit) => `
            <button
                type="button"
                class="mix-fruit"
                data-fruit-id="${fruit.id}"
            >
                <span class="mix-fruit__image">
                    <img
                        src="${fruit.image}"
                        alt="${fruit.name}"
                    >
                </span>

                <span class="mix-fruit__name">
                    ${fruit.name}
                </span>

                <span class="mix-fruit__price">
                    ${fruit.price} EGP
                </span>
            </button>
        `
            )
            .join("")}

                        </div>

                    </div>


                    <!-- Step 2 -->
                    <div class="mix-step">

                        <div class="mix-step__header">
                            <span class="mix-step__number">02</span>

                            <div>
                                <h3>Choose Your Size</h3>
                                <p>Pick the size that fits you.</p>
                            </div>
                        </div>

                        <div class="mix-sizes">

                            ${SHOP_CONFIG.sizes
            .map(
                (size, index) => `
                                        <button
                                            type="button"
                                            class="mix-size ${index === 0
                        ? "active"
                        : ""
                    }"
                                            data-size-id="${size.id}"
                                        >
                                            <span>
                                                ${size.name}
                                            </span>

                                            <small>
                                                ${size.priceModifier === 0
                        ? "Base price"
                        : `+${size.priceModifier} EGP`
                    }
                                            </small>
                                        </button>
                                    `
            )
            .join("")}

                        </div>

                    </div>


                    <!-- Step 3 -->
                    <div class="mix-step">

                        <div class="mix-step__header">
                            <span class="mix-step__number">03</span>

                            <div>
                                <h3>Add Extras</h3>
                                <p>Make your mix even better.</p>
                            </div>
                        </div>

                        <div class="mix-addons">

                            ${SHOP_CONFIG.addons
            .map(
                (addon) => `
                                        <label class="mix-addon">

                                            <input
                                                type="checkbox"
                                                data-addon-id="${addon.id}"
                                            >

                                            <span class="mix-addon__check">
                                                ✓
                                            </span>

                                            <span class="mix-addon__name">
                                                ${addon.name}
                                            </span>

                                            <span class="mix-addon__price">
                                                +${addon.price} EGP
                                            </span>

                                        </label>
                                    `
            )
            .join("")}

                        </div>

                    </div>

                </div>


                <!-- Summary -->
                <aside class="mix-summary">

                    <div class="mix-summary__top">
                        <span class="mix-summary__label">
                            Your Mix
                        </span>

                        <span class="mix-summary__icon">
                            <img src="${SHOP_CONFIG.shop.mixImage}"
                            >
                        </span>
                    </div>

                    <div
                        class="mix-summary__text"
                        id="mixSummaryText"
                    >
                        Choose at least one fruit
                    </div>

                    <div class="mix-summary__details">

                        <div>
                            <span>Size</span>
                            <strong id="mixSizeText">
                                Small
                            </strong>
                        </div>

                        <div>
                            <span>Extras</span>
                            <strong id="mixAddonsText">
                                None
                            </strong>
                        </div>

                    </div>

                    <div class="mix-summary__footer">

                        <div>
                            <span>Total</span>

                            <strong>
                                <span id="mixTotal">
                                    0
                                </span>
                                EGP
                            </strong>
                        </div>

                        <button
                            type="button"
                            class="btn btn--primary"
                            id="mixAddToCart"
                            disabled
                        >
                            Add to Cart
                        </button>

                    </div>

                </aside>

            </div>

        </div>
    `;

    setupMixBuilder();
}

function setupMixBuilder() {
    const selectedFruits = new Set();
    const selectedAddons = new Set();

    let selectedSize =
        SHOP_CONFIG.sizes[0]?.id || null;


    const fruitButtons =
        document.querySelectorAll(".mix-fruit");

    const sizeButtons =
        document.querySelectorAll(".mix-size");

    const addonInputs =
        document.querySelectorAll(
            ".mix-addon input"
        );

    const totalElement =
        document.getElementById("mixTotal");

    const summaryText =
        document.getElementById(
            "mixSummaryText"
        );

    const sizeText =
        document.getElementById(
            "mixSizeText"
        );

    const addonsText =
        document.getElementById(
            "mixAddonsText"
        );

    const addButton =
        document.getElementById(
            "mixAddToCart"
        );


    function updateMix() {

        const fruits = SHOP_CONFIG.fruits.filter(
            (fruit) =>
                selectedFruits.has(fruit.id)
        );

        const size = SHOP_CONFIG.sizes.find(
            (item) =>
                item.id === selectedSize
        );

        const addons = SHOP_CONFIG.addons.filter(
            (addon) =>
                selectedAddons.has(addon.id)
        );


        const fruitsTotal = fruits.reduce(
            (total, fruit) =>
                total + fruit.price,
            0
        );

        const sizeModifier =
            size?.priceModifier || 0;

        const addonsTotal = addons.reduce(
            (total, addon) =>
                total + addon.price,
            0
        );

        const total =
            fruitsTotal +
            sizeModifier +
            addonsTotal;


        /* Summary */

        if (fruits.length === 0) {

            summaryText.textContent =
                "Choose at least one fruit";

        } else {

            summaryText.textContent =
                fruits
                    .map((fruit) => fruit.name)
                    .join(" + ");
        }


        sizeText.textContent =
            size?.name || "Small";


        addonsText.textContent =
            addons.length
                ? addons
                    .map((addon) => addon.name)
                    .join(", ")
                : "None";


        totalElement.textContent =
            total;


        addButton.disabled =
            fruits.length === 0;
    }


    /* ---------- Fruits ---------- */

    fruitButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const fruitId =
                    button.dataset.fruitId;


                if (
                    selectedFruits.has(
                        fruitId
                    )
                ) {

                    selectedFruits.delete(
                        fruitId
                    );

                    button.classList.remove(
                        "selected"
                    );

                } else {

                    selectedFruits.add(
                        fruitId
                    );

                    button.classList.add(
                        "selected"
                    );
                }


                updateMix();
            }
        );
    });


    /* ---------- Sizes ---------- */

    sizeButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                sizeButtons.forEach(
                    (item) =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );

                selectedSize =
                    button.dataset.sizeId;

                updateMix();
            }
        );
    });


    /* ---------- Addons ---------- */

    addonInputs.forEach((input) => {

        input.addEventListener(
            "change",
            () => {

                const addonId =
                    input.dataset.addonId;


                if (input.checked) {

                    selectedAddons.add(
                        addonId
                    );

                } else {

                    selectedAddons.delete(
                        addonId
                    );
                }


                updateMix();
            }
        );
    });


    /* ---------- Add To Cart ---------- */

    addButton.addEventListener(
        "click",
        () => {

            if (
                selectedFruits.size === 0
            ) {
                return;
            }


            const fruits =
                SHOP_CONFIG.fruits.filter(
                    (fruit) =>
                        selectedFruits.has(
                            fruit.id
                        )
                );

            const size =
                SHOP_CONFIG.sizes.find(
                    (item) =>
                        item.id ===
                        selectedSize
                );

            const addons =
                SHOP_CONFIG.addons.filter(
                    (addon) =>
                        selectedAddons.has(
                            addon.id
                        )
                );


            const fruitsTotal =
                fruits.reduce(
                    (total, fruit) =>
                        total + fruit.price,
                    0
                );

            const sizeModifier =
                size?.priceModifier || 0;

            const addonsTotal =
                addons.reduce(
                    (total, addon) =>
                        total + addon.price,
                    0
                );


            const total =
                fruitsTotal +
                sizeModifier +
                addonsTotal;


            const mixProduct = {

                id:
                    `custom-mix-${Date.now()}`,

                name:
                    "Custom Mix",

                price:
                    total,

                qty: 1,

                description:
                    `${fruits
                        .map(
                            (fruit) =>
                                fruit.name
                        )
                        .join(" + ")} • ${size?.name
                    }${addons.length
                        ? ` • ${addons
                            .map(
                                (addon) =>
                                    addon.name
                            )
                            .join(
                                ", "
                            )}`
                        : ""
                    }`
            };


            cart.push(mixProduct);

            updateCartUI();

            document
                .getElementById("cartDrawer")
                .classList.add("open");

            /* Reset */

            selectedFruits.clear();
            selectedAddons.clear();

            fruitButtons.forEach(
                (button) =>
                    button.classList.remove(
                        "selected"
                    )
            );

            addonInputs.forEach(
                (input) =>
                    (input.checked = false)
            );

            updateMix();
        }
    );


    updateMix();
}


function renderSignatureMix() {
    const section = document.getElementById("signature-mix");
    const data = SHOP_CONFIG.signatureMix;
    const count = data.ingredients.length;

    section.innerHTML = `
        <div class="container signature-mix__container">

            <div class="signature-mix__text">
                <span class="signature-mix__eyebrow">${data.eyebrow}</span>
                <h2 class="signature-mix__title">${data.title}</h2>
                <p class="signature-mix__description">${data.description}</p>
            </div>

            <div class="signature-mix__orbit-wrap">

                <div class="signature-mix__glow"></div>

                <img
                    src="${'images/mix2.webp'}"
                    alt="${data.title}"
                    class="signature-mix__center-image"
                >

                <div class="signature-mix__orbit">
                    ${data.ingredients
            .map((ing, i) => {
                const angle = (360 / count) * i;
                return `
                                <div class="signature-mix__ingredient" style="--angle: ${angle}deg;">
                                    <div class="signature-mix__ingredient-inner">
                                        <span class="signature-mix__ingredient-emoji">${ing.emoji}</span>
                                        <span class="signature-mix__ingredient-name">${ing.name}</span>
                                    </div>
                                </div>
                            `;
            })
            .join("")}
                </div>

            </div>

        </div>
    `;
}


// ============================================
// ABOUT SECTION
// ============================================

function renderAbout() {

    const section =
        document.getElementById("about");

    if (!section) {
        console.error(
            "About section not found!"
        );
        return;
    }

    const about =
        SHOP_CONFIG.about;


    section.innerHTML = `

        <div class="container">

            <div class="about__inner">


                <!-- Image -->

                <div class="about__image-wrapper">

                    <div class="about__image">

                        <img
                            src="${about.image}"
                            alt="${about.title}"
                        >

                    </div>


                    <div class="about__badge">

                        <span class="about__badge-icon">
                            🌿
                        </span>

                        <div>

                            <strong>
                                100%
                            </strong>

                            <span>
                                Natural
                            </span>

                        </div>

                    </div>

                </div>


                <!-- Content -->

                <div class="about__content">

                    <span class="section-eyebrow">
                        ${about.eyebrow}
                    </span>


                    <h2 class="section-title">
                        ${about.title}
                    </h2>


                    <p class="about__description">
                        ${about.description}
                    </p>


                    <div class="about__points">

                        ${about.points
            .map(
                (point) => `

                                    <div class="about__point">

                                        <span class="about__point-icon">
                                            ✓
                                        </span>

                                        <span>
                                            ${point}
                                        </span>

                                    </div>

                                `
            )
            .join("")}

                    </div>


                    <a
                        href="#menu"
                        class="btn btn--primary about__button"
                    >

                        ${about.buttonText}

                        <span>
                            →
                        </span>

                    </a>

                </div>

            </div>

        </div>

    `;
}

// ---------- Footer ----------
function renderFooter() {
    const section = document.getElementById("footer");

    if (!section) {
        console.error("Footer section not found!");
        return;
    }

    const shop = SHOP_CONFIG.shop;
    const contact = SHOP_CONFIG.contact;

    section.innerHTML = `

        <div class="footer__container">

            <!-- Footer Top -->
            <div class="footer__top">

                <!-- Brand -->
                <div class="footer__brand">

                    

 <a href="#hero" class="navbar__logo">
    <span class="navbar__logo-icon">
        <img src="${SHOP_CONFIG.shop.logo}" alt="${SHOP_CONFIG.shop.name} logo" class="navbar__logo-img">
    </span>
   


                        <span class="footer__brand-name"  style='color:white'>
                            ${shop.name}
                        </span>

                    </a>

                    <p class="footer__brand-text">
                        ${shop.tagline}
                    </p>

                    <p class="footer__brand-description">
                        Fresh juices and delicious mixes made
                        from carefully selected natural fruits.
                    </p>

                </div>


                <!-- Navigation -->
                <div class="footer__group">

                    <h3 class="footer__title">
                        Explore
                    </h3>

                    <nav class="footer__links">

                        <a href="#hero">
                            Home
                        </a>

                        <a href="#menu">
                            Our Menu
                        </a>

                        <a href="#build-your-mix">
                            Build Your Mix
                        </a>

                        <a href="#about">
                            About Us
                        </a>

                    </nav>

                </div>


                <!-- Contact -->
                <div class="footer__group">

                    <h3 class="footer__title">
                        Contact
                    </h3>

                    <div class="footer__contact">

                        <div class="footer__contact-item">

                            <span class="footer__contact-label">
                                WhatsApp
                            </span>

                            <a
                                href="${whatsappLink()}"
                                target="_blank"
                                rel="noopener"
                            >
                                Chat With Us
                            </a>

                        </div>


                        <div class="footer__contact-item">

                            <span class="footer__contact-label">
                                Location
                            </span>

                            <span>
                                ${contact.location}
                            </span>

                        </div>


                        <div class="footer__contact-item">

                            <span class="footer__contact-label">
                                Opening Hours
                            </span>

                            <span>
                                ${contact.hours.from}
                                — 
                                ${contact.hours.to}
                            </span>

                        </div>

                    </div>

                </div>


                <!-- Social / Order -->
                <div class="footer__group footer__group--last">

                    <h3 class="footer__title">
                        Follow Us
                    </h3>

                    <div class="footer__social">

                        ${contact.instagram
            ? `
                                    <a
                                        href="https://instagram.com/${contact.instagram}"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Instagram
                                    </a>
                                `
            : ""
        }

                        ${contact.facebook
            ? `
                                    <a
                                        href="${contact.facebook}"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Facebook
                                    </a>
                                `
            : ""
        }

                    </div>


                    <a
                        href="${whatsappLink()}"
                        target="_blank"
                        rel="noopener"
                        class="footer__order"
                    >
                        <span>
                            Order via WhatsApp
                        </span>

                        <span>
                            →
                        </span>
                    </a>

                </div>

            </div>


            <!-- Footer Bottom -->
            <div class="footer__bottom">

                <p>
                    © ${new Date().getFullYear()}
                    ${shop.name}
                </p>

                <p>
                    Fresh. Natural. Refreshing.
                </p>

            </div>

        </div>

    `;
}


// ---------- Cart ----------
function renderCart() {
    const cartDrawer = document.getElementById("cartDrawer");

    if (!cartDrawer) return;

    updateCartUI();
    setupCartDrawer();
}

function setupCartDrawer() {
    const cartOpen = document.getElementById("cartOpen");
    const cartClose = document.getElementById("cartClose");
    const cartDrawer = document.getElementById("cartDrawer");

    if (!cartDrawer) return;

    // Open cart from navbar
    if (cartOpen) {
        cartOpen.addEventListener("click", () => {
            cartDrawer.classList.add("open");
        });
    }

    // Close cart
    if (cartClose) {
        cartClose.addEventListener("click", () => {
            cartDrawer.classList.remove("open");
        });
    }
}


// ---------- Cart ----------

function renderCart() {
    const cartDrawer = document.getElementById("cartDrawer");

    if (!cartDrawer) {
        console.error("Cart drawer not found!");
        return;
    }

    setupCartDrawer();
    updateCartUI();
}


// ---------- Cart Drawer Controls ----------

function setupCartDrawer() {

    const cartOpen =
        document.getElementById("cartOpen");

    const cartClose =
        document.getElementById("cartClose");

    const cartDrawer =
        document.getElementById("cartDrawer");


    if (!cartDrawer) return;


    // Open cart
    if (cartOpen) {

        cartOpen.addEventListener("click", () => {

            cartDrawer.classList.add("open");

        });

    }


    // Close cart
    if (cartClose) {

        cartClose.addEventListener("click", () => {

            cartDrawer.classList.remove("open");

        });

    }

}


// ---------- Add Product To Cart ----------

function addToCart(productId) {

    const product =
        SHOP_CONFIG.products.find(
            (item) => item.id === productId
        );


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;

    }


    const existing =
        cart.find(
            (item) =>
                item.id === product.id
        );


    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            qty: 1,

            description:
                product.description || ""

        });

    }


    updateCartUI();


    // Open cart automatically
    const cartDrawer =
        document.getElementById(
            "cartDrawer"
        );

    if (cartDrawer) {

        cartDrawer.classList.add(
            "open"
        );

    }

}


// ---------- Change Quantity ----------

function changeQty(id, delta) {

    const item =
        cart.find(
            (item) =>
                item.id === id
        );


    if (!item) return;


    item.qty += delta;


    if (item.qty <= 0) {

        const index =
            cart.indexOf(item);

        if (index !== -1) {

            cart.splice(index, 1);

        }

    }


    updateCartUI();

}


// ---------- Update Cart ----------

function updateCartUI() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (!cartItems) {

        console.error(
            "cartItems element not found!"
        );

        return;

    }


    // Total items
    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        );


    // Total price
    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.qty,
            0
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }


    if (cartTotal) {

        cartTotal.textContent =
            total;

    }


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="cart-drawer__empty">

                <span class="cart-drawer__empty-icon">
                    🛒
                </span>

                <h4>
                    Your cart is empty
                </h4>

                <p>
                    Add something delicious from the menu.
                </p>

            </div>

        `;

    } else {

        // Render items
        cartItems.innerHTML =
            cart
                .map(
                    (item) => `

                        <div class="cart-item">

                            <div class="cart-item__info">

                                <h4 class="cart-item__name">
                                    ${item.name}
                                </h4>

                                ${item.description
                            ? `
                                            <p class="cart-item__description">
                                                ${item.description}
                                            </p>
                                        `
                            : ""
                        }

                                <span class="cart-item__price">
                                    ${item.price} EGP
                                </span>

                            </div>


                            <div class="cart-item__actions">

                                <button
                                    type="button"
                                    class="cart-item__decrease"
                                    data-id="${item.id}"
                                >
                                    −
                                </button>

                                <span class="cart-item__qty">
                                    ${item.qty}
                                </span>

                                <button
                                    type="button"
                                    class="cart-item__increase"
                                    data-id="${item.id}"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    `
                )
                .join("");


        // Increase
        cartItems
            .querySelectorAll(
                ".cart-item__increase"
            )
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    () => {

                        changeQty(
                            button.dataset.id,
                            1
                        );

                    }
                );

            });


        // Decrease
        cartItems
            .querySelectorAll(
                ".cart-item__decrease"
            )
            .forEach((button) => {

                button.addEventListener(
                    "click",
                    () => {

                        changeQty(
                            button.dataset.id,
                            -1
                        );

                    }
                );

            });

    }


    // ---------- WhatsApp ----------

    const checkout =
        document.getElementById(
            "cartCheckout"
        );


    if (!checkout) return;


    if (cart.length === 0) {

        checkout.href =
            whatsappLink();

        return;

    }


    const orderLines =
        cart
            .map(
                (item) =>
                    `${item.qty}x ${item.name} — ${item.price *
                    item.qty
                    } EGP`
            )
            .join("\n");


    const message =
        `Hi ${SHOP_CONFIG.shop.name}, I'd like to order:\n\n` +
        `${orderLines}\n\n` +
        `Total: ${total} EGP`;


    checkout.href =
        whatsappLink(message);

}