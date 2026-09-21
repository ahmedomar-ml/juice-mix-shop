// ============================================
// SHOP CONFIG — edit THIS file only to rebrand
// the whole site for a new client/shop.
// ============================================

const SHOP_CONFIG = {

    // ---- Identity ----
    shop: {
        name: "المغفلق",
        slogan: "Fresh.. Natural.. Refreshing",
        logo: "images/logo.jpeg",
        heroImage: "assets/images/hero.png", // Recommended: transparent PNG, ~900x900px
        mixImage: 'images/OIP (5).webp',
        description:
            "We offer you a unique experience with fresh juices and mixes made from the finest natural fruits — 100% natural ingredients for a delicious, refreshing taste in every cup.",
        tagline: "Made from the finest fruits, prepared daily to give you the perfect taste.",

        heroSlides: [
            {
                slogan: "FRESH & NATURAL",
                title: "المغفلق",
                description: "عصائر طازة كل يوم، من غير أي إضافات صناعية.",
                image: "images/hero2-removebg-preview.png",
                bg: "#0B5D2A"
            }

        ]
    },

    signatureMix: {
        eyebrow: "OUR SIGNATURE",
        title: "Mix El Maghflak",
        description: "المزيج اللي اتشهر بيه المحل — فراولة وموز ومانجو ومكسرات وآيس كريم فانيليا، في تركيبة مفيش زيها.",
        image: "images/OIP (6).webp",
        ingredients: [
            { name: "Strawberry", emoji: "🍓" },
            { name: "Banana", emoji: "🍌" },
            { name: "Mango", emoji: "🥭" },
            { name: "Mixed Nuts", emoji: "🥜" },
            { name: "Vanilla Ice Cream", emoji: "🍦" },
        ],
    },

    about: {
        eyebrow: "About Us",

        title: "Freshness in Every Sip",

        description:
            "We believe great drinks start with great ingredients. We carefully select fresh fruits and prepare every drink daily to give you a delicious and refreshing taste.",

        image: "images/about.jpg",

        points: [
            "Fresh ingredients",
            "Prepared daily",
            "No artificial ingredients",
        ],

        buttonText: "Explore Our Menu",
    },

    heroFeatures: [
        { icon: "🌿", label: "100% Natural" },
        { icon: "🚫", label: "No Artificial Ingredients" },
        { icon: "⏱️", label: "Freshly Prepared" },
        { icon: "🚚", label: "Fast Delivery" },
    ],

    // ---- Brand Colors (used by css/variables.css) ----
    colors: {
        primary: "#f6b93b",   // warm gold/mango accent
        secondary: "#121212", // near-black background
        accent: "#e8453c",    // strawberry red
        text: "#ffffff",
        cream: "#f5f0e6",
    },

    // ---- Contact & Social ----
    contact: {
        whatsapp: "201131680817",
        facebook: "",
        instagram: "esaer_elmaghflak",
        location: "Qalyubia, Egypt",
        hours: {
            from: "10:00 AM",
            to: "2:00 AM",
        },
    },

    // ---- Feature toggles ----
    features: {
        buildYourMix: true,
        whatsappOrdering: true,
    },

    // ---- Categories (shown as quick nav / icons) ----
    categories: [
        { id: "mixes", name: "Shop Mixes", icon: "🍓", image: "assets/images/categories/mixes.jpg" },
        { id: "iced-coffee", name: "Iced Coffee", icon: "☕", image: "assets/images/categories/iced-coffee.jpg" },
        { id: "milkshake", name: "Milkshake", icon: "🥤", image: "assets/images/categories/milkshake.jpg" },
        { id: "mojito", name: "Mojito", icon: "🍹", image: "assets/images/categories/mojito.jpg" },
        { id: "hot-drinks", name: "Hot Drinks", icon: "☕", image: "assets/images/categories/hot-drinks.jpg" },
        { id: "fruits", name: "Fruits", icon: "🍉", image: "assets/images/categories/fruits.jpg" },
    ],

    // ---- Products ----
    // Each product can belong to one category (must match a category id above)
    products: [

        /* ================= MIXES — ميكسات المغفلق ================= */
        {
            id: "mix-signature",
            category: "mixes",
            name: "Signature Mix",
            description: "Strawberry - Banana - Mixed nuts - Mango - Vanilla ice cream",
            price: 65,
            image: "images/mix2.webp",
            bestSeller: true,
        },
        {
            id: "mix-mint",
            category: "mixes",
            name: "Minty Mix",
            description: "Watermelon - Kiwi - Mint - Milk",
            price: 55,
            image: "images/mix3.jpg",
        },
        {
            id: "mix-avocado",
            category: "mixes",
            name: "Avocado Blend",
            description: "Avocado - Mango - Banana - Mixed nuts",
            price: 70,
            image: "images/mix4.webp",
        },
        {
            id: "mix-heartbreak",
            category: "mixes",
            name: "Heartbreak Mix",
            description: "Mango - Strawberry - Banana - Ice cream",
            price: 60,
            image: "images/mix5.webp",
        },
        {
            id: "mix-fado",
            category: "mixes",
            name: "Fado Mix",
            description: "Mango - Strawberry - Kiwi - Banana",
            price: 60,
            image: "images/mix6.webp",
        },


        /* ================= MOJITO — موهيتو ================= */
        {
            id: "mojito-strawberry",
            category: "mojito",
            name: "Strawberry Mojito",
            description: "Strawberry - Mint - Lemon - Soda",
            price: 40,
            image: "images/mojito2.jpg",
        },
        {
            id: "mojito-blueberry",
            category: "mojito",
            name: "Blueberry Mojito",
            description: "Blueberry - Mint - Lemon - Soda",
            price: 40,
            image: "images/mojito2.webp",
        },
        {
            id: "mojito-sunshine",
            category: "mojito",
            name: "Sunshine Mojito",
            description: "Citrus mix - Mint - Soda",
            price: 45,
            image: "images/mojito3.webp",
        },
        {
            id: "mojito-peach",
            category: "mojito",
            name: "Peach Mojito",
            description: "Peach - Mint - Lemon - Soda",
            price: 45,
            image: "images/mojito3.webp",
        },
        {
            id: "mojito-watermelon",
            category: "mojito",
            name: "Watermelon Mojito",
            description: "Watermelon - Mint - Lemon - Soda",
            price: 45,
            image: "images/mojito4.webp",
        },

        /* ================= ICED COFFEE — ايس كوفي ================= */
        {
            id: "coffee-ice",
            category: "iced-coffee",
            name: "Ice Coffee",
            description: "Classic iced coffee",
            price: 50,
            image: "images/icedcoffee.webp",
        },
        {
            id: "coffee-mocha",
            category: "iced-coffee",
            name: "Ice Mocha",
            description: "Iced coffee with chocolate",
            price: 50,
            image: "images/icedcoffee2.webp",
        },
        {
            id: "coffee-oreo",
            category: "iced-coffee",
            name: "Ice Oreo",
            description: "Iced coffee blended with Oreo",
            price: 50,
            image: "images/icedoreo.webp",
        },
        {
            id: "coffee-chocolate",
            category: "iced-coffee",
            name: "Ice Chocolate",
            description: "Iced chocolate coffee",
            price: 50,
            image: "images/icedoreo.webp",
        },


        /* ================= MILKSHAKE — ميلك شيك ================= */
        {
            id: "shake-mango",
            category: "milkshake",
            name: "Mango Milkshake",
            description: "Creamy mango milkshake",
            price: 70,
            image: "images/milkshakemango.webp",
        },
        {
            id: "shake-strawberry",
            category: "milkshake",
            name: "Strawberry Milkshake",
            description: "Creamy strawberry milkshake",
            price: 70,
            image: "images/milkshake2.webp",
        },
        {
            id: "shake-hohoz",
            category: "milkshake",
            name: "Hohoz Milkshake",
            description: "Milkshake blended with Hohoz wafer",
            price: 70,
            image: "images/milkshake3.webp",
        },
        {
            id: "shake-kitkat",
            category: "milkshake",
            name: "KitKat Milkshake",
            description: "Milkshake blended with KitKat",
            price: 70,
            image: "images/milkshake4.webp",
        },
        {
            id: "shake-oreo",
            category: "milkshake",
            name: "Oreo Milkshake",
            description: "Milkshake blended with Oreo",
            price: 70,
            image: "images/milkshake5.webp",
        },
        {
            id: "shake-lotus",
            category: "milkshake",
            name: "Lotus Milkshake",
            description: "Milkshake blended with Lotus biscuit",
            price: 70,
            image: "images/milksake6.webp",
        },

        /* ================= HOT DRINKS — المشروبات الساخنة ================= */
        {
            id: "hot-turkish",
            category: "hot-drinks",
            name: "Turkish Coffee",
            description: "Classic Turkish coffee",
            price: 10,
            image: "assets/images/hot-turkish.jpg",
        },
        {
            id: "hot-turkish-ameed",
            category: "hot-drinks",
            name: "Turki Al-Ameed",
            description: "Premium Turkish coffee blend",
            price: 25,
            image: "assets/images/hot-turkish-ameed.jpg",
        },
        {
            id: "hot-french",
            category: "hot-drinks",
            name: "French Coffee",
            description: "Filtered French-style coffee",
            price: 20,
            image: "assets/images/hot-french.jpg",
        },
        {
            id: "hot-nescafe-3in1",
            category: "hot-drinks",
            name: "Nescafe 3-in-1",
            description: "Instant coffee mix",
            price: 20,
            image: "assets/images/hot-nescafe-3in1.jpg",
        },
        {
            id: "hot-nescafe-black",
            category: "hot-drinks",
            name: "Nescafe Black",
            description: "Black instant coffee",
            price: 25,
            image: "assets/images/hot-nescafe-black.jpg",
        },
        {
            id: "hot-cappuccino",
            category: "hot-drinks",
            name: "Cappuccino",
            description: "Classic cappuccino",
            price: 25,
            image: "assets/images/hot-cappuccino.jpg",
        },
    ],

    // ---- Fruits available in "Build Your Mix" ----
    fruits: [
        { id: "mango", name: "Mango", price: 40, emoji: "🥭", image: 'images/mango.webp' },
        { id: "strawberry", name: "Strawberry", price: 40, image: "images/fruit2.webp" },
        { id: "guava", name: "Guava", price: 40, image: "images/fruit3.webp" },
        { id: "banana", name: "Banana", price: 40, image: "images/fruit4.jpg" },
        { id: "cantaloupe", name: "Cantaloupe", price: 40, image: "images/fruit5.webp" },
        { id: "kiwi", name: "Kiwi", price: 40, image: "images/fruit6.webp" },
        { id: "orange", name: "Orange", price: 40, image: "images/fruit7.webp" },
        { id: "watermelon", name: "Watermelon", price: 40, image: "images/fruit8.webp" },
        { id: "avocado", name: "Avocado", price: 60, image: "images/fruit9.webp" },
    ],

    sizes: [
        { id: "small", name: "Small", priceModifier: 0 },
        { id: "medium", name: "Medium", priceModifier: 10 },
        { id: "large", name: "Large", priceModifier: 20 },
    ],

    addons: [
        { id: "ice-cream", name: "Ice Cream", price: 10 },
        { id: "honey", name: "Honey", price: 5 },
        { id: "nuts", name: "Mixed Nuts", price: 10 },
        { id: "chia", name: "Chia Seeds", price: 5 },
    ],

    offers: [
        {
            id: "summer-mix",
            title: "Summer Mix",
            description: "A refreshing mix of mango, strawberry and banana.",
            discount: "20% OFF",
            image: "assets/images/offers/summer-mix.jpg",
            buttonText: "Order Now",
        },

        {
            id: "buy-2-get-1",
            title: "Buy 2 Get 1",
            description: "Choose any two drinks and get one more for free.",
            discount: "BUY 2 GET 1",
            image: "assets/images/offers/buy-2-get-1.jpg",
            buttonText: "Order Now",
        },

        {
            id: "fresh-deal",
            title: "Fresh Deal",
            description: "Enjoy your favorite fresh drink at a special price.",
            discount: "SPECIAL DEAL",
            image: "assets/images/offers/fresh-deal.jpg",
            buttonText: "Order Now",
        },
    ],
};
