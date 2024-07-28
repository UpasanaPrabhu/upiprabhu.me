module.exports = {
  siteMetadata: {
    title: `upiprabhu.me`,
    description: `Upasana's personal website to showcase projects and experiences`,
    author: `Upasana Prabhu`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'upiprabhu',
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["YOUR_GOOGLE_ANALYTICS_TRACKING_ID"],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Upasana Prabhu's Website`,
        short_name: `upiprabhu.me`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site. Ensure this file exists.
      },
    },
    `gatsby-plugin-offline`,
  ],
}