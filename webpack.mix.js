require("dotenv").config();
const mix = require("laravel-mix");

if (!mix.inProduction()) {
    // development settings:
    //     add source maps
    mix.webpackConfig({
        devtool: "source-map",
    }).sourceMaps();
}

mix.ts("resources/js/index.tsx", "public/js/app.js").react();
