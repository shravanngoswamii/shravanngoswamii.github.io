import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Shravan Goswami',
  tagline: 'A Developer and a Writer',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://blog.shravangoswami.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'shravanngoswamii', // Usually your GitHub org/user name.
  projectName: 'portfolio', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          blogTitle: 'Shravan\'s blog!',
          blogDescription: 'Technical and Philosophical Blog',
          postsPerPage: 5,
          showReadingTime: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/shravanngoswamii/portfolio/tree/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      hideOnScroll: true,
      title: 'Seeker\'s Blog',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon-dark.png',
        srcDark: 'img/favicon-light.png',
      },
      items: [
        {to: '/blog', label: 'Blog', position: 'left'},
				{
					'aria-label': 'GitHub Repository',
					'className': 'header--github-link',
					'href': 'https://github.com/<repo>',
					'position': 'right',
				},
        {
          label: 'Resume',
          position: 'left',
          to: 'https://shravangoswami.com/assets/Shravan-Resume.pdf'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Articles',
          items: [
            {
              label: 'Blogs',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Presence',
          items: [
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/in/shravangoswami/',
            },
            {
              label: 'Github',
              href: 'https://github.com/shravanngoswamii',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/shravangoswamii',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Codeforces',
              href: 'https://codeforces.com/profile/shravanngoswamii',
            },
            {
              label: 'old-site',
              href: 'https://shravangoswami.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shravan Goswami, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;