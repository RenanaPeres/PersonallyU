// Target all add-to-cart forms (Shopify default)
const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');

addToCartForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Submit with AJAX
    await fetch("/cart/add", {
      method: "POST",
      body: new FormData(form),
    });

    // Fetch the updated cart and update your map
    const res = await fetch("/cart.js");
    const cart = await res.json();

    buildAndStoreProductVariantMap(cart); // Use your function here!
  });
});
