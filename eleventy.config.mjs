import * as sass from 'sass';
import fs from 'node:fs/promises';
import path from 'node:path';
import esbuild from 'esbuild';
import {Buffer} from 'node:buffer';
import {Liquid} from 'liquidjs';
import {marked} from 'marked';
import {minify} from 'html-minifier-terser';
import pluginRss from '@11ty/eleventy-plugin-rss';
import {transform, browserslistToTargets} from 'lightningcss';
import browserslist from 'browserslist';
import EleventyPluginRobotsTxt from 'eleventy-plugin-robotstxt';

const OUTPUT_DIR = 'public';

export default async function(eleventyConfig) {
  // Set up environment-based layout selection
  const productionMode = process.env.NODE_ENV === 'production';
  eleventyConfig.addGlobalData('isProduction', productionMode);

  eleventyConfig.addPlugin(pluginRss);

  // Create blog collection from markdown files
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addPlugin(EleventyPluginRobotsTxt, {
    sitemapURL: 'https://www.christianhain.com/sitemap.xml',
    shouldBlockAIRobots: true,
  });

  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', {
    // opt-out of Eleventy Layouts
    useLayouts: false,

    outputFileExtension: 'css',

    compileOptions: {
      permalink: function (contents, inputPath) {
        return (data) => (data.page.inputPath.endsWith('styles.scss'))
          ? 'styles.min.css'
          : undefined;
      }
    },

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

      // Don’t compile file names that start with an underscore
      if(!parsed.name.startsWith('_')) {
        let result = sass.compileString(inputContent, {
          loadPaths: [
            parsed.dir || '.',
            this.config.dir.includes,
          ]
        });

        // Map dependencies for incremental builds
        await this.addDependencies(inputPath, result.loadedUrls);

        // Prepare vendor prefixes
        const targets = browserslistToTargets(
          browserslist('> 0.2% and not dead')
        );
        const outputDir = path.resolve(OUTPUT_DIR);
        const cssFilename = parsed.name + '.css';
        const cssPath = path.join(outputDir, cssFilename);
        const cssMapPath = cssPath + '.map';

        // Process with lightningcss for vendor prefixes, no minification
        let {
          map: unminifiedMap,
          code: unminifiedCss,
        } = await transform({
          code: Buffer.from(result.css),
          filename: cssFilename,
          minify: false,
          sourceMap: true,
          targets,
        });
        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(cssPath, unminifiedCss);
        if (unminifiedMap) {
          await fs.writeFile(cssMapPath, unminifiedMap);
        }

        // Process with lightningcss for vendor prefixes with minification
        return async () => {
          const minCssFilename = parsed.name + '.min.css';
          const minCssPath = path.join(outputDir, minCssFilename);
          const minCssMapPath = minCssPath + '.map';
          let {code, map} = await transform({
            code: Buffer.from(result.css),
            filename: minCssFilename,
            minify: true,
            sourceMap: true,
            targets,
          });
          if (map) {
            await fs.writeFile(minCssMapPath, map);
          }
          return code;
        };
      }
    },
  });

  // JavaScript bundling with esbuild (concatenate all .mjs in /src/_scripts/)
  eleventyConfig.on('eleventy.before', async () => {
    const outputDir = path.resolve(OUTPUT_DIR);
    const scriptsDir = path.resolve('src/_scripts');
    const jsPath = path.join(outputDir, 'scripts.js');
    const minJsPath = path.join(outputDir, 'scripts.min.js');
    const tempEntry = path.join(scriptsDir, '.eleventy-scripts-entry.mjs');

    // Get all .mjs files in scriptsDir (sorted for deterministic order)
    let files = (await fs.readdir(scriptsDir))
      .filter(f => f.endsWith('.mjs'))
      .sort();

    if (files.length > 0) {
      // Create a temp entry file that imports all scripts
      const importLines = files.map(
        (file) => `import './${file}';`
      ).join('\n');
      await fs.writeFile(tempEntry, importLines);
      await fs.mkdir(outputDir, { recursive: true });

      // Unminified bundle
      await esbuild.build({
        entryPoints: [tempEntry],
        bundle: true,
        sourcemap: true,
        minify: false,
        format: 'esm',
        outfile: jsPath,
        write: true,
        allowOverwrite: true,
      });

      // Minified bundle
      await esbuild.build({
        entryPoints: [tempEntry],
        bundle: true,
        sourcemap: true,
        minify: true,
        format: 'esm',
        outfile: minJsPath,
        write: true,
        allowOverwrite: true,
      });

      // Clean up temp entry file
      await fs.unlink(tempEntry);
    }
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
        conservativeCollapse: false,
      };
    } else if (outputPath.endsWith('.xml')) {
      options = {
        keepClosingSlash: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        collapseInlineTagWhitespace: true,
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
    });

    const yyyy = new Date(date).toLocaleString('en-US', {
      year: 'numeric',
    });

    return `<span>${mmdd},</span><span> </span><span>${yyyy}</span>`;
  });

  eleventyConfig.addFilter('blogPostTimestamp', (date) =>
    new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
    })
  );

  eleventyConfig.addFilter('escapeNewlines', (string) => string.replace(/\n/g, '\\n').trim());

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
      .replace(/<meta data-xian="music-start">[\s\S]*?<meta data-xian="music-end">/g, '');
  });

  eleventyConfig.addFilter('songquote', (content) => {
    return marked.parse(content)
      .match(/<meta data-xian="songquote-start">([\s\S]*?)<meta data-xian="songquote-end">/)?.[1];
  });

  eleventyConfig.addFilter('postscript', (content) => {
    return marked.parse(content)
      .match(/<meta data-xian="ps-start">([\s\S]*?)<meta data-xian="ps-end">/)?.[1];
  });

  eleventyConfig.addFilter('music', (content) => {
    return marked.parse(content)
      .match(/<meta data-xian="music-start">([\s\S]*?)<meta data-xian="music-end">/)?.[1];
  });

  eleventyConfig.setLibrary('liquid', new Liquid());
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
  });

  return {
    dir: {
      input: 'src',
      output: OUTPUT_DIR
    },
  };
}
