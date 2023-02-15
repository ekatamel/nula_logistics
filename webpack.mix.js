require("dotenv").config();
const mix = require("laravel-mix");

if (!mix.inProduction()) {
    mix.webpackConfig({
        devtool: "source-map",
        resolve: {
            fallback: {
                stream: false,
            },
        },
    }).sourceMaps();
} else {
    mix.version();
}

mix.ts("resources/js/index.tsx", "public/js/app.js").react();
