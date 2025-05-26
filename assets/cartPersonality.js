let isBlocked = false;
let lastSubmitTime = 0;

document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isBlocked) {
      alert("🚫 You are temporarily blocked by Shopify. Wait 10 minutes before trying again.");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTime < 3000) {
      console.warn("Throttled: Add-to-cart is rate-limited.");
      return;
    }
    lastSubmitTime = now;

    try {
      const formData = new FormData(form);
      const res = await fetch("/cart/add", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const raw = await res.text();
        console.error("Add to cart failed:", res.status);
        console.log("Response preview:", raw.slice(0, 200));

        if (res.status === 429 && raw.includes("Too many attempts")) {
          // isBlocked = true;
          // alert("❌ Shopify blocked your session due to too many attempts. Try again later.");
        }

        return;
      }

      const cartRes = await fetch("/cart.js");
      const cart = await cartRes.json();
      buildAndStoreProductVariantMap(cart);

    } catch (err) {
      console.error("Unexpected error:", err);
    }
  });
});
