// DOM Elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.getElementById('mobileNav');
const cartBtn = document.querySelector('.cart-btn');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.querySelector('.close-cart');
const productCards = document.querySelectorAll('.product-card');
const productDetailPages = document.querySelectorAll('.product-detail-page');
const breadcrumb = document.querySelector('.breadcrumb');
const navLinks = document.querySelectorAll('.nav-link');
const benefitItems = document.querySelectorAll('.benefit-item');
const shopNowBtn = document.querySelector('.shop-now-btn');
const checkoutBtn = document.querySelector('.checkout-btn');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const closeCheckout = document.querySelector('.close-checkout');
const orderForm = document.getElementById('orderForm');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-amount');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProductPage = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupEventListeners();
    setupProductDetailPages();
});

// Setup Event Listeners
function setupEventListeners() {
    // Hamburger menu toggle
    hamburgerMenu.addEventListener('click', toggleMobileNav);
    
    // Cart toggle
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Product card clicks
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            showProductDetail(productId);
        });
    });
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateToSection(targetId);
            toggleMobileNav();
        });
    });
    
    // Benefit accordion
    benefitItems.forEach(item => {
        const header = item.querySelector('.benefit-header');
        header.addEventListener('click', function() {
            // Close all other benefit items
            benefitItems.forEach(benefit => {
                if (benefit !== item) {
                    benefit.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Shop now button
    shopNowBtn.addEventListener('click', function() {
        navigateToSection('new-arrivals');
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            showCheckoutForm();
        }
    });
    
    // Close checkout
    closeCheckout.addEventListener('click', function() {
        checkoutOverlay.classList.remove('active');
    });
    
    // Order form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitOrder();
    });
}

// Toggle Mobile Navigation
function toggleMobileNav() {
    mobileNav.classList.toggle('active');
}

// Toggle Cart Drawer
function toggleCart() {
    cartDrawer.classList.toggle('active');
    if (cartDrawer.classList.contains('active')) {
        renderCartItems();
    }
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBtn.textContent = `CART(${totalItems})`;
}

// Show Product Detail Page
function showProductDetail(productId) {
    // Hide all product detail pages
    productDetailPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected product detail page
    const productPage = document.getElementById(`product${productId}-page`);
    productPage.classList.add('active');
    currentProductPage = productId;
    
    // Load product details
    loadProductDetails(productId);
}

// Load Product Details
function loadProductDetails(productId) {
    const productPage = document.getElementById(`product${productId}-page`);
    
    // Product data (in a real app, this would come from an API)
    const products = {
        1: {
            title: "WITHLOVE OVERSIZED HOODIE",
            price: "د.م.229.00",
            description: "Step into bold streetwear with the Error 404 Oversized Hoodie. Designed in deep black with a striking red 'Human Not Found' graphic, this hoodie makes a statement wherever you go. Crafted with soft, breathable fabric, it offers maximum comfort for everyday wear. The loose-fit cut and spacious pockets add a relaxed, urban vibe perfect for casual outings. A must-have for fashion-forward individuals who want comfort without sacrificing style. Pair it with jeans, joggers, or sneakers for the ultimate street look.",
            images: [
                "https://i.postimg.cc/CK6dB496/0ZE8FYHF.png",
                "https://i.postimg.cc/mk7QyqsD/ffdds.png",
                "https://i.postimg.cc/BQ6SDFcr/zzeedd.png",
                "https://i.postimg.cc/Vvh3XJm4/eeeddd.png"
            ]
        },
        2: {
            title: "MEN'S RELAXED LIGHT WASH DENIM JEANS",
            price: "د.م.229.00",
            description: "Step into bold streetwear with the Error 404 Oversized Hoodie. Designed in deep black with a striking red 'Human Not Found' graphic, this hoodie makes a statement wherever you go. Crafted with soft, breathable fabric, it offers maximum comfort for everyday wear. The loose-fit cut and spacious pockets add a relaxed, urban vibe perfect for casual outings. A must-have for fashion-forward individuals who want comfort without sacrificing style. Pair it with jeans, joggers, or sneakers for the ultimate street look.",
            images: [
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg"
            ]
        },
        3: {
            title: "WHITE OVERSIZED HOODIE",
            price: "د.م.229.00",
            description: "Step into bold streetwear with the Error 404 Oversized Hoodie. Designed in deep black with a striking red 'Human Not Found' graphic, this hoodie makes a statement wherever you go. Crafted with soft, breathable fabric, it offers maximum comfort for everyday wear. The loose-fit cut and spacious pockets add a relaxed, urban vibe perfect for casual outings. A must-have for fashion-forward individuals who want comfort without sacrificing style. Pair it with jeans, joggers, or sneakers for the ultimate street look.",
            images: [
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg"
            ]
        },
        4: {
            title: "MEN'S RELAXED LIGHT WASH DENIM JEANS",
            price: "د.م.249.00",
            description: "Step into bold streetwear with the Error 404 Oversized Hoodie. Designed in deep black with a striking red 'Human Not Found' graphic, this hoodie makes a statement wherever you go. Crafted with soft, breathable fabric, it offers maximum comfort for everyday wear. The loose-fit cut and spacious pockets add a relaxed, urban vibe perfect for casual outings. A must-have for fashion-forward individuals who want comfort without sacrificing style. Pair it with jeans, joggers, or sneakers for the ultimate street look.",
            images: [
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg"
            ]
        },
        5: {
            title: "DENIM BIKER JACKET_OIL BLUE",
            price: "د.م.229.00",
            description: "Step into bold streetwear with the Error 404 Oversized Hoodie. Designed in deep black with a striking red 'Human Not Found' graphic, this hoodie makes a statement wherever you go. Crafted with soft, breathable fabric, it offers maximum comfort for everyday wear. The loose-fit cut and spacious pockets add a relaxed, urban vibe perfect for casual outings. A must-have for fashion-forward individuals who want comfort without sacrificing style. Pair it with jeans, joggers, or sneakers for the ultimate street look.",
            images: [
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg"
            ]
        },
        6: {
            title: "NEW YORK YANKEES BASEBALL CAP",
            price: "د.م.249.00",
            description: "Step into bold streetwear with the Error 404 Oversized Hoodie. Designed in deep black with a striking red 'Human Not Found' graphic, this hoodie makes a statement wherever you go. Crafted with soft, breathable fabric, it offers maximum comfort for everyday wear. The loose-fit cut and spacious pockets add a relaxed, urban vibe perfect for casual outings. A must-have for fashion-forward individuals who want comfort without sacrificing style. Pair it with jeans, joggers, or sneakers for the ultimate street look.",
            images: [
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg",
                "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg"
            ]
        }
    };
    
    const product = products[productId];
    
    // Create product detail content
    productPage.innerHTML = `
        <div class="product-detail-content">
            <div class="breadcrumb">home / store</div>
            <div class="product-detail-card">
                <div class="product-image-carousel">
                    <div class="carousel-container">
                        <div class="carousel-slide" id="carouselSlide-${productId}">
                            ${product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('')}
                        </div>
                    </div>
                    <div class="carousel-dots" id="carouselDots-${productId}">
                        ${product.images.map((_, index) => `<span class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('')}
                    </div>
                </div>
                <h3 class="product-detail-title">${product.title}</h3>
                <p class="product-detail-price">${product.price}</p>
                
                <div class="size-options">
                    <h4>Taille</h4>
                    <div class="size-buttons">
                        <button class="size-btn" data-size="S">S</button>
                        <button class="size-btn" data-size="M">M</button>
                        <button class="size-btn" data-size="L">L</button>
                    </div>
                </div>
                
                <div class="quantity-selector">
                    <p class="stock-info">In stock</p>
                    <h4>Quantity</h4>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                
                <button class="add-to-cart-btn">add to bag</button>
                
                <div class="product-description">
                    <h4>product description</h4>
                    <p>${product.description}</p>
                </div>
            </div>
            
            <footer class="footer">
                <p>© 2025 ModeX. All Rights Reserved</p>
            </footer>
        </div>
    `;
    
    // Setup carousel
    setupCarousel(productId);
    
    // Setup size buttons
    const sizeButtons = productPage.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Setup quantity controls
    const quantityInput = productPage.querySelector('.quantity-input');
    const minusBtn = productPage.querySelector('.quantity-btn.minus');
    const plusBtn = productPage.querySelector('.quantity-btn.plus');
    
    minusBtn.addEventListener('click', function() {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
    
    quantityInput.addEventListener('change', function() {
        if (parseInt(this.value) < 1) {
            this.value = 1;
        }
    });
    
    // Setup add to cart button
    const addToCartBtn = productPage.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const selectedSize = productPage.querySelector('.size-btn.active');
        const quantity = parseInt(quantityInput.value);
        
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        
        addToCart(productId, product.title, product.price, selectedSize.getAttribute('data-size'), quantity);
        toggleCart();
    });
    
    // Setup breadcrumb
    const breadcrumbBtn = productPage.querySelector('.breadcrumb');
    breadcrumbBtn.addEventListener('click', function() {
        hideProductDetail();
    });
}

// Setup Carousel
function setupCarousel(productId) {
    const carouselSlide = document.getElementById(`carouselSlide-${productId}`);
    const carouselDots = document.getElementById(`carouselDots-${productId}`);
    const dots = carouselDots.querySelectorAll('.carousel-dot');
    const images = carouselSlide.querySelectorAll('img');
    let currentIndex = 0;
    
    // Set initial position
    updateCarousel();
    
    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto slide (optional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }, 5000);
    
    function updateCarousel() {
        carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
}

// Hide Product Detail
function hideProductDetail() {
    productDetailPages.forEach(page => {
        page.classList.remove('active');
    });
    currentProductPage = null;
}

// Navigate to Section
function navigateToSection(sectionId) {
    if (currentProductPage) {
        hideProductDetail();
        // Wait for product page to hide before scrolling
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 300);
    } else {
        scrollToSection(sectionId);
    }
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 94, // Account for fixed header
            behavior: 'smooth'
        });
    }
}

// Add to Cart
function addToCart(productId, title, price, size, quantity) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.productId === productId && item.size === size
    );
    
    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            productId,
            title,
            price,
            size,
            quantity,
            image: "https://i.pinimg.com/736x/c9/e7/46/c9e746905cf7d68c154506cb05453f5f.jpg"
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
}

// Render Cart Items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = 'د.م.0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace('د.م.', '')) * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-size">Size: ${item.size}</p>
                <p class="cart-item-price">${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity">-</button>
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1">
                    <button class="increase-quantity">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
        
        // Setup quantity controls for this item
        const decreaseBtn = cartItem.querySelector('.decrease-quantity');
        const increaseBtn = cartItem.querySelector('.increase-quantity');
        const quantityInput = cartItem.querySelector('.item-quantity');
        const removeBtn = cartItem.querySelector('.remove-item');
        
        decreaseBtn.addEventListener('click', function() {
            if (item.quantity > 1) {
                item.quantity--;
                quantityInput.value = item.quantity;
                updateCart();
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            item.quantity++;
            quantityInput.value = item.quantity;
            updateCart();
        });
        
        quantityInput.addEventListener('change', function() {
            if (parseInt(this.value) < 1) {
                this.value = 1;
            }
            item.quantity = parseInt(this.value);
            updateCart();
        });
        
        removeBtn.addEventListener('click', function() {
            cart.splice(index, 1);
            updateCart();
        });
    });
    
    cartTotal.textContent = `د.م.${total.toFixed(2)}`;
}

// Update Cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Show Checkout Form
function showCheckoutForm() {
    checkoutOverlay.classList.add('active');
    
    // Populate checkout items
    checkoutItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = parseFloat(item.price.replace('د.م.', '')) * item.quantity;
        total += itemTotal;
        
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <span>${item.title} (${item.size}) x ${item.quantity}</span>
            <span>${item.price}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });
    
    checkoutTotal.textContent = `د.م.${total.toFixed(2)}`;
}

// Submit Order
function submitOrder() {
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const references = document.getElementById('references').value;
    
    // Create order summary
    let orderSummary = `New Order from ${fullName}%0A`;
    orderSummary += `Phone: ${phone}%0A`;
    orderSummary += `City: ${city}%0A`;
    orderSummary += `References: ${references}%0A%0A`;
    orderSummary += `Order Details:%0A`;
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = parseFloat(item.price.replace('د.م.', '')) * item.quantity;
        total += itemTotal;
        orderSummary += `- ${item.title} (${item.size}) x ${item.quantity} - ${item.price}%0A`;
    });
    
    orderSummary += `%0ATotal: د.م.${total.toFixed(2)}`;
    
    // Send via WhatsApp
    const whatsappUrl = `https://wa.me/212688053836?text=${orderSummary}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and close modals
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    checkoutOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
    
    // Reset form
    orderForm.reset();
    
    alert('Your order has been submitted! You will be redirected to WhatsApp to confirm.');
}

// Setup Product Detail Pages
function setupProductDetailPages() {
    // Add event listener to close product pages when clicking outside
    productDetailPages.forEach(page => {
        page.addEventListener('click', function(e) {
            if (e.target === this) {
                hideProductDetail();
            }
        });
    });
}