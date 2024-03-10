// Boost files .md
// https://markdown-it.github.io/
const markdownIt = require('markdown-it')
// https://github.com/arve0/markdown-it-attrs?tab=readme-ov-file#examples
const markdownItAttrs = require('markdown-it-attrs')

const htmlmin = require("html-minifier");
const pluginPWA = require("eleventy-plugin-pwa-v2");

// 11ty Setting
module.exports = function (eleventyConfig) {

    // Show url in terminal output
    eleventyConfig.setServerOptions({
        showAllHosts: true,
    });

    // Show url in terminal output
    eleventyConfig.setServerOptions({
        showAllHosts: true,
    });

    // Copia alcuni file statici
    eleventyConfig
    .addPassthroughCopy({ "src/_11ty/_static/pwa/*.*": "/" })
        .addPassthroughCopy({ "src/_11ty/_static/css": "css" })
        .addPassthroughCopy({ "src/_11ty/_static/icon": "favicon" })
        .addPassthroughCopy({ "src/_11ty/_static/images": "img" });

    // La mia firma 😁
    // Copyright shortcode
    eleventyConfig.addShortcode("copy", async () => `&#169;&nbsp;${new Date().getFullYear()}&nbsp;Marco&nbsp;Micale`);

    eleventyConfig.addFilter('encode', function(url) {
        return url
            .replace('://', '%3A%2F%2F');
    });

    // Set the markdown configuration in 11ty
    const markdownLib = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    })
    .use(markdownItAttrs)
    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addTransform("htmlmin", function(content) {
        // Prior to Eleventy 2.0: use this.outputPath instead
        if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    // PWA app
    eleventyConfig.addPlugin(pluginPWA, {
        cacheId: "your-app-id", // change this to your application id
        globIgnores: [
            // any files you don't want service worker to cache go here
            "css/*.*",
            "favicon/*.*",
            "img/*.*",
            "site.webmanifest",
            "https://unpkg.com/dark-mode-toggle"
        ],
        runtimeCaching: [
            {
            // we always want fresh copy of the index page
            urlPattern: /\/$/,
            handler: "NetworkFirst",
            },
            {
            // we also want fresh copies of any HTML page
            urlPattern: /\.html$/,
            handler: "NetworkFirst",
            },
            {
            // we serve stale copies of static assets while they're refreshed
            urlPattern:
                /^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
            handler: "StaleWhileRevalidate",
            },
        ],
    });

    // Do not change the following lines, it is not necessary
    return {
        // src Formats
        templateFormats: [ "md", "njk", "html" ],

        // Nunjucks  engine in .md & .html file
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",

        // Directory
        dir: {
            input: "./src/content/",
            includes: "../_11ty/_includes/",
            layouts: "../_11ty/_layouts/",
            data: "../_11ty/_data/",
            output: "./public/",
            },
    };

}
