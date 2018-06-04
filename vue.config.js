module.exports = {
  devServer: {
    proxy: {
      '/springMVC-demo': {
        target: 'http://localhost:8080/springMVC-demo',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
