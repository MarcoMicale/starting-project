module.exports = function (eleventyConfig) {

    eleventyConfig.setServerOptions({
        showAllHosts: true,
    });

    //eleventyConfig
    //    .addPassthroughCopy({ "src/_11ty/_static/app/*.*": "/" })
    //    .addPassthroughCopy({ "src/_11ty/_static/img/*.*": "/img" })
    //    .addPassthroughCopy({ "src/_11ty/_static/favicon": "favicon" });

return {
    templateFormats: [
        "md",
        "njk"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
        input: "./src/content/",
        includes: "../_11ty/_includes/",
        layouts: "../_11ty/_layouts/",
        data: "../_11ty/_data/",
        output: "./public/",
        },
    };

};
