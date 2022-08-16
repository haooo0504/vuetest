module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ft-color": "var(--ft-color)",
        "ft-hover-color": "var(--ft-hover-color)",
        "hd-white": "var(--hd-white)",
        "hd-black1": "var(--hd-black1)",
        "hd-black2": "var(--hd-black2)",
        "hd-bg-white": "var(--hd-bg-white)",
        "hd-bg-black": "var(--hd-bg-black)",
      },
    },
  },
  plugins: [],
};
