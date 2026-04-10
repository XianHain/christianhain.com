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
        return (data) => {
          let permalink = undefined;
          if (data.page.inputPath.endsWith('styles.scss')) {
            permalink = 'styles.min.css';
          }
          return permalink;
        }
      }
    },

    compile: async function (inputContent, inputPath) {
      let resultString = null;
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
        resultString = async () => {
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

      return resultString ?? undefined;
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

    let result = content;
    if (options) {
      result = await minify(content, options);
    }
    return result;
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
  
  eleventyConfig.addFilter('fullDateString', (date) => {
    const d = new Date(date);
    const parts = {
      weekday: d.toLocaleString(
        'en-US',
        { weekday: 'short', timeZone: 'America/New_York' }
      ),
      month: d.toLocaleString(
        'en-US',
        { month: 'short', timeZone: 'America/New_York' }
      ),
      day: d.toLocaleString(
        'en-US',
        { day: '2-digit', timeZone: 'America/New_York' }
      ),
      year: d.toLocaleString(
        'en-US',
        { year: 'numeric', timeZone: 'America/New_York' }
      ),
      hour: d.toLocaleString(
        'en-US',
        { hour: '2-digit', hour12: false, timeZone: 'America/New_York' }
      )
        .replace(/^24/, '00'),
      minute: d.toLocaleString(
        'en-US',
        { minute: '2-digit', timeZone: 'America/New_York' }
      ),
      second: d.toLocaleString(
        'en-US',
        { second: '2-digit', timeZone: 'America/New_York' }
      ),
    };

    const isDST = (date) => {
      const january = new Date(new Date(date).getFullYear(), 0, 1)
        .getTimezoneOffset();
      const july = new Date(new Date(date).getFullYear(), 6, 1)
        .getTimezoneOffset();
      return Math.max(january, july) !== new Date(date).getTimezoneOffset();
    };
    
    const timezoneName = isDST(d) ? 'Eastern Daylight Time' : 'Eastern Standard Time';
    const timezoneOffset = isDST(d) ? 'GMT-0400' : 'GMT-0500';

    const dateString = `${parts.weekday} ${parts.month} ${parts.day} ${parts.year} ${parts.hour}:${parts.minute}:${parts.second} ${timezoneOffset} (${timezoneName})`;

    // Wrap at 80 chars
    if (dateString.length > 80) {
      const words = dateString.split(' ');
      let lines = [];
      let currentLine = '';

      for (const word of words) {
        if ((currentLine + word).length > 80) {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine += word + ' ';
        }
      }
      lines.push(currentLine.trim());
      return lines.join('\n');
    }

    return dateString;
  });

  const formatMarkdown = async (content) => {
    let result = null;
    if (content) {
      result = (await marked.parse(content, {
        breaks: true,
        gfm: true,
      }))
        .replace(/([.!?](?:(?:&quot;|['"]|\\?["']))?|&hellip;) {2}/g, '$1&nbsp; ')

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
    }
    return result;
  };

  eleventyConfig.addFilter('formatted', async (content) => {
    return await formatMarkdown(content);
  });

  eleventyConfig.addFilter('songquote', async (content) => {
    return (await formatMarkdown(content))
      .match(/<meta data-xian="songquote-start">([\s\S]*?)<meta data-xian="songquote-end">/)?.[1];
  });

  eleventyConfig.addFilter('postscript', async (content) => {
    return (await formatMarkdown(content))
      .match(/<meta data-xian="ps-start">([\s\S]*?)<meta data-xian="ps-end">/)?.[1];
  });

  eleventyConfig.addFilter('music', async (content) => {
    return (await formatMarkdown(content))
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
