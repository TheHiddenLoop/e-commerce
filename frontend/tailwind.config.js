module.exports = {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",       
        secondary: "var(--secondary-color)",  
        accent: "var(--accent-color)",         

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",

        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",

        border: "var(--border-glass)",
        ring: "var(--bg-glass)",

        success: "var(--success, #16a34a)",  
        error: "var(--error, #dc2626)",    
        warning: "var(--warning, #facc15)",   
        info: "var(--info, #3b82f6)",         
      },
      boxShadow: {
        skin: "var(--shadow-glass)", 
      },
      transitionProperty: {
        skin: "all", 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
