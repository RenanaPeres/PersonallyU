let isSubmitting = false;
let lastSubmitTime = 0;
let isBlocked = false;

document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // BLOCKED SESSION CHECK
    if (isBlocked) {
      alert("🚫 You are temporarily blocked by Shopify. Please wait 10 minutes and try again.");
      return;
    }

    // RATE LIMIT CHECK
    const now = Date.now();
    if (now - lastSubmitTime < 3000 || isSubmitting) {
      console.warn("⏳ Slow down: Add to cart is rate-limited.");
      return;
    }

    isSubmitting = true;
    lastSubmitTime = now;

    try {
      const formData = new FormData(form);

      // Add to cart
      const addRes = await fetch("/cart/add", {
        method: "POST",
        body: formData
      });

      if (!addRes.ok) {
        const text = await addRes.text();
        console.error("❌ Add to cart failed:", addRes.status);
        console.log("🧾 Response preview:", text.slice(0, 200));

        if (addRes.status === 429 && text.includes("Too many attempts")) {
          isBlocked = true;
          alert("❌ Shopify has temporarily blocked your session. Please try again later.");
        }

        return;
      }

      // Slight delay to give Shopify time to update cart
      await new Promise(resolve => setTimeout(resolve, 300));

      // Fetch updated cart
      const cartRes = await fetch("/cart.js");
      if (!cartRes.ok) {
        console.error("🛑 Failed to fetch cart.js:", cartRes.status);
        return;
      }

      const cart = await cartRes.json();
      buildAndStoreProductVariantMap(cart);

    } catch (err) {
      console.error("⚠️ Unexpected error during cart operation:", err);
    } finally {
      // Cooldown before next submit
      setTimeout(() => {
        isSubmitting = false;
      }, 1500);
    }
  });
});
