/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.whowaschamp.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/on-this-day'),
      await config.transform(config, '/on-this-week'),
    ];
  },
};
