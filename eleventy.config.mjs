import {Liquid} from 'liquidjs';
import {marked} from 'marked';
import {minify} from 'html-minifier-terser';
import pluginRss from '@11ty/eleventy-plugin-rss';
import EleventyPluginRobotsTxt from "eleventy-plugin-robotstxt";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(EleventyPluginRobotsTxt, {
    sitemapURL: 'https://www.christianhain.com/sitemap.xml',
    shouldBlockAIRobots: true,
  });

  eleventyConfig.addShortcode('year', () => new Date().getFullYear());

  eleventyConfig.addTransform('minify', async function (content) {
    const outputPath = this.page.outputPath || '';
    let options = null;

    if (outputPath.endsWith('.html')) {
      options = {
        minifyJS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
      };
    } else if (outputPath.endsWith('.xml')) {
      options = {
        keepClosingSlash: true,
        collapseWhitespace: true,
      };
    }

    return (options)
      ? await minify(content, options)
      : content;
  });

  eleventyConfig.addFilter('atom_dateToRfc3339', (date) => pluginRss.dateToRfc3339(new Date(date)));

  eleventyConfig.addFilter('blogListTimestamp', (date) =>
    new Date(date).toLocaleString('en-US', {
      day: '2-digit',
      year: 'numeric',
      month: 'short',
    })
  );

  eleventyConfig.addFilter('blogPostTimestamp', (date) =>
    new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
    })
  );

  eleventyConfig.addFilter('escapeNewlines', (string) => string.replace(/\n/g, "\\n").trim());

  eleventyConfig.addFilter('markdown', async (content) => {
    return await marked.parse(content)
      // Article Theme
      .replace('<meta data-xian="article-start">', '</div><div data-theme="article"><div class="blog__copy">')
      .replace('<meta data-xian="article-end">', '</div></div><div class="blog__copy" data-theme="memo">')

      // Email Theme
      .replace('<meta data-xian="email-start">', '</div><div data-theme="email"><div class="blog__copy">')
      .replace('<meta data-xian="email-end">', '</div></div><div class="blog__copy" data-theme="memo">')

      // Video-Player Theme
      .replace('<meta data-xian="videoplayer-start">', '</div><div data-theme="video-player"><div class="blog__copy">')
      .replace('<meta data-xian="videoplayer-end">', '</div></div><div class="blog__copy" data-theme="memo">')
  });

  eleventyConfig.setLibrary('liquid', new Liquid());
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
  });

  return {
    dir: {
      input: 'src/views',
      output: 'public',
    },
  };
}
