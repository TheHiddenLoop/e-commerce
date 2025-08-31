// tailwind.config.js
module.exports = {
  darkMode: "class", // enable dark mode with .dark class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",       // main brand
        secondary: "var(--secondary-color)",   // secondary brand
        accent: "var(--accent-color)",         // accent/highlight

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",

        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",

        border: "var(--border-glass)",
        ring: "var(--bg-glass)",

        success: "var(--success, #16a34a)",   // fallback green
        error: "var(--error, #dc2626)",       // fallback red
        warning: "var(--warning, #facc15)",   // fallback yellow
        info: "var(--info, #3b82f6)",         // fallback blue
      },
      boxShadow: {
        skin: "var(--shadow-glass)", // matches your CSS variable
      },
      transitionProperty: {
        skin: "all", // smooth transitions
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
