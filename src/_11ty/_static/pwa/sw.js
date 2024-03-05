importScripts("https://cdn.ampproject.org/sw/amp-sw.js");

AMP_SW.init({
    assetCachingOptions: [
        {
            regexp: /\.(swg|png|jpg|webp|avif|woff2|woff|html|css|js|pdf|vcf)/,
            cachingStrategy: "CACHE_FIRST",
        },
    ],
    offlinePageOptions: {
        url: "/index.html",
        assets: ["/css/style.css"],
    },
});
