// Prevent spamming
let isSubmitting = false;

const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');

addToCartForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    try {
      const addRes = await fetch("/cart/add", {
        method: "POST",
        body: new FormData(form),
      });

      if (!addRes.ok) {
        console.error("Add to cart failed:", addRes.status);
        return;
      }

      // Optional delay to let Shopify process the update
      await new Promise(resolve => setTimeout(resolve, 300));

      const res = await fetch("/cart.js");

      if (!res.ok) {
        console.error("Fetching cart failed:", res.status);
        return;
      }

      const cart = await res.json();
      buildAndStoreProductVariantMap(cart);

    } catch (err) {
      console.error("Cart handling error:", err);
    } finally {
      // Delay before next attempt to avoid 429
      setTimeout(() => {
        isSubmitting = false;
      }, 1500); // Wait 1.5 seconds before allowing next submit
    }
  });
});
