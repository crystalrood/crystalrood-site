/*
 * Site content for crystalrood.com
 *
 * Edit this file to update the profile or recipes. Keep each recipe `slug`
 * unique and URL-friendly. Add an image path only when you have a real photo;
 * blank image values are intentionally omitted from the page.
 */

(function attachSiteContent(global) {
  "use strict";

  const siteProfile = {
    name: "Crystal Rood",
    siteName: "Crystal Rood",
    domain: "crystalrood.com",
    tagline: "Things worth keeping.",
    intro: "A log of things I find notable and useful to archive.",
    bio: "This is placeholder biography copy. Add a short introduction in your own voice.",
    location: "Your city",
    email: "you@example.com",
    avatar: "",
    avatarAlt: "Portrait of Crystal Rood",
    socialLinks: [],
    navigation: [
      { label: "Home", href: "index.html" },
      { label: "Projects", href: "projects.html" },
      { label: "Recipes", href: "recipes.html" },
      { label: "About", href: "about.html" },
    ],
    footerNote: "Made with love.",
  };

  // Project support remains in the template for later, but nothing is published.
  const projects = [];

  const recipes = [
    {
      id: "recipe-001",
      slug: "small-gluten-free-sandwich-loaf",
      title: "Sandwich Loaf",
      eyebrow: "Bread",
      summary: "A small gluten-free sandwich loaf sized for an 8 × 4-inch metal pan.",
      description:
        "A batter-style loaf made with Caputo gluten-free flour and baked in the Wonder Oven.",
      category: "Bread",
      cuisine: "",
      timeLabel: "35–60 min rise · 35–45 min bake · 2 hr cool",
      prepMinutes: null,
      cookMinutes: null,
      totalMinutes: null,
      yield: "1 loaf (8 × 4-inch pan)",
      servings: null,
      difficulty: "",
      oven: "Wonder Oven · 365°F",
      featured: true,
      publishedDate: null,
      tags: ["Gluten-free", "Bread", "Wonder Oven"],
      dietary: ["Gluten-free"],
      image: "",
      imageAlt: "Gluten-free sandwich loaf",
      ingredientGroups: [
        {
          heading: "Loaf",
          items: [
            "300 g Caputo gluten-free flour",
            "270 g warm water (about 100°F/38°C)",
            "7 g instant yeast",
            "12 g sugar or honey",
            "6 g fine salt",
            "20 g olive oil, plus more for greasing and brushing",
            "1 large egg, at room temperature",
            "1 tsp apple cider vinegar",
          ],
        },
      ],
      directions: [
        {
          heading: "Prepare the pan",
          text: "Grease the loaf pan and line the long sides with parchment paper.",
        },
        {
          heading: "Mix the dough",
          text: "Combine the flour, yeast, sugar, and salt. Add the water, egg, 20 g olive oil, and vinegar, then beat with a stand mixer or sturdy hand mixer for 3–4 minutes. The dough should resemble thick, sticky cake batter; do not add more flour.",
        },
        {
          heading: "Fill the pan",
          text: "Scrape the dough into the pan. Smooth the top with a wet spatula or wet fingers. Lightly brush the surface with olive oil.",
        },
        {
          heading: "Let rise",
          text: "Cover loosely and let rise in a warm place for 35–60 minutes, until about 50 percent larger or 1 inch below the rim. Do not let it double.",
        },
        {
          heading: "Preheat",
          text: "Set the Wonder Oven to Bake at 365°F.",
        },
        {
          heading: "Bake",
          text: "Bake on the center rack for 15 minutes. Rotate the pan and bake for another 20–30 minutes. If the top browns too quickly, loosely cover it with foil after 20–25 minutes, keeping the foil clear of the heating elements.",
        },
        {
          heading: "Check for doneness",
          text: "The center should reach 205–210°F on an instant-read thermometer. Without a thermometer, the loaf should feel firm and pull slightly away from the sides of the pan.",
        },
        {
          heading: "Cool completely",
          text: "Cool in the pan for 10 minutes, then transfer to a rack and cool for at least 2 hours before slicing.",
        },
      ],
      notes: [],
      source: { label: "", url: "" },
      placeholder: false,
    },
    {
      id: "recipe-002",
      slug: "caputo-maple-almond-cookies",
      title: "Decadent Chocolate Chip Cookies",
      eyebrow: "Cookies",
      summary: "Gluten-free brown-butter cookies with maple, almond, dark chocolate, and flaky salt.",
      description:
        "Gluten-free cookies made with Caputo Fioreglut, maple syrup, almond butter, and dark chocolate.",
      category: "Cookies",
      cuisine: "",
      timeLabel: "1–2 hr chill · 10–12 min bake",
      prepMinutes: null,
      cookMinutes: null,
      totalMinutes: null,
      yield: "",
      servings: null,
      difficulty: "",
      oven: "Wonder Oven · 325°F",
      featured: true,
      publishedDate: null,
      tags: ["Gluten-free", "Cookies", "Wonder Oven"],
      dietary: ["Gluten-free"],
      image: "",
      imageAlt: "Decadent gluten-free chocolate chip cookies",
      ingredientGroups: [
        {
          heading: "Cookie dough",
          items: [
            "305 g Caputo Fioreglut gluten-free flour",
            "1 tsp baking soda",
            "1 tsp fine sea salt",
            "226 g unsalted butter",
            "30 g almond butter",
            "160 g light brown sugar",
            "100 g granulated sugar",
            "90 g pure maple syrup",
            "2 large egg yolks",
            "2 tsp vanilla extract",
            "¼ tsp almond extract",
            "280 g dark chocolate",
          ],
        },
        {
          heading: "For finishing",
          items: ["Flaky sea salt"],
        },
      ],
      directions: [
        {
          heading: "Brown the butter",
          text: "Brown the butter, then let it cool until warm rather than hot.",
        },
        {
          heading: "Mix the wet ingredients",
          text: "Whisk the browned butter, almond butter, brown sugar, granulated sugar, and maple syrup until smooth. Whisk in the egg yolks, vanilla, and almond extract.",
        },
        {
          heading: "Add the dry ingredients",
          text: "In a separate bowl, whisk together the Fioreglut, baking soda, and salt. Add the dry ingredients to the wet ingredients and mix just until combined, then fold in the dark chocolate.",
        },
        {
          heading: "Portion and chill",
          text: "Shape the dough into evenly sized round balls and chill for 1–2 hours. Do not freeze.",
        },
        {
          heading: "Preheat",
          text: "Set the Wonder Oven to Bake at 325°F.",
        },
        {
          heading: "Bake",
          text: "Bake for 10–12 minutes, until the edges are browned but the centers still look slightly soft. Finish with flaky sea salt while the cookies are warm.",
        },
      ],
      notes: [],
      source: { label: "", url: "" },
      placeholder: false,
    },
    {
      id: "recipe-003",
      slug: "gluten-free-pizza-dough",
      title: "Pizza Dough",
      eyebrow: "Pizza",
      summary: "A gluten-free pan pizza with a two-stage bake in the Wonder Oven.",
      description:
        "Caputo gluten-free dough chilled for at least two hours, par-baked, topped, and baked again.",
      category: "Pizza",
      cuisine: "",
      timeLabel: "2+ hr chill · 35 min bake",
      prepMinutes: null,
      cookMinutes: 35,
      totalMinutes: null,
      yield: "1 Wonder Oven pan pizza",
      servings: null,
      difficulty: "",
      oven: "Wonder Oven · 400°F",
      featured: true,
      publishedDate: null,
      tags: ["Gluten-free", "Pizza", "Wonder Oven"],
      dietary: ["Gluten-free"],
      image: "",
      imageAlt: "Gluten-free pan pizza baked in the Wonder Oven",
      ingredientGroups: [
        {
          heading: "Dough",
          items: [
            "250 g Caputo gluten-free flour",
            "8 g instant yeast",
            "10 g sugar",
            "8 g fine salt",
            "200 g water",
            "15 g Olitalia extra-virgin olive oil, plus more for the bowl",
          ],
        },
        {
          heading: "Toppings",
          items: [
            "365 Organic pizza sauce, as desired",
            "365 Organic Italian cheese, as desired",
            "Organic Valley Italian cheese, as desired",
            "Pepperoni, as desired",
            "Simply Organic Italian seasoning, as desired",
          ],
        },
      ],
      directions: [
        {
          heading: "Mix the dough",
          text: "Combine the flour, yeast, sugar, and salt. Add the water and 15 g olive oil, then mix until smooth and evenly combined.",
        },
        {
          heading: "Chill",
          text: "Place the dough in a lightly oiled bowl, cover, and refrigerate for at least 2 hours.",
        },
        {
          heading: "Preheat",
          text: "Preheat the Wonder Oven to 400°F.",
        },
        {
          heading: "Shape",
          text: "Press the dough out to cover the Wonder Oven pan.",
        },
        {
          heading: "Prebake the crust",
          text: "Bake for 15 minutes.",
        },
        {
          heading: "Top the pizza",
          text: "Spread the sauce over the crust, then add both cheeses, pepperoni, and Italian seasoning.",
        },
        {
          heading: "Finish baking",
          text: "Bake for 20 more minutes, rotating the pan halfway through.",
        },
      ],
      notes: [],
      source: { label: "", url: "" },
      placeholder: false,
    },
  ];

  global.CRYSTAL_ROOD_CONTENT = { siteProfile, projects, recipes };
  global.siteProfile = siteProfile;
  global.projects = projects;
  global.recipes = recipes;
})(typeof window !== "undefined" ? window : globalThis);
