/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /**
       * 🎨 COLORS
       * Use semantic naming instead of raw colors
       * This helps maintain consistency across the app
       */
      colors: {
        /* 🔵 Brand / Primary Actions */
        primary: {
          DEFAULT: "#1E40AF", // Main CTA buttons (Add to Cart, Buy Now)
          hover: "#1E3A8A",   // Hover state for primary buttons
          soft: "#DBEAFE",   // Background for selected items
        },

        /* 🟡 Secondary / Highlights */
        secondary: {
          DEFAULT: "#FBBF24", // Highlights, offers, featured badges
          soft: "#FEF3C7",    // Light backgrounds (promo banners)
        },

        /* 🟢 Success / Discounts */
        success: {
          DEFAULT: "#10B981", // Discount labels, success alerts
          soft: "#D1FAE5",    // Order success background
        },

        /* 🔴 Danger / Errors */
        danger: {
          DEFAULT: "#EF4444", // Errors, delete buttons, sale badge
          soft: "#FEE2E2",    // Error background
        },

        /* ⚫ Neutral / Text */
        text: {
          primary: "#111827", // Main text (titles)
          secondary: "#374151", // Subtitles, product meta
          muted: "#6B7280",   // Placeholder, inactive text
          inverse: "#FFFFFF", // Text on dark backgrounds
        },

        /* 🧱 Backgrounds */
        surface: {
          DEFAULT: "#FFFFFF", // Cards, modals
          soft: "#F9FAFB",    // Page background
          muted: "#F3F4F6",   // Sections, footer background
        },

        /* 🧵 Borders */
        border: {
          DEFAULT: "#E5E7EB", // Card & input borders
          hover: "#D1D5DB",
        },
      },

      /**
       * ✍️ TYPOGRAPHY
       * Clear hierarchy for ecommerce readability
       */
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], 
        serif: ["Merriweather", "ui-serif", "Georgia"], 
      },

      /**
       * 📐 SPACING
       * Useful for large layouts & hero sections
       */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        128: "32rem", // Product grid container
        144: "36rem", // Hero / banner section
      },

      /**
       * 🔲 BORDER RADIUS
       * Modern ecommerce prefers softer corners
       */
      borderRadius: {
        sm: "0.25rem",   // Inputs, small buttons
        md: "0.5rem",    // Cards, dropdowns
        lg: "0.75rem",   // Product cards
        xl: "1rem",      // Modals
        "2xl": "1.5rem", // Hero cards
        "3xl": "2rem",   // Large banners
      },

      /**
       * 🌫 SHADOWS
       * Used for depth & elevation
       */
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.05)", // Inputs
        sm: "0 2px 4px rgba(0,0,0,0.08)", // Buttons
        card: "0 6px 12px rgba(0,0,0,0.08)", // Product cards
        modal: "0 20px 25px rgba(0,0,0,0.15)", // Modals
        header: "0 4px 10px rgba(0,0,0,0.08)", // Sticky header
      },

      /**
       * 🔠 FONT SIZES
       * Matches ecommerce text hierarchy
       */
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],     // Helper text
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // Labels
        base: ["1rem", { lineHeight: "1.5rem" }],    // Body text
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // Product titles
        xl: ["1.25rem", { lineHeight: "1.75rem" }],  // Section headers
        "2xl": ["1.5rem", { lineHeight: "2rem" }],   // Page titles
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // Hero text
      },

      /**
       * 🎞 TRANSITIONS
       * Smooth but fast interactions
       */
      transitionDuration: {
        200: "200ms", // Buttons, hover
        300: "300ms", // Cards
        500: "500ms", // Modals
      },
    },
  },

  plugins: [],
};
