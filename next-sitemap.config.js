/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.whowaschamp.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    const paths = [
      '/on-this-day',
      '/on-this-week',
      '/this-week',
      '/ufc/this-week',
      '/boxing/this-week',
    ];
    const out = [];
    for (const p of paths) {
      out.push(await config.transform(config, p));
    }
    return out;
  },
};
