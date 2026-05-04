(function () {
  // ------------------ Constants ------------------
  // const CATALOG_BASE = "https://personallyu.com/collections/products/";
  // const QUIZ_URL = "https://huji.questionpro.eu/a/TakeSurvey?tt=P/VDme5CUhAD5ltxMh/wHg%3D%3D";
  const NUMBER_OF_VARIANTS = 9;


  // URLs TO PERSONALITY PAGE 
  const personalityUrls = {
    hat: {
      EX: "https://personallyu.com/products/ex-your-personalised-snapback-hat",
      IN: "https://personallyu.com/products/in-your-personalised-snapback-hat",
      MS: "https://personallyu.com/products/ms-your-personalised-snapback-hat",
      SY : "https://personallyu.com/products/sy-your-personalised-snapback-hat",
      CR : "https://personallyu.com/products/cr-your-personalised-snapback-hat",
      AN : "https://personallyu.com/products/an-your-personalised-snapback-hat",
      SD : "https://personallyu.com/products/sd-your-personalised-snapback-hat",
      CL : "https://personallyu.com/products/cl-your-personalised-snapback-hat",
      CM : "https://personallyu.com/products/cm-your-personalised-snapback-hat",
      OM : "https://personallyu.com/products/om-your-personalised-snapback-hat",
      AMB : "https://personallyu.com/products/amb-your-personalised-snapback-hat",
      NO : "https://personallyu.com/products/no-your-personalised-snapback-hat"
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
      EX: "https://personallyu.com/products/ex-your-personalized-mug",
      IN: "https://personallyu.com/products/in-your-personalized-mug",
      MS: "https://personallyu.com/products/ms-your-personalised-mug",
      SY : "https://personallyu.com/products/sy-your-personalised-mug",
      CR : "https://personallyu.com/products/cr-your-personalised-mug",
      AN : "https://personallyu.com/products/an-your-personalised-mug",
      SD : "https://personallyu.com/products/sd-your-personalised-mug",
      CL : "https://personallyu.com/products/cl-your-personalised-mug",
      CM : "https://personallyu.com/products/cm-your-personalised-mug",
      OM : "https://personallyu.com/products/om-your-personalised-mug",
      AMB : "https://personallyu.com/products/amb-your-personalised-mug",
      NO : "https://personallyu.com/products/no-your-personalised-mug"
    },
    
     Card: {
      EX: "https://personallyu.com/products/ex-your-personalized-greeting-card",
      IN: "https://personallyu.com/products/in-your-personalized-greeting-card",
      MS: "https://personallyu.com/products/ms-your-personalized-greeting-card",
      SY : "https://personallyu.com/products/sy-your-personalized-greeting-card",
      CR : "https://personallyu.com/products/cr-your-personalized-greeting-card",
      AN : "https://personallyu.com/products/an-your-personalized-greeting-card",
      SD : "https://personallyu.com/products/sd-your-personalized-greeting-card",
      CL : "https://personallyu.com/products/cl-your-personalized-greeting-card",
      CM : "https://personallyu.com/products/cm-your-personalized-greeting-card",
      OM : "https://personallyu.com/products/om-your-personalized-greeting-card",
      AMB : "https://personallyu.com/products/amb-your-personalized-greeting-card",
      NO : "https://personallyu.com/products/no-your-personalized-greeting-card"
    },

     Sticker: {
      EX: "https://personallyu.com/products/ex-your-personalized-sticker",
      IN: "https://personallyu.com/products/in-your-personalized-sticker",
      MS: "https://personallyu.com/products/ms-your-personalized-sticker",
      SY : "https://personallyu.com/products/sy-your-personalized-sticker",
      CR : "https://personallyu.com/products/cr-your-personalized-sticker",
      AN : "https://personallyu.com/products/an-your-personalized-sticker",
      SD : "https://personallyu.com/products/sd-your-personalized-sticker",
      CL : "https://personallyu.com/products/cl-your-personalized-sticker",
      CM : "https://personallyu.com/products/cm-your-personalized-sticker",
      OM : "https://personallyu.com/products/om-your-personalized-sticker",
      AMB : "https://personallyu.com/products/amb-your-personalized-sticker",
      NO : "https://personallyu.com/products/no-your-personalized-sticker"
    }
  };
 // PHOTOS OF ARMADILOS 
const designedProductsImageURLs = {

  armadilo : {
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
  },
  bear : {
    IN: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/IN_bear.webp?v=1755803621",
    MS: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/MS_Bear.webp?v=1755864752",
    EX: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/EX_bear.webp?v=1755803538",
    SY : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SY_Bear.webp?v=1755864738",
    CR : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CR_bear.webp?v=1755803593",
    AN : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AN_bear.png?v=1755803414",
    SD : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SD_bear.webp?v=1755803493",
    CL : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CL_bear.webp?v=1755803578",
    CM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CM_bear.webp?v=1755803512",
    OM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/OM_bear.webp?v=1755803555",
    AMB: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AMB_bear.webp?v=1755803376"
  },

  badger : {
    IN: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/IN_Badger.webp?v=1755864493",
    MS: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/MS_Badger.png?v=1762436347",
    EX: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/EX_Badger.webp?v=1755864524",
    SY : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SY_Badger.webp?v=1755864431",
    CR : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CR_Badger.webp?v=1755864479",
    AN : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AN_Badger.webp?v=1755864565",
    SD : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SD_Badger.webp?v=1755864443",
    CL : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CL_Badger.webp?v=1755864550",
    CM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CM_Badger.webp?v=1755864465",
    OM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/OM_Badger.webp?v=1755864506",
    AMB: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/amb_new_badger.png?v=1756968717"
  },
  hedgehog : {
        IN: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/IN_5a75cd0c-6473-4a58-b938-8af21eb777c7.jpg?v=1777839844",
        MS: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/MS_eccdd0a1-a8e8-42df-9ca6-6062af529729.jpg?v=1777839845",
        EX: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/EX_f974c7d5-7124-4025-be76-03208374f08a.jpg?v=1777839844",
        SY : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SY_4ed3b150-48fb-4ebe-9548-23c612e03441.jpg?v=1777839844",
        CR : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CR_485d46a3-bd49-4831-823d-b9da41bc3402.jpg?v=1777839844",
        AN : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AN_a351d136-39d3-4bec-80c5-58160ed61e61.jpg?v=1777839844",
        SD : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SD_b98c8647-6f50-41e7-9e7f-9bd283474773.jpg?v=1777839844",
        CL : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CL_cba2eea3-7ea3-4fda-8b8e-a70171414d9b.jpg?v=1777839844",
        CM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CM_d9cbb3ab-8b84-41fb-a95b-bf122b6946a5.jpg?v=1777839843",
        OM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/OM_48802f92-0077-4cd5-99f9-09d0969c3533.jpg?v=1777839843",
        AMB: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AMB_b68acd6f-196c-4212-87b2-05a7576fccc1.jpg?v=1777839844"
    },
    capybara : {
        IN: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/IN_1886255a-fe89-4529-927f-ea928b4a233b.jpg?v=1777840028",
        MS: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/MS_fa20a4fb-87d0-4a0b-8a05-57b35f423544.jpg?v=1777840028",
        EX: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/EX_683d1e37-4a93-4823-ae8c-24e7d8742962.jpg?v=1777840028",
        SY : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SY_974f0ead-2b4c-4958-9f7e-441326728021.jpg?v=1777840028",
        CR : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CR_c4f94e71-597a-4dfe-a610-c96531345dcb.jpg?v=1777840027",
        AN : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AN_ecdc3c3e-a438-45d5-9c92-40231ffc096d.jpg?v=1777840029",
        SD : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/SD_e41a1013-03b3-4acd-9233-a1a6d5f9c661.jpg?v=1777840028",
        CL : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CL_ea75b1e0-2e3b-496c-a57a-b059d1fa2efd.jpg?v=1777840028",
        CM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/CM_8962ddd1-0fa6-4004-9b3d-4b4836a02cdb.jpg?v=1777840027",
        OM : "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/OM_c965154a-d1a1-4683-94d2-ef8fef595af2.jpg?v=1777840027",
        AMB: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/AMB_06e2e682-1ee4-4318-a22b-10f705e96226.jpg?v=1777840028"
    },
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
  // const genericProductsImageURLs = {
  // shirt: "https://cdn.shopify.com/s/files/1/0679/4585/7206/files/3b367884-fc1f-4618-a420-561a6b5ed358.webp?v=1745171738"
  // };



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
  const personalityToDesignImages = { // own personality, anti personality, mentally stable
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
function initSearchTagInjection() {
  document.addEventListener(
  "submit",
  function (e) {
    const form = e.target;

    if (!form.matches('form[action="/search"]')) return;

    const input = form.querySelector('input[name="q"]');
    if (!input) return;

    let query = input.value || "";

    const dataStr = localStorage.getItem("userQuizData");
    if (!dataStr) return;

    let data;
    try {
      data = JSON.parse(dataStr);
    } catch {
      return;
    }

    const personality = data?.personality;
    if (!personality) return;

    // 👇 IMPORTANT: do NOT modify visible input
    const cleanQuery = query.split(/tag:/i)[0].trim();

    // 👇 build hidden query
    const finalQuery = `${cleanQuery} tag:${personality}`;

    console.log("[Search Debug] Final query (hidden):", finalQuery);

    // 👇 temporarily override WITHOUT showing it
    input.value = finalQuery;

    // 👇 immediately restore clean UI (prevents flicker)
    requestAnimationFrame(() => {
      input.value = cleanQuery;
    });

  },
  true
);
}

function observeAndRemovePredictiveGroups() {
  const observer = new MutationObserver(() => {
    const groups = document.querySelectorAll(".predictive-search__result-group");

    groups.forEach(group => {
      console.log("[Search Debug] Removing predictive group");
      group.remove();
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function observeAndRemoveProductCount() {
  const observer = new MutationObserver(() => {
    const el = document.getElementById("ProductCountDesktop");

    if (el) {
      console.log("[Observer] Removing ProductCountDesktop");
      el.remove();

      observer.disconnect(); // 👈 stop after removing once
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  }); 
}

function cleanInput(input) {
  if (!input.value) return;

  const original = input.value;

  // Remove everything from "tag:" onward
  const cleaned = original.split(/tag:/i)[0].trim();

  if (original !== cleaned) {
    console.log("[Search Clean] Before:", original);
    console.log("[Search Clean] After:", cleaned);

    input.value = cleaned;
  }
}

function observeAndCleanSearchInput() {
  const observer = new MutationObserver(() => {
    const input = document.querySelector(
      ".template-search__search input.search__input.field__input"
    );

    if (!input) return;

    cleanInput(input);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} 

function getImageURLs() {
  
  const storedData = JSON.parse(localStorage.getItem("userQuizData") || "{}");
  
  const personality = storedData.personality || "NO";
  const designKeys = personalityToDesignImages[personality];

  // const animals = Object.keys(designedProductsImageURLs);


  if (!Array.isArray(designKeys)) {
    return Array(NUMBER_OF_VARIANTS).fill(null);
  }

  const designArmadiloURLs = designKeys.map(
    key => designedProductsImageURLs["armadilo"][key] || null
  );

  const designBearURLs = designKeys.map(
    key => designedProductsImageURLs["bear"][key] || null
  );
  const designBadgerURLs = designKeys.map(
    key => designedProductsImageURLs["badger"][key] || null
  );
  const designHedgehogURLs = designKeys.map(
        key => designedProductsImageURLs["hedgehog"][key] || null
  );
  const designCapybaraURLs = designKeys.map(
        key => designedProductsImageURLs["capybara"][key] || null
    );

  return [
      ...designArmadiloURLs,
      ...designBearURLs,
      ...designBadgerURLs,
      ...designHedgehogURLs,
      ...designCapybaraURLs,
  ];
}

  function updateLabels() {
    const urls = getImageURLs();
    for (let i = 0; i < urls.length; i++) {
        if (!urls[i]) return;
    }  
    const designs = urls.map((url, i) => ({
      for: `template--18147309650102__main-1-${i}`,
      url
    }));


    designs.forEach(({ for: id, url }) => {
      const label = document.querySelector(`label[for="${id}"]`);
      // console.log("🔄 Label found:", label);
      if (label && !label.querySelector(`img[data-design="${id}"]`)) {
        // console.log("🔄 Updating label with image:", url);
        label.childNodes[0].textContent = '';
        label.style.padding = "3px";
        label.style.borderRadius = "25px";
        label.color = "1B1818"

        const img = document.createElement("img");
        
        img.src = url;
        const imgPersonality = designedProductsURLsToPersonality[url] ?? "noPersonality";
        img.about = imgPersonality;
        img.height = 118
        img.width = 118;
        img.alt = imgPersonality !== "noPersonality" ? imgPersonality + " personality design" : "Product design";
        img.dataset.design = id;
        img.style.borderRadius = "25px";
        img.classList.add("label-image");

        label.appendChild(img);
        // console.log("🔄 Updated label with image:", img);
      }
    });
  }  


// function randomizeFieldset() {
//   console.log("randomizeFieldset...");
//   const fieldset = document.querySelector(".product-form__input--pill");
//   if (!fieldset || fieldset.dataset.randomized === "true") return;

//   const allElements = Array.from(fieldset.querySelectorAll("input[type='radio'], label"));
//   if (allElements.length < 6) return;

//   const fixedPair = allElements.slice(0, 2);
//   const pairs = [];

//   for (let i = 2; i < allElements.length; i += 2) {
//     pairs.push([allElements[i], allElements[i + 1]]);
//   }

//   // Shuffle
//   for (let i = pairs.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
//   }

//   const cloneElements = [...fixedPair, ...pairs.flat()].map(el => el.cloneNode(true));
//   fieldset.innerHTML = "";
//   cloneElements.forEach(el => fieldset.appendChild(el));
//   fieldset.dataset.randomized = "true";
// }

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

document.addEventListener("DOMContentLoaded", ()   => {
  updateLabels(); 
  observeVariants();    
  initSearchTagInjection();
  observeAndRemovePredictiveGroups();
  observeAndRemoveProductCount();
  observeAndCleanSearchInput();

});


  function getPersonalityType(chosenPersonality) {
    const storedData = JSON.parse(localStorage.getItem("userQuizData")) || {};
    const personality = storedData.personality || "NO";
  
    if (chosenPersonality === "noPersonality") return chosenPersonality;
    if (chosenPersonality === personality) return "ownPersonality";
    if (chosenPersonality === AntiPersonality[personality]) return "antiPersonality";
  
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



  try {

    const dataStr = localStorage.getItem("userQuizData");
    console.log("📦 userQuizData from localStorage:", dataStr);
    const data = JSON.parse(dataStr);
    console.log("✅ Parsed data:", data);

    const personality = data.personality;

    console.log("if reached here, problem in if");

    if (personality && data?.responseId) {


      const targetUrl = `/collections/products/${data.personality}?response_id=${data.responseId}&set=${data.personality}`;

      console.log("🚀 Redirecting to:", targetUrl);

      window.location.href = targetUrl;
    } else {

      console.warn("⚠️ Missing personality or responseId, redirecting to fallback");

      window.location.href = "https://personallyu.com/collections/customer";
    }
  } catch (e) {

    console.error("Failed to parse userQuizData:", e);
    const storedData = { responseId: null, personality: "NO" };
    if (!localStorage.getItem("userQuizData")) {
      localStorage.setItem("userQuizData", JSON.stringify(storedData));
    }
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
if (window.location.href.includes("personallyu.com/collections/products")) {
    const style = document.createElement("style");
    style.textContent = `.disclosure { display: none !important; }`;
    document.head.appendChild(style);

}





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
    // let personality = urlPersonality || storedData.personality;
  
    // console.log("Response ID:", responseId);
    // console.log("Personality:", personality);
  
    // Define catalog URLs
    const catalogUrl = "https://personallyu.com/collections/products/";
    // const catalogUrl2 = "https://personallyu.com/collections/products";
  
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


  function handleRedirectClick() {
    // event.preventDefault();
    // event.stopImmediatePropagation(); // 🛑 Prevent Shopify’s handler too!
  const dataStr = localStorage.getItem("userQuizData");
  console.log("userQuizData from localStorage:", dataStr);

  try {
    const data = JSON.parse(dataStr);
    console.log("Parsed userQuizData:", data);

    if (data?.personality && data?.responseId) {
      console.log("Redirecting to personalized URL...");
      // event.preventDefault(); // stop default link behavior
      const targetUrl = `https://personallyu.com/collections/products/${data.personality}?response_id=${data.responseId}&set=${data.personality}`;
      console.log("Redirect URL:", targetUrl);
      window.location.href = targetUrl;
    } else {
      // console.log("Missing personality or responseId in userQuizData.");
    }
  } catch (e) {
    console.error("Failed to parse userQuizData:", e);
    // Do nothing and allow default link behavior
  }
  }




  document.addEventListener("DOMContentLoaded", function () {



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

const buttons = document.querySelectorAll('.disclosure__button');
buttons.forEach(button => {
  console.log("Adding click event listener to button:", button);
  button.addEventListener('click', handleRedirectClick);
});




document.addEventListener("DOMContentLoaded", function () {
  const bannerBox = document.querySelector(".banner__box.content-container--full-width-mobile");

  if (bannerBox) {
    bannerBox.style.maxWidth = "20%";
    bannerBox.style.maxHeight = "100%";
    bannerBox.style.position = "absolute";
    bannerBox.style.top = "55%";
    // bannerBox.style.padding = "40px"; // Add internal spacing
    // const parent = bannerBox.parentElement;
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

  const countryCurrencyButtonClass = document.getElementsByClassName("disclosure__button");
  const mobileMenuListClass = document.getElementsByClassName("menu-drawer__menu");

  if (countryCurrencyButtonClass.length > 0 && mobileMenuListClass.length > 0) {
    const countryCurrency = countryCurrencyButtonClass[0];
    const mobileMenu = mobileMenuListClass[0];

    const li = document.createElement("li");
    li.appendChild(countryCurrency);

    // Adjust the position to move it slightly to the right (20px)
    li.style.transform = "translateX(10px)";

    // Append as the first li in the menu
    mobileMenu.prepend(li);
  }

  const container = document.querySelector(".banner__box.content-container");

  if (!container) {
    // console.error("Banner container not found.");
    return;
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


