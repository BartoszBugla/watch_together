module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        playerSm: "320px",
        playerMd: "520px",
        playerLg: "680px",
        rotatedScreen: "100vw",
      },
      width: {
        playerSm: "75%",
        playerMd: "720px",
        playerLg: "940px",
        rotatedScreen: "100vh",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      height: ["hover", "focus"],
      filter: ["hover", "focus"],
    },
  },
};
