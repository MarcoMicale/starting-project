// Boost files .md
// https://markdown-it.github.io/
const markdownIt = require('markdown-it')
// https://github.com/arve0/markdown-it-attrs?tab=readme-ov-file#examples
const markdownItAttrs = require('markdown-it-attrs')

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

    // Copyright shortcode
    // La mia firma ;-)
    eleventyConfig.addShortcode("copy", () => `&#169;&nbsp;${new Date().getFullYear()}&nbsp;Marco&nbsp;Micale`);

    // Set the markdown configuration in 11ty
    const markdownLib = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    })
    .use(markdownItAttrs)
    eleventyConfig.setLibrary('md', markdownLib);

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
