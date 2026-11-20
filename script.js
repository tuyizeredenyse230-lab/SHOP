(function () {
  "use strict";

  var KEYS = {
    products: "denyse_products_v1",
    cart: "denyse_cart_v1",
    promo: "denyse_promo_v1",
    orders: "denyse_orders_v1",
    lastOrder: "denyse_last_order_v1",
    accounts: "denyse_accounts_v1",
    currentAccount: "denyse_current_account_v1",
    favorites: "denyse_favorites_v1"
  };
  var categories = ["Telephone", "Tablet", "Headphone", "Mouse", "Cable", "Machine"];
  var selectedCategory = "All";
  var detailQuantity = 1;
  var editingProductId = null;
  var editingAccountId = null;
  var currency = new Intl.NumberFormat("en-RW", { maximumFractionDigits: 0 });

  function read(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error("Could not read Denyse Shop data from this browser.", error);
      return fallback;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Could not save Denyse Shop data in this browser.", error);
      toast("Could not save changes. Check this browser's storage.");
      return false;
    }
  }
  function money(amount) {
    return currency.format(Number(amount) || 0) + " RWF";
  }
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  function toast(message) {
    var node = document.querySelector(".toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "toast";
      node.setAttribute("role", "status");
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { node.classList.remove("show"); }, 2400);
  }
  function products() {
    var saved = read(KEYS.products, null);
    if (Array.isArray(saved)) {
      var catalog = window.DENYSE_PRODUCTS || [];
      var migrated = saved.map(function (product) {
        var seed = catalog.find(function (item) { return item.id === product.id; });
        if (!seed) return product;
        var merged = Object.assign({}, seed, product);
        ["bestSeller", "newArrival", "discountFeatured"].forEach(function (flag) {
          if (typeof product[flag] === "undefined") merged[flag] = Boolean(seed[flag]);
        });
        return merged;
      });
      if (migrated.some(function (product, index) {
        return ["bestSeller", "newArrival", "discountFeatured"].some(function (flag) { return product[flag] !== saved[index][flag]; });
      })) write(KEYS.products, migrated);
      return migrated;
    }
    var initial = (window.DENYSE_PRODUCTS || []).map(function (product) { return Object.assign({}, product); });
    write(KEYS.products, initial);
    return initial;
  }
  function accounts() {
    var saved = read(KEYS.accounts, []);
    return Array.isArray(saved) ? saved : [];
  }
  function accountById(id) {
    return accounts().find(function (account) { return account.id === id; }) || null;
  }
  function currentAccount() {
    return accountById(read(KEYS.currentAccount, ""));
  }
  function orders() {
    var saved = read(KEYS.orders, []);
    if (!Array.isArray(saved)) return [];
    return saved.map(function (order) {
      if (!order.customer) {
        order.customer = {
          name: order.name || "",
          phone: order.phone || "",
          whatsapp: order.whatsapp || "",
          email: order.email || "",
          district: order.district || "",
          sector: order.sector || "",
          address: order.address || "",
          note: order.note || ""
        };
      }
      if (!order.id) order.id = order.number || "DS-ORDER";
      if (order.status === "New") order.status = "Pending";
      return order;
    });
  }
  function cart() {
    var saved = read(KEYS.cart, {});
    return saved && typeof saved === "object" ? saved : {};
  }
  function favoriteKey() {
    var profile = currentAccount();
    return KEYS.favorites + (profile ? "_" + profile.id : "_guest");
  }
  function favorites() {
    var saved = read(favoriteKey(), []);
    return Array.isArray(saved) ? saved : [];
  }
  function updateCartBadges() {
    var basket = cart();
    var count = Object.keys(basket).reduce(function (sum, id) { return sum + Math.max(0, Number(basket[id]) || 0); }, 0);
    document.querySelectorAll("[data-cart-count]").forEach(function (element) { element.textContent = count; });
  }
  function addToCart(id, quantity) {
    var product = products().find(function (item) { return item.id === id; });
    if (!product) {
      toast("This product is no longer available.");
      return;
    }
    var basket = cart();
    basket[id] = Math.min(99, (Number(basket[id]) || 0) + Math.max(1, Number(quantity) || 1));
    if (write(KEYS.cart, basket)) {
      updateCartBadges();
      toast(product.name + " added to your cart");
    }
  }
  function toggleFavorite(id) {
    var list = favorites();
    var index = list.indexOf(id);
    if (index >= 0) list.splice(index, 1);
    else list.push(id);
    if (write(favoriteKey(), list)) {
      renderHome();
      renderShop();
      renderFavorites();
      var favoriteButton = Array.prototype.slice.call(document.querySelectorAll("[data-product-favorite]")).find(function (button) { return button.dataset.productFavorite === id; });
      if (favoriteButton) {
        var savedNow = favorites().includes(id);
        favoriteButton.classList.toggle("is-favorite", savedNow);
        favoriteButton.setAttribute("aria-pressed", savedNow ? "true" : "false");
        favoriteButton.setAttribute("aria-label", (savedNow ? "Remove " : "Add ") + favoriteButton.dataset.productFavorite + (savedNow ? " from" : " to") + " favourites");
        var favoriteText = favoriteButton.querySelector("span");
        if (favoriteText) favoriteText.textContent = savedNow ? "Remove from Favorite" : "Add to Favorite";
      }
      toast(index >= 0 ? "Removed from your favourites" : "Added to your favourites");
    }
  }
  function productCard(product, options) {
    options = options || {};
    var isFavorite = favorites().includes(product.id);
    var promo = options.promo === 20;
    var oldPrice = promo ? Math.round(Number(product.price) / 0.8) : (product.oldPrice || Math.round(product.price * 1.1));
    return '<article class="product-card' + (options.compact ? " product-card-compact" : "") + '">' +
      '<div class="product-image-frame"><a class="product-photo-link" href="product.html?id=' + encodeURIComponent(product.id) + '"><img src="' + esc(product.image) + '" alt="' + esc(product.name) + '" loading="lazy"><span class="product-category">' + esc(product.category) + '</span>' +
      (promo ? '<span class="product-promo">−20%</span>' : '') + '</a><button class="favorite-button' + (isFavorite ? " is-favorite" : "") + '" type="button" data-product-favorite="' + esc(product.id) + '" aria-label="' + (isFavorite ? "Remove " : "Add ") + esc(product.name) + ' ' + (isFavorite ? "from" : "to") + ' favourites" aria-pressed="' + (isFavorite ? "true" : "false") + '">♡</button></div>' +
      '<div class="product-card-body"><a class="product-title" href="product.html?id=' + encodeURIComponent(product.id) + '">' + esc(product.name) + '</a>' +
      '<div class="product-rating" aria-label="Rated 5 out of 5">★★★★★ <small>5.0</small></div>' +
      '<div class="product-price-row"><span class="product-price">' + money(product.price) + '</span><span class="old-price">' + money(oldPrice) + '</span></div>' +
      '<button class="card-add" type="button" data-add="' + esc(product.id) + '">♡ &nbsp; Add to Cart</button></div></article>';
  }
  function renderCategoryDashboard() {
    var target = document.getElementById("category-dashboard");
    if (!target) return;
    var list = products();
    target.innerHTML = categories.map(function (category, index) {
      var matches = list.filter(function (product) { return product.category === category; });
      var firstProduct = matches[0];
      var minPrice = matches.reduce(function (min, product) { return Math.min(min, Number(product.price) || min); }, Infinity);
      var image = firstProduct ? firstProduct.image : "";
      var labels = ["View Telephones", "View Tablets", "View Headphones", "View Mouse", "View Cables", "View Machines"];
      var fallback = ["☎", "▣", "♫", "⌖", "⌁", "▤"][index];
      return '<article class="category-dashboard-card"><a class="category-card-photo" href="shop.html?category=' + encodeURIComponent(category) + '">' +
        (image ? '<img src="' + esc(image) + '" alt="' + esc(category) + '" loading="lazy">' : '<span class="category-photo-fallback">' + fallback + '</span>') +
        '<span class="category-photo-overlay"></span><span class="category-count">' + matches.length + ' ' + (matches.length === 1 ? "product" : "products") + '</span></a>' +
        '<div class="category-card-info"><div><h3>' + esc(category) + '</h3><span>From ' + (matches.length ? money(minPrice) : "Coming soon") + '</span></div>' +
        '<a class="category-view-button" href="shop.html?category=' + encodeURIComponent(category) + '" aria-label="' + esc(labels[index]) + '">→</a></div></article>';
    }).join("");
  }
  function renderHome() {
    renderCategoryDashboard();
    var all = products();
    var best = all.filter(function (product) { return product.bestSeller; }).slice(0, 4);
    if (!best.length) best = all.slice(0, 4);
    var arrivals = all.filter(function (product) { return product.newArrival; }).slice(0, 4);
    if (!arrivals.length) arrivals = all.slice().reverse().slice(0, 4);
    var discounted = all.filter(function (product) { return product.discountFeatured; }).slice(0, 3);
    if (!discounted.length) discounted = all.slice(0, 3);
    var bestTarget = document.getElementById("best-seller-grid");
    var arrivalTarget = document.getElementById("new-arrival-grid");
    var discountTarget = document.getElementById("discount-grid");
    if (bestTarget) bestTarget.innerHTML = best.map(function (product) { return productCard(product); }).join("");
    if (arrivalTarget) arrivalTarget.innerHTML = arrivals.map(function (product) { return productCard(product); }).join("");
    if (discountTarget) discountTarget.innerHTML = discounted.map(function (product) { return productCard(product, { promo: 20 }); }).join("");
  }
  function renderShop() {
    var grid = document.getElementById("product-grid");
    if (!grid) return;
    var query = (document.getElementById("search-input").value || "").trim().toLowerCase();
    var price = document.getElementById("price-filter").value;
    var sort = document.getElementById("sort-filter").value;
    var offerOnly = new URLSearchParams(location.search).get("offer") === "20";
    var list = products().filter(function (product) {
      var matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      var matchesSearch = !query || (product.name + " " + product.category + " " + (product.description || "")).toLowerCase().includes(query);
      var amount = Number(product.price) || 0;
      var matchesPrice = !price || (price === "under-20" && amount < 20000) || (price === "20-100" && amount >= 20000 && amount < 100000) || (price === "100-300" && amount >= 100000 && amount <= 300000) || (price === "over-300" && amount > 300000);
      return matchesCategory && matchesSearch && matchesPrice && (!offerOnly || product.discountFeatured);
    });
    if (sort === "low-high") list.sort(function (a, b) { return a.price - b.price; });
    if (sort === "high-low") list.sort(function (a, b) { return b.price - a.price; });
    if (sort === "popular") list.sort(function (a, b) { return Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller)); });
    if (sort === "newest") list.sort(function (a, b) { return (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0); });
    grid.innerHTML = list.map(function (product) { return productCard(product); }).join("");
    var count = document.getElementById("results-count");
    if (count) count.textContent = list.length + (list.length === 1 ? " item" : " items");
    var empty = document.getElementById("empty-products");
    if (empty) empty.classList.toggle("hidden", list.length > 0);
  }
  function setupShop() {
    var categoryList = document.getElementById("category-list");
    if (!categoryList) return;
    var query = new URLSearchParams(location.search);
    selectedCategory = categories.includes(query.get("category")) ? query.get("category") : "All";
    if (query.get("q")) document.getElementById("search-input").value = query.get("q");
    if (query.get("sort") === "popular") document.getElementById("sort-filter").value = "popular";
    categoryList.innerHTML = ["All"].concat(categories).map(function (category) {
      return '<button class="category-chip' + (category === selectedCategory ? " active" : "") + '" type="button" data-category="' + esc(category) + '">' + esc(category) + '</button>';
    }).join("");
    document.getElementById("search-form").addEventListener("submit", function (event) { event.preventDefault(); renderShop(); });
    document.getElementById("search-input").addEventListener("input", renderShop);
    document.getElementById("price-filter").addEventListener("change", renderShop);
    document.getElementById("sort-filter").addEventListener("change", renderShop);
    categoryList.addEventListener("click", function (event) {
      var button = event.target.closest("[data-category]");
      if (!button) return;
      selectedCategory = button.dataset.category;
      categoryList.querySelectorAll(".category-chip").forEach(function (chip) { chip.classList.toggle("active", chip === button); });
      renderShop();
    });
    document.getElementById("clear-filters").addEventListener("click", function () {
      selectedCategory = "All";
      document.getElementById("search-input").value = "";
      document.getElementById("price-filter").value = "";
      document.getElementById("sort-filter").value = "newest";
      categoryList.querySelector('[data-category="All"]').click();
    });
    renderShop();
  }
  function currentProduct() {
    var id = new URLSearchParams(location.search).get("id");
    return products().find(function (product) { return product.id === id; });
  }
  function renderProduct() {
    var product = currentProduct();
    var container = document.getElementById("product-detail");
    if (!container) return;
    if (!product) {
      container.innerHTML = '<div class="empty-state"><h2>Product not found</h2><p>This product may have been removed from the shop.</p><a class="button button-primary" href="shop.html">Browse the shop</a></div>';
      return;
    }
    var warranty = product.warranty || (product.specs || []).find(function (spec) { return /warranty/i.test(spec); }) || "Ask Denyse for warranty details";
    container.innerHTML = '<div class="detail-image-wrap"><img class="detail-photo" src="' + esc(product.image) + '" alt="' + esc(product.name) + '"></div>' +
      '<div class="detail-copy"><span class="eyebrow">' + esc(product.category) + '</span><h1>' + esc(product.name) + '</h1><div><span class="detail-price">' + money(product.price) + '</span></div>' +
      '<div class="product-rating detail-rating" aria-label="Rated 5 out of 5">★★★★★ <small>5.0 · Denyse Shop</small></div>' +
      '<p class="detail-description">' + esc(product.description || "") + '</p><h2 class="spec-heading">Product details</h2><ul class="spec-list">' +
      (product.specs || []).map(function (spec) { return "<li>" + esc(spec) + "</li>"; }).join("") + '</ul>' +
      '<p class="warranty-line"><strong>Warranty:</strong> ' + esc(warranty) + '</p><p class="stock-line">' + (Number(product.stock) > 0 ? '<span class="stock-dot"></span> In stock · ' + Number(product.stock) + ' available' : '<span class="stock-dot stock-out"></span> Check availability with Denyse') + '</p>' +
      '<div class="detail-actions"><div class="quantity-control"><button type="button" data-qty="-1" aria-label="Decrease quantity">−</button><span id="detail-qty">1</span><button type="button" data-qty="1" aria-label="Increase quantity">+</button></div>' +
      '<button class="button button-primary" type="button" id="detail-add">Add to Cart</button><button class="button button-outline" type="button" id="detail-buy">Buy Now</button>' +
      '<button class="button button-favorite' + (favorites().includes(product.id) ? " is-favorite" : "") + '" type="button" data-product-favorite="' + esc(product.id) + '" aria-pressed="' + (favorites().includes(product.id) ? "true" : "false") + '">♡ <span>Add to Favorite</span></button></div>' +
      '<div class="contact-actions"><a class="button button-small button-outline" href="tel:+250794753660">Call Denyse</a><a class="button button-small button-whatsapp" href="https://wa.me/250794753660?text=' + encodeURIComponent("Hello Denyse, I'm interested in " + product.name + ".") + '" target="_blank" rel="noopener">WhatsApp Denyse</a></div></div>';
    container.addEventListener("click", function (event) {
      var quantityButton = event.target.closest("[data-qty]");
      if (quantityButton) {
        detailQuantity = Math.max(1, Math.min(99, detailQuantity + Number(quantityButton.dataset.qty)));
        document.getElementById("detail-qty").textContent = detailQuantity;
      }
      if (event.target.closest("#detail-add")) addToCart(product.id, detailQuantity);
      if (event.target.closest("#detail-buy")) {
        addToCart(product.id, detailQuantity);
        location.href = "cart.html";
      }
      var favoriteButton = event.target.closest("[data-product-favorite]");
      if (favoriteButton) toggleFavorite(product.id);
    });
  }
  function cartLines() {
    var basket = cart();
    return products().filter(function (product) { return Number(basket[product.id]) > 0; }).map(function (product) {
      return { product: product, quantity: Math.min(99, Math.max(1, Number(basket[product.id]) || 1)) };
    });
  }
  function calculateTotals(lines) {
    var subtotal = lines.reduce(function (sum, line) { return sum + Number(line.product.price) * line.quantity; }, 0);
    var discount = read(KEYS.promo, false) ? Math.round(subtotal * 0.05) : 0;
    var delivery = lines.length ? 3000 : 0;
    return { subtotal: subtotal, discount: discount, delivery: delivery, total: subtotal - discount + delivery };
  }
  function summaryHTML(lines, includePromo) {
    var totals = calculateTotals(lines);
    return '<h2 class="summary-title">Order summary</h2><div class="summary-row"><span>Subtotal</span><span>' + money(totals.subtotal) + '</span></div>' +
      (totals.discount ? '<div class="summary-row"><span>DENYSE5 discount (5%)</span><span>−' + money(totals.discount) + '</span></div>' : '') +
      '<div class="summary-row"><span>Delivery in Kigali</span><span>' + money(totals.delivery) + '</span></div><div class="summary-row total"><span>Grand total</span><span>' + money(totals.total) + '</span></div>' +
      (includePromo ? '<form class="promo-form" id="promo-form"><label class="sr-only" for="promo-code">Promo code</label><input class="form-control" id="promo-code" placeholder="Promo code" value="' + (read(KEYS.promo, false) ? "DENYSE5" : "") + '"><button type="submit">' + (read(KEYS.promo, false) ? "Applied" : "Apply") + '</button></form><div class="form-message" id="promo-message">' + (read(KEYS.promo, false) ? "Promo code applied — you saved 5%." : "") + '</div>' : '');
  }
  function renderCart() {
    var container = document.getElementById("cart-content");
    if (!container) return;
    var lines = cartLines();
    if (!lines.length) {
      container.innerHTML = '<div class="panel empty-cart"><span class="eyebrow">YOUR BAG IS WAITING</span><h2>Your cart is empty</h2><p>Have a look around and find something you love.</p><a class="button button-primary" href="shop.html">Browse the shop</a></div>';
      return;
    }
    container.innerHTML = '<div class="cart-layout"><div class="panel">' + lines.map(function (line) {
      return '<div class="cart-item"><img src="' + esc(line.product.image) + '" alt="' + esc(line.product.name) + '"><div><h3>' + esc(line.product.name) + '</h3><div class="cart-item-price">' + money(line.product.price) + ' each</div><div class="quantity-control"><button type="button" data-cart-qty="-1" data-id="' + esc(line.product.id) + '" aria-label="Decrease quantity">−</button><span>' + line.quantity + '</span><button type="button" data-cart-qty="1" data-id="' + esc(line.product.id) + '" aria-label="Increase quantity">+</button></div></div><div class="cart-item-actions"><strong class="cart-item-price">' + money(line.product.price * line.quantity) + '</strong><br><button class="remove-item" type="button" data-remove="' + esc(line.product.id) + '">Remove</button></div></div>';
    }).join("") + '</div><aside class="panel" id="cart-summary">' + summaryHTML(lines, true) + '<a class="button button-primary full-width" style="margin-top:14px" href="checkout.html">Continue to checkout</a></aside></div>';
  }
  function setupCart() {
    var container = document.getElementById("cart-content");
    if (!container) return;
    container.addEventListener("click", function (event) {
      var quantityButton = event.target.closest("[data-cart-qty]");
      var removeButton = event.target.closest("[data-remove]");
      var basket = cart();
      if (quantityButton) {
        var id = quantityButton.dataset.id;
        basket[id] = (Number(basket[id]) || 0) + Number(quantityButton.dataset.cartQty);
        if (basket[id] <= 0) delete basket[id];
        write(KEYS.cart, basket);
        updateCartBadges();
        renderCart();
      } else if (removeButton) {
        delete basket[removeButton.dataset.remove];
        write(KEYS.cart, basket);
        updateCartBadges();
        renderCart();
      }
    });
    container.addEventListener("submit", function (event) {
      if (!event.target.matches("#promo-form")) return;
      event.preventDefault();
      var message = document.getElementById("promo-message");
      if (document.getElementById("promo-code").value.trim().toUpperCase() === "DENYSE5") {
        write(KEYS.promo, true);
        renderCart();
        toast("Promo code applied — 5% off");
      } else {
        message.textContent = "That promo code isn't valid. Check it and try again.";
        message.style.color = "#bd4d65";
      }
    });
    renderCart();
  }
  function profileAddress(profile) {
    return [profile.address, [profile.sector, profile.district].filter(Boolean).join(", "), profile.note].filter(Boolean).join(" · ");
  }
  function setupCheckout() {
    var form = document.getElementById("checkout-form");
    var lines = cartLines();
    if (!form) return;
    if (!lines.length) {
      form.innerHTML = '<div class="empty-cart"><h2>Your cart is empty</h2><a class="button button-primary" href="shop.html">Browse the shop</a></div>';
      document.getElementById("checkout-summary").innerHTML = "";
      return;
    }
    document.getElementById("checkout-summary").innerHTML = summaryHTML(lines, false) + '<div class="checkout-delivery-note">♡ Delivery within 2 hours in Kigali</div>';
    var profile = currentAccount();
    var guestFields = document.getElementById("guest-delivery");
    var deliverySummary = document.getElementById("delivery-summary");
    var editLink = document.getElementById("edit-delivery-link");
    if (profile) {
      guestFields.classList.add("hidden");
      deliverySummary.innerHTML = '<div class="delivery-summary-card"><strong>' + esc(profile.name) + '</strong><span>' + esc(profile.phone) + (profile.whatsapp ? " · WhatsApp " + esc(profile.whatsapp) : "") + '</span>' +
        (profile.email ? '<span>' + esc(profile.email) + '</span>' : '') + '<span>' + esc(profileAddress(profile)) + '</span></div>';
      editLink.href = "account.html?edit=1&return=checkout.html";
      editLink.classList.remove("hidden");
    } else {
      guestFields.classList.remove("hidden");
      deliverySummary.innerHTML = '<p class="guest-hint">Your saved details will appear here next time. <a href="account.html">Create an account</a>.</p>';
      editLink.classList.add("hidden");
      ["name", "phone", "district", "address"].forEach(function (name) { form.elements[name].required = true; });
    }
    form.addEventListener("change", function (event) {
      if (event.target.name !== "payment") return;
      var notice = document.getElementById("payment-notice");
      if (event.target.value === "MTN MoMo") {
        notice.textContent = "Pay to Denyse Shop · 0794753660. Confirm securely using the official MTN MoMo prompt. Never enter your PIN on this website.";
        notice.classList.remove("hidden");
      } else if (event.target.value === "Airtel Money") {
        notice.textContent = "Arrange Airtel Money payment directly with Denyse on 0794753660. This website does not process payments.";
        notice.classList.remove("hidden");
      } else notice.classList.add("hidden");
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!profile) {
        ["name", "phone", "district", "address"].forEach(function (name) { form.elements[name].required = true; });
        var phoneField = form.elements.phone;
        phoneField.setCustomValidity(/^\+?[0-9][0-9 ()-]{5,18}[0-9]$/.test(phoneField.value.trim()) ? "" : "Enter a valid phone number.");
      }
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var customer = profile ? Object.assign({}, profile) : {
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        whatsapp: String(data.get("whatsapp") || "").trim(),
        email: String(data.get("email") || "").trim(),
        district: String(data.get("district") || "").trim(),
        sector: String(data.get("sector") || "").trim(),
        address: String(data.get("address") || "").trim(),
        note: String(data.get("note") || "").trim(),
        photo: ""
      };
      var totals = calculateTotals(lines);
      var order = {
        id: "DS-" + Date.now().toString().slice(-8),
        createdAt: new Date().toISOString(),
        customerId: profile ? profile.id : "",
        customer: customer,
        lines: lines.map(function (line) { return { id: line.product.id, name: line.product.name, price: line.product.price, quantity: line.quantity }; }),
        subtotal: totals.subtotal,
        discount: totals.discount,
        delivery: totals.delivery,
        total: totals.total,
        payment: String(data.get("payment")),
        status: "Pending"
      };
      var allOrders = orders();
      allOrders.unshift(order);
      if (!write(KEYS.orders, allOrders) || !write(KEYS.lastOrder, order)) return;
      write(KEYS.cart, {});
      write(KEYS.promo, false);
      location.href = "success.html";
    });
  }
  function orderMessage(order) {
    var customer = order.customer || {};
    var items = (order.lines || []).map(function (line) { return "• " + line.name + " × " + line.quantity + " — " + money(line.price * line.quantity); }).join("\n");
    return "Hello Denyse Shop! I placed order " + order.id + ".\n\nCustomer: " + customer.name + "\nPhone: " + customer.phone + "\nWhatsApp: " + (customer.whatsapp || "Not provided") + "\nEmail: " + (customer.email || "Not provided") + "\nDistrict: " + customer.district + "\nAddress: " + profileAddress(customer) + "\nPayment: " + order.payment + "\n\nItems:\n" + items + "\n\nSubtotal: " + money(order.subtotal) + (order.discount ? "\nDiscount: −" + money(order.discount) : "") + "\nDelivery: " + money(order.delivery) + "\nTOTAL: " + money(order.total);
  }
  function renderSuccess() {
    var order = read(KEYS.lastOrder, null);
    var number = document.getElementById("success-order-number");
    var link = document.getElementById("success-whatsapp");
    if (!number || !order) return;
    number.textContent = order.id;
    link.href = "https://wa.me/250794753660?text=" + encodeURIComponent(orderMessage(order));
    document.getElementById("success-order-summary").innerHTML = '<p class="success-summary-line">' + (order.lines || []).map(function (line) { return esc(line.name) + " × " + line.quantity; }).join("<br>") + '</p><strong class="success-total">Total: ' + money(order.total) + '</strong>';
  }
  function phoneIsValid(value) {
    return /^\+?[0-9][0-9 ()-]{5,18}[0-9]$/.test(String(value || "").trim());
  }
  function accountOrders(profile) {
    return orders().filter(function (order) {
      return order.customerId === profile.id || (order.customer && order.customer.phone && order.customer.phone.replace(/\D/g, "") === String(profile.phone || "").replace(/\D/g, ""));
    });
  }
  function statusClass(status) {
    return "status-pill status-" + String(status || "Pending").toLowerCase().replace(/[^a-z]/g, "");
  }
  function renderCustomerDashboard() {
    var panel = document.getElementById("customer-dashboard");
    var formPanel = document.getElementById("account-form-panel");
    var profile = currentAccount();
    if (!panel || !formPanel) return;
    if (!profile) {
      panel.classList.add("hidden");
      formPanel.classList.remove("hidden");
      return;
    }
    formPanel.classList.add("hidden");
    panel.classList.remove("hidden");
    var myOrders = accountOrders(profile);
    var savedFavorites = favorites();
    var favoriteProducts = products().filter(function (product) { return savedFavorites.includes(product.id); });
    var avatar = profile.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80";
    panel.innerHTML = '<section class="customer-welcome panel"><div class="customer-profile-top"><img class="customer-avatar" src="' + esc(avatar) + '" alt="Profile photo for ' + esc(profile.name) + '"><div><span class="eyebrow">WELCOME TO YOUR ACCOUNT</span><h1>Hello, ' + esc(profile.name) + '</h1><p>' + esc(profile.phone) + ' · ' + esc(profile.district) + ', Kigali</p></div><button class="button button-outline" type="button" data-account-action="edit">Edit My Details</button></div><div class="customer-contact-chips"><span>WhatsApp: ' + esc(profile.whatsapp || "Not added") + '</span><span>' + esc(profile.email) + '</span></div></section>' +
      '<div class="customer-dashboard-grid"><section class="panel account-panel" id="orders"><div class="account-panel-heading"><div><span class="eyebrow">YOUR SHOPPING STORY</span><h2>My Orders</h2></div><span class="section-count">' + myOrders.length + '</span></div>' +
      (myOrders.length ? '<div class="customer-order-list">' + myOrders.map(function (order) {
        return '<article class="customer-order"><div class="customer-order-top"><strong>' + esc(order.id) + '</strong><span class="' + statusClass(order.status) + '">' + esc(order.status || "Pending") + '</span></div><p>' + (order.lines || []).map(function (line) { return esc(line.name) + ' × ' + Number(line.quantity || 0); }).join("<br>") + '</p><div class="customer-order-bottom"><span>' + money(order.total) + '</span><small>' + new Date(order.createdAt).toLocaleDateString() + '</small></div></article>';
      }).join("") + '</div>' : '<div class="account-empty"><span>♡</span><p>Your first order is waiting to happen.</p><a href="shop.html">Explore the shop →</a></div>') + '</section>' +
      '<section class="panel account-panel"><div class="account-panel-heading"><div><span class="eyebrow">DELIVERY MADE EASY</span><h2>My Addresses</h2></div><button class="text-button" type="button" data-account-action="edit">Edit</button></div><div class="saved-address"><span class="address-icon">⌖</span><div><strong>' + esc(profile.district) + (profile.sector ? " · " + esc(profile.sector) : "") + '</strong><p>' + esc(profile.address) + '</p><small>' + (profile.note ? "Delivery note: " + esc(profile.note) : "Saved delivery address") + '</small></div></div><button class="button button-outline button-small" type="button" data-account-action="edit">Edit address</button></section>' +
      '<section class="panel account-panel favorites-panel"><div class="account-panel-heading"><div><span class="eyebrow">SAVED FOR LATER</span><h2>My Favorites</h2></div><a class="text-link" href="shop.html">Find more →</a></div>' +
      (favoriteProducts.length ? '<div class="product-grid favorites-grid">' + favoriteProducts.map(function (product) { return productCard(product, { compact: true }); }).join("") + '</div>' : '<div class="account-empty"><span>♡</span><p>Tap the heart on a product to save it here.</p><a href="shop.html">Browse products →</a></div>') + '</section></div>' +
      '<div class="account-dashboard-actions"><button class="button button-outline" type="button" data-account-action="logout">Switch customer on this browser</button><span>This profile is saved only in this browser.</span></div>';
  }
  function renderFavorites() {
    renderCustomerDashboard();
  }
  function showAccountForm(profile) {
    var panel = document.getElementById("account-form-panel");
    var dashboard = document.getElementById("customer-dashboard");
    var form = document.getElementById("account-form");
    if (!panel || !form) return;
    panel.classList.remove("hidden");
    dashboard.classList.add("hidden");
    form.reset();
    editingAccountId = profile ? profile.id : null;
    if (profile) {
      ["name", "phone", "whatsapp", "email", "district", "sector", "address", "note"].forEach(function (key) {
        form.elements[key].value = profile[key] || "";
      });
      form.elements.photo.value = profile.photo || "";
      form.elements.password.required = false;
      form.elements.password.placeholder = "Not stored — leave blank";
      document.getElementById("account-form-title").textContent = "Edit your details";
      document.getElementById("account-save-button").textContent = "Save My Changes";
      document.getElementById("account-cancel-button").classList.remove("hidden");
    } else {
      form.elements.password.required = true;
      form.elements.password.placeholder = "";
      document.getElementById("account-form-title").textContent = "Create your account";
      document.getElementById("account-save-button").textContent = "Save My Details";
      document.getElementById("account-cancel-button").classList.add("hidden");
    }
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function setupAccount() {
    var form = document.getElementById("account-form");
    if (!form) return;
    var profile = currentAccount();
    var query = new URLSearchParams(location.search);
    if (profile && query.get("edit") !== "1") renderCustomerDashboard();
    else showAccountForm(profile);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var phoneField = form.elements.phone;
      var whatsappField = form.elements.whatsapp;
      phoneField.setCustomValidity(phoneIsValid(phoneField.value) ? "" : "Enter a valid phone number.");
      whatsappField.setCustomValidity(phoneIsValid(whatsappField.value) ? "" : "Enter a valid WhatsApp number.");
      if (!form.reportValidity()) return;
      var savedAccounts = accounts();
      var existing = editingAccountId ? savedAccounts.find(function (item) { return item.id === editingAccountId; }) : null;
      var account = {
        id: existing ? existing.id : "customer-" + Date.now(),
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        whatsapp: String(data.get("whatsapp") || "").trim(),
        email: String(data.get("email") || "").trim(),
        district: String(data.get("district") || "").trim(),
        sector: String(data.get("sector") || "").trim(),
        address: String(data.get("address") || "").trim(),
        note: String(data.get("note") || "").trim(),
        photo: String(data.get("photo") || "").trim(),
        updatedAt: new Date().toISOString()
      };
      var matchIndex = savedAccounts.findIndex(function (item) { return item.id === account.id || String(item.phone || "").replace(/\D/g, "") === account.phone.replace(/\D/g, ""); });
      if (matchIndex >= 0) {
        account.id = savedAccounts[matchIndex].id;
        savedAccounts[matchIndex] = Object.assign({}, savedAccounts[matchIndex], account);
      }
      else savedAccounts.push(account);
      if (!write(KEYS.accounts, savedAccounts) || !write(KEYS.currentAccount, account.id)) return;
      var password = form.elements.password;
      password.value = "";
      var returnTo = query.get("return");
      if (returnTo === "checkout.html") {
        location.href = "checkout.html";
        return;
      }
      editingAccountId = null;
      renderCustomerDashboard();
      toast("Your details are saved on this browser");
    });
    document.getElementById("account-cancel-button").addEventListener("click", function () {
      editingAccountId = null;
      renderCustomerDashboard();
    });
    document.getElementById("customer-dashboard").addEventListener("click", function (event) {
      var action = event.target.closest("[data-account-action]");
      if (!action) return;
      if (action.dataset.accountAction === "edit") showAccountForm(currentAccount());
      if (action.dataset.accountAction === "logout") {
        write(KEYS.currentAccount, "");
        renderCustomerDashboard();
        toast("Customer profile switched off for this browser");
      }
    });
  }
  function renderAdminStats() {
    var target = document.getElementById("admin-stats");
    if (!target) return;
    var customerList = accounts();
    var orderList = orders();
    var paidSales = orderList.reduce(function (sum, order) {
      return ["Paid", "Delivered"].includes(order.status) ? sum + Number(order.total || 0) : sum;
    }, 0);
    target.innerHTML = '<article class="admin-stat-card"><span class="admin-stat-icon">♙</span><span>Total Customers</span><strong>' + customerList.length + '</strong></article>' +
      '<article class="admin-stat-card"><span class="admin-stat-icon">▤</span><span>Total Orders</span><strong>' + orderList.length + '</strong></article>' +
      '<article class="admin-stat-card"><span class="admin-stat-icon">RWF</span><span>Total Sales</span><strong>' + money(paidSales) + '</strong><small>Paid / delivered orders</small></article>' +
      '<article class="admin-stat-card"><span class="admin-stat-icon">▦</span><span>Total Products</span><strong>' + products().length + '</strong></article>';
  }
  function customerTable() {
    var body = document.getElementById("admin-customers");
    if (!body) return;
    var search = (document.getElementById("customer-search").value || "").trim().toLowerCase();
    var list = accounts().filter(function (customer) { return (customer.name + " " + customer.phone).toLowerCase().includes(search); });
    document.getElementById("customers-empty").classList.toggle("hidden", list.length > 0);
    body.innerHTML = list.map(function (customer) {
      var customerOrderList = accountOrders(customer);
      var spent = customerOrderList.reduce(function (sum, order) { return ["Paid", "Delivered"].includes(order.status) ? sum + Number(order.total || 0) : sum; }, 0);
      var avatar = customer.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80";
      return '<tr><td><span class="customer-table-person"><img src="' + esc(avatar) + '" alt=""><strong>' + esc(customer.name) + '</strong></span></td><td>' + esc(customer.phone) + '<br><small>' + esc(customer.whatsapp) + '</small></td><td>' + esc(customer.district) + '</td><td>' + esc(profileAddress(customer)) + '</td><td>' + customerOrderList.length + '</td><td>' + money(spent) + '</td><td><button class="text-button" type="button" data-customer-details="' + esc(customer.id) + '">Details</button></td></tr>';
    }).join("");
  }
  function renderAdminOrders() {
    var body = document.getElementById("admin-orders");
    if (!body) return;
    var list = orders();
    document.getElementById("order-count").textContent = list.length + (list.length === 1 ? " order" : " orders");
    document.getElementById("orders-empty").classList.toggle("hidden", list.length > 0);
    body.innerHTML = list.map(function (order) {
      var customer = order.customer || {};
      return '<tr><td><strong>' + esc(order.id) + '</strong><br><small>' + esc(new Date(order.createdAt).toLocaleDateString()) + '</small></td><td>' + esc(customer.name) + '</td><td>' + esc(customer.phone) + '</td><td>' + esc(profileAddress(customer)) + '</td><td>' + (order.lines || []).map(function (line) { return esc(line.name) + ' × ' + Number(line.quantity || 0); }).join("<br>") + '</td><td>' + money(order.total) + '</td><td>' + esc(order.payment) + '</td><td><label class="sr-only" for="status-' + esc(order.id) + '">Order status</label><select class="status-select" id="status-' + esc(order.id) + '" data-order-status="' + esc(order.id) + '"><option' + (order.status === "Pending" ? " selected" : "") + '>Pending</option><option' + (order.status === "Paid" ? " selected" : "") + '>Paid</option><option' + (order.status === "Delivered" ? " selected" : "") + '>Delivered</option></select></td></tr>';
    }).join("");
  }
  function renderAdminProducts() {
    var body = document.getElementById("admin-products");
    if (!body) return;
    var list = products();
    document.getElementById("product-count").textContent = list.length + (list.length === 1 ? " product" : " products");
    body.innerHTML = list.map(function (product) {
      return '<tr><td><span class="admin-product-cell"><img src="' + esc(product.image) + '" alt=""><strong>' + esc(product.name) + '</strong></span></td><td>' + esc(product.category) + '</td><td>' + money(product.price) + '</td><td>' + Number(product.stock || 0) + '</td><td><div class="table-actions"><button class="text-button" type="button" data-product-edit="' + esc(product.id) + '">Edit</button><button class="text-button danger" type="button" data-product-delete="' + esc(product.id) + '">Delete</button></div></td></tr>';
    }).join("");
  }
  function renderAdmin() {
    renderAdminStats();
    customerTable();
    renderAdminOrders();
    renderAdminProducts();
  }
  function showCustomerDetails(id) {
    var profile = accountById(id);
    if (!profile) return;
    var customerOrders = accountOrders(profile);
    var body = document.getElementById("customer-dialog-body");
    var image = profile.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80";
    body.innerHTML = '<div class="dialog-customer-profile"><img src="' + esc(image) + '" alt=""><div><h3>' + esc(profile.name) + '</h3><p>' + esc(profile.phone) + ' · WhatsApp ' + esc(profile.whatsapp) + '</p></div></div>' +
      '<dl class="customer-detail-list"><dt>Email</dt><dd>' + esc(profile.email) + '</dd><dt>District</dt><dd>' + esc(profile.district) + '</dd><dt>Sector / Cell</dt><dd>' + esc(profile.sector) + '</dd><dt>Full address</dt><dd>' + esc(profile.address) + '</dd><dt>Delivery note</dt><dd>' + esc(profile.note || "None") + '</dd></dl>' +
      '<h3 class="dialog-orders-title">Orders (' + customerOrders.length + ')</h3>' +
      (customerOrders.length ? customerOrders.map(function (order) { return '<div class="dialog-order"><strong>' + esc(order.id) + '</strong><span>' + (order.lines || []).map(function (line) { return esc(line.name) + ' × ' + Number(line.quantity || 0); }).join(", ") + '</span><span>' + money(order.total) + ' · ' + esc(order.status) + '</span></div>'; }).join("") : '<p class="muted-copy">No orders yet.</p>');
    var dialog = document.getElementById("customer-dialog");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function setupAdminProducts() {
    var form = document.getElementById("admin-product-form");
    if (!form) return;
    var cancel = document.getElementById("admin-product-cancel");
    var summary = document.getElementById("product-form-summary");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var price = Number(data.get("price"));
      var description = String(data.get("description") || "").trim();
      var photo = String(data.get("image") || "").trim();
      var existingProducts = products();
      var product = {
        id: editingProductId || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-5),
        name: name,
        category: String(data.get("category")),
        price: price,
        oldPrice: price,
        description: description,
        specs: description.split(/[,.]/).map(function (part) { return part.trim(); }).filter(Boolean),
        image: photo || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        stock: Math.max(0, Number(data.get("stock")) || 0),
        createdAt: Date.now()
      };
      var index = existingProducts.findIndex(function (item) { return item.id === editingProductId; });
      if (index >= 0) existingProducts[index] = Object.assign({}, existingProducts[index], product);
      else existingProducts.unshift(product);
      if (!write(KEYS.products, existingProducts)) return;
      form.reset();
      editingProductId = null;
      cancel.classList.add("hidden");
      summary.textContent = "＋ Add a product";
      form.closest("details").open = false;
      renderAdmin();
      renderHome();
      renderShop();
      toast("Product saved");
    });
    cancel.addEventListener("click", function () {
      form.reset();
      editingProductId = null;
      cancel.classList.add("hidden");
      summary.textContent = "＋ Add a product";
    });
    document.getElementById("admin-products").addEventListener("click", function (event) {
      var editButton = event.target.closest("[data-product-edit]");
      var deleteButton = event.target.closest("[data-product-delete]");
      var list = products();
      if (editButton) {
        var product = list.find(function (item) { return item.id === editButton.dataset.productEdit; });
        if (!product) return;
        editingProductId = product.id;
        form.elements.name.value = product.name;
        form.elements.category.value = product.category;
        form.elements.price.value = product.price;
        form.elements.stock.value = Number(product.stock || 0);
        form.elements.image.value = product.image || "";
        form.elements.description.value = product.description || "";
        summary.textContent = "Edit " + product.name;
        cancel.classList.remove("hidden");
        form.closest("details").open = true;
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (deleteButton && window.confirm("Delete this product from Denyse Shop?")) {
        write(KEYS.products, list.filter(function (item) { return item.id !== deleteButton.dataset.productDelete; }));
        renderAdmin();
        renderHome();
        renderShop();
        toast("Product deleted");
      }
    });
  }
  function setupAdmin() {
    var search = document.getElementById("customer-search");
    if (!search) return;
    search.addEventListener("input", customerTable);
    document.getElementById("admin-customers").addEventListener("click", function (event) {
      var button = event.target.closest("[data-customer-details]");
      if (button) showCustomerDetails(button.dataset.customerDetails);
    });
    document.getElementById("admin-orders").addEventListener("change", function (event) {
      var select = event.target.closest("[data-order-status]");
      if (!select) return;
      var list = orders();
      var order = list.find(function (item) { return item.id === select.dataset.orderStatus; });
      if (!order) return;
      order.status = select.value;
      if (write(KEYS.orders, list)) {
        renderAdminStats();
        customerTable();
        toast("Order status updated");
      }
    });
    var dialog = document.getElementById("customer-dialog");
    document.querySelector(".dialog-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
    setupAdminProducts();
    renderAdmin();
  }
  function setupSharedProductActions() {
    document.body.addEventListener("click", function (event) {
      var addButton = event.target.closest("[data-add]");
      var favoriteButton = event.target.closest("[data-product-favorite]");
      if (addButton) addToCart(addButton.dataset.add, 1);
      if (favoriteButton && !document.getElementById("product-detail")) toggleFavorite(favoriteButton.dataset.productFavorite);
    });
  }
  function initialize() {
    document.querySelectorAll("[data-year]").forEach(function (element) { element.textContent = new Date().getFullYear(); });
    products();
    updateCartBadges();
    setupSharedProductActions();
    var page = document.body.dataset.page;
    if (page === "home") renderHome();
    if (page === "shop") setupShop();
    if (page === "product") renderProduct();
    if (page === "cart") setupCart();
    if (page === "checkout") setupCheckout();
    if (page === "success") renderSuccess();
    if (page === "account") setupAccount();
    if (page === "admin") setupAdmin();
  }
  document.addEventListener("DOMContentLoaded", initialize);
}());
