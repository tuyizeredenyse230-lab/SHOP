(function () {
  "use strict";

  var svgNS = "http://www.w3.org/2000/svg";
  var lessons = {
    request: {
      title: "How a Request Travels",
      subtitle: "A tap on your phone sets a whole system in motion. Follow the little packet.",
      diagramTitle: "From a phone to a product",
      timeline: "A fast product lookup, with cache and a nearby edge.",
      steps: [
        { title: "Hit Enter", description: "Customer opens Denyse Shop on a phone and searches for “Samsung A15”. The journey starts with a tap.", ms: 0, active: ["phone"], route: null, chip: ["01", "Customer phone", "Searches for the Samsung Galaxy A15"], note: "The route is a teaching model, not a live network trace." },
        { title: "Find the address", description: "The phone asks DNS, “Where is Denyse Shop?” DNS finds the site’s address so the browser knows where to connect.", ms: 20, active: ["phone", "dns"], route: "dns", chip: ["⌖", "DNS lookup", "Finds the shop’s network address"], note: "DNS translates a website name into a network address." },
        { title: "Connect", description: "The phone opens a connection to the shop’s server. A quick handshake gets both sides ready to exchange data.", ms: 40, active: ["phone", "server"], route: "connect", chip: ["↔", "Connection ready", "A secure connection can now carry the request"], note: "Connection setup time varies with distance and network conditions." },
        { title: "Ask for the product", description: "The customer asks, “Show me Samsung A15.” The browser sends a product-page request to Denyse Shop.", ms: 5, active: ["phone", "server"], route: "request", packetLabel: true, chip: ["GET", "Product request", "GET /product/samsung-a15"], note: "A real shop would send the product identifier and request metadata." },
        { title: "Fetch product data", description: "The server looks up the product details: Samsung Galaxy A15, 230,000 RWF, and whether it is in stock.", ms: 30, active: ["server", "database"], route: "database", chip: ["▤", "Product lookup", "Name · price · stock · specifications"], note: "A database is the source of truth for product and stock data." },
        { title: "Send the response", description: "The server returns the product page. The phone can show its photo, 230,000 RWF price, details, and Add to Cart button.", ms: 25, active: ["phone", "server", "database"], route: "response", chip: ["200 OK", "Product page", "The browser renders the product details"], note: "The response includes data and references to the page’s assets." },
        { title: "Load the extra files", description: "Product photos and other reusable files can come from a CDN close to Kigali. Several small transfers arrive in parallel.", ms: 15, active: ["phone", "cdn"], route: "cdn", packets: 7, chip: ["▧", "Static assets", "Photos · styles · scripts"], note: "A CDN can serve cached files from a nearby edge location." },
        { title: "Spot a slow query", description: "A slow database lookup can make every customer wait. A product cache keeps popular answers ready, while the database stays the source of truth.", ms: 5, active: ["database", "cache"], slow: ["database"], route: "slow", control: "cache", chip: ["⚡", "Popular product cache", "Cache hit: the listing returns quickly"], note: "The red database highlights the slow path; the orange cache is the speed-up." },
        { title: "Distance adds latency", description: "A server farther away takes longer to reach. Compare a nearby Kigali edge with a far-away server and watch the modeled time change.", ms: 40, active: ["phone", "server"], route: "distance", control: "distance", chip: ["⌖", "Distance = latency", "Keep customer-facing services close to customers"], note: "These are illustrative timings, not measurements of the current shop." },
        { title: "The fast path, recapped", description: "To make Denyse Shop feel fast, measure the slow part—DNS, connection setup, product lookup, or distance—and improve that specific step.", ms: 0, active: ["phone", "dns", "cdn", "cache", "balancer", "server", "database"], route: null, recap: true, chip: ["✓", "Find the bottleneck", "Measure first, then improve the slowest stage"], note: "With cache on and the nearby route selected, this model totals 180 ms." }
      ]
    },
    order: {
      title: "How an Order Travels",
      subtitle: "From a little heart on a product card to a delivery at your door in Kigali.",
      diagramTitle: "From the cart to your door",
      timeline: "A conceptual order flow; delivery time is shown separately from network latency.",
      steps: [
        { title: "Add to cart", description: "A customer adds a phone or accessory to the cart. In Denyse Shop’s static demo, the cart is saved in this browser.", ms: 5, active: ["phone"], route: "cart", chip: ["♡", "Cart updated", "Samsung Galaxy A15 × 1"], note: "This storefront demo saves cart data in browser storage." },
        { title: "Check out", description: "The customer enters a name, phone number, district, and Kigali delivery address, then chooses a way to pay.", ms: 20, active: ["phone", "server", "database"], route: "checkout", chip: ["▤", "Order details", "Items · delivery details · payment choice"], note: "A real production order needs a secure backend and durable order storage." },
        { title: "Confirm MoMo", description: "A real payment provider would securely confirm the MTN MoMo transaction. The customer should only enter a PIN in the official provider flow.", ms: 60, active: ["server", "payment"], route: "pay", chip: ["RWF", "Payment provider", "Secure authorization · never collect PINs in a shop page"], note: "This diagram is illustrative: the static site does not process payments." },
        { title: "Notify Denyse", description: "After a confirmed order, a production service could notify Denyse at 0794753660 and send the customer a confirmation.", ms: 20, active: ["server", "sms"], route: "sms", chip: ["SMS", "Order notification", "0794753660 · order details · customer confirmation"], note: "The current static shop creates a WhatsApp message; it does not send SMS." },
        { title: "Deliver in Kigali", description: "Denyse confirms the order and arranges delivery. The shop’s stated delivery estimate is within 2 hours in Kigali.", ms: 0, active: ["phone", "delivery"], route: "deliver", recap: true, chip: ["⌖", "Kigali delivery", "Estimated delivery window: within 2 hours"], note: "The delivery estimate is real-world time, not network latency." }
      ]
    },
    scale: {
      title: "How Denyse Shop Scales",
      subtitle: "A thousand customers arrive at once. Here’s how a growing shop can keep its feet.",
      diagramTitle: "More visitors, shared work",
      timeline: "Illustrative request time as traffic is spread across application servers.",
      steps: [
        { title: "A thousand visitors arrive", description: "A promotion brings 1,000 customers to the shop at the same time. One application server can quickly become a bottleneck.", ms: 30, active: ["phone", "balancer"], route: "scale-in", packets: 8, chip: ["1,000", "Concurrent visitors", "Many product requests arrive together"], note: "The multiple dots represent traffic, not individual customer data." },
        { title: "Share the traffic", description: "A load balancer distributes incoming requests across three application servers, instead of sending every customer to just one.", ms: 20, active: ["balancer", "app1", "app2", "app3"], route: "scale-spread", packets: 6, chip: ["⇄", "Load balancer", "App server 01 · 02 · 03"], note: "More servers help only when the application and data layer can scale too." },
        { title: "Cache popular products", description: "The Galaxy A15 is popular. A shared cache answers repeat product lookups quickly, so the database has less repeated work.", ms: 5, active: ["cache", "app1", "app2", "app3"], route: "scale-cache", packets: 5, chip: ["⚡", "Shared product cache", "Popular listing · price · availability"], note: "Cache invalidation and stock freshness need careful design." },
        { title: "Keep the data reliable", description: "Application servers can come and go; product and order data needs durable storage, monitoring, and backups.", ms: 15, active: ["database", "cache", "app1", "app2", "app3"], route: "scale-db", recap: true, chip: ["▤", "Durable data layer", "Monitor load · protect orders · back up data"], note: "This is a conceptual scale-out design, not infrastructure currently running for the static shop." }
      ]
    }
  };

  var nodeDefinitions = [
    { id: "phone", title: "CUSTOMER PHONE", glyph: "◉", x: 30, y: 235 },
    { id: "dns", title: "DNS", glyph: "⌖", x: 208, y: 38 },
    { id: "cdn", title: "CDN", glyph: "▧", x: 424, y: 38 },
    { id: "cache", title: "CACHE", glyph: "⚡", x: 424, y: 185 },
    { id: "balancer", title: "LOAD BALANCER", glyph: "⇄", x: 424, y: 332 },
    { id: "server", title: "SHOP SERVER", glyph: "⌘", x: 654, y: 185 },
    { id: "database", title: "DATABASE", glyph: "▤", x: 654, y: 332 },
    { id: "payment", title: "MoMo PAYMENT", glyph: "RWF", x: 208, y: 332 },
    { id: "sms", title: "SMS GATEWAY", glyph: "✉", x: 208, y: 450 },
    { id: "delivery", title: "KIGALI DELIVERY", glyph: "⌖", x: 30, y: 410 },
    { id: "remote", title: "FAR SERVER", glyph: "↗", x: 752, y: 38 },
    { id: "app1", title: "APP SERVER 01", glyph: "01", x: 654, y: 65, scaleOnly: true },
    { id: "app2", title: "APP SERVER 02", glyph: "02", x: 654, y: 210, scaleOnly: true },
    { id: "app3", title: "APP SERVER 03", glyph: "03", x: 654, y: 355, scaleOnly: true }
  ];

  var routeDefinitions = {
    dns: [[145, 270], [195, 220], [225, 140], [264, 87]],
    connect: [[145, 274], [310, 160], [500, 160], [690, 222]],
    request: [[145, 285], [310, 250], [500, 230], [690, 245]],
    database: [[708, 264], [738, 286], [738, 323], [708, 352]],
    response: [[708, 250], [520, 160], [320, 185], [145, 270]],
    cdn: [[430, 80], [350, 90], [225, 150], [145, 245]],
    slow: [[708, 352], [742, 325], [742, 292], [708, 260]],
    distanceKigali: [[145, 275], [315, 165], [505, 165], [690, 225]],
    distanceFar: [[145, 275], [290, 12], [610, 12], [800, 82]],
    cart: [[145, 280], [300, 240], [500, 210], [690, 240]],
    checkout: [[145, 280], [300, 250], [510, 220], [690, 245]],
    pay: [[690, 245], [570, 300], [430, 335], [320, 365]],
    sms: [[265, 405], [230, 430], [245, 460], [265, 475]],
    deliver: [[145, 288], [95, 335], [85, 405], [120, 435]],
    scaleIn: [[145, 280], [250, 300], [340, 335], [430, 365]],
    scaleSpread1: [[480, 370], [550, 265], [600, 150], [660, 120]],
    scaleSpread2: [[480, 370], [555, 330], [605, 285], [660, 265]],
    scaleSpread3: [[480, 370], [555, 405], [605, 440], [660, 465]],
    scaleCache1: [[480, 225], [535, 190], [605, 130], [660, 120]],
    scaleCache2: [[480, 225], [545, 230], [600, 250], [660, 265]],
    scaleCache3: [[480, 225], [540, 300], [605, 390], [660, 465]],
    scaleDb: [[660, 120], [570, 260], [525, 420], [480, 485]]
  };

  var state = {
    lesson: "request",
    step: 0,
    playing: false,
    motion: true,
    cacheOn: true,
    distance: "kigali",
    packetCount: 1,
    currentRoute: null,
    activeRoutes: [],
    motionStarted: 0,
    frame: 0,
    advanceTimer: 0
  };

  var els = {};
  function byId(id) { return document.getElementById(id); }
  function makeSvg(tag, attrs, text) {
    var element = document.createElementNS(svgNS, tag);
    Object.keys(attrs || {}).forEach(function (key) { element.setAttribute(key, attrs[key]); });
    if (text) element.textContent = text;
    return element;
  }
  function renderBlocks() {
    var blockLayer = els.blockLayer;
    var wireLayer = els.wireLayer;
    var nodes = nodeDefinitions.map(function (node) {
      var group = makeSvg("g", { "class": "iso-node" + (node.scaleOnly ? " is-hidden" : ""), "data-node": node.id, transform: "translate(" + node.x + " " + node.y + ")" });
      group.appendChild(makeSvg("ellipse", { "class": "node-shadow", cx: 56, cy: 84, rx: 53, ry: 9 }));
      group.appendChild(makeSvg("polygon", { "class": "face face-top", points: "0,14 56,0 112,14 56,30" }));
      group.appendChild(makeSvg("polygon", { "class": "face face-left", points: "0,14 56,30 56,80 0,64" }));
      group.appendChild(makeSvg("polygon", { "class": "face face-right", points: "56,30 112,14 112,64 56,80" }));
      group.appendChild(makeSvg("text", { "class": "node-glyph", x: 56, y: 58 }, node.glyph));
      group.appendChild(makeSvg("text", { "class": "node-title", x: 56, y: 100 }, node.title));
      blockLayer.appendChild(group);
    });

    var wires = [
      ["phone", "dns", "dns"], ["phone", "server", "connect"], ["phone", "server", "request"],
      ["server", "database", "database"], ["server", "phone", "response"], ["cdn", "phone", "cdn"],
      ["database", "server", "slow"], ["phone", "server", "distanceKigali"], ["phone", "remote", "distanceFar"],
      ["phone", "server", "cart"], ["phone", "server", "checkout"], ["server", "payment", "pay"],
      ["payment", "sms", "sms"], ["phone", "delivery", "deliver"], ["phone", "balancer", "scaleIn"],
      ["balancer", "app1", "scaleSpread1"], ["balancer", "app2", "scaleSpread2"], ["balancer", "app3", "scaleSpread3"],
      ["cache", "app1", "scaleCache1"], ["cache", "app2", "scaleCache2"], ["cache", "app3", "scaleCache3"],
      ["app1", "database", "scaleDb"]
    ];
    wires.forEach(function (wire, index) {
      var pathData = routeDefinitions[wire[2]];
      var d = "M " + pathData[0][0] + " " + pathData[0][1] + " C " + pathData[1][0] + " " + pathData[1][1] + ", " + pathData[2][0] + " " + pathData[2][1] + ", " + pathData[3][0] + " " + pathData[3][1];
      wireLayer.appendChild(makeSvg("path", { "class": "wire", "data-route": wire[2], "data-wire-index": index, d: d }));
    });
  }
  function currentLesson() { return lessons[state.lesson]; }
  function currentStep() { return currentLesson().steps[state.step]; }
  function setText(element, text) { element.textContent = text; }
  function stepTime(index) {
    var step = currentLesson().steps[index];
    if (state.lesson === "request" && index === 7 && !state.cacheOn) return step.ms + 300;
    if (state.lesson === "request" && index === 8 && state.distance === "far") return 180;
    return step.ms;
  }
  function elapsedTime() {
    return currentLesson().steps.slice(0, state.step + 1).reduce(function (total, step, index) {
      return total + stepTime(index);
    }, 0);
  }
  function totalTime() {
    return currentLesson().steps.reduce(function (total, step, index) {
      return total + stepTime(index);
    }, 0);
  }
  function renderStepButtons() {
    els.stepButtons.innerHTML = "";
    currentLesson().steps.forEach(function (step, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "step-button" + (index === state.step ? " active" : "");
      button.dataset.step = index;
      button.setAttribute("aria-label", "Step " + (index + 1) + ": " + step.title);
      button.setAttribute("aria-current", index === state.step ? "step" : "false");
      button.textContent = String(index + 1);
      els.stepButtons.appendChild(button);
    });
  }
  function visualHTML(step) {
    var html = '<div class="explain-chip"><span class="chip-icon">' + step.chip[0] + '</span><span><b>' + step.chip[1] + '</b><small>' + step.chip[2] + '</small></span></div>';
    if (step.control === "cache") {
      html += '<button class="inline-control" id="cache-toggle" type="button"><span>' + (state.cacheOn ? "Cache is on · test the slow path" : "Cache is off · restore fast path") + '</span><span class="control-icon">' + (state.cacheOn ? "↗" : "↺") + '</span></button>';
    }
    if (step.control === "distance") {
      html += '<div class="distance-picker" role="group" aria-label="Choose server distance"><button class="distance-option' + (state.distance === "kigali" ? " active" : "") + '" data-distance="kigali" type="button"><b>Kigali edge</b>~40 ms</button><button class="distance-option' + (state.distance === "far" ? " active" : "") + '" data-distance="far" type="button"><b>Far server</b>~180 ms</button></div>';
    }
    if (step.recap) html += '<div class="recap-inline"><span class="recap-big">' + totalTime() + '</span><span>ms modeled request time</span></div>';
    return html;
  }
  function renderRecapChart() {
    var chart = els.recapChart;
    var lesson = currentLesson();
    var max = Math.max.apply(null, lesson.steps.map(function (_, index) { return stepTime(index); }).concat([1]));
    chart.innerHTML = "";
    lesson.steps.forEach(function (step, index) {
      if (!step.ms) return;
      var row = document.createElement("div");
      row.className = "chart-row";
      var label = step.title;
      if (state.lesson === "request" && index === 7) label = state.cacheOn ? "Cached DB" : "Slow DB";
      if (state.lesson === "request" && index === 8) label = state.distance === "far" ? "Far server" : "Kigali edge";
      row.innerHTML = '<span class="chart-row-label" title="' + label + '">' + label + '</span><span class="chart-bar-track"><span class="chart-bar" style="display:block;width:' + Math.max(3, stepTime(index) / max * 100) + '%"></span></span><strong>' + stepTime(index) + 'ms</strong>';
      chart.appendChild(row);
    });
  }
  function setNodeVisibility() {
    var hideForLesson = {
      request: ["payment", "sms", "delivery", "app1", "app2", "app3"],
      order: ["dns", "cdn", "cache", "balancer", "remote", "app1", "app2", "app3"],
      scale: ["dns", "cdn", "server", "payment", "sms", "delivery", "remote"]
    };
    document.querySelectorAll(".iso-node").forEach(function (node) {
      var isHidden = hideForLesson[state.lesson].includes(node.dataset.node);
      node.classList.toggle("is-hidden", isHidden);
    });
    if (state.lesson === "scale") {
      var database = document.querySelector('[data-node="database"]');
      database.setAttribute("transform", "translate(424 448)");
    } else {
      document.querySelector('[data-node="database"]').setAttribute("transform", "translate(654 332)");
    }
  }
  function activeRoute() {
    var step = currentStep();
    if (!step.route) return null;
    if (step.route === "distance") return state.distance === "far" ? "distanceFar" : "distanceKigali";
    var routeNames = {
      database: "database", slow: "slow", "scale-in": "scaleIn", "scale-spread": "scaleSpread",
      "scale-cache": "scaleCache", "scale-db": "scaleDb"
    };
    return routeNames[step.route] || step.route;
  }
  function renderDiagram() {
    var step = currentStep();
    var active = step.active.slice();
    if (step.route === "distance" && state.distance === "far") active.push("remote");
    if (state.lesson === "scale" && step.route === "scaleSpread") active = ["balancer", "app1", "app2", "app3"];
    if (state.lesson === "scale" && step.route === "scaleCache") active = ["cache", "app1", "app2", "app3"];
    if (state.lesson === "scale" && step.route === "scaleDb") active = ["database", "app1", "app2", "app3"];

    document.querySelectorAll(".iso-node").forEach(function (node) {
      var isActive = active.includes(node.dataset.node);
      node.classList.toggle("is-active", isActive);
      node.classList.toggle("is-dim", !isActive && !node.classList.contains("is-hidden"));
      node.classList.toggle("is-slow", (step.slow || []).includes(node.dataset.node));
    });
    var route = activeRoute();
    var relatedRoutes = {
      dns: ["dns"], connect: ["connect"], request: ["request"], database: ["database"],
      response: ["response"], cdn: ["cdn"], slow: ["slow"], distanceKigali: ["distanceKigali"],
      distanceFar: ["distanceFar"], cart: ["cart"], checkout: ["checkout"], pay: ["pay"],
      sms: ["sms"], deliver: ["deliver"], scaleIn: ["scaleIn"],
      scaleSpread: ["scaleSpread1", "scaleSpread2", "scaleSpread3"],
      scaleCache: ["scaleCache1", "scaleCache2", "scaleCache3"], scaleDb: ["scaleDb"]
    };
    var activeRoutes = route ? relatedRoutes[route] || [route] : [];
    state.currentRoute = route;
    state.activeRoutes = activeRoutes;
    document.querySelectorAll(".wire").forEach(function (wire) {
      var onRoute = activeRoutes.includes(wire.dataset.route);
      wire.classList.toggle("is-lit", onRoute);
      wire.classList.toggle("is-muted", Boolean(route) && !onRoute);
    });
    els.packetLayer.innerHTML = "";
    state.packetCount = route ? Math.min(step.packets || 1, 8) : 0;
    for (var index = 0; index < state.packetCount; index += 1) {
      var packetRoute = packetRouteFor(index);
      var packetPath = routeDefinitions[packetRoute];
      var circle = makeSvg("circle", {
        "class": "packet-dot" + (index === 1 ? " secondary" : "") + (index > 1 ? " tertiary" : ""),
        r: index === 0 ? 5 : 3.5,
        cx: packetPath[0][0],
        cy: packetPath[0][1]
      });
      circle.dataset.packet = index;
      circle.dataset.route = packetRoute;
      els.packetLayer.appendChild(circle);
    }
    els.packetLabel.classList.toggle("show", Boolean(step.packetLabel));
    els.distanceLabel.classList.toggle("show", step.route === "distance");
    els.distanceLabel.classList.toggle("far", state.distance === "far");
    els.distanceLabel.querySelector("text").textContent = state.distance === "far" ? "FAR SERVER · 180 ms" : "KIGALI EDGE · 40 ms";
    els.packetLabel.setAttribute("transform", state.lesson === "request" && state.step === 3 ? "translate(363 194)" : "translate(-200 -200)");
    els.distanceLabel.setAttribute("transform", state.distance === "far" ? "translate(700 105)" : "translate(451 176)");
    setText(els.mapCaptionText, step.route === "distance" ? (state.distance === "far" ? "Longer route · more time for the packet to travel" : "Nearby route · shorter trip to the edge") : "A packet is moving along the active request path");
    if (window.matchMedia("(max-width: 680px)").matches && active.length) {
      var firstNode = document.querySelector('[data-node="' + active[0] + '"]');
      var lastNode = document.querySelector('[data-node="' + active[active.length - 1] + '"]');
      if (firstNode && lastNode) {
        var firstBox = firstNode.getBBox();
        var lastBox = lastNode.getBBox();
        var center = (firstBox.x + firstBox.width / 2 + lastBox.x + lastBox.width / 2) / 2;
        var scaledCenter = center * els.diagram.clientWidth / 900;
        var targetScroll = Math.max(0, scaledCenter - document.querySelector(".diagram-wrap").clientWidth / 2);
        document.querySelector(".diagram-wrap").scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    }
    state.motionStarted = performance.now();
    if (!state.frame) state.frame = requestAnimationFrame(animatePackets);
  }
  function bezier(points, t) {
    var inverse = 1 - t;
    var x = inverse * inverse * inverse * points[0][0] + 3 * inverse * inverse * t * points[1][0] + 3 * inverse * t * t * points[2][0] + t * t * t * points[3][0];
    var y = inverse * inverse * inverse * points[0][1] + 3 * inverse * inverse * t * points[1][1] + 3 * inverse * t * t * points[2][1] + t * t * t * points[3][1];
    return [x, y];
  }
  function packetRouteFor(index) {
    if (state.currentRoute === "scaleSpread") return "scaleSpread" + (index % 3 + 1);
    if (state.currentRoute === "scaleCache") return "scaleCache" + (index % 3 + 1);
    return state.currentRoute;
  }
  function animatePackets(now) {
    if (state.motion && state.packetCount) {
      var duration = state.lesson === "request" && state.step === 7 ? 1550 : 2100;
      els.packetLayer.querySelectorAll(".packet-dot").forEach(function (dot) {
        var path = routeDefinitions[dot.dataset.route];
        if (path) {
          var packetIndex = Number(dot.dataset.packet);
          var t = ((now - state.motionStarted) / duration + Math.floor(packetIndex / 3) / Math.ceil(state.packetCount / 3)) % 1;
          var point = bezier(path, t);
          dot.setAttribute("cx", point[0]);
          dot.setAttribute("cy", point[1]);
        }
      });
    }
    state.frame = requestAnimationFrame(animatePackets);
  }
  function render() {
    var lesson = currentLesson();
    var step = currentStep();
    setText(els.lessonTitle, lesson.title);
    setText(els.lessonSubtitle, lesson.subtitle);
    setText(els.diagramTitle, lesson.diagramTitle);
    setText(els.progressNumber, String(state.step + 1).padStart(2, "0"));
    setText(els.progressTotal, String(lesson.steps.length).padStart(2, "0"));
    var percent = ((state.step + 1) / lesson.steps.length) * 100;
    els.progressFill.style.width = percent + "%";
    els.progressTrack.setAttribute("aria-valuenow", Math.round(percent));
    setText(els.stepTag, "STEP " + String(state.step + 1).padStart(2, "0"));
    setText(els.stepHeading, step.title);
    setText(els.stepDescription, step.description);
    setText(els.stepTime, step.ms === 0 ? (step.recap ? totalTime() : 0) + " ms" : "+" + stepTime(state.step) + " ms");
    setText(els.latencyValue, elapsedTime());
    setText(els.timelineCaption, lesson.timeline);
    setText(els.timelineMidLabel, state.lesson === "order" && state.step === 4 ? "Delivery: within 2 hours in Kigali" : step.title);
    setText(els.stepFootnote, step.note);
    els.stepVisual.innerHTML = visualHTML(step);
    var fullTime = Math.max(1, totalTime());
    var progress = Math.min(100, elapsedTime() / fullTime * 100);
    els.timelineProgress.style.width = progress + "%";
    els.timelineMarker.style.left = progress + "%";
    els.recapChart.classList.toggle("hidden", !step.recap);
    renderRecapChart();
    renderStepButtons();
    setNodeVisibility();
    renderDiagram();
    els.previousButton.disabled = state.step === 0;
    els.nextButton.disabled = state.step === lesson.steps.length - 1;
    els.playLabel.textContent = state.playing ? "Pause" : "Play";
    els.playButton.querySelector(".play-symbol").textContent = state.playing ? "Ⅱ" : "▶";
    setText(els.liveStatus, lesson.title + ", step " + (state.step + 1) + " of " + lesson.steps.length + ": " + step.title + ". " + elapsedTime() + " milliseconds modeled.");
    document.querySelectorAll(".lesson-tab").forEach(function (tab) {
      tab.classList.toggle("active", tab.dataset.lesson === state.lesson);
      tab.setAttribute("aria-pressed", tab.dataset.lesson === state.lesson ? "true" : "false");
    });
  }
  function stopPlaying() {
    state.playing = false;
    state.motion = false;
    window.clearInterval(state.advanceTimer);
    state.advanceTimer = 0;
    els.playLabel.textContent = "Play";
    els.playButton.querySelector(".play-symbol").textContent = "▶";
  }
  function selectStep(index) {
    var maxIndex = currentLesson().steps.length - 1;
    state.step = Math.max(0, Math.min(maxIndex, index));
    state.motion = true;
    render();
  }
  function nextStep() {
    if (state.step >= currentLesson().steps.length - 1) {
      stopPlaying();
      render();
      return;
    }
    selectStep(state.step + 1);
  }
  function play() {
    if (state.playing) {
      stopPlaying();
      render();
      return;
    }
    if (state.step >= currentLesson().steps.length - 1) state.step = 0;
    state.playing = true;
    state.motion = true;
    render();
    state.advanceTimer = window.setInterval(function () {
      if (state.step >= currentLesson().steps.length - 1) {
        stopPlaying();
        render();
        return;
      }
      selectStep(state.step + 1);
    }, 1800);
  }
  function replay() {
    stopPlaying();
    state.step = 0;
    state.motion = true;
    render();
    play();
  }
  function chooseLesson(id) {
    if (!lessons[id]) return;
    stopPlaying();
    state.lesson = id;
    state.step = 0;
    state.motion = true;
    render();
  }
  function onVisualAction(event) {
    var cacheButton = event.target.closest("#cache-toggle");
    var distanceButton = event.target.closest("[data-distance]");
    if (cacheButton) {
      state.cacheOn = !state.cacheOn;
      render();
    } else if (distanceButton) {
      state.distance = distanceButton.dataset.distance;
      render();
    }
  }
  function initialize() {
    [
      "lessonTitle", "lessonSubtitle", "diagramTitle", "progressNumber", "progressTotal", "progressTrack", "progressFill",
      "stepTag", "stepHeading", "stepDescription", "stepTime", "stepVisual", "stepFootnote", "latencyValue",
      "timelineCaption", "timelineMidLabel", "timelineProgress", "timelineMarker", "recapChart",
      "stepButtons", "previousButton", "nextButton", "playButton", "playLabel", "replayButton", "liveStatus",
      "diagram", "blockLayer", "wireLayer", "packetLayer", "packetLabel", "distanceLabel", "mapCaptionText"
    ].forEach(function (id) {
      var map = {
        lessonTitle: "lesson-title", lessonSubtitle: "lesson-subtitle", diagramTitle: "diagram-title",
        progressNumber: "progress-number", progressTotal: "progress-total", progressTrack: "progress-track", progressFill: "progress-fill",
        stepTag: "step-tag", stepHeading: "step-heading", stepDescription: "step-description", stepTime: "step-time",
        stepVisual: "step-visual", stepFootnote: "step-footnote", latencyValue: "latency-value",
        timelineCaption: "timeline-caption", timelineMidLabel: "timeline-mid-label", timelineProgress: "timeline-progress",
        timelineMarker: "timeline-marker", recapChart: "recap-chart", stepButtons: "step-buttons",
        previousButton: "previous-button", nextButton: "next-button", playButton: "play-button",
        playLabel: "play-label", replayButton: "replay-button", liveStatus: "live-status",
        diagram: "system-diagram", blockLayer: "block-layer", wireLayer: "wire-layer", packetLayer: "packet-layer",
        packetLabel: "packet-label", distanceLabel: "distance-label", mapCaptionText: "map-caption-text"
      };
      els[id] = byId(map[id]);
    });
    renderBlocks();
    document.querySelector(".lesson-switcher").addEventListener("click", function (event) {
      var tab = event.target.closest("[data-lesson]");
      if (tab) chooseLesson(tab.dataset.lesson);
    });
    els.stepButtons.addEventListener("click", function (event) {
      var button = event.target.closest("[data-step]");
      if (!button) return;
      stopPlaying();
      selectStep(Number(button.dataset.step));
    });
    els.previousButton.addEventListener("click", function () { stopPlaying(); selectStep(state.step - 1); });
    els.nextButton.addEventListener("click", function () { stopPlaying(); nextStep(); });
    els.playButton.addEventListener("click", play);
    els.replayButton.addEventListener("click", replay);
    els.stepVisual.addEventListener("click", onVisualAction);
    render();
  }
  document.addEventListener("DOMContentLoaded", initialize);
}());
