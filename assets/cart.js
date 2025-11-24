class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", (event) => {
      event.preventDefault();
      const cartItems =
        this.closest("cart-items") || this.closest("cart-drawer-items");
      cartItems.updateQuantity(this.dataset.index, 0);
    });
  }
}
customElements.define("cart-remove-button", CartRemoveButton);

/* ---------- Helper Functions ---------- */

function buildAndStoreProductVariantMap(parsedCartState) {
  if (!parsedCartState || !parsedCartState.items) return;

  // ♻️ Restore personality if missing
  let currentClickedPersonality =
    localStorage.getItem("currentClickedPersonality") || null;

  if (!currentClickedPersonality) {
    try {
      // Try to fallback to quiz data
      const quizData = JSON.parse(localStorage.getItem("userQuizData") || "{}");
      if (quizData.personality) {
        currentClickedPersonality = quizData.personality;
      }
    } catch (err) {
      console.warn("⚠️ Could not restore personality from quiz data:", err);
    }

    // Default fallback if still missing
    currentClickedPersonality =
      currentClickedPersonality || "unknownPersonality";
    localStorage.setItem(
      "currentClickedPersonality",
      currentClickedPersonality
    );
  }

  const productVariantMap = {};

  // 🗺️ Map each design to its animal and personality
  const designMap = {
    "design 2": { animal: "armadilo", personality: "ownPersonality" },
    "design 3": { animal: "armadilo", personality: "antiPersonality" },
    "design 4": { animal: "armadilo", personality: "Neutral" },
    "design 5": { animal: "bear", personality: "ownPersonality" },
    "design 6": { animal: "bear", personality: "antiPersonality" },
    "design 7": { animal: "bear", personality: "Neutral" },
    "design 8": { animal: "badger", personality: "ownPersonality" },
    "design 9": { animal: "badger", personality: "antiPersonality" },
    "design 10": { animal: "badger", personality: "Neutral" },
  };

  parsedCartState.items.forEach((item) => {
    const productName = item.product_title || "Unnamed Product";
    const productId = item.product_id || item.id || "UnknownID";
    const variantId = item.variant_id || "UnknownVariantID";
    const variantTitle = item.variant_title || "Unknown Variant";
    const size = item.variant_options ? item.variant_options[1] : "NA";
    const quantity = item.quantity || 1;
    const price = item.final_price / 100 || 0;
    const linePrice = item.line_price / 100 || 0;

    // 🧩 Extract design part + number
    const [designPart] = variantTitle.split(" / ");
    const designNumberMatch = designPart.match(/design\s*(\d+)/i);
    const designNumber = designNumberMatch ? designNumberMatch[1] : "NA";

    // 🦊 Match animal/personality from designMap
    const match = Object.entries(designMap).find(([key]) =>
      designPart.includes(key)
    );
    const { animal = "NA", personality = currentClickedPersonality } = match
      ? match[1]
      : {};

    // 🧠 Create detailed item object
    const detailedItem = {
      productName,
      productId,
      variantId,
      variantTitle,
      size,
      quantity,
      price,
      linePrice,
      animal,
      personality,
      currentClickedPersonality,
      designNumber,
    };

    // 🏗️ Build nested object by product → animal → personality
    if (!productVariantMap[productName]) productVariantMap[productName] = {};
    if (!productVariantMap[productName][animal])
      productVariantMap[productName][animal] = {};
    if (!productVariantMap[productName][animal][personality])
      productVariantMap[productName][animal][personality] = [];

    productVariantMap[productName][animal][personality].push(detailedItem);
  });

  console.log("✅ Enriched + Persistent productVariantMap:", productVariantMap);

  // 💾 Store results (including personality)
  localStorage.setItem("parsedCartState", JSON.stringify(parsedCartState));
  localStorage.setItem("productVariantMap", JSON.stringify(productVariantMap));
  localStorage.setItem("currentClickedPersonality", currentClickedPersonality);

  console.log("💾 Saved enriched productVariantMap:", productVariantMap);

  // 📊 Push GA events using GA4-native eCommerce structure
  setTimeout(() => {
    const data = localStorage.getItem("productVariantMap");
    if (!data) {
      console.warn("⏳ No productVariantMap in localStorage yet");
      return;
    }

    const parsedMap = JSON.parse(data);
    const flattened = [];

    // Flatten the nested productVariantMap → array of items
    Object.values(parsedMap).forEach((animalObj) => {
      Object.values(animalObj).forEach((personalityObj) => {
        Object.values(personalityObj).forEach((itemsArray) => {
          flattened.push(...itemsArray);
        });
      });
    });

    const currentClickedPersonality =
      localStorage.getItem("currentClickedPersonality") || "unknownPersonality";

    // Build GA4 items[] array
    const gaItems = flattened.map((item, index) => ({
      item_name: item.productName,
      item_id: item.productId,
      item_variant: item.variantTitle,
      item_brand: "PersonallyU",
      price: item.price,
      quantity: item.quantity,
      item_category: item.animal,
      item_category2: item.personality,
      item_category3: item.designNumber,
      item_category4: currentClickedPersonality,
      index: index + 1,
    }));

    const totalValue = flattened.reduce((sum, i) => sum + i.linePrice, 0);

    window.dataLayer = window.dataLayer || [];

    // -------------------------------
    // 🔥 MAIN FIX: productVariantMap added at top level
    // -------------------------------
    window.dataLayer.push({
      event: "productVariantMap_ready",
      personality: currentClickedPersonality,
      cart_value: totalValue,
      cart_timestamp: new Date().toISOString(),
      // ⭐ THIS is what GTM needs — now "productVariantMap" exists
      productVariantMap: JSON.stringify(parsedMap),
      // GA4 items
      items: gaItems,
    });

    console.log("📈 GA push (GA4-native items + map):", {
      productVariantMap: JSON.stringify(parsedMap),
      items: gaItems,
    });

    // ----- OPTIONAL: auto "view_cart" -----
    if (window.location.pathname.includes("/cart")) {
      window.dataLayer.push({
        event: "view_cart",
        currency: "USD",
        value: totalValue,
        items: gaItems,
        personality: currentClickedPersonality,
        productVariantMap: JSON.stringify(parsedMap), // add map here as well
      });
    }

    // ----- OPTIONAL: begin_checkout -----
    const checkoutBtn = document.querySelector(
      '[name="checkout"], .checkout, #checkout'
    );
    if (checkoutBtn && !checkoutBtn.hasGAListener) {
      checkoutBtn.hasGAListener = true;
      checkoutBtn.addEventListener("click", () => {
        window.dataLayer.push({
          event: "begin_checkout",
          currency: "USD",
          value: totalValue,
          items: gaItems,
          personality: currentClickedPersonality,
          productVariantMap: parsedMap, // add map here as well
        });
      });
    }
  }, 800);
}

