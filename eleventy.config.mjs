// import {htmlmin} from 'html-minifier';
import {marked} from 'marked';
import {minify} from 'html-minifier-terser';

export default async function(eleventyConfig) {
  eleventyConfig.addShortcode('year', () => new Date().getFullYear());

  eleventyConfig.addTransform('minify', async function (content) {
    return ((this.page.outputPath || '').endsWith('.html'))
      ? await minify(content, {
        minifyJS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
      })
      : content;
  });

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

  eleventyConfig.addFilter('markdown', async (content) =>
    await marked.parse(content)
      .replace('<meta data-xian="article-start" />', '</div><div data-theme="article"><div class="blog__copy">')
      .replace('<meta data-xian="article-end" />',   '</div></div><div class="blog__copy" data-theme="memo">')
  );

  return {
    dir: {
      input: 'src/views',
      output: 'public',
    },
  };
}