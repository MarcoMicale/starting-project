module.exports = function (eleventyConfig) {

// Show url in terminal output
eleventyConfig.setServerOptions({
    showAllHosts: true,
});

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

};
