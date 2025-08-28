export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Include if you have a pages folder; otherwise remove this line
  ],
  theme: {
    extend: {
      // You can customize colors here if needed (e.g., make them brighter)
      colors: {
        brandStart: "hsl(var(--brand-start))",
        brandEnd: "hsl(var(--brand-end))",
      },
    },
  },
  plugins: [],
}