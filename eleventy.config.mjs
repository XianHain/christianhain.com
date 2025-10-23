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

  eleventyConfig.addFilter('blogListTimestamp', (date) => {
    const mmdd = new Date(date).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
    })

    const yyyy = new Date(date).toLocaleString('en-US', {
      year: 'numeric',
    })

    return `<span>${mmdd},</span><span> </span><span>${yyyy}</span>`;
  });

  eleventyConfig.addFilter('blogPostTimestamp', (date) =>
    new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
    })
  );

  eleventyConfig.addFilter('escapeNewlines', (string) => string.replace(/\n/g, "\\n").trim());

  eleventyConfig.addFilter('markdown', (content) => {
    return marked.parse(content)
      // Remove only the meta tags, leave the content between
      .replace(/<meta data-xian[^>]*>/g, '')
  });

  eleventyConfig.addFilter('formatted', async (content) => {
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

      // Remove elements that are later repositioned
      .replace(/<meta data-xian="ps-start">[\s\S]*?<meta data-xian="ps-end">/g, '')
      .replace(/<meta data-xian="songquote-start">[\s\S]*?<meta data-xian="songquote-end">/g, '')
      .replace(/<meta data-xian="music-start">[\s\S]*?<meta data-xian="music-end">/g, '')
  });

  eleventyConfig.addFilter('songquote', (content) => {
    return marked.parse(content)
      .match(/<meta data-xian="songquote-start">([\s\S]*?)<meta data-xian="songquote-end">/)?.[1]
  });

  eleventyConfig.addFilter('postscript', (content) => {
    return marked.parse(content)
      .match(/<meta data-xian="ps-start">([\s\S]*?)<meta data-xian="ps-end">/)?.[1]
  });

  eleventyConfig.addFilter('music', (content) => {
    return marked.parse(content)
      .match(/<meta data-xian="music-start">([\s\S]*?)<meta data-xian="music-end">/)?.[1]
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
