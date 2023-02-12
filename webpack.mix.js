require("dotenv").config();
const mix = require("laravel-mix");

if (!mix.inProduction()) {
    // development settings:
    //     add source maps
    mix.webpackConfig({
        devtool: "source-map",
    }).sourceMaps();
}

// ADD ASSETS TO COMPILE HERE:

// Examples:
// mix.sass("resources/css/app.scss", "public/css");
// mix.sass("resources/css/users-app.scss", "public/css");
// mix.sass("resources/css/event.scss", "public/css");
// mix.sass("resources/css/form.scss", "public/css");
// mix.sass("resources/css/contacts.scss", "public/css");
// mix.js("resources/js/users-homepage.js", "public/js").react();
// mix.js("resources/js/events.js", "public/js").react();
// mix.js("resources/js/about-us.js", "public/js").react();

mix.js("resources/js/react.js", "public/js").react();

// mix.js('resources/js/library.js', 'public/js');
// mix.js('resources/js/app.js', 'public/js').react();