// Fetch live cart + rebuild
async function refreshProductVariantMap() {
  try {
    const response = await fetch("/cart.js");
    const parsedCartState = await response.json();
    buildAndStoreProductVariantMap(parsedCartState);
  } catch (error) {
    console.error("❌ Failed to refresh productVariantMap:", error);
  }
}

/* ---------- Cart Items Component ---------- */

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement =
      document.getElementById("shopping-cart-line-item-status") ||
      document.getElementById("CartDrawer-LineItemStatus");

    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);

    this.addEventListener("change", debouncedOnChange.bind(this));
  }

  cartUpdateUnsubscriber = undefined;

  connectedCallback() {
    this.cartUpdateUnsubscriber = subscribe(
      PUB_SUB_EVENTS.cartUpdate,
      (event) => {
        if (event.source === "cart-items") return;
        this.onCartUpdate();
      }
    );
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) this.cartUpdateUnsubscriber();
  }

  resetQuantityInput(id) {
    const input = this.querySelector(`#Quantity-${id}`);
    input.value = input.getAttribute("value");
    this.isEnterPressed = false;
  }

  setValidity(event, index, message) {
    event.target.setCustomValidity(message);
    event.target.reportValidity();
    this.resetQuantityInput(index);
    event.target.select();
  }

  validateQuantity(event) {
    const inputValue = parseInt(event.target.value);
    const index = event.target.dataset.index;
    let message = "";

    if (inputValue < event.target.dataset.min) {
      message = window.quickOrderListStrings.min_error.replace(
        "[min]",
        event.target.dataset.min
      );
    } else if (inputValue > parseInt(event.target.max)) {
      message = window.quickOrderListStrings.max_error.replace(
        "[max]",
        event.target.max
      );
    } else if (inputValue % parseInt(event.target.step) !== 0) {
      message = window.quickOrderListStrings.step_error.replace(
        "[step]",
        event.target.step
      );
    }

    if (message) {
      this.setValidity(event, index, message);
    } else {
      event.target.setCustomValidity("");
      event.target.reportValidity();
      this.updateQuantity(
        index,
        inputValue,
        document.activeElement.getAttribute("name"),
        event.target.dataset.quantityVariantId
      );
    }
  }

  onChange(event) {
    this.validateQuantity(event);
  }

  onCartUpdate() {
    const drawerMode = this.tagName === "CART-DRAWER-ITEMS";
    const url = drawerMode
      ? `${routes.cart_url}?section_id=cart-drawer`
      : `${routes.cart_url}?section_id=main-cart-items`;

    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        if (drawerMode) {
          const selectors = ["cart-drawer-items", ".cart-drawer__footer"];
          for (const selector of selectors) {
            const target = document.querySelector(selector);
            const source = html.querySelector(selector);
            if (target && source) target.replaceWith(source);
          }
        } else {
          const sourceQty = html.querySelector("cart-items");
          this.innerHTML = sourceQty.innerHTML;
        }

        // Always refresh productVariantMap after updating the DOM
        refreshProductVariantMap();
      })
      .catch(console.error);
  }

  getSectionsToRender() {
    return [
      {
        id: "main-cart-items",
        section: document.getElementById("main-cart-items").dataset.id,
        selector: ".js-contents",
      },
      {
        id: "cart-icon-bubble",
        section: "cart-icon-bubble",
        selector: ".shopify-section",
      },
      {
        id: "cart-live-region-text",
        section: "cart-live-region-text",
        selector: ".shopify-section",
      },
      {
        id: "main-cart-footer",
        section: document.getElementById("main-cart-footer").dataset.id,
        selector: ".js-contents",
      },
    ];
  }

  updateQuantity(line, quantity, name, variantId) {
    this.enableLoading(line);
    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((s) => s.section),
      sections_url: window.location.pathname,
    });

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), body })
      .then((response) => response.text())
      .then((state) => {
        const parsedState = JSON.parse(state);
        buildAndStoreProductVariantMap(parsedState); // keep map in sync

        const quantityElement =
          document.getElementById(`Quantity-${line}`) ||
          document.getElementById(`Drawer-quantity-${line}`);
        const items = document.querySelectorAll(".cart-item");

        if (parsedState.errors) {
          quantityElement.value = quantityElement.getAttribute("value");
          this.updateLiveRegions(line, parsedState.errors);
          return;
        }

        this.classList.toggle("is-empty", parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector("cart-drawer");
        const cartFooter = document.getElementById("main-cart-footer");
        if (cartFooter)
          cartFooter.classList.toggle("is-empty", parsedState.item_count === 0);
        if (cartDrawerWrapper)
          cartDrawerWrapper.classList.toggle(
            "is-empty",
            parsedState.item_count === 0
          );

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document
              .getElementById(section.id)
              .querySelector(section.selector) ||
            document.getElementById(section.id);
          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
        });

        const updatedValue = parsedState.items[line - 1]
          ? parsedState.items[line - 1].quantity
          : undefined;
        let message = "";
        if (
          items.length === parsedState.items.length &&
          updatedValue !== parseInt(quantityElement.value)
        ) {
          message =
            typeof updatedValue === "undefined"
              ? window.cartStrings.error
              : window.cartStrings.quantityError.replace(
                  "[quantity]",
                  updatedValue
                );
        }
        this.updateLiveRegions(line, message);

        publish(PUB_SUB_EVENTS.cartUpdate, {
          source: "cart-items",
          cartData: parsedState,
          variantId,
        });
      })
      .catch(() => {
        this.querySelectorAll(".loading__spinner").forEach((overlay) =>
          overlay.classList.add("hidden")
        );
        const errors =
          document.getElementById("cart-errors") ||
          document.getElementById("CartDrawer-CartErrors");
        errors.textContent = window.cartStrings.error;
      })
      .finally(() => {
        this.disableLoading(line);
      });
  }

  updateLiveRegions(line, message) {
    const lineItemError =
      document.getElementById(`Line-item-error-${line}`) ||
      document.getElementById(`CartDrawer-LineItemError-${line}`);
    if (lineItemError)
      lineItemError.querySelector(".cart-item__error-text").textContent =
        message;

    this.lineItemStatusElement.setAttribute("aria-hidden", true);

    const cartStatus =
      document.getElementById("cart-live-region-text") ||
      document.getElementById("CartDrawer-LiveRegionText");
    cartStatus.setAttribute("aria-hidden", false);
    setTimeout(() => {
      cartStatus.setAttribute("aria-hidden", true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems =
      document.getElementById("main-cart-items") ||
      document.getElementById("CartDrawer-CartItems");
    mainCartItems.classList.add("cart__items--disabled");

    const cartItemElements = this.querySelectorAll(
      `#CartItem-${line} .loading__spinner`
    );
    const cartDrawerItemElements = this.querySelectorAll(
      `#CartDrawer-Item-${line} .loading__spinner`
    );

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) =>
      overlay.classList.remove("hidden")
    );

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute("aria-hidden", false);
  }

  disableLoading(line) {
    const mainCartItems =
      document.getElementById("main-cart-items") ||
      document.getElementById("CartDrawer-CartItems");
    mainCartItems.classList.remove("cart__items--disabled");

    const cartItemElements = this.querySelectorAll(
      `#CartItem-${line} .loading__spinner`
    );
    const cartDrawerItemElements = this.querySelectorAll(
      `#CartDrawer-Item-${line} .loading__spinner`
    );

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) =>
      overlay.classList.add("hidden")
    );
  }
}
customElements.define("cart-items", CartItems);

/* ---------- Cart Note ---------- */
if (!customElements.get("cart-note")) {
  customElements.define(
    "cart-note",
    class CartNote extends HTMLElement {
      constructor() {
        super();
        this.addEventListener(
          "input",
          debounce((event) => {
            const body = JSON.stringify({ note: event.target.value });
            fetch(`${routes.cart_update_url}`, {
              ...fetchConfig(),
              body,
            });
          }, ON_CHANGE_DEBOUNCE_TIMER)
        );
      }
    }
  );
}

/* ---------- Keep productVariantMap Always Synced ---------- */
document.addEventListener("DOMContentLoaded", () => {
  refreshProductVariantMap(); // initial sync
});

// Optional: re-sync when Shopify emits cart updates
subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
  if (event.cartData) {
    buildAndStoreProductVariantMap(event.cartData);
  } else {
    refreshProductVariantMap();
  }
});

// Watch for DOM changes in cart to re-sync map
const cartObserver = new MutationObserver(() => {
  refreshProductVariantMap();
});
const cartElement = document.querySelector("cart-items, cart-drawer-items");
if (cartElement) {
  cartObserver.observe(cartElement, { childList: true, subtree: true });
}
