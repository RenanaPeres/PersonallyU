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

  const productVariantMap = {};

  // 🗺️ מיפוי של כל ה-designים
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
    const productTitle = item.product_title.split("Your personalized ")[1];
    const size = item.variant_options[1];
    const [designPart] = item.variant_title.split(" / ");

    // 🧩 שליפה מהמפה במקום תנאים
    const match = Object.entries(designMap).find(([key]) =>
      designPart.includes(key)
    );
    const { animal = "NA", personality = designPart } = match
      ? match[1]
      : {};

    item.personalityType = personality;

    // 🏗️ בניית המבנה המרובד
    productVariantMap[productTitle] ??= {};
    productVariantMap[productTitle][animal] ??= {};
    productVariantMap[productTitle][animal][personality] ??= {};
    productVariantMap[productTitle][animal][personality][size] =
      (productVariantMap[productTitle][animal][personality][size] || 0) +
      item.quantity;
  });

  console.log("✅ productVariantMap:", productVariantMap);


  // Store results
  localStorage.setItem("parsedCartState", JSON.stringify(parsedCartState));
  localStorage.setItem("productVariantMap", JSON.stringify(productVariantMap));
  console.log("💾 Saved productVariantMap:", productVariantMap);

  // Fire GA event
  setTimeout(function () {
    const data = localStorage.getItem("productVariantMap");
    if (data) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "productVariantMap_ready",
        productVariantMap: JSON.parse(data),
      });
      console.log("✅ productVariantMap_ready pushed with:", JSON.parse(data));
    } else {
      console.warn("⏳ Still no productVariantMap in localStorage");
    }
  }, 1000);
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
          message = typeof updatedValue === "undefined"
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
