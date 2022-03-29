// vue.config.js for less-loader@6.0.0
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#00785a",
            "error-color": "#ff3c32"
          },
          javascriptEnabled: true
        }
      }
    }
  }
};
