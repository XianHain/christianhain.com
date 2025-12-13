import fs from 'fs';
import path from 'path';
import {glob} from 'glob';
import {defineConfig} from 'vite';

const OUTPUT_DIR = 'public';

// Generate timestamp for banners
const generatedOnTimestamp = `Generated on: ${new Date().toISOString()}`;

// Custom plugin to add banners to HTML files
const htmlBannerPlugin = () => {
  return {
    name: 'html-banner',
    writeBundle() {
      const bannerContent = `<!-- ${generatedOnTimestamp} -->\n`;
      const htmlFiles = glob.sync('./**/*.html', { cwd: OUTPUT_DIR });
      htmlFiles.forEach(file => {
        const fullPath = path.join(OUTPUT_DIR, file);
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (!content.startsWith(
            `<!-- ${generatedOnTimestamp.split(':')[0]}`
          )) {
            fs.writeFileSync(fullPath, bannerContent + content);
          }
        } catch (error) {
          console.error(`Error adding banner to ${fullPath}:`, error);
        }
      });
    }
  };
};

// Custom plugin to add banners to JS and CSS files
const jsCssBannerPlugin = () => {
  return {
    name: 'js-css-banner',
    writeBundle() {
      const bannerContent = `/* ${generatedOnTimestamp} */\n`;
      const jsFiles = glob.sync('./**/*.js', { cwd: OUTPUT_DIR });
      const cssFiles = glob.sync('./**/*.css', { cwd: OUTPUT_DIR });
      [...jsFiles, ...cssFiles].forEach(file => {
        const fullPath = path.join(OUTPUT_DIR, file);
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (!content.startsWith(bannerContent.trim())) {
            fs.writeFileSync(fullPath, bannerContent + content);
          }
        } catch (error) {
          console.error(`Error adding banner to ${fullPath}:`, error);
        }
      });
    }
  };
};

export default defineConfig({
  root: OUTPUT_DIR,
  plugins: [
    htmlBannerPlugin(),
    jsCssBannerPlugin(),
  ],
  build: {
    outDir: `${OUTPUT_DIR}/.delete`,
    emptyOutDir: false,
  },
});
