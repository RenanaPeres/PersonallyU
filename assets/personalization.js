(function () {
  // ------------------ Constants ------------------
  const CATALOG_BASE = "https://personallyu.com/collections/products/";
  const QUIZ_URL = "https://huji.questionpro.eu/a/TakeSurvey?tt=P/VDme5CUhAD5ltxMh/wHg%3D%3D";


  // URLs TO PERSONALITY PAGE 
  const personalityUrls = {
    hat: {
      EX: "https://personallyu.com/products/ex-your-personalised-hat",
      IN: "https://personallyu.com/products/in-your-personalised-hat",
      MS: "https://personallyu.com/products/ms-your-personalised-hat",
      SY : "https://personallyu.com/products/sy-your-personalised-hat",
      CR : "https://personallyu.com/products/cr-your-personalised-hat",
      AN : "https://personallyu.com/products/an-your-personalised-hat",
      SD : "https://personallyu.com/products/sd-your-personalised-hat",
      CL : "https://personallyu.com/products/cl-your-personalised-hat",
      CM : "https://personallyu.com/products/cm-your-personalised-hat",
      OM : "https://personallyu.com/products/om-your-personalised-hat",
      AMB : "https://personallyu.com/products/amb-your-personalised-hat",
      NO : "https://personallyu.com/products/no-your-personalised-hat"
    },
    
    shirt: {
      EX: "https://personallyu.com/products/ex-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      IN: "https://personallyu.com/products/in-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      MS: "https://personallyu.com/products/ms-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      SY : "https://personallyu.com/products/sy-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      CR : "https://personallyu.com/products/cr-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      AN : "https://personallyu.com/products/an-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      SD : "https://personallyu.com/products/sd-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      CL : "https://personallyu.com/products/cl-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      CM : "https://personallyu.com/products/cm-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      OM : "https://personallyu.com/products/om-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      AMB : "https://personallyu.com/products/amb-heavyweight-unisex-crewneck-t-shirt-gildan®-5000",
      NO : "https://personallyu.com/products/no-heavyweight-unisex-crewneck-t-shirt-gildan-5000"
    },

      bottle: {
      EX: "https://personallyu.com/products/ex-your-personalized-water-bottle",
      IN: "https://personallyu.com/products/in-your-personalized-water-bottle",
      MS: "https://personallyu.com/products/ms-your-personalized-water-bottle",
      SY : "https://personallyu.com/products/sy-your-personalized-water-bottle",
      CR : "https://personallyu.com/products/cr-your-personalized-water-bottle",
      AN : "https://personallyu.com/products/an-your-personalized-water-bottle",
      SD : "https://personallyu.com/products/sd-your-personalized-water-bottle",
      CL : "https://personallyu.com/products/cl-your-personalized-water-bottle",
      CM : "https://personallyu.com/products/cm-your-personalized-water-bottle",
      OM : "https://personallyu.com/products/om-your-personalized-water-bottle",
      AMB : "https://personallyu.com/products/amb-your-personalized-water-bottle",
      NO : "https://personallyu.com/products/no-your-personalized-water-bottle"
    },

      mug: {
      EX: "",
      IN: "",
      MS: "",
      SY : "",
      CR : "",
      AN : "",
      SD : "",
      CL : "",
      CM : "",
      OM : "",
      AMB : "",
      NO : ""
    }
  };
 // PHOTOS OF ARMADILOS 
const designedProductsImageURLs = {
  IN: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/IN.png?v=1744208187",
  MS: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/MS.png?v=1744208187",
  EX: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/EX.png?v=1744208187",
  SY : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SY.png?v=1744208173",
  CR : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CR.png?v=1744208185",
  AN : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AN.png?v=1744208254",
  SD : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SD.png?v=1744208186",
  CL : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CL.png?v=1744208187",
  CM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CM.png?v=1744208185",
  OM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/OM.png?v=1744208186",
  AMB: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AMB.png?v=1744216274"
};

// PERSONALITY FROM A PHOTO (OPPOSITE OF PREVIOUS MAP)
const designedProductsURLsToPersonality = {
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/IN.png?v=1744208187": "IN",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/MS.png?v=1744208187": "MS",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/EX.png?v=1744208187": "EX",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SY.png?v=1744208173": "SY",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CR.png?v=1744208185": "CR",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AN.png?v=1744208254": "AN",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SD.png?v=1744208186": "SD",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CL.png?v=1744208187": "CL",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CM.png?v=1744208185": "CM",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/OM.png?v=1744208186": "OM",
  "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AMB.png?v=1744216274": "AMB"
};

// PHOTOS OF PRODUCTS WITHOUT DESIGN
  const genericProductsImageURLs = {
  shirt: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/3b367884-fc1f-4618-a420-561a6b5ed358.webp?v=1745171738"
  };



  // PERSONALITY AND ITS ANTI PERSONALITY
  const AntiPersonality = {
    IN : "EX", // introverted -> extraverted
    EX : "IN", // extraverted -> introverted
    SY : "CR", // sympathetic -> critical
    CR : "SY", // critical -> sympathetic
    MS : "AN", // mentally_stable -> anxious
    AN : "MS", // anxious -> mentally_stable
    SD : "CL", // self_discipline -> careless
    CL : "SD", // careless -> self_discipline
    CM : "OM",  // closed_minded -> open_minded
    OM : "CM" // open_minded -> closed_minded
  };
  // LIST OF PERSONALITY DESIGNS TO SHOW FOR EACH PERSONALITY
  const personalityToDesignImages = { // own personality, anti personality, mentaly stable
    IN:  ["IN", AntiPersonality["IN"], "AMB"],
    EX:  ["EX", AntiPersonality["EX"], "AMB"],
    MS:  ["MS", AntiPersonality["MS"], "AMB"],
    SY : ["SY", AntiPersonality["SY"], "AMB"],
    CR : ["CR", AntiPersonality["CR"], "AMB"],
    AN : ["AN", AntiPersonality["AN"], "AMB"],
    SD : ["SD", AntiPersonality["SD"], "AMB"],
    CL : ["CL", AntiPersonality["CL"], "AMB"],
    CM : ["CM", AntiPersonality["CM"], "AMB"],
    OM : ["OM", AntiPersonality["OM"], "AMB"],
    AMB : ["AMB", AntiPersonality["IN"], AntiPersonality["EX"]],
    NO: ["IN", "AMB", "CR"]
  };

  // ------------------ Helpers ------------------

function getImageURLs() {
  let storedData = JSON.parse(localStorage.getItem("userQuizData")) || {};
  
  const personality = storedData.personality || "NO";
  
  const detectedType = localStorage.getItem("productType");
  
  // const baseURL = genericProductsImageURLs[detectedType];
  // console.log("🌐 Base Image URL for Product Type:", baseURL);
  
  const designKeys = personalityToDesignImages[personality];
  if (!Array.isArray(designKeys)) return [null, null, null];
  const designURLs = designKeys.map(key => designedProductsImageURLs[key] || null);
  return designURLs;
}

  function updateLabels() {
    // console.log("🔄 Updating labels...");
    const [url1, url2, url3] = getImageURLs();
    if (!url1 || !url2 || !url3) {
      return;
    }
  
    const designs = [
      { for: "template--18147309650102__main-1-0", url: url1 },
      { for: "template--18147309650102__main-1-1", url: url2 },
      { for: "template--18147309650102__main-1-2", url: url3 }
    ];
    // console.log("🔄 Designs to update:", designs);
  
    designs.forEach(({ for: id, url }) => {
      const label = document.querySelector(`label[for="${id}"]`);
      // console.log("🔄 Label found:", label);
      if (label && !label.querySelector(`img[data-design="${id}"]`)) {
        // console.log("🔄 Updating label with image:", url);
        label.childNodes[0].textContent = '';
        const img = document.createElement("img");
        
        img.src = url;
        img.about = designedProductsURLsToPersonality[url] ?? "noPersonality";
        img.width = 98;
        img.alt = "Design Image";
        img.dataset.design = id;
        img.classList.add("label-image");
        Object.assign(img.style, {
            objectFit: "cover",
            borderRadius: "100px",
            display: "block",
            width: "100%",
            height: "100%",
          });

        label.appendChild(img);
        // console.log("🔄 Updated label with image:", img);
      }
    });
  }  


function randomizeFieldset() {
  console.log("randomizeFieldset...");
  const fieldset = document.querySelector(".product-form__input--pill");
  if (!fieldset || fieldset.dataset.randomized === "true") return;

  const allElements = Array.from(fieldset.querySelectorAll("input[type='radio'], label"));
  if (allElements.length < 6) return;

  const fixedPair = allElements.slice(0, 2);
  const pairs = [];

  for (let i = 2; i < allElements.length; i += 2) {
    pairs.push([allElements[i], allElements[i + 1]]);
  }

  // Shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  const cloneElements = [...fixedPair, ...pairs.flat()].map(el => el.cloneNode(true));
  fieldset.innerHTML = "";
  cloneElements.forEach(el => fieldset.appendChild(el));
  fieldset.dataset.randomized = "true";
}

// ✅ Watch only the variant wrapper for Shopify re-render
function observeVariants() {
  const variantWrapper = document.querySelector("#variant-selects-template--17814043295926__main");
  if (!variantWrapper) return;

  const observer = new MutationObserver(() => {
    const fieldset = document.querySelector(".product-form__input--pill");
    if (fieldset && !fieldset.dataset.randomized) {
      updateLabels();
    }
  });

  observer.observe(variantWrapper, {
    childList: true,
    subtree: true,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateLabels(); 
  observeVariants();         // Catch Shopify’s variant replacement
});


  function getPersonalityType(chosedPersonality) {
    const storedData = JSON.parse(localStorage.getItem("userQuizData")) || {};
    const personality = storedData.personality;
  
    if (chosedPersonality === "noPersonality") return chosedPersonality;
    if (chosedPersonality === personality) return "ownPersonality";
    if (chosedPersonality === AntiPersonality[personality]) return "antiPersonality";
  
    return "neutral";
  }

  function startCartObserver() {
    const observer = new MutationObserver(() => {
      const btn = document.querySelector('a[href="/collections/all"].button');
      if (btn) btn.remove();
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  // Safe to call on each page load
  document.addEventListener("DOMContentLoaded", startCartObserver);


$(document).on("click", "a", function (event) {
  const $link = $(this);
  const href = $link.attr("href");
  // console.log("🔍 Clicked link href:", href);

  if (!href.includes("personallyu.com") && !href.includes("/collections/customer")) return;

  // console.log("✅ Match found, running redirect override");

  event.preventDefault();
  event.stopImmediatePropagation();

  const dataStr = localStorage.getItem("userQuizData");
  // console.log("📦 userQuizData from localStorage:", dataStr);

  try {
    const data = JSON.parse(dataStr);
    // console.log("✅ Parsed data:", data);

    if (data?.personality && data?.responseId) {
      // console.log("🚀 Redirecting");
      const targetUrl = `/collections/products/${data.personality}?response_id=${data.responseId}&set=${data.personality}`;
      // console.log("🚀 Redirecting to:", targetUrl);
      window.location.href = targetUrl;
    } else {
      console.warn("⚠️ Missing personality or responseId, redirecting to fallback");
      window.location.href = "https://personallyu.com/collections/customer";
    }
  } catch (e) {
    console.error("❌ Error parsing localStorage data:", e);
    window.location.href = "https://personallyu.com/collections/customer";
  }
});



  // ------------------ Main Execution ------------------

//   document.querySelectorAll('input[type="radio"][name^="Design"]').forEach(input => {
//   input.addEventListener('change', event => {
//     event.preventDefault();              // Stops default browser behavior
//     event.stopImmediatePropagation();    // Prevents Shopify's script from running

//     const selectedValue = event.target.value;
//     const variantId = document.querySelector('input[name="id"]')?.value;

//     console.log("🛑 Intercepted! Variant:", selectedValue, "ID:", variantId);

//     // Optionally: run your custom behavior here
//   });
// });

  $(function () {
  const $fieldset = $(".product-form__input--pill");

  if ($fieldset.length) {
  }

  updateLabels();

  const $targetNode = $("#variant-selects-template--17814043295926__main");
  if ($targetNode) {
    const observer = new MutationObserver(throttle(updateLabels, 200));
    observer.observe(document.body, { childList: true, subtree: true });
  }
    


    // ---------------DO NOT TOUCH!!!!!!----START----------
    // Retrieve URL parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlResponseId = urlParams.get("response_id");
    const urlPersonality = urlParams.get("set") || "AMB";
    window.personalityCartCounter = window.personalityCartCounter || {};
  
    // Retrieve stored data from localStorage, if any
    let storedData = JSON.parse(localStorage.getItem("userQuizData")) || {};
  
    // If URL parameters exist, update localStorage and use them

    if (urlResponseId && urlPersonality) {
      storedData = { responseId: urlResponseId, personality: urlPersonality };
      localStorage.setItem("userQuizData", JSON.stringify(storedData));
    }
  
    // If URL parameters are missing but stored data exists, use the stored data
    let responseId = urlResponseId || storedData.responseId;
    let personality = urlPersonality || storedData.personality;
  
    // console.log("Response ID:", responseId);
    // console.log("Personality:", personality);
  
    // Define catalog URLs
    const catalogUrl = "https://personallyu.com/collections/products/";
    const catalogUrl2 = "https://personallyu.com/collections/products";
  
    // Redirect if the user has already completed the quiz
    const currentURL = window.location.href;
    if (currentURL === catalogUrl && storedData) {
      window.location.href = `${catalogUrl}${storedData.personality}?response_id=${storedData.responseId}&personality=${storedData.personality}`;
      return;
    }
  
    if (currentURL.startsWith(catalogUrl) && !responseId && storedData) {
      if (storedData.personality )
      window.location.href = `${catalogUrl}?response_id=${storedData.responseId}&personality=${storedData.personality}`;
      return;
    }
    // ---------------DO NOT TOUCH!!!!!!----END----------

    const detectedProductType = Object.keys(personalityUrls).find(type => window.location.href.includes(type));
      if (detectedProductType) {
        localStorage.setItem("productType", detectedProductType);
      }
    
  const $submitBtn = $("#ProductSubmitButton-template--17814043295926__main");
  localStorage.setItem("currentClickedPersonality", "");
  
  if ($submitBtn.length) {
    $submitBtn.on("click", function () {
      const currentPersonality = localStorage.getItem("currentClickedPersonality");
      localStorage.setItem("AddtoCartPersonality", currentPersonality);
    });
  }


  if (window.location.href.startsWith("https://personallyu.com/checkouts")) {
  document.addEventListener("DOMContentLoaded", function() {
    // Make sure variantMap is global
    window.variantMap = {};

    fetch('/cart.js')
      .then(res => res.json())
      .then(cart => {
        cart.items.forEach(item => {
          const productTitle = item.product_title;
          const variantTitle = item.variant_title;
          const qty = item.quantity;

          if (!window.variantMap[productTitle]) window.variantMap[productTitle] = {};
          window.variantMap[productTitle][variantTitle] = (window.variantMap[productTitle][variantTitle] || 0) + qty;
        });

        // Save variantMap to localStorage after building it
        localStorage.setItem("variantMap", JSON.stringify(window.variantMap));
        // console.log("✅ variantMap saved to localStorage on checkout:", window.variantMap);
      });
  });
}



  // Update labels when label is clicked
  document.addEventListener("click", function (event) {
    const label = event.target.closest('label[for^="template--"]');
    if (label) {
      // event.stopPropagation();
      // updateLabels();
      const img = label.querySelector('img');
      if (img) {
        const personalityType = getPersonalityType(img.about);
        localStorage.setItem("currentClickedPersonality", personalityType);
      } 
    }
  });
});
  

  })();


  document.addEventListener("DOMContentLoaded", function () {

    function handleRedirectClick(event) {
    // event.preventDefault();
    // event.stopImmediatePropagation(); // 🛑 Prevent Shopify’s handler too!
  const dataStr = localStorage.getItem("userQuizData");
  // console.log("userQuizData from localStorage:", dataStr);

  try {
    const data = JSON.parse(dataStr);
    // console.log("Parsed userQuizData:", data);

    if (data?.personality && data?.responseId) {
      // console.log("Redirecting to personalized URL...");
      // event.preventDefault(); // stop default link behavior
      const targetUrl = `https://personallyu.com/collections/products/${data.personality}?response_id=${data.responseId}&set=${data.personality}`;
      // console.log("Redirect URL:", targetUrl);
      window.location.href = targetUrl;
    } else {
      // console.log("Missing personality or responseId in userQuizData.");
    }
  } catch (e) {
    console.error("Failed to parse userQuizData:", e);
    // Do nothing and allow default link behavior
  }
}

  $("#checkoutNow").text("Checkout Now 💳");
  // $("#ProductSubmitButton-template--17814043295926__main").text("Add to cart 🛒");
  const $link = $('a[href="/collections/customer"]');

  if ($link.length) {
    const $button = $('<button>', {
      id: 'continueShoppingProductPage',
      class: 'button button--primary',
      type: 'button',
      text: 'Continue Shopping 🛍️',
      css: { width: '100%' },
      click: handleRedirectClick
    });
    $link.replaceWith($button);
  }
});

  $("#checkoutNow").on("click", function () {
  $(this).slideDown("fast");
});


document.addEventListener("DOMContentLoaded", function () {
  const bannerBox = document.querySelector(".banner__box.content-container--full-width-mobile");

  if (bannerBox) {
    bannerBox.style.maxWidth = "20%";
    bannerBox.style.maxHeight = "100%";
    bannerBox.style.position = "absolute";
    bannerBox.style.top = "55%";
    // bannerBox.style.padding = "40px"; // Add internal spacing
    const parent = bannerBox.parentElement;
    // parent.style.display = "flex";
    bannerBox.style.transform = "translate(0%, -60%)";
    bannerBox.style.zIndex = "10"; // ensure it appears above the image
    bannerBox.style.textAlign = "center";
    const subtitleParagraph = bannerBox?.querySelector(".banner__text.rte.subtitle p");
    if (subtitleParagraph) {
      subtitleParagraph.style.textAlign = "center";        // Center the text inside the <p>
      subtitleParagraph.style.marginLeft = "auto";         // Auto side margins
      subtitleParagraph.style.marginRight = "auto";        // Auto side margins
      subtitleParagraph.style.display = "block";           // Ensure it behaves as a block
      subtitleParagraph.style.width = "fit-content";       // Shrinks to fit the content (optional)
}
  }

if (window.innerWidth < 600) {

  const container = document.querySelector(".banner__box.content-container");

  if (!container) {
    console.error("Banner container not found.");
  }


  container.style.maxWidth = "400px";
  // container.style.transform = "translate(-0%, -600%)"

  const wrapper = document.createElement("div");



  Object.assign(wrapper.style, {
    position: "fixed",                      // יישאר במקומו גם בגלילה
    top: "-250px",                             // הנמכה מהחלק העליון
    left: "50%",
    transform: "translateX(-50%)",         // ממרכז את הקופסה אופקית
    backgroundColor: "white",
    padding: "24px 20px",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
    width: "85%",                          // מותאם למובייל
    maxWidth: "500px",                     // מגבלה לדסקטופ
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    zIndex: "1000"
  });

  const heading = container.querySelector("h2.banner__heading");
  const paragraph = container.querySelector("p");
  const buttons = container.querySelector(".banner__buttons");

  if (!heading || !paragraph || !buttons) {
    console.error("Required elements not found in the banner container.");
    return;
  }


  wrapper.appendChild(heading);
  wrapper.appendChild(paragraph);
  wrapper.appendChild(buttons);

  container.appendChild(wrapper);


  heading.style.fontSize = "28px";
  heading.style.lineHeight = "1.2";
  heading.style.marginBottom = "16px";

  paragraph.style.fontSize = "16px";
  paragraph.style.lineHeight = "1.4";
  paragraph.style.marginBottom = "20px";

  buttons.style.gap = "12px";
  buttons.style.flexWrap = "wrap";

  const popup = document.getElementById("popupBox");

  if (!popup) {
    console.error("Popup element not found.");
    return;
  }
    popupBox.style.width = "100%";
    popupBox.style.top = "-120px";
    popupBox.style.padding = "25px";

}



});

const observer = new MutationObserver(() => {
  $(".product-option dt").each(function () {
    if ($(this).text().trim() === "Design:" && $(this).parent().length) {
      $(this).parent().hide(); // hide entire row
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});


