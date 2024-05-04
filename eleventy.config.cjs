const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform('htmlmin', function (content) {
    return ((this.page.outputPath || '').endsWith('.html'))
      ? htmlmin.minify(content, {
          minifyJS: true,
          removeComments: true,
          useShortDoctype: true,
          collapseWhitespace: true,
        })
      : content;
  });

  return {
    dir: {
      input: 'src/views',
      output: 'public',
    },
  };
};