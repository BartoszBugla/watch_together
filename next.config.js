module.exports = {
  env: {
    API_KEY: "AIzaSyB2c94xX3-kBuU1R4H0dKRK4XkNBBX8vzY",
    client_id:
      "241790831481-f4i6ihsao02r8t1qp7r94gb8rsk681d7.apps.googleusercontent.com",
    client_key: "PaNy1ypfQED65r9GgZif52mG",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["img.youtube.com", "i.ytimg.com", "yt3.ggpht.com"],
  },
};
